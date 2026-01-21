import { baseApi } from "@/redux/api/base/baseApi";

export const auditLogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAuditLogs: builder.query<any, { module?: string; businessUnit?: string }>({
            query: (params) => ({
                url: "/super-admin/system/audit-logs",
                params,
            }),
        }),
        getAuditLogById: builder.query<any, string>({
            query: (id) => ({ url: `/audit-logs/${id}` }),
        }),
    }),
});

export const { useGetAuditLogsQuery, useGetAuditLogByIdQuery } = auditLogApi;
