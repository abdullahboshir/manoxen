import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: productApi, hooks } = createCrudApi({
  resourceName: 'product',
  baseUrl: '/super-admin/products',
  tagType: tagTypes.product,
});

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = hooks;

export default productApi;


