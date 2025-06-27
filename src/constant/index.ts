import { SectionTemplate } from "@/features/builder/types";
import { ChevronDown, ImageIcon, Navigation, Star, Type } from "lucide-react";

export const sectionTemplates: SectionTemplate[] = [
  {
    id: "hero",
    name: "Hero Section",
    type: "hero",
    description: "Eye-catching header with title, subtitle, and call-to-action",
    icon: Star,
    category: "Headers",
    preview: "Large title with background image and button",
  },
  {
    id: "header",
    name: "Navigation Header",
    type: "header",
    description: "Top navigation bar with logo and menu items",
    icon: Navigation,
    category: "Headers",
    preview: "Logo and navigation menu",
  },
  {
    id: "content",
    name: "Content Block",
    type: "content",
    description: "Simple text content section with title and paragraph",
    icon: Type,
    category: "Content",
    preview: "Title and text content",
  },
  {
    id: "gallery",
    name: "Image Gallery",
    type: "gallery",
    description: "Responsive image gallery with grid layout",
    icon: ImageIcon,
    category: "Media",
    preview: "Grid of images",
  },
  {
    id: "footer",
    name: "Footer",
    type: "footer",
    description: "Bottom section with copyright and links",
    icon: ChevronDown,
    category: "Footers",
    preview: "Copyright and footer links",
  },
];
