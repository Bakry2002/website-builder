import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { FileText, Sparkles, Star, Zap } from "lucide-react";
import { GlobalStyles, Section } from "../../types";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  sections: Section[];
  globalStyles: GlobalStyles;
  featured?: boolean;
}

interface TemplateLibraryProps {
  filteredTemplates: Template[];
  onLoadTemplate: (template: Template) => void;
}

export function TemplateLibrary({
  onLoadTemplate,
  filteredTemplates,
}: TemplateLibraryProps) {
  const isMobile = useIsMobile();

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-2 pr-6">
        <div className="space-y-4">
          {filteredTemplates.map((template) => (
            <Card
              onClick={() => onLoadTemplate(template)}
              key={template.id}
              className="group hover:shadow-xl transition-all p-0 duration-200 hover:scale-[1.01] cursor-pointer border-2 hover:border-blue-300 relative overflow-hidden"
            >
              {!isMobile && template.featured && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}

              <CardContent className={cn(isMobile ? "p-2" : "p-3")}>
                <div className="flex items-start space-x-3">
                  {!isMobile && (
                    <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center text-white ">
                      <Sparkles className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {template.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {!isMobile && (
                      <div className="text-xs text-gray-500 bg-gray-50 px-3 py-2 rounded-lg mb-4">
                        <span className="font-medium">Includes:</span>{" "}
                        {template.preview}
                      </div>
                    )}

                    {!isMobile && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Zap className="w-3 h-3" />
                          <span>{template.sections.length} sections</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No templates found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
