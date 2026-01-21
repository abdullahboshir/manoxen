import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: expenseApi, hooks } = createCrudApi({
  resourceName: 'expense',
  baseUrl: '/super-admin/expenses',
  tagType: tagTypes.expense,
});

export const {
  useGetExpensesQuery,
  useGetExpenseQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useRestoreExpenseMutation,
} = hooks;

export default expenseApi;
