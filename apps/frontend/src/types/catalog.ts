export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string | ICategory | null;
  businessUnit?: string | { _id: string; name: string } | null;
  isActive: boolean;
  itemCount?: number;
  availableModules?: string[];
  
  // Frontend specific props for tree handling
  children?: ICategory[];
  depth?: number;
  hasChildren?: boolean;
  expanded?: boolean;
}

export interface IBrand {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  website?: string;
  isActive: boolean;
  businessUnit?: string | { _id: string; name: string } | null;
}

export interface IAttribute {
  _id: string;
  name: string;
  code: string;
  type: string;
  isRequired: boolean;
  options?: string[];
  isActive: boolean;
}

export interface IAttributeGroup {
  _id: string;
  name: string;
  attributes: IAttribute[] | string[];
  isActive: boolean;
}
