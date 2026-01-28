import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "@/redux/api/base/baseApi";
import {
  ISystemSettings,
  IPlatformSettings,
  IOrganizationSettings,
  IBusinessUnitSettings,
  IOutletSettings,
} from "../../../types/settings";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // 1. System Settings (Platform-Internal)
    getSystemSettings: build.query<ISystemSettings, void>({
      query: () => ({
        url: `/super-admin/system-settings`,
        method: "GET",
      }),
      providesTags: [tagTypes.settings],
      transformResponse: (response: any) => response.data,
    }),

    updateSystemSettings: build.mutation<
      ISystemSettings,
      Partial<ISystemSettings>
    >({
      query: (data) => ({
        url: `/super-admin/system-settings`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.settings],
    }),

    // 2. Platform Settings (Global Governance)
    getPlatformSettings: build.query<IPlatformSettings, void>({
      query: () => ({
        url: `/super-admin/platform-settings`,
        method: "GET",
      }),
      providesTags: [tagTypes.settings],
      transformResponse: (response: any) => response.data,
    }),

    updatePlatformSettings: build.mutation<
      IPlatformSettings,
      Partial<IPlatformSettings>
    >({
      query: (data) => ({
        url: `/super-admin/platform-settings`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.settings],
    }),

    // 3. Organization Settings
    getOrganizationSettings: build.query<IOrganizationSettings, string>({
      query: (organizationId: string) => ({
        url: `/organizations/${organizationId}/settings`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.settings, id }],
      transformResponse: (response: any) => response.data,
    }),

    updateOrganizationSettings: build.mutation<
      IOrganizationSettings,
      { organizationId: string; data: Partial<IOrganizationSettings> }
    >({
      query: ({ organizationId, data }) => ({
        url: `/organizations/${organizationId}/settings`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.settings, id: arg.organizationId },
      ],
    }),

    // 4. Business Unit Settings
    getBusinessUnitSettings: build.query<IBusinessUnitSettings, string>({
      query: (buId: string) => ({
        url: `/business-units/${buId}/settings`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.settings, id }],
      transformResponse: (response: any) => response.data,
    }),

    updateBusinessUnitSettings: build.mutation<
      IBusinessUnitSettings,
      { buId: string; data: Partial<IBusinessUnitSettings> }
    >({
      query: ({ buId, data }) => ({
        url: `/business-units/${buId}/settings`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.settings, id: arg.buId },
      ],
    }),

    // 5. Outlet Settings
    getOutletSettings: build.query<IOutletSettings, string>({
      query: (outletId: string) => ({
        url: `/outlets/${outletId}/settings`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.settings, id }],
      transformResponse: (response: any) => response.data,
    }),

    updateOutletSettings: build.mutation<
      IOutletSettings,
      { outletId: string; data: Partial<IOutletSettings> }
    >({
      query: ({ outletId, data }) => ({
        url: `/outlets/${outletId}/settings`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: tagTypes.settings, id: arg.outletId },
      ],
    }),
  }),
});

export const {
  useGetSystemSettingsQuery,
  useUpdateSystemSettingsMutation,
  useGetPlatformSettingsQuery,
  useUpdatePlatformSettingsMutation,
  useGetOrganizationSettingsQuery,
  useUpdateOrganizationSettingsMutation,
  useGetBusinessUnitSettingsQuery,
  useUpdateBusinessUnitSettingsMutation,
  useGetOutletSettingsQuery,
  useUpdateOutletSettingsMutation,
} = settingsApi;
