"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/use-builder-store";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PropertiesPanel } from "../properties-panel";
import { ToolsSidebar } from "../sidebar/tools-sidebar";
import { CTAHeaderActions } from "./cta-header-actions";
import { DeviceSwitcher } from "./device-switcher";
import { SavingIndicator } from "./saving-indicator";

export const BuilderHeader = () => {
  const togglePropertyPanel = useBuilderStore(
    (state) => state.togglePropertyPanel
  );

  const [openToolsSidebar, setOpenToolsSidebar] = useState(false);

  const isMobile = useIsMobile();

  const {
    selectedSectionId,
    previewMode,
    sections,
    updateSection,
    deleteSection,
    globalStyles,
    showPropertyPanel,
    addSection,
  } = useBuilderStore();

  const selectedSection = sections.find((s) => s.id === selectedSectionId);
  return (
    <>
      <header className="h-14 fixed z-50 inset-0 w-full flex items-center bg-background border-b">
        <div className="container mx-auto md:px-8 px-2">
          <div
            className={cn(
              isMobile && "justify-between gap-4",
              "flex items-center "
            )}
          >
            {/* LOGO */}
            {!isMobile && (
              <Link href="/" className="flex-1 uppercase">
                Rekaz
              </Link>
            )}

            {isMobile && (
              <Button
                onClick={() => setOpenToolsSidebar(true)}
                variant="outline"
                size={"icon"}
              >
                <PanelRightClose className="w-4 h-4" />
              </Button>
            )}

            {/* Device switcher */}
            {!isMobile && <DeviceSwitcher />}

            {/* CTA header actions */}
            <div className="flex flex-1 justify-end items-center gap-4">
              <div className="flex items-center gap-3">
                <SavingIndicator />
                <CTAHeaderActions />
              </div>
              {selectedSectionId && !previewMode && !isMobile && (
                <Button onClick={togglePropertyPanel} variant="outline">
                  <PanelRightOpen />
                </Button>
              )}

              {isMobile && (
                <Button onClick={togglePropertyPanel} variant="outline">
                  <PanelRightOpen />
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      <Sheet
        open={isMobile && showPropertyPanel && !!selectedSection}
        onOpenChange={togglePropertyPanel}
      >
        <SheetContent>
          <PropertiesPanel
            section={selectedSection!}
            onUpdateSection={updateSection}
            onDeleteSection={deleteSection}
            globalStyles={globalStyles}
          />
        </SheetContent>
      </Sheet>

      <Sheet open={openToolsSidebar} onOpenChange={setOpenToolsSidebar}>
        <SheetContent side="left">
          <ToolsSidebar onAddSection={addSection} insideSheet={true} />
        </SheetContent>
      </Sheet>
    </>
  );
};
