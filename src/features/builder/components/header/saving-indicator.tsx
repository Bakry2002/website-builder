"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useBuilderStore } from "@/stores/use-builder-store";
import { Loader2 } from "lucide-react";

export const SavingIndicator = () => {
  const isAutoSaving = useBuilderStore((state) => state.isAutoSaving);

  return (
    <Badge
      variant="secondary"
      className={cn(!isAutoSaving && "invisible", "flex items-center gap-1")}
    >
      <Loader2 className="h-3 w-3 animate-spin" />
      Saving...
    </Badge>
  );
};
