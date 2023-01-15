import axios from "axios";

export default class PresetService {
    static async getAllPresets() {
        return axios.get(process.env.REACT_APP_DOMAIN + '/preset');

    }
    
    static async getPresetDownloadLink(id) {
        return axios.get(process.env.REACT_APP_DOMAIN + `/preset/${id}`)

    }
}
