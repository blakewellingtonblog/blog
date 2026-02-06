import axiosClient from './axiosClient';

const uploadBlogImage = async (file, folder = 'covers') => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosClient.post(`/upload/blog-image?folder=${folder}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const uploadPortfolioMedia = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosClient.post('/upload/portfolio-media', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const uploadWorkImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosClient.post('/upload/work-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

const deleteFile = async (bucket, path) => {
    const response = await axiosClient.delete('/upload/file', {
        params: { bucket, path },
    });
    return response.data;
};

const uploadApi = {
    uploadBlogImage,
    uploadPortfolioMedia,
    uploadWorkImage,
    deleteFile,
};

export default uploadApi;
