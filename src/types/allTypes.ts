export interface ReportValueSchema {
  Name: string;
  type: "text" | "number";
  placeholder?: string;
}

export interface DeliverableItemType {
  type: "docx" | "pptx";
  Name: string;
  DateCreated: string;
  createdBy: {
    email: string;
    icon: string;
  };
  variables: ReportValueSchema[];
}
