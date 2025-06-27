import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { GlobalStyles, Section } from "../types";

interface SectionRendererProps {
  section: Section;
  isSelected: boolean;
  previewMode: boolean;
  globalStyles: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    backgroundColor: string;
  };
  deviceScreen: "monitor" | "tablet" | "mobile";
}

export function SectionRenderer({
  section,
  isSelected,
  previewMode,
  globalStyles,
  deviceScreen,
}: SectionRendererProps) {
  const renderSection = () => {
    switch (section.type) {
      case "hero":
        return (
          <HeroSection
            section={section}
            globalStyles={globalStyles}
            deviceScreen={deviceScreen}
          />
        );
      case "header":
        return (
          <HeaderSection
            section={section}
            globalStyles={globalStyles}
            deviceScreen={deviceScreen}
          />
        );
      case "footer":
        return (
          <FooterSection
            section={section}
            globalStyles={globalStyles}
            deviceScreen={deviceScreen}
          />
        );
      case "content":
        return (
          <ContentSection
            section={section}
            globalStyles={globalStyles}
            deviceScreen={deviceScreen}
          />
        );
      case "gallery":
        return (
          <GallerySection
            section={section}
            globalStyles={globalStyles}
            deviceScreen={deviceScreen}
          />
        );
      default:
        return <DefaultSection section={section} deviceScreen={deviceScreen} />;
    }
  };

  const sectionStyle = {
    backgroundColor: section.styles?.backgroundColor || "transparent",
    color: section.styles?.textColor || globalStyles.primaryColor,
    padding: section.styles?.padding || "0",
    margin: section.styles?.margin || "0",
    fontFamily: globalStyles.fontFamily,
  };

  return (
    <div
      className={cn(
        !previewMode && isSelected ? "ring-2 ring-blue-500" : "",
        "transition-all duration-200 w-full",
        deviceScreen === "monitor" && "p-2"
      )}
      style={{
        ...sectionStyle,
        padding: deviceScreen === "monitor" ? section.styles?.padding : "0px",
      }}
    >
      {renderSection()}
    </div>
  );
}

function HeroSection({
  section,
  globalStyles,
  deviceScreen,
}: {
  section: Section;
  globalStyles: GlobalStyles;
  deviceScreen: "monitor" | "tablet" | "mobile";
}) {
  const { title, subtitle, buttonText, backgroundImage } = section.content;

  const heroStyles = {
    monitor: {
      height: "24rem",
      titleSize: "text-5xl",
      subtitleSize: "text-lg",
      padding: "1.5rem",
      buttonSize: "lg",
      buttonPx: "px-8",
      buttonPy: "py-3",
    },
    tablet: {
      height: "20rem",
      titleSize: "text-3xl",
      subtitleSize: "text-base",
      padding: "1rem",
      buttonSize: "default",
      buttonPx: "px-6",
      buttonPy: "py-2",
    },
    mobile: {
      height: "16rem",
      titleSize: "text-2xl",
      subtitleSize: "text-sm",
      padding: "1rem",
      buttonSize: "sm",
      buttonPx: "px-4",
      buttonPy: "py-1",
    },
  };

  const { height, titleSize, subtitleSize, padding, buttonPx, buttonPy } =
    heroStyles[deviceScreen];

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color:
          section?.styles?.textColor ?? globalStyles.primaryColor ?? "white",
        height,
      }}
    >
      <div
        className={`text-center max-w-3xl relative z-10`}
        style={{ padding }}
      >
        <h1 className={`${titleSize} font-bold mb-4 animate-fade-in`}>
          {title}
        </h1>
        <p
          className={`${subtitleSize} mb-6 opacity-90 animate-fade-in leading-relaxed`}
        >
          {subtitle}
        </p>
        <Button
          className={`animate-scale-in shadow-xl hover:shadow-2xl transition-all duration-300 ${buttonPx} ${buttonPy}`}
          style={{
            backgroundColor: globalStyles.primaryColor,
            borderColor: globalStyles.primaryColor,
          }}
          onClick={() => {
            window.open(section.content.buttonLink, "_blank");
          }}
        >
          {buttonText}
        </Button>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/20"></div>
    </div>
  );
}

function CustomSheet({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
}) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 h-screen",
        isOpen ? "translate-x-0" : "-translate-x-[120%]"
      )}
    >
      <div className="p-6">{children}</div>
    </div>
  );
}

function HeaderSection({
  section,
  globalStyles,
  deviceScreen,
}: {
  section: Section;
  globalStyles: GlobalStyles;
  deviceScreen: "monitor" | "tablet" | "mobile";
}) {
  const { logo, navigation } = section.content;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isMobileLayout = deviceScreen === "tablet" || deviceScreen === "mobile";
  const isMobile = useIsMobile();

  return (
    <header
      className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50"
      style={{ backgroundColor: section.styles?.backgroundColor }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <div
            className={
              deviceScreen === "monitor"
                ? "text-2xl font-bold"
                : "text-xl font-bold"
            }
            style={{
              color: section.styles?.textColor ?? globalStyles.primaryColor,
            }}
          >
            {logo}
          </div>
          {!isMobileLayout && !isMobile ? (
            <div className="flex space-x-6">
              {navigation.map((item: string, index: number) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-600 hover:text-gray-900 transition-colors border-b-transparent hover:border-b-blue-600 border-b-2 font-medium relative group text-base"
                  style={{
                    color:
                      section.styles?.textColor ?? globalStyles.primaryColor,
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="border"
                style={{
                  borderColor: globalStyles.primaryColor,
                  color: globalStyles.primaryColor,
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <CustomSheet isOpen={isMenuOpen}>
                <div className="flex flex-col space-y-4">
                  {navigation.map((item: string, index: number) => (
                    <a
                      key={index}
                      href="#"
                      className="text-gray-600 border-b-transparent hover:border-b-blue-600 border-b-2 hover:text-gray-900 transition-colors w-fit text-sm font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </CustomSheet>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function FooterSection({
  section,
  globalStyles,
  deviceScreen,
}: {
  section: Section;
  globalStyles: GlobalStyles;
  deviceScreen: "monitor" | "tablet" | "mobile";
}) {
  const { copyright, links } = section.content;

  return (
    <footer
      className="bg-gray-900"
      style={{
        color: section.styles?.textColor ?? globalStyles.primaryColor,
        backgroundColor: section.styles?.backgroundColor ?? "#1F2937",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div
          className={
            deviceScreen === "monitor"
              ? "flex justify-between items-center"
              : "flex flex-col items-center space-y-6"
          }
        >
          <p
            className="text-gray-400 text-sm text-center"
            style={{
              color: section.styles?.textColor ?? globalStyles.primaryColor,
            }}
          >
            {copyright}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {links.map((link: string, index: number) => (
              <a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors relative group text-sm"
                style={{
                  color: section.styles?.textColor ?? globalStyles.primaryColor,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function ContentSection({
  section,
  globalStyles,
  deviceScreen,
}: {
  section: Section;
  globalStyles: GlobalStyles;
  deviceScreen: "monitor" | "tablet" | "mobile";
}) {
  const { title, text } = section.content;

  const contentStyles = {
    monitor: { titleSize: "text-4xl", textSize: "text-lg", padding: "py-16" },
    tablet: { titleSize: "text-3xl", textSize: "text-base", padding: "py-12" },
    mobile: { titleSize: "text-2xl", textSize: "text-sm", padding: "py-8" },
  };

  const { titleSize, textSize, padding } = contentStyles[deviceScreen];

  return (
    <div
      className={`bg-white ${padding}`}
      style={{
        backgroundColor: section.styles?.backgroundColor,
        color: section.styles?.textColor ?? globalStyles.primaryColor,
      }}
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className={`${titleSize} font-bold mb-6 text-center`}
          style={{
            color: section.styles?.textColor ?? globalStyles.primaryColor,
          }}
        >
          {title}
        </h2>
        <div className="prose max-w-none text-gray-600 text-center leading-relaxed">
          <p
            className={textSize}
            style={{
              color: section.styles?.textColor ?? globalStyles.secondaryColor,
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function GallerySection({
  section,
  globalStyles,
  deviceScreen,
}: {
  section: Section;
  globalStyles: GlobalStyles;
  deviceScreen: "monitor" | "tablet" | "mobile";
}) {
  const { title, images } = section.content;

  const getResponsiveGridClasses = () => {
    const baseResponsive =
      "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3";

    switch (deviceScreen) {
      case "mobile":
        return "grid-cols-1";
      case "tablet":
        return "grid-cols-1 sm:grid-cols-2";
      case "monitor":
      default:
        return baseResponsive;
    }
  };

  const getResponsiveGapClasses = () => {
    const baseResponsive = "gap-4 md:gap-6 lg:gap-8";

    switch (deviceScreen) {
      case "mobile":
        return "gap-3";
      case "tablet":
        return "gap-4 md:gap-6";
      case "monitor":
      default:
        return baseResponsive;
    }
  };

  const gridCols = getResponsiveGridClasses();
  const gap = getResponsiveGapClasses();

  const galleryStyles = {
    monitor: {
      titleSize: "text-4xl",
      padding: "py-16",
    },
    tablet: {
      titleSize: "text-3xl",
      padding: "py-12",
    },
    mobile: {
      titleSize: "text-2xl",
      padding: "py-8",
    },
  };

  const { titleSize, padding } = galleryStyles[deviceScreen];

  return (
    <div
      className={`bg-gray-50 ${padding}`}
      style={{
        backgroundColor: section.styles?.backgroundColor,
        color: section.styles?.textColor ?? globalStyles.primaryColor,
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className={`${titleSize} font-bold mb-8 text-center`}
          style={{
            color: section.styles?.textColor ?? globalStyles.primaryColor,
          }}
        >
          {title}
        </h2>
        <div className={`grid ${gridCols} ${gap}`}>
          {images.map((image: string, index: number) => (
            <div
              key={index}
              className="group aspect-video bg-gray-200 rounded-xl overflow-hidden transition-all duration-300"
            >
              <Image
                src={image}
                width={500}
                height={500}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DefaultSection({
  section,
  deviceScreen,
}: {
  section: Section;
  deviceScreen: "monitor" | "tablet" | "mobile";
}) {
  const defaultStyles = {
    monitor: { titleSize: "text-xl", typeSize: "text-sm", padding: "py-16" },
    tablet: { titleSize: "text-lg", typeSize: "text-xs", padding: "py-12" },
    mobile: { titleSize: "text-base", typeSize: "text-xs", padding: "py-8" },
  };

  const { titleSize, typeSize, padding } = defaultStyles[deviceScreen];

  return (
    <div className={`bg-white ${padding}`}>
      <div className="text-center text-gray-500">
        <p className={`${titleSize} font-medium mb-2`}>{section.title}</p>
        <p className={typeSize}>Section type: {section.type}</p>
      </div>
    </div>
  );
}
