import { baseApi } from "@/redux/api/base/baseApi";
import { tagTypes } from "@/redux/tag-types";

export const storefrontApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        // Public Endpoints
        getStoreConfig: build.query({
            query: (buId) => ({
                url: `/public/storefront/${buId}/config`,
                method: "GET",
            }),
            providesTags: [tagTypes.storefrontConfig],
        }),
        getStorePage: build.query({
            query: ({ buId, slug }) => ({
                url: `/super-admin/storefront/${buId}/pages/${slug}`, // Technically public route
                method: "GET",
            }),
            transformResponse: (response: any) => response.data || response,
            providesTags: [tagTypes.storePage],
        }),
        getStoreProducts: build.query({
            query: ({ buId, params }) => ({
                url: `/super-admin/storefront/${buId}/products`,
                method: "GET",
                params,
            }),
            transformResponse: (response: any) => response.data || response,
        }),

        // Admin Endpoints
        updateStoreConfig: build.mutation({
            query: ({ buId, data }) => ({
                url: `/super-admin/storefront/${buId}/config`,
                method: "PATCH",
                data: data,
            }),
            invalidatesTags: [tagTypes.storefrontConfig],
        }),
        getAllPages: build.query({
            query: (buId) => ({
                url: `/super-admin/storefront/${buId}/pages`,
                method: "GET",
            }),
            providesTags: [tagTypes.storePageList],
        }),
        savePage: build.mutation({
            query: ({ buId, data }) => ({
                url: `/super-admin/storefront/${buId}/pages`,
                method: "POST",
                data: data,
            }),
            invalidatesTags: [tagTypes.storePage, tagTypes.storePageList],
        }),
        deletePage: build.mutation({
            query: ({ buId, pageId }) => ({
                url: `/super-admin/storefront/${buId}/pages/${pageId}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.storePageList],
        }),
    }),
});

export const {
    useGetStoreConfigQuery,
    useGetStorePageQuery,
    useGetStoreProductsQuery,
    useUpdateStoreConfigMutation,
    useGetAllPagesQuery,
    useSavePageMutation,
    useDeletePageMutation
} = storefrontApi;

