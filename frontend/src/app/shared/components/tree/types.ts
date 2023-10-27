export type AppTreeNode = {
  id: string;
  label: string;
  meta?: any;
  icon?: string;
  expandable?: boolean;
};

export type AppTreeNodeExtraOptions = {
  canCheck?: boolean;
};
