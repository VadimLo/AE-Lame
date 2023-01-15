export default class PresignService {
    static async presign(obj) {
        return fetch(process.env.REACT_APP_DOMAIN +'/presign', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static async getPresign(id) {
        return fetch(process.env.REACT_APP_DOMAIN +`/getPresign?id=${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    static async getFileLinksBulk(ids) {
        return fetch(process.env.REACT_APP_DOMAIN + `/getPresign/bulk`, {
            method: 'POST',
            body: JSON.stringify(ids),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
