import axios from "axios";

export default class TagService {
    static  postTag = async (obj) => axios.post(process.env.REACT_APP_DOMAIN + '/tag', obj);

    static getAllTags = async () => axios.get(`${process.env.REACT_APP_DOMAIN}/tag`);

    static  deleteTag = async (id) => axios.delete(process.env.REACT_APP_DOMAIN + `/tag?id=${id}`);

}
