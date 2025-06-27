import { Card, CardContent } from "@/components/ui/card";
import { Layout } from "lucide-react";
import { SectionTemplate } from "../../types";

interface SectionLibraryProps {
  onAddSection: (sectionType: string) => void;
  filteredSections: SectionTemplate[];
}

export function SectionLibrary({
  onAddSection,
  filteredSections,
}: SectionLibraryProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-auto p-2 pr-6">
        <div className="space-y-4">
          {filteredSections.map((section) => (
            <Card
              key={section.id}
              className="group hover:shadow-sm bg-accent transition-all p-0 duration-200 hover:scale-[1.01] cursor-pointer border hover:border-blue-300"
              onClick={() => onAddSection(section.type)}
            >
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-white">
                    <section.icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {section.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {section.description}
                    </p>
                    <div className="mt-2 text-xs text-muted-foreground bg-white px-2 py-1 rounded">
                      {section.preview}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <Layout className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No sections found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
