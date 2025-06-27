import { SectionTemplate, Template } from "@/features/builder/types";
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

export const templates: Template[] = [
  {
    id: "business-modern",
    name: "Modern Business",
    description: "Clean and professional design for modern businesses",
    category: "Business",
    preview: "Header + Hero + Services + Footer",
    featured: true,
    sections: [
      {
        id: "header-1",
        type: "header",
        title: "Navigation Header",
        content: {
          logo: "ModernCorp",
          navigation: ["Home", "Services", "About", "Contact"],
        },
        order: 0,
        styles: { backgroundColor: "#FFFFFF", padding: "1rem" },
      },
      {
        id: "hero-1",
        type: "hero",
        title: "Hero Section",
        content: {
          title: "Transform Your Business Today",
          subtitle:
            "We help companies grow with innovative solutions and cutting-edge technology",
          buttonText: "Get Started",
          buttonLink: "#contact",
          backgroundImage:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=600&fit=crop",
        },
        order: 1,
        styles: { backgroundColor: "transparent", padding: "2rem" },
      },
      {
        id: "content-1",
        type: "content",
        title: "Services Section",
        content: {
          title: "Our Services",
          text: "We provide comprehensive business solutions to help you succeed in today's competitive market.",
        },
        order: 2,
        styles: { backgroundColor: "#F8FAFC", padding: "2rem" },
      },
      {
        id: "footer-1",
        type: "footer",
        title: "Footer",
        content: {
          copyright: "© 2024 ModernCorp. All rights reserved.",
          links: ["Privacy", "Terms", "Support"],
        },
        order: 3,
        styles: { backgroundColor: "#1F2937", padding: "2rem" },
      },
    ],
    globalStyles: {
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      fontFamily: "Inter",
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "portfolio-creative",
    name: "Creative Portfolio",
    description: "Showcase your work with this artistic portfolio template",
    category: "Portfolio",
    preview: "Header + Hero + Gallery + Footer",
    sections: [
      {
        id: "header-2",
        type: "header",
        title: "Creative Header",
        content: {
          logo: "Creative Studio",
          navigation: ["Work", "About", "Services", "Contact"],
        },
        order: 0,
        styles: { backgroundColor: "#0F172A", padding: "1.5rem" },
      },
      {
        id: "hero-2",
        type: "hero",
        title: "Creative Hero",
        content: {
          title: "Creative Solutions",
          subtitle:
            "Bringing your ideas to life through innovative design and development",
          buttonText: "View Portfolio",
          buttonLink: "#work",
          backgroundImage:
            "https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&h=600&fit=crop",
        },
        order: 1,
        styles: { backgroundColor: "transparent", padding: "2rem" },
      },
      {
        id: "gallery-1",
        type: "gallery",
        title: "Portfolio Gallery",
        content: {
          title: "Featured Work",
          images: [
            "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=300&fit=crop",
            "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=400&h=300&fit=crop",
          ],
        },
        order: 2,
        styles: { backgroundColor: "#F1F5F9", padding: "2rem" },
      },
      {
        id: "footer-2",
        type: "footer",
        title: "Creative Footer",
        content: {
          copyright: "© 2024 Creative Studio. All rights reserved.",
          links: ["Instagram", "Behance", "LinkedIn"],
        },
        order: 3,
        styles: { backgroundColor: "#0F172A", padding: "2rem" },
      },
    ],
    globalStyles: {
      primaryColor: "#8B5CF6",
      secondaryColor: "#F59E0B",
      fontFamily: "Inter",
      backgroundColor: "#FFFFFF",
    },
  },
  {
    id: "startup-minimal",
    name: "Minimal Startup",
    description: "Clean and minimal design perfect for startups",
    category: "Startup",
    preview: "Header + Hero + Content + Footer",
    featured: true,
    sections: [
      {
        id: "header-3",
        type: "header",
        title: "Minimal Header",
        content: {
          logo: "StartupCo",
          navigation: ["Product", "Pricing", "About", "Contact"],
        },
        order: 0,
        styles: { backgroundColor: "#FFFFFF", padding: "1rem" },
      },
      {
        id: "hero-3",
        type: "hero",
        title: "Startup Hero",
        content: {
          title: "Build Something Amazing",
          subtitle:
            "The fastest way to build and launch your startup with our comprehensive platform",
          buttonText: "Start Building",
          buttonLink: "#signup",
          backgroundImage:
            "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&h=600&fit=crop",
        },
        order: 1,
        styles: { backgroundColor: "transparent", padding: "2rem" },
      },
      {
        id: "content-2",
        type: "content",
        title: "Features Section",
        content: {
          title: "Why Choose Us?",
          text: "We provide all the tools and resources you need to build, launch, and scale your startup successfully.",
        },
        order: 2,
        styles: { backgroundColor: "#FAFAFA", padding: "2rem" },
      },
      {
        id: "footer-3",
        type: "footer",
        title: "Startup Footer",
        content: {
          copyright: "© 2024 StartupCo. All rights reserved.",
          links: ["Privacy", "Terms", "Help"],
        },
        order: 3,
        styles: { backgroundColor: "#111827", padding: "2rem" },
      },
    ],
    globalStyles: {
      primaryColor: "#059669",
      secondaryColor: "#DC2626",
      fontFamily: "Inter",
      backgroundColor: "#FFFFFF",
    },
  },
];

export const colorPalettes = [
  {
    name: "Ocean Blue",
    primary: "#0EA5E9",
    secondary: "#06B6D4",
    background: "#F0F9FF",
  },
  {
    name: "Purple Magic",
    primary: "#8B5CF6",
    secondary: "#A855F7",
    background: "#FAF5FF",
  },
  {
    name: "Forest Green",
    primary: "#059669",
    secondary: "#10B981",
    background: "#F0FDF4",
  },
  {
    name: "Sunset Orange",
    primary: "#EA580C",
    secondary: "#F97316",
    background: "#FFF7ED",
  },
  {
    name: "Rose Pink",
    primary: "#E11D48",
    secondary: "#F43F5E",
    background: "#FFF1F2",
  },
  {
    name: "Midnight Dark",
    primary: "#1E293B",
    secondary: "#334155",
    background: "#F8FAFC",
  },
];

export const fontOptions = [
  { name: "Inter", value: "Inter" },
  { name: "Roboto", value: "Roboto" },
  { name: "Open Sans", value: "Open Sans" },
  { name: "Poppins", value: "Poppins" },
  { name: "Montserrat", value: "Montserrat" },
  { name: "Playfair Display", value: "Playfair Display" },
];
