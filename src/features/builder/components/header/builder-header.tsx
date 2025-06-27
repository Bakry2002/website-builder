"use client";

import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/use-builder-store";
import { ListCollapseIcon } from "lucide-react";
import { CTAHeaderActions } from "./cta-header-actions";
import { DeviceSwitcher } from "./device-switcher";
import { SavingIndicator } from "./saving-indicator";

export const BuilderHeader = () => {
  const togglePropertyPanel = useBuilderStore(
    (state) => state.togglePropertyPanel
  );

  const { selectedSectionId, previewMode } = useBuilderStore();
  return (
    <header className="h-14 fixed z-50 inset-0 w-full flex items-center bg-background border-b">
      <div className="container mx-auto px-8">
        <div className="flex items-center gap-4">
          {/* LOGO */}
          <div>LOGO</div>

          {/* Device switcher */}
          <DeviceSwitcher />

          {/* CTA header actions */}
          <CTAHeaderActions />

          {selectedSectionId && !previewMode && (
            <Button onClick={togglePropertyPanel} variant="outline">
              <ListCollapseIcon />
            </Button>
          )}

          <SavingIndicator />
        </div>
      </div>
    </header>
  );
};
