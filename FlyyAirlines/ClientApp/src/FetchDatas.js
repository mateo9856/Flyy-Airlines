class FetchDatas {
    async delete(url) {
        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        }).catch(err => console.error(err));
        return "Element deleted";
    }

    async GetLists(url, state) {
        fetch(url)
            .then(res => res.json())
            .then(res => state(res))
            .catch(err => alert(err))
    }

}

export default new FetchDatas();