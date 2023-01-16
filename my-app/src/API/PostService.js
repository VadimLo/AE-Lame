import axios from 'axios';

export default class PostService {
    static async postSelectedTags(obj) {
        return axios.post(`${process.env.REACT_APP_DOMAIN}/post`, obj);
    }

    static async getAllPosts() {
        return axios.get(`${process.env.REACT_APP_DOMAIN}/post`);
    }
}
