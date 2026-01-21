import { tagTypes } from "@/redux/tag-types";
import { createCrudApi } from "@/redux/api/base/createCrudApi";

const { api: meetingApi, hooks } = createCrudApi({
  resourceName: "meeting",
  baseUrl: "/governance/meetings",
  tagType: tagTypes.meeting,
});

export const {
  useCreateMeetingMutation,
  useGetMeetingsQuery,
  useGetMeetingQuery,
  useUpdateMeetingMutation,
  useDeleteMeetingMutation,
} = hooks;

export default meetingApi;
