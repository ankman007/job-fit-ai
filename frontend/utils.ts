import { store } from "./redux/store";
import { setTokens, clearTokens } from "./redux/slices/authSlice";

const apiBaseURL = "http://localhost:8000/";

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const accessToken = store.getState().auth.accessToken || "";

    const headers: HeadersInit = {
        ...options.headers,
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    let response = await fetch(url, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        console.warn("Unauthorized. Clearing tokens.");
        store.dispatch(clearTokens());
    }
    return response;
};
