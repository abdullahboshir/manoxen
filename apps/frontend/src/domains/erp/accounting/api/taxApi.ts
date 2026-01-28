import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: taxApi, hooks } = createCrudApi({
  resourceName: 'tax',
  baseUrl: '/super-admin/taxes',
  tagType: tagTypes.tax,
});

export const {
  useCreateTaxMutation,
  useGetTaxsQuery,
  useGetTaxQuery,
  useUpdateTaxMutation,
  useDeleteTaxMutation,
} = hooks;

export default taxApi;


