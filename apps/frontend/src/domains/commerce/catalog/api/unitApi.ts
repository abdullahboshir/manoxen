import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: unitApi, hooks } = createCrudApi({
  resourceName: 'unit',
  baseUrl: '/super-admin/units',
  tagType: tagTypes.unit,
});

export const {
  useCreateUnitMutation,
  useGetUnitsQuery,
  useGetUnitQuery,
  useUpdateUnitMutation,
  useDeleteUnitMutation,
} = hooks;

export default unitApi;


