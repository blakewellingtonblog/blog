import axiosClient from './axiosClient';

const fetchInfluences = async (category) => {
    const params = category ? { category } : {};
    const response = await axiosClient.get('/influences', { params });
    return response.data;
};

const fetchAdminInfluences = async () => {
    const response = await axiosClient.get('/influences/admin/influences');
    return response.data;
};

const createInfluence = async (data) => {
    const response = await axiosClient.post('/influences/admin/influences', data);
    return response.data;
};

const updateInfluence = async (id, data) => {
    const response = await axiosClient.put(`/influences/admin/influences/${id}`, data);
    return response.data;
};

const deleteInfluence = async (id) => {
    const response = await axiosClient.delete(`/influences/admin/influences/${id}`);
    return response.data;
};

const influencesApi = {
    fetchInfluences,
    fetchAdminInfluences,
    createInfluence,
    updateInfluence,
    deleteInfluence,
};

export default influencesApi;
