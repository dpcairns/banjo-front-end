import request from 'superagent';

export async function fetchBanjos() {
    try {
        const response = await request.get('https://infinite-sea-11498.herokuapp.com/banjos');

        return response.body;
    } catch(err) {
        throw err;
    }
}

export async function fetchBanjo(someId) {
    try {
        const response = await request.get(`https://infinite-sea-11498.herokuapp.com/banjos/${someId}`);

        return response.body;
    } catch(err) {
        throw err;
    }
}

export async function fetchBrands() {
    try {
        const response = await request.get('https://infinite-sea-11498.herokuapp.com/brands');

        return response.body;
    } catch(err) {
        throw err;
    }
}

export async function createBanjo(newBanjo) {
    try {
        await request
        .post('https://infinite-sea-11498.herokuapp.com/banjos')
        .send(newBanjo);
        
        return;
    } catch(err) {
        throw err;
    }
}

export async function updateBanjo(someId, newBanjo) {
    try {
        await request
        .put(`https://infinite-sea-11498.herokuapp.com/banjos/${someId}`)
        .send(newBanjo);
        
        return;
    } catch(err) {
        throw err;
    }
}


export async function deleteBanjo(someId) {
    try {
        await request.delete(`https://infinite-sea-11498.herokuapp.com/banjos/${someId}`);
        
        return;
    } catch(err) {
        throw err;
    }
}