import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { colorPalettes, fontOptions } from "@/constant";
import { Paintbrush, Sparkles, Zap } from "lucide-react";

interface StyleLibraryProps {
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
  onUpdateGlobalStyles: (
    styles: Partial<StyleLibraryProps["globalStyles"]>
  ) => void;
}

export function StyleLibrary({
  globalStyles,
  onUpdateGlobalStyles,
}: StyleLibraryProps) {
  const applyColorPalette = (palette: (typeof colorPalettes)[0]) => {
    onUpdateGlobalStyles({
      primaryColor: palette.primary,
      secondaryColor: palette.secondary,
      backgroundColor: palette.background,
    });
  };

  return (
    <Tabs
      defaultValue="basics"
      className="space-y-4 h-full flex flex-col pl-2 pr-4"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          value="basics"
          className="flex cursor-pointer items-center space-x-2"
        >
          <Paintbrush className="w-4 h-4" />
          <span>Basics</span>
        </TabsTrigger>
        <TabsTrigger
          value="themes"
          className="flex cursor-pointer items-center space-x-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Themes</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="basics">
        <div className="space-y-4">
          <Card className="p-4 gap-3">
            <CardHeader className="p-0">
              <CardTitle className="text-sm">Color Scheme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-0">
              <div>
                <Label htmlFor="primary-color">Primary Color</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="primary-color"
                    type="color"
                    value={globalStyles.primaryColor}
                    onChange={(e) =>
                      onUpdateGlobalStyles({ primaryColor: e.target.value })
                    }
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={globalStyles.primaryColor}
                    onChange={(e) =>
                      onUpdateGlobalStyles({ primaryColor: e.target.value })
                    }
                    className="flex-1"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="secondary-color">Secondary Color</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="secondary-color"
                    type="color"
                    value={globalStyles.secondaryColor}
                    onChange={(e) =>
                      onUpdateGlobalStyles({
                        secondaryColor: e.target.value,
                      })
                    }
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={globalStyles.secondaryColor}
                    onChange={(e) =>
                      onUpdateGlobalStyles({
                        secondaryColor: e.target.value,
                      })
                    }
                    className="flex-1"
                    placeholder="#10B981"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex space-x-2 mt-1">
                  <Input
                    id="bg-color"
                    type="color"
                    value={globalStyles.backgroundColor}
                    onChange={(e) =>
                      onUpdateGlobalStyles({
                        backgroundColor: e.target.value,
                      })
                    }
                    className="w-16 h-10 p-1 border rounded"
                  />
                  <Input
                    value={globalStyles.backgroundColor}
                    onChange={(e) =>
                      onUpdateGlobalStyles({
                        backgroundColor: e.target.value,
                      })
                    }
                    className="flex-1"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="p-4 gap-3">
            <CardHeader className="p-0">
              <CardTitle className="text-sm">Font Settings</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div>
                <Label htmlFor="font-family">Font Family</Label>
                <Select
                  value={globalStyles.fontFamily}
                  onValueChange={(value) =>
                    onUpdateGlobalStyles({ fontFamily: value })
                  }
                >
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>
                          {font.name}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="themes">
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Quick Color Palettes
          </h3>
          {colorPalettes.map((palette) => (
            <Card
              key={palette.name}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] border-2 hover:border-purple-200"
              onClick={() => applyColorPalette(palette)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div
                      className="w-8 h-8 rounded-full shadow-sm"
                      style={{ backgroundColor: palette.primary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full shadow-sm"
                      style={{ backgroundColor: palette.secondary }}
                    />
                    <div
                      className="w-8 h-8 rounded-full shadow-sm border"
                      style={{ backgroundColor: palette.background }}
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">
                      {palette.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {palette.primary} • {palette.secondary}
                    </p>
                  </div>

                  <Button size="sm" variant="ghost">
                    Apply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
