export interface Section {
  id: string;
  type: string;
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Record<string, any>;
  order: number;
  styles?: {
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    margin?: string;
  };
}

export interface BuilderState {
  sections: Section[];
  selectedSectionId: string | null;
  previewMode: boolean;
  globalStyles: GlobalStyles;
  showPropertyPanel: boolean;
}

export interface HistoryState {
  sections: Section[];
  globalStyles: BuilderState["globalStyles"];
  timestamp: number;
}

export interface GlobalStyles {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  backgroundColor: string;
}

export interface SectionTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  icon: React.ElementType;
  category: string;
  preview: string;
}

export interface DragEvent {
  active: {
    id: string;
  };
  over: {
    id: string;
  } | null;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  preview: string;
  sections: Section[];
  globalStyles: GlobalStyles;
  featured?: boolean;
}
