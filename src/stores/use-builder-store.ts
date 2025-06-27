import {
  BuilderState,
  GlobalStyles,
  Section,
  Template,
} from "@/features/builder/types";
import { getDefaultContent, readFileAsText } from "@/features/builder/utils";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type BuilderStore = BuilderState & {
  isAutoSaving: boolean;
  autoSaveTimer: NodeJS.Timeout | null;
  deviceScreen: "mobile" | "tablet" | "monitor";
  // Actions
  addSection: (sectionType: string) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  setSelectedSectionId: (id: string | null) => void;
  togglePreviewMode: () => void;
  updateGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  autoSave: () => void;
  moveSection: (activeId: string, overId: string) => void;
  exportConfig: () => void;
  importConfig: (file: File) => Promise<boolean>;
  resetImportInput: () => void;
  togglePropertyPanel: () => void;
  setDeviceScreen: (screen: "mobile" | "tablet" | "monitor") => void;
  loadTemplate: (template: Template) => void;
};

const initialState: BuilderState = {
  sections: [],
  selectedSectionId: null,
  previewMode: false,
  globalStyles: {
    primaryColor: "#155dfc",
    secondaryColor: "#06B6D4",
    fontFamily: "Inter",
    backgroundColor: "#FFFFFF",
  },
  showPropertyPanel: true,
};

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isAutoSaving: false,
      autoSaveTimer: null,
      deviceScreen: "monitor",

      addSection: (sectionType) => {
        const newSection: Section = {
          id: `section-${Date.now()}-${Math.random()
            .toString(36)
            .substr(2, 9)}`,
          type: sectionType,
          title: `${
            sectionType.charAt(0).toUpperCase() + sectionType.slice(1)
          } Section`,
          content: getDefaultContent(sectionType),
          order: get().sections.length,
          styles: {
            backgroundColor: "transparent",
            textColor: "#1F2937",
            padding: "2rem",
            margin: "0",
          },
        };

        set((state) => ({
          sections: [...state.sections, newSection],
          selectedSectionId: newSection.id,
        }));

        get().autoSave();
      },

      updateSection: (sectionId, updates) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId ? { ...section, ...updates } : section
          ),
        }));

        get().autoSave();
      },

      deleteSection: (sectionId) => {
        set((state) => ({
          sections: state.sections.filter(
            (section) => section.id !== sectionId
          ),
          selectedSectionId:
            state.selectedSectionId === sectionId
              ? null
              : state.selectedSectionId,
        }));

        get().autoSave();
      },

      setSelectedSectionId: (id) => {
        set({ selectedSectionId: id, showPropertyPanel: false });
      },

      togglePreviewMode: () => {
        set((state) => ({ previewMode: !state.previewMode }));
      },

      updateGlobalStyles: (styles) => {
        set((state) => ({
          globalStyles: { ...state.globalStyles, ...styles },
        }));

        get().autoSave();
      },

      autoSave: () => {
        const { autoSaveTimer } = get();

        // Clear existing timer if it exists
        if (autoSaveTimer) {
          clearTimeout(autoSaveTimer);
        }

        // Set new timer
        const newTimer = setTimeout(() => {
          // Set isAutoSaving to true when actually saving
          set({ isAutoSaving: true });

          const { sections, globalStyles } = get();
          const config = {
            version: "2.0",
            timestamp: new Date().toISOString(),
            sections,
            globalStyles,
          };

          try {
            localStorage.setItem(
              "website-builder-autosave",
              JSON.stringify(config)
            );

            // Hide the saving indicator after 0.5 second
            setTimeout(() => {
              set({ isAutoSaving: false });
            }, 500);
          } catch (error) {
            console.error("Auto-save failed:", error);
            // Hide the indicator immediately if save fails
            set({ isAutoSaving: false });
          }
        }, 500); // 500ms debounce delay

        // Store the new timer
        set({ autoSaveTimer: newTimer });
      },

      // Clean up timer when store is destroyed
      cleanup: () => {
        const { autoSaveTimer } = get();
        if (autoSaveTimer) {
          clearTimeout(autoSaveTimer);
          set({ autoSaveTimer: null });
        }
      },

      moveSection: (activeId, overId) => {
        if (activeId === overId) return;

        const { sections } = get();
        const oldIndex = sections.findIndex((item) => item.id === activeId);
        const newIndex = sections.findIndex((item) => item.id === overId);

        const newSections = arrayMove(sections, oldIndex, newIndex).map(
          (section, index) => ({
            ...section,
            order: index,
          })
        );

        set({ sections: newSections });

        get().autoSave();
      },

      exportConfig: () => {
        const { sections, globalStyles } = get();
        const config = {
          version: "2.0",
          timestamp: new Date().toISOString(),
          sections,
          globalStyles,
          metadata: {
            title: "My Website",
            description: "Created with Website Builder",
            totalSections: sections.length,
          },
        };

        const dataStr = JSON.stringify(config, null, 2);
        const dataUri =
          "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

        const exportFileDefaultName = `website-${
          new Date().toISOString().split("T")[0]
        }.json`;

        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
      },

      importConfig: async (file: File): Promise<boolean> => {
        try {
          const fileContent = await readFileAsText(file);
          const config = JSON.parse(fileContent);

          if (!config.sections || !Array.isArray(config.sections)) {
            throw new Error(
              "Invalid configuration format: missing sections array"
            );
          }

          // Validate each section has required fields
          const isValid = config.sections.every(
            (section: Section) => section.id && section.type && section.content
          );

          if (!isValid) {
            throw new Error("Invalid section format in configuration");
          }

          const newSections = config.sections.map(
            (section: Section, index: number) => ({
              ...section,
              order: index, // Ensure proper ordering
            })
          );

          set({
            sections: newSections,
            globalStyles: config.globalStyles || get().globalStyles,
            selectedSectionId: null,
          });

          return true; // Success
        } catch (error) {
          console.error("Import failed:", error);
          throw error; // Re-throw for error handling in components
        }
      },

      resetImportInput: () => {
        // This can be used to reset any UI state related to file input, if needed.
        // For now, it's a no-op.
      },

      togglePropertyPanel: () =>
        set({ showPropertyPanel: !get().showPropertyPanel }),

      setDeviceScreen: (screen) => set({ deviceScreen: screen }),

      loadTemplate: (template) => {
        try {
          if (
            !template ||
            !template.sections ||
            !Array.isArray(template.sections)
          ) {
            throw new Error("Invalid template format: missing sections array");
          }

          const isValid = template.sections.every(
            (section: Section) => section.id && section.type && section.content
          );

          if (!isValid) {
            throw new Error("Invalid section format in template");
          }

          const newSections = template.sections.map(
            (section: Section, index: number) => ({
              ...section,
              id: `section-${Date.now()}-${Math.random()
                .toString(36)
                .substr(2, 9)}-${index}`,
              order: index,
            })
          );

          set({
            sections: newSections,
            globalStyles: template.globalStyles || get().globalStyles,
            selectedSectionId: null,
          });

          get().autoSave();

          console.log("Template loaded successfully");
        } catch (error) {
          console.error("Failed to load template:", error);
          throw error;
        }
      },
    }),
    {
      name: "builder-store",
      storage: createJSONStorage(() => {
        // Return a safe storage that works on both server and client
        if (typeof window === "undefined") {
          // Server-side: return a no-op storage
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }
        // Client-side: return localStorage
        return localStorage;
      }),
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["autoSaveTimer"].includes(key)
          )
        ) as BuilderState,
      skipHydration: typeof window === "undefined",
    }
  )
);
