import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: supplierApi, hooks } = createCrudApi({
  resourceName: 'supplier',
  baseUrl: '/super-admin/suppliers',
  tagType: tagTypes.supplier,
});

export const {
  useCreateSupplierMutation,
  useGetSuppliersQuery,
  useGetSupplierQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = hooks;

export default supplierApi;


