import { store } from "./redux/store";
import { setTokens, clearTokens } from "./redux/slices/authSlice";
import { useSelector } from "react-redux";
import type { RootState } from '@/redux/store';

const apiBaseURL = "http://localhost:8000/";

export const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

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
