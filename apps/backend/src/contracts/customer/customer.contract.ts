export interface ICustomerContract {
  _id?: any;
  id?: string;
  name?: {
    firstName: string;
    lastName?: string;
  };
  email: string;
  phone?: string;
  avatar?: string;
  businessUnit?: any;
  outlet?: any;
  user?: any;
}

export interface ICustomerServiceContract {
  getById(id: string): Promise<ICustomerContract | null>;
  create(data: Partial<ICustomerContract>): Promise<ICustomerContract>;
}
