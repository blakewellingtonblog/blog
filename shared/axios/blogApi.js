import axiosClient from './axiosClient';

const fetchPublishedPosts = async (page = 1, tag = null) => {
    const params = { page };
    if (tag) params.tag = tag;
    const response = await axiosClient.get('/blog/posts', { params });
    return response.data;
};

const getPostBySlug = async (slug) => {
    const response = await axiosClient.get(`/blog/posts/${slug}`);
    return response.data;
};

const fetchAdminPosts = async () => {
    const response = await axiosClient.get('/blog/admin/posts');
    return response.data;
};

const getAdminPost = async (id) => {
    const response = await axiosClient.get(`/blog/admin/posts/${id}`);
    return response.data;
};

const createPost = async (data) => {
    const response = await axiosClient.post('/blog/admin/posts', data);
    return response.data;
};

const updatePost = async (id, data) => {
    const response = await axiosClient.put(`/blog/admin/posts/${id}`, data);
    return response.data;
};

const deletePost = async (id) => {
    const response = await axiosClient.delete(`/blog/admin/posts/${id}`);
    return response.data;
};

const publishPost = async (id) => {
    const response = await axiosClient.patch(`/blog/admin/posts/${id}/publish`);
    return response.data;
};

const unpublishPost = async (id) => {
    const response = await axiosClient.patch(`/blog/admin/posts/${id}/unpublish`);
    return response.data;
};

const fetchTags = async () => {
    const response = await axiosClient.get('/blog/tags');
    return response.data;
};

const createTag = async (data) => {
    const response = await axiosClient.post('/blog/admin/tags', data);
    return response.data;
};

const deleteTag = async (id) => {
    const response = await axiosClient.delete(`/blog/admin/tags/${id}`);
    return response.data;
};

const blogApi = {
    fetchPublishedPosts,
    getPostBySlug,
    fetchAdminPosts,
    getAdminPost,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost,
    fetchTags,
    createTag,
    deleteTag,
};

export default blogApi;
