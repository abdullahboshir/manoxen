import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: brandApi, hooks } = createCrudApi({
  resourceName: 'brand',
  baseUrl: '/super-admin/brands',
  tagType: tagTypes.brand,
});

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useGetBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = hooks;

export default brandApi;


