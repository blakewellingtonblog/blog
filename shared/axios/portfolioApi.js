import axiosClient from './axiosClient';

const fetchItems = async (category = null, mediaType = null, featuredOnly = false) => {
    const params = {};
    if (category) params.category = category;
    if (mediaType) params.media_type = mediaType;
    if (featuredOnly) params.featured_only = true;
    const response = await axiosClient.get('/portfolio/items', { params });
    return response.data;
};

const getItem = async (id) => {
    const response = await axiosClient.get(`/portfolio/items/${id}`);
    return response.data;
};

const fetchCategories = async () => {
    const response = await axiosClient.get('/portfolio/categories');
    return response.data;
};

const createItem = async (data) => {
    const response = await axiosClient.post('/portfolio/admin/items', data);
    return response.data;
};

const updateItem = async (id, data) => {
    const response = await axiosClient.put(`/portfolio/admin/items/${id}`, data);
    return response.data;
};

const deleteItem = async (id) => {
    const response = await axiosClient.delete(`/portfolio/admin/items/${id}`);
    return response.data;
};

const reorderItem = async (id, sortOrder) => {
    const response = await axiosClient.patch(`/portfolio/admin/items/${id}/reorder`, {
        sort_order: sortOrder,
    });
    return response.data;
};

const portfolioApi = {
    fetchItems,
    getItem,
    fetchCategories,
    createItem,
    updateItem,
    deleteItem,
    reorderItem,
};

export default portfolioApi;
