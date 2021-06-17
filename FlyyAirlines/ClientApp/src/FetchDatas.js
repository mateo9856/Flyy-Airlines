import axios from 'axios';

class FetchDatas {
    async Delete(url) {
        await axios.delete(url).
            then(res => {
                console.log(res);
            })
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
                console.log(res.data);
            })
    }
    async Post(url, val) {
        await axios.post(url, val)
            .then(res => {
                console.log(res);
            })
    }

    async Put(url, val) {
        await axios.put(url, val)
            .then(res => {
                console.log(res);
            })
    }
}

export default new FetchDatas();