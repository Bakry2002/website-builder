"use client";

import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/use-builder-store";
import { ListCollapseIcon } from "lucide-react";
import Link from "next/link";
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
        <div className="flex items-center justify-between gap-4">
          {/* LOGO */}
          <Link href="/" className="flex-1 uppercase">
            Rekaz
          </Link>

          {/* Device switcher */}
          <DeviceSwitcher />

          {/* CTA header actions */}
          <div className="flex flex-1 justify-end items-center gap-4">
            <div className="flex items-center gap-3">
              <SavingIndicator />
              <CTAHeaderActions />
            </div>
            {selectedSectionId && !previewMode && (
              <Button onClick={togglePropertyPanel} variant="outline">
                <ListCollapseIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
