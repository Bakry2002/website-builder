import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/use-builder-store";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Trash2 } from "lucide-react";
import { GlobalStyles, Section } from "../types";
import { SectionRenderer } from "./section-renderer";

export function SortableItem({
  id,
  section,
  selectedSectionId,
  globalStyles,
  onSelectSection,
  onDeleteSection,
  previewMode,
}: {
  id: string;
  section: Section;
  selectedSectionId: string | null;
  globalStyles: GlobalStyles;
  onSelectSection: (id: string) => void;
  onDeleteSection: (id: string) => void;
  previewMode: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} className="group relative">
      <div
        className={`relative ${
          previewMode
            ? ""
            : "border-2 rounded-xl overflow-hidden transition-all duration-300"
        } ${
          selectedSectionId === section.id && !previewMode
            ? "border-purple-500 shadow-xl shadow-purple-100 ring-4 ring-purple-100"
            : previewMode
            ? ""
            : "border-gray-200 hover:border-gray-300 hover:shadow-lg"
        }`}
        onClick={() => !previewMode && onSelectSection(section.id)}
      >
        {!previewMode && (
          <div className="absolute top-3 right-3 z-10 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div
              {...attributes}
              {...listeners}
              className="bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg hover:bg-white cursor-grab transition-all duration-200 hover:scale-110"
            >
              <GripVertical className="w-4 h-4 text-gray-600" />
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteSection(section.id);
              }}
              className="bg-white/95 backdrop-blur-sm hover:bg-red-50 hover:text-red-600 shadow-lg transition-all duration-200 hover:scale-110"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        )}
        {!previewMode && selectedSectionId === section.id && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-lg">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span>{section.title}</span>
            </div>
          </div>
        )}
        <div
          className={previewMode ? "" : "bg-white rounded-xl overflow-hidden"}
        >
          <SectionRenderer
            section={section}
            isSelected={selectedSectionId === section.id}
            previewMode={previewMode}
            globalStyles={globalStyles}
            deviceScreen={useBuilderStore.getState().deviceScreen}
          />
        </div>
      </div>
    </div>
  );
}
