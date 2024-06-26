import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const API_URL = 'https://social-network.samuraijs.com/api/1.0/'


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
        credentials: 'include',
    }),
    tagTypes: ['User', 'Auth', 'Profile'],
    endpoints: (build) => ({}),
})



export type ResponseType<D = {}, RC = ResultCodes> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

export enum ResultCodes {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}



