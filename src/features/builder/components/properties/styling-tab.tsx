"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useRef } from "react";
import { GlobalStyles, Section } from "../../types";

interface StylingTabProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localStyles: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setLocalStyles: any;
  section: Section;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  globalStyles: GlobalStyles;
}

export const StylingTab = ({
  localStyles,
  setLocalStyles,
  section,
  onUpdateSection,
  globalStyles,
}: StylingTabProps) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdateSection = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (styles: any) => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onUpdateSection(section.id, { styles });
      }, 100); // 100ms debounce
    },
    [section.id, onUpdateSection]
  );

  const handleStyleChange = useCallback(
    (key: string, value: string) => {
      const newStyles = { ...localStyles, [key]: value };
      setLocalStyles(newStyles);
      debouncedUpdateSection(newStyles);
    },
    [localStyles, setLocalStyles, debouncedUpdateSection]
  );

  const handleColorChange = useCallback(
    (key: string, value: string) => {
      const newStyles = { ...localStyles, [key]: value };
      setLocalStyles(newStyles);

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      debounceRef.current = setTimeout(() => {
        onUpdateSection(section.id, { styles: newStyles });
      }, 50);
    },
    [localStyles, setLocalStyles, section.id, onUpdateSection]
  );

  const getCurrentBackgroundColor = () => {
    return localStyles.backgroundColor || "#ffffff";
  };

  const getCurrentTextColor = () => {
    return localStyles.textColor || globalStyles.primaryColor || "#000000";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">
          Section Styling
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="bg-color">Background Color</Label>
          <div className="flex space-x-2 mt-1">
            <Input
              id="bg-color"
              type="color"
              value={getCurrentBackgroundColor()}
              onChange={(e) =>
                handleColorChange("backgroundColor", e.target.value)
              }
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              value={getCurrentBackgroundColor()}
              onChange={(e) =>
                handleColorChange("backgroundColor", e.target.value)
              }
              className="flex-1"
              placeholder="transparent"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="text-color">Text Color</Label>
          <div className="flex space-x-2 mt-1">
            <Input
              id="text-color"
              type="color"
              value={getCurrentTextColor()}
              onChange={(e) => handleColorChange("textColor", e.target.value)}
              className="w-16 h-10 p-1 border rounded"
            />
            <Input
              value={getCurrentTextColor()}
              onChange={(e) => handleColorChange("textColor", e.target.value)}
              className="flex-1"
              placeholder={globalStyles.primaryColor}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="padding">Padding</Label>
          <Input
            id="padding"
            value={localStyles.padding || ""}
            onChange={(e) => handleStyleChange("padding", e.target.value)}
            placeholder="2rem"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">
            e.g., 2rem, 16px, 1rem 2rem
          </p>
        </div>

        <div>
          <Label htmlFor="margin">Margin</Label>
          <Input
            id="margin"
            value={localStyles.margin || ""}
            onChange={(e) => handleStyleChange("margin", e.target.value)}
            placeholder="0"
            className="mt-1"
          />
          <p className="text-xs text-gray-500 mt-1">e.g., 0, 1rem, 1rem 0</p>
        </div>
      </CardContent>
    </Card>
  );
};
