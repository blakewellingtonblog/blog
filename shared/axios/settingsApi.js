import axiosClient from './axiosClient';

const getSettings = async () => {
    const response = await axiosClient.get('/settings');
    return response.data;
};

const updateSettings = async (data) => {
    const response = await axiosClient.put('/settings/admin', data);
    return response.data;
};

const settingsApi = {
    getSettings,
    updateSettings,
};

export default settingsApi;
