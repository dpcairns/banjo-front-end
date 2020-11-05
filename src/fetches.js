import request from 'superagent';

const URL = process.env.REACT_APP_API_URL || 'https://infinite-sea-11498.herokuapp.com/'; // fallback

export async function fetchBanjos() {
    try {
        const response = await request.get(`${URL}banjos`);

        return response.body;
    } catch(err) {
        throw err;
    }
}

export async function fetchBanjo(someId) {
    try {
        const response = await request.get(`${URL}banjos/${someId}`);

        return response.body;
    } catch(err) {
        throw err;
    }
}

export async function fetchBrands() {
    try {
        const response = await request.get(`${URL}brands`);

        return response.body;
    } catch(err) {
        throw err;
    }
}

export async function createBanjo(newBanjo) {
    try {
        await request
        .post(`${URL}banjos`)
        .send(newBanjo);
        
        return;
    } catch(err) {
        throw err;
    }
}

export async function updateBanjo(someId, newBanjo) {
    try {
        await request
        .put(`${URL}banjos/${someId}`)
        .send(newBanjo);
        
        return;
    } catch(err) {
        throw err;
    }
}


export async function deleteBanjo(someId) {
    try {
        await request.delete(`${URL}banjos/${someId}`);
        
        return;
    } catch(err) {
        throw err;
    }
}