import {
  BuilderState,
  GlobalStyles,
  HistoryState,
  Section,
} from "@/features/builder/types";
import { getDefaultContent, readFileAsText } from "@/features/builder/utils";
import { arrayMove } from "@dnd-kit/sortable";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type BuilderStore = BuilderState & {
  isAutoSaving: boolean;
  deviceScreen: "mobile" | "tablet" | "monitor";
  // Actions
  addSection: (sectionType: string) => void;
  updateSection: (sectionId: string, updates: Partial<Section>) => void;
  deleteSection: (sectionId: string) => void;
  setSelectedSectionId: (id: string | null) => void;
  togglePreviewMode: () => void;
  updateGlobalStyles: (styles: Partial<GlobalStyles>) => void;
  // History actions
  saveToHistory: () => void;
  undo: () => void;
  redo: () => void;
  // Auto-save
  autoSave: () => void;
  moveSection: (activeId: string, overId: string) => void;
  exportConfig: () => void;
  importConfig: (file: File) => Promise<boolean>;
  resetImportInput: () => void;
  togglePropertyPanel: () => void;
  setDeviceScreen: (screen: "mobile" | "tablet" | "monitor") => void;
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
  history: [],
  historyIndex: -1,
  showPropertyPanel: true,
};

export const useBuilderStore = create<BuilderStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      isAutoSaving: false,
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

        get().saveToHistory();
        get().autoSave();
      },

      updateSection: (sectionId, updates) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId ? { ...section, ...updates } : section
          ),
        }));
        get().saveToHistory();
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
        get().saveToHistory();
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
        get().saveToHistory();
        get().autoSave();
      },

      saveToHistory: () => {
        const { sections, globalStyles, history, historyIndex } = get();
        const historyEntry: HistoryState = {
          sections,
          globalStyles,
          timestamp: Date.now(),
        };

        set({
          history: [...history.slice(0, historyIndex + 1), historyEntry].slice(
            -50
          ),
          historyIndex: Math.min(historyIndex + 1, 49),
        });
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex <= 0) return;

        const previousState = history[historyIndex - 1];
        set({
          ...previousState,
          historyIndex: historyIndex - 1,
        });
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex >= history.length - 1) return;

        const nextState = history[historyIndex + 1];
        set({
          ...nextState,
          historyIndex: historyIndex + 1,
        });
      },

      autoSave: () => {
        // Set isAutoSaving to true immediately
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
        get().saveToHistory();
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

          get().saveToHistory();
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
    }),
    {
      name: "builder-store", // name for the localStorage key
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !["history", "historyIndex"].includes(key)
          )
        ) as BuilderState, // Only persist non-history state
    }
  )
);
