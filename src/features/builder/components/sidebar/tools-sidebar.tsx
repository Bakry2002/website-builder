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
import { sectionTemplates } from "@/constant";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { SectionLibrary } from "./section-librray";

const properties = ["Sections", "Templates", "Styles"];

interface ToolsSidebarProps {
  onAddSection: (sectionType: string) => void;
}

export const ToolsSidebar = ({ onAddSection }: ToolsSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activePanel, setActivePanel] = useState<
    "Sections" | "Templates" | "Styles"
  >("Sections");

  const filteredSections = sectionTemplates.filter((section) => {
    const matchesSearch =
      section.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

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
            <div className="p-4 text-center text-gray-500">
              Template panel coming soon
            </div>
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
            <div className="p-4 text-center text-gray-500">
              Style panel coming soon
            </div>
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
              filteredSections={filteredSections}
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
      </div>

      <ScrollArea className="flex-1 mt-4 overflow-y-auto h-[502px]">
        <AnimatePresence mode="wait">{renderSidebar()}</AnimatePresence>
      </ScrollArea>
    </aside>
  );
};
