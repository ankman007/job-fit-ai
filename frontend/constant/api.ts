import { fetchWithAuth } from "@/utils";

export const fetchUserDetails = async () => {
    try {
        const response = await fetchWithAuth(`http://localhost:8000/user/detail`);
        
        if (!response.ok) {
            console.log('Failed to fetch user details');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.user_details;
        }

        console.log('Error fetching user details');
    } catch (error) {
        console.error('Error fetching user details:', error);
        throw error;
    }
};

export const fetchUserCheatSheets = async () => {
    try {
        const response = await fetchWithAuth(`http://localhost:8000/user/cheatsheets`);
        
        if (!response.ok) {
            console.log('Failed to fetch user cheatsheets');
        }

        const data = await response.json();

        if (data.status === 'success') {
            return data.cheatsheets;
        }

        console.log('Error fetching user cheatsheets');
    } catch (error) {
        console.error('Error fetching user cheatsheets:', error);
        throw error;
    }
};
