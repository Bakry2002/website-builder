"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Paintbrush, Settings, Trash2, Type } from "lucide-react";
import { useEffect, useState } from "react";
import { Section } from "../types";
import { ContentTab } from "./properties/content-tab";
import { StylingTab } from "./properties/styling-tab";

interface PropertiesPanelProps {
  section: Section;
  onUpdateSection: (sectionId: string, updates: Partial<Section>) => void;
  onDeleteSection: (sectionId: string) => void;
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
}

export function PropertiesPanel({
  section,
  onUpdateSection,
  onDeleteSection,
  globalStyles,
}: PropertiesPanelProps) {
  // These local states for the real-time updates not the ones in the store
  const [localContent, setLocalContent] = useState(section.content);
  const [localTitle, setLocalTitle] = useState(section.title);
  const [localStyles, setLocalStyles] = useState(section.styles || {});

  useEffect(() => {
    setLocalContent(section.content);
    setLocalTitle(section.title);
    setLocalStyles(section.styles || {});
  }, [section]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleContentChange = (key: string, value: any) => {
    const newContent = { ...localContent, [key]: value };
    setLocalContent(newContent);
    onUpdateSection(section.id, { content: newContent }); // This is the one that updates the store
  };

  const handleTitleChange = (newTitle: string) => {
    setLocalTitle(newTitle);
    onUpdateSection(section.id, { title: newTitle });
  };

  const handleArrayChange = (key: string, index: number, value: string) => {
    const array = [...(localContent[key] || [])];
    array[index] = value;
    handleContentChange(key, array);
  };

  const addArrayItem = (key: string, defaultValue: string = "") => {
    const array = [...(localContent[key] || [])];
    array.push(defaultValue);
    handleContentChange(key, array);
  };

  const removeArrayItem = (key: string, index: number) => {
    const array = [...(localContent[key] || [])];
    array.splice(index, 1);
    handleContentChange(key, array);
  };

  const renderSectionFields = () => {
    switch (section.type) {
      case "hero":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                value={localContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Enter hero title"
              />
            </div>
            <div>
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Textarea
                id="hero-subtitle"
                value={localContent.subtitle || ""}
                onChange={(e) =>
                  handleContentChange("subtitle", e.target.value)
                }
                placeholder="Enter hero subtitle"
                className="min-h-20"
              />
            </div>
            <div>
              <Label htmlFor="hero-button">Button Text</Label>
              <Input
                id="hero-button"
                value={localContent.buttonText || ""}
                onChange={(e) =>
                  handleContentChange("buttonText", e.target.value)
                }
                placeholder="Enter button text"
              />
            </div>
            <div>
              <Label htmlFor="hero-link">Button Link</Label>
              <Input
                id="hero-link"
                value={localContent.buttonLink || ""}
                onChange={(e) =>
                  handleContentChange("buttonLink", e.target.value)
                }
                placeholder="Enter button link"
              />
            </div>
            <div>
              <Label htmlFor="hero-bg">Background Image URL</Label>
              <Input
                id="hero-bg"
                value={localContent.backgroundImage || ""}
                onChange={(e) =>
                  handleContentChange("backgroundImage", e.target.value)
                }
                placeholder="Enter image URL"
              />
            </div>
          </div>
        );

      case "header":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="header-logo">Logo Text</Label>
              <Input
                id="header-logo"
                value={localContent.logo || ""}
                onChange={(e) => handleContentChange("logo", e.target.value)}
                placeholder="Enter logo text"
              />
            </div>
            <div>
              <Label>Navigation Items</Label>
              {(localContent.navigation || []).map(
                (item: string, index: number) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={item}
                      onChange={(e) =>
                        handleArrayChange("navigation", index, e.target.value)
                      }
                      placeholder="Navigation item"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("navigation", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("navigation", "Menu Item")}
                className="mt-2 w-full"
              >
                Add Navigation Item
              </Button>
            </div>
          </div>
        );

      case "content":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-title">Title</Label>
              <Input
                id="content-title"
                value={localContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Enter content title"
              />
            </div>
            <div>
              <Label htmlFor="content-text">Text</Label>
              <Textarea
                id="content-text"
                value={localContent.text || ""}
                onChange={(e) => handleContentChange("text", e.target.value)}
                placeholder="Enter content text"
                className="min-h-32"
              />
            </div>
          </div>
        );

      case "gallery":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="gallery-title">Title</Label>
              <Input
                id="gallery-title"
                value={localContent.title || ""}
                onChange={(e) => handleContentChange("title", e.target.value)}
                placeholder="Enter gallery title"
              />
            </div>
            <div>
              <Label>Images</Label>
              {(localContent.images || []).map(
                (image: string, index: number) => (
                  <div key={index} className="flex gap-2 mt-2">
                    <Input
                      value={image}
                      onChange={(e) =>
                        handleArrayChange("images", index, e.target.value)
                      }
                      placeholder="Image URL"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem("images", index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  addArrayItem(
                    "images",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
                  )
                }
                className="mt-2 w-full"
              >
                Add Image
              </Button>
            </div>
          </div>
        );

      case "footer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="footer-copyright">Copyright Text</Label>
              <Input
                id="footer-copyright"
                value={localContent.copyright || ""}
                onChange={(e) =>
                  handleContentChange("copyright", e.target.value)
                }
                placeholder="Enter copyright text"
              />
            </div>
            <div>
              <Label>Footer Links</Label>
              {(localContent.links || []).map((link: string, index: number) => (
                <div key={index} className="flex gap-2 mt-2">
                  <Input
                    value={link}
                    onChange={(e) =>
                      handleArrayChange("links", index, e.target.value)
                    }
                    placeholder="Footer link"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem("links", index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addArrayItem("links", "Link")}
                className="mt-2 w-full"
              >
                Add Link
              </Button>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p>No properties available for this section type.</p>
          </div>
        );
    }
  };

  // TODO: Render a section style for each section type.

  return (
    <TooltipProvider delayDuration={100}>
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
        <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4 md:mt-0 mt-5">
            <h3 className="text-lg font-semibold text-primary flex items-center">
              <Settings className="w-5 h-5 mr-2 text-blue-600" />
              Properties
            </h3>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDeleteSection(section.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Remove section</TooltipContent>
            </Tooltip>
          </div>

          <div>
            <Label htmlFor="section-title">Section Title</Label>
            <Input
              id="section-title"
              value={localTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Enter section title"
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <Tabs defaultValue="content" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="content"
                className="flex cursor-pointer items-center space-x-2"
              >
                <Type className="w-4 h-4" />
                <span>Content</span>
              </TabsTrigger>
              <TabsTrigger
                value="style"
                className="flex cursor-pointer items-center space-x-2"
              >
                <Paintbrush className="w-4 h-4" />
                <span>Style</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="content">
              <ContentTab
                section={section}
                renderSectionFields={renderSectionFields}
              />
            </TabsContent>

            <TabsContent value="style">
              <StylingTab
                localStyles={localStyles}
                setLocalStyles={setLocalStyles}
                section={section}
                onUpdateSection={onUpdateSection}
                globalStyles={globalStyles}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </TooltipProvider>
  );
}
