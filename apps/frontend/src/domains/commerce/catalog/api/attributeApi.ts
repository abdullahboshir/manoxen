import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: attributeApi, hooks } = createCrudApi({
  resourceName: 'attribute',
  baseUrl: '/super-admin/attributes',
  tagType: tagTypes.attribute,
});

export const {
  useCreateAttributeMutation,
  useGetAttributesQuery,
  useGetAttributeQuery,
  useUpdateAttributeMutation,
  useDeleteAttributeMutation,
} = hooks;

export default attributeApi;


