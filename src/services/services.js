import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.sportradar.us/soccer/trial/v4/en',
    }),
    endpoints: (builder) => ({
        getMatch: builder.query({
            query: (id) =>
                `sport_events/${id}/timeline.json?api_key=2p8d96jgxym9u422zy5rnhjp`,
        }),
        getAllSeasons: builder.query({
            query: () =>
                'competitions/sr:competition:202/seasons.json?api_key=2p8d96jgxym9u422zy5rnhjp',
        }),
        getSeason: builder.query({
            query: (id) =>
                `seasons/${id}/schedules.json?api_key=2p8d96jgxym9u422zy5rnhjp`,
        }),
    }),
});

export const { useGetMatchQuery, useGetAllSeasonsQuery, useGetSeasonQuery } = api;
