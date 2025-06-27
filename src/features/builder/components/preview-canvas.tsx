import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/use-builder-store";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Sparkles } from "lucide-react";
import { useCallback, useState } from "react";
import { Section } from "../types";
import { SectionRenderer } from "./section-renderer";
import { SortableItem } from "./sortable-item";

interface PreviewCanvasProps {
  sections: Section[];
  selectedSectionId: string | null;
  previewMode: boolean;
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
  onSelectSection: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
}

export function PreviewCanvas({
  sections,
  selectedSectionId,
  previewMode,
  globalStyles,
  onSelectSection,
  onDeleteSection,
}: PreviewCanvasProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { deviceScreen, moveSection } = useBuilderStore();
  const isMobile = useIsMobile();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);

      if (!over || active.id === over.id) return;

      moveSection(String(active.id), String(over.id));
    },
    [moveSection]
  );

  const handleDragEndLocal = useCallback(
    (event: DragEndEvent) => {
      setActiveId(null);
      handleDragEnd(event);
    },
    [handleDragEnd]
  );

  const deviceStyles = {
    monitor: "w-full max-w-[1440px] mx-auto",
    tablet: "w-[768px] h-[1024px] mx-auto",
    mobile: "w-[375px] h-[612px] mx-auto",
  };

  const deviceFrameStyles = {
    tablet:
      "overflow-hidden bg-gray-100 rounded-[2.5rem] shadow-xl border-8 border-gray-800",
    mobile:
      "overflow-hidden bg-gray-100 rounded-[2rem] shadow-xl border-6 border-gray-800",
    monitor: "",
  };

  if (sections.length === 0 && !previewMode) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-4">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-12 h-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-4">
            Create Your Masterpiece
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm leading-relaxed">
            Start building your website by adding sections from the library. Mix
            and match different components to create something unique.
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-blue-50 p-4 rounded-xl">
            <div className="text-xs text-gray-600 space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Click sections in the library to add them</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Drag and drop to reorder</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Click to edit properties</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        isMobile ? "p-0" : "p-4",
        "min-h-screen flex justify-center items-start"
      )}
    >
      <div
        className={cn(
          deviceStyles[deviceScreen],
          previewMode && deviceScreen !== "monitor"
            ? deviceFrameStyles[deviceScreen]
            : "",
          "transition-all duration-300",
          previewMode ? "shadow-none" : "shadow-2xl rounded-xl"
        )}
      >
        <div
          className={cn(
            "bg-white overflow-y-auto",
            previewMode ? "border-none" : "border-2 border-gray-200 rounded-xl",
            deviceScreen !== "monitor" ? "h-full" : ""
          )}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEndLocal}
          >
            <SortableContext
              items={sections}
              strategy={verticalListSortingStrategy}
            >
              <div
                className={cn(
                  "space-y-0 p-0",
                  !previewMode &&
                    "space-y-4 p-4 border-2 border-dashed border-gray-300 bg-white/50 backdrop-blur-sm rounded-xl"
                )}
              >
                {[...sections]
                  .sort((a, b) => a.order - b.order)
                  .map((section) => (
                    <SortableItem
                      key={section.id}
                      id={section.id}
                      section={section}
                      selectedSectionId={selectedSectionId}
                      globalStyles={globalStyles}
                      onSelectSection={onSelectSection}
                      onDeleteSection={onDeleteSection}
                      previewMode={previewMode}
                    />
                  ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId && !previewMode ? (
                <div className="opacity-80 scale-105 shadow-2xl">
                  <SectionRenderer
                    section={sections.find((s) => s.id === activeId)!}
                    isSelected={false}
                    previewMode={false}
                    globalStyles={globalStyles}
                    deviceScreen={deviceScreen}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
