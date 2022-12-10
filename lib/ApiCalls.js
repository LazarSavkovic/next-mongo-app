
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export default api;


export const getApts = async () => {

     const res = await api.get('/apts?limit=100')
     const apts = res.data.data;

    return apts
}



export const getApt = async (id) => {
    
    const res = await api.get(`/apts/${id}`)
    const apt = res.data.data;


    return apt
}


export const getFlats = async (userId) => {

    const res = await api.get(`/flats?id=${userId}`)
    const flats = res.data.data;

    return flats

}

export const getFlat = async ({userId, flatId}) => {

    const res = await api.get(`/flats/${flatId}?userid=${userId}`)
    const flats = res.data.data;

    return flats

}
