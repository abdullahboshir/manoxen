import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: customerApi, hooks } = createCrudApi({
  resourceName: 'customer',
  baseUrl: '/super-admin/customers',
  tagType: tagTypes.customer,
});

export const {
  useCreateCustomerMutation,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = hooks;

export default customerApi;

