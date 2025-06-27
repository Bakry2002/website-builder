"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Section } from "../../types";

export const ContentTab = ({
  section,
  renderSectionFields,
}: {
  section: Section;
  renderSectionFields: () => React.ReactElement;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm text-gray-600 uppercase tracking-wide">
          {section.type} Settings
        </CardTitle>
      </CardHeader>
      <CardContent>{renderSectionFields()}</CardContent>
    </Card>
  );
};
