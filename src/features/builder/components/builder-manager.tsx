"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBuilderStore } from "@/stores/use-builder-store";
import { useCallback, useEffect, useState } from "react";
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
  const selectedSection = sections.find((s) => s.id === selectedSectionId);
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Wait for store to hydrate from localStorage
    const unsubscribe = useBuilderStore.persist.onFinishHydration(() => {
      setIsLoaded(true);
    });

    // If already hydrated, set loaded immediately
    if (useBuilderStore.persist.hasHydrated()) {
      setIsLoaded(true);
    }

    return unsubscribe;
  }, []);

  if (!isLoaded) {
    return (
      <div className="h-screen flex">
        <div className="w-80 border-r bg-gray-50 p-4">
          <Skeleton className="h-8 w-32 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      {!isMobile && <ToolsSidebar onAddSection={addSection} />}

      {/* Canvas Area */}
      <div className="flex-1 md:ml-[400px] h-[calc(100vh-3.5rem)] mt-14 flex overflow-hidden">
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

        {!isMobile && selectedSection && !previewMode && !showPropertyPanel ? (
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
