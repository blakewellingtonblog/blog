import axiosClient from './axiosClient';

const fetchExperiences = async () => {
    const response = await axiosClient.get('/work/experiences');
    return response.data;
};

const fetchExperience = async (slug) => {
    const response = await axiosClient.get(`/work/experiences/${slug}`);
    return response.data;
};

const fetchAdminExperiences = async () => {
    const response = await axiosClient.get('/work/admin/experiences');
    return response.data;
};

const createExperience = async (data) => {
    const response = await axiosClient.post('/work/admin/experiences', data);
    return response.data;
};

const updateExperience = async (id, data) => {
    const response = await axiosClient.put(`/work/admin/experiences/${id}`, data);
    return response.data;
};

const deleteExperience = async (id) => {
    const response = await axiosClient.delete(`/work/admin/experiences/${id}`);
    return response.data;
};

const fetchTimeline = async (experienceId) => {
    const response = await axiosClient.get(`/work/admin/experiences/${experienceId}/timeline`);
    return response.data;
};

const createTimelineEvent = async (experienceId, data) => {
    const response = await axiosClient.post(`/work/admin/experiences/${experienceId}/timeline`, data);
    return response.data;
};

const updateTimelineEvent = async (eventId, data) => {
    const response = await axiosClient.put(`/work/admin/timeline/${eventId}`, data);
    return response.data;
};

const deleteTimelineEvent = async (eventId) => {
    const response = await axiosClient.delete(`/work/admin/timeline/${eventId}`);
    return response.data;
};

const fetchFeaturedPosts = async (experienceId) => {
    const response = await axiosClient.get(`/work/admin/experiences/${experienceId}/featured-posts`);
    return response.data;
};

const updateFeaturedPosts = async (experienceId, posts) => {
    const response = await axiosClient.put(`/work/admin/experiences/${experienceId}/featured-posts`, { posts });
    return response.data;
};

const workApi = {
    fetchExperiences,
    fetchExperience,
    fetchAdminExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    fetchTimeline,
    createTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    fetchFeaturedPosts,
    updateFeaturedPosts,
};

export default workApi;
