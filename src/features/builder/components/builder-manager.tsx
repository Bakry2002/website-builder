"use client";

import { useBuilderStore } from "@/stores/use-builder-store";
import { useCallback, useState } from "react";
import { BuilderState, HistoryState } from "../types";
import { PreviewCanvas } from "./preview-canvas";
import { PropertiesPanel } from "./properties-panel";
import { ToolsSidebar } from "./sidebar/tools-sidebar";

const BuilderManager = () => {
  const {
    selectedSectionId,
    previewMode,
    globalStyles,
    addSection,
    updateSection,
    deleteSection,
    setSelectedSectionId,
    showPropertyPanel,
  } = useBuilderStore();
  const sections = useBuilderStore(useCallback((state) => state.sections, []));

  const [history, setHistory] = useState<HistoryState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Save to history for undo/redo
  const saveToHistory = useCallback(
    (newState: BuilderState) => {
      const historyEntry: HistoryState = {
        sections: newState.sections,
        globalStyles: newState.globalStyles,
        timestamp: Date.now(),
      };

      setHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(historyEntry);
        return newHistory.slice(-50);
      });
      setHistoryIndex((prev) => Math.min(prev + 1, 49));
    },
    [historyIndex]
  );

  // Auto-save functionality
  const autoSave = useCallback(() => {
    setIsAutoSaving(true);
    const config = {
      version: "2.0",
      timestamp: new Date().toISOString(),
      sections: sections,
      globalStyles: globalStyles,
    };
    localStorage.setItem("website-builder-autosave", JSON.stringify(config));
    setTimeout(() => setIsAutoSaving(false), 1000);
  }, [sections, globalStyles]);

  const selectedSection = sections.find((s) => s.id === selectedSectionId);

  return (
    <div className="flex items-center gap-4">
      <ToolsSidebar onAddSection={addSection} />

      {/* Canvas Area */}
      <div className="flex-1 ml-[400px] h-[calc(100vh-3.5rem)] mt-14 flex overflow-hidden">
        <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <PreviewCanvas
            sections={sections}
            selectedSectionId={selectedSectionId}
            previewMode={previewMode}
            globalStyles={globalStyles}
            onSelectSection={(id) =>
              setSelectedSectionId(id === selectedSectionId ? null : id)
            }
            onDeleteSection={deleteSection}
          />
        </div>

        {/* Enhanced Properties Panel */}
        {selectedSection && !previewMode && !showPropertyPanel ? (
          <div className="w-80 bg-white/80 backdrop-blur-sm border-l border-gray-200 overflow-auto">
            <PropertiesPanel
              section={selectedSection}
              onUpdateSection={updateSection}
              onDeleteSection={deleteSection}
              globalStyles={globalStyles}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BuilderManager;
