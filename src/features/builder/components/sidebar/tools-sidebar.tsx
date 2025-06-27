"use client";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sectionTemplates, templates } from "@/constant";
import { useBuilderStore } from "@/stores/use-builder-store";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SectionTemplate, Template } from "../../types";
import { SectionLibrary } from "./section-librray";
import { StyleLibrary } from "./style-library";
import { TemplateLibrary } from "./template-library";

const properties = ["Sections", "Templates", "Styles"];

interface ToolsSidebarProps {
  onAddSection: (sectionType: string) => void;
}

export const ToolsSidebar = ({ onAddSection }: ToolsSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanel, setActivePanel] = useState<
    "Sections" | "Templates" | "Styles"
  >("Sections");

  const globalStyles = useBuilderStore((state) => state.globalStyles);
  const updateGlobalStyles = useBuilderStore(
    (state) => state.updateGlobalStyles
  );
  const loadTemplate = useBuilderStore((state) => state.loadTemplate);

  const getFilteredResult = (
    activePanel: "Sections" | "Templates" | "Styles"
  ) => {
    let matchesSearch;
    if (activePanel === "Sections") {
      matchesSearch = sectionTemplates.filter((section) => {
        return (
          section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          section.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    } else if (activePanel === "Templates") {
      matchesSearch = templates.filter((template) => {
        return (
          template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }
    return matchesSearch;
  };

  const handleLoadTemplate = (template: Template) => {
    try {
      loadTemplate(template);
      toast.success("Template loaded successfully!");
    } catch (error) {
      console.log("Error while loading template:", error);
      toast.error("Failed to load template. Please try again.");
    }
  };

  const renderSidebar = () => {
    switch (activePanel) {
      case "Templates":
        return (
          <motion.div
            key="templates"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TemplateLibrary
              onLoadTemplate={handleLoadTemplate}
              filteredTemplates={getFilteredResult("Templates") as Template[]}
            />
          </motion.div>
        );
      case "Styles":
        return (
          <motion.div
            key="styles"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <StyleLibrary
              globalStyles={globalStyles}
              onUpdateGlobalStyles={updateGlobalStyles}
            />
          </motion.div>
        );
      default:
        return (
          <motion.div
            key="sections"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SectionLibrary
              onAddSection={onAddSection}
              filteredSections={
                getFilteredResult("Sections") as SectionTemplate[]
              }
            />
          </motion.div>
        );
    }
  };

  return (
    <aside className="w-[400px] fixed inset-0 h-screen backdrop-blur-sm p-4 mt-14 bg-background border-r">
      <div className="flex gap-y-4 flex-col">
        {/* Property selector */}
        <Select
          defaultValue="Sections"
          onValueChange={(value) => {
            setActivePanel(value as "Sections" | "Templates" | "Styles");
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Property" className="" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              {properties.map((property) => (
                <SelectItem key={property} value={property}>
                  {property}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Search */}
        {activePanel !== "Styles" && (
          <div className="space-y-4">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search sections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 mt-4 overflow-y-auto h-[502px]">
        <AnimatePresence mode="wait">{renderSidebar()}</AnimatePresence>
      </ScrollArea>
    </aside>
  );
};
