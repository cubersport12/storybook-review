export type AppTreeNode = {
  id: string;
  label: string;
  meta?: any;
  icon?: string;
  expandable?: boolean;
  type?: any;
};

export type AppTreeNodeExtraOptions = {
  canCheck?: boolean;
};
