import axios from 'axios';

class FetchDatas {

    Config(token) {
        return {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    }

    async Delete(url) {
        await axios.delete(url);
    }

    async GetAll(url, state) {
        await axios.get(url)
            .then(res => {
                state(res.data.result)
            });
    }

    async Get(url, state) {
        await axios.get(url)
            .then(res => {
                state(res.data);
            })
    }
    async Post(url, val) {
        await axios.post(url, val);
    }

    async PostReturn(url, val) {
        return await axios.post(url, val);
    }

    async Put(url, val) {
        await axios.put(url, val);
    }
}

export default new FetchDatas();