import axiosClient from './axiosClient';

async function createPostApi(data) {
    return axiosClient.post("posts", data);
}