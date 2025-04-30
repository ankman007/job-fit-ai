import { fetchWithAuth } from "@/utils";

export const fetchUserDetails = async () => {
    try {
        const response = await fetchWithAuth(`http://localhost:8000/user/detail`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.user_details;
        }

        throw new Error('Error fetching user details');
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

// apiService.ts
export const fetchUserCheatSheets = async () => {
    try {
        const response = await fetchWithAuth(`http://localhost:8000/user/cheatsheets`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch user cheatsheets');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.cheatsheets;
        }

        throw new Error('Error fetching user cheatsheets');
    } catch (error) {
        console.error('Error fetching user cheatsheets:', error);
        throw error;
    }
};
