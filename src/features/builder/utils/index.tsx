// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDefaultContent(sectionType: string): Record<string, any> {
  const defaults = {
    hero: {
      title: "Welcome to Our Website",
      subtitle:
        "Build something amazing with our tools and create stunning experiences",
      buttonText: "Get Started",
      buttonLink: "#",
      backgroundImage:
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
    },
    header: {
      logo: "Your Logo",
      navigation: ["Home", "About", "Services", "Contact"],
    },
    footer: {
      copyright: "© 2024 Your Company. All rights reserved.",
      links: ["Privacy Policy", "Terms of Service", "Contact"],
    },
    content: {
      title: "Content Section",
      text: "Add your content here. You can edit this text in the properties panel to create engaging and informative content for your visitors.",
    },
    gallery: {
      title: "Image Gallery",
      images: [
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
      ],
    },
  };

  return defaults[sectionType as keyof typeof defaults] || {};
}

export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
