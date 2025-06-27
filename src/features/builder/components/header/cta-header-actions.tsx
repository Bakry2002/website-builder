"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBuilderStore } from "@/stores/use-builder-store";
import { DownloadIcon, EditIcon, EyeIcon, UploadIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
export const CTAHeaderActions = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    previewMode,
    togglePreviewMode,
    importConfig,
    exportConfig,
    sections,
  } = useBuilderStore();
  const isMobile = useIsMobile();

  const handleImport = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      try {
        const success = await importConfig(file);
        if (success) {
          toast.success("Design imported successfully!");
        }
      } catch (error) {
        toast.error("Error importing design.");
        console.log("error while importing design", error);
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    },
    [importConfig]
  );

  const handleExport = useCallback(async () => {
    try {
      await exportConfig();
      toast.success("Design exported successfully!");
    } catch (error) {
      toast.error("Error exporting design.");
      console.log("error while exporting design", error);
    }
  }, [exportConfig]);

  return (
    <div className="flex items-center gap-3">
      {sections.length > 0 && (
        <Button variant={"outline"} onClick={() => togglePreviewMode()}>
          {previewMode ? (
            <EditIcon className="w-4 h-4" />
          ) : (
            <EyeIcon className="w-4 h-4" />
          )}
          {!isMobile ? (previewMode ? "Edit" : "Preview") : ""}
        </Button>
      )}

      <Button variant={"outline"} onClick={handleExport}>
        <DownloadIcon className="w-4 h-4" />
        {!isMobile && "Export"}
      </Button>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImport}
      />
      <Button variant={"outline"} onClick={() => fileInputRef.current?.click()}>
        <UploadIcon className="w-4 h-4" />
        {!isMobile && "Import"}
      </Button>
    </div>
  );
};
