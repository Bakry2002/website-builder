"use client";

import { Button } from "@/components/ui/button";
import { useBuilderStore } from "@/stores/use-builder-store";
import { EyeIcon, ImportIcon } from "lucide-react";
import { useCallback, useRef } from "react";
import { toast } from "sonner";
export const CTAHeaderActions = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewMode, togglePreviewMode, importConfig, exportConfig } =
    useBuilderStore();

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
      <Button variant={"outline"} onClick={() => togglePreviewMode()}>
        <EyeIcon className="w-4 h-4" />
        {previewMode ? "Edit" : "Preview"}
      </Button>

      {}
      <Button variant={"outline"} onClick={handleExport}>
        <EyeIcon className="w-4 h-4" />
        Export
      </Button>

      <input
        type="file"
        accept=".json"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleImport}
      />
      <Button variant={"outline"} onClick={() => fileInputRef.current?.click()}>
        <ImportIcon className="w-4 h-4" />
        Import
      </Button>
    </div>
  );
};
