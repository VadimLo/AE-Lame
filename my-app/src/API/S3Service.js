import axios from 'axios';

export default class S3Service {
    static async getPresignUrl(obj) {
        return await axios.post(`${process.env.REACT_APP_DOMAIN}/presign`, obj);
    }
}
