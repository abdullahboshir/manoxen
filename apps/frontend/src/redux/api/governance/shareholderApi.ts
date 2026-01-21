import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: shareholderApi, hooks } = createCrudApi({
  resourceName: "shareholder",
  baseUrl: "/governance/shareholders",
  tagType: tagTypes.shareholder,
});

export const {
  useCreateShareholderMutation,
  useGetShareholdersQuery,
  useGetShareholderQuery,
  useUpdateShareholderMutation,
  useDeleteShareholderMutation,
} = hooks;

export default shareholderApi;
