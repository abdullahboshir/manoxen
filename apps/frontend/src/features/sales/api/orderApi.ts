import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: orderApi, hooks } = createCrudApi({
  resourceName: 'order',
  baseUrl: '/super-admin/orders',
  tagType: tagTypes.order,
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = hooks;

export default orderApi;


