import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const ApiKey = import.meta.env.VITE_SUMMARIZER_API_KEY;
export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', ApiKey);
            headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=${params.length}`
        })
    })
});

export const { useLazyGetSummaryQuery } = articleApi;
