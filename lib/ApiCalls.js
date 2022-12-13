import axios from 'axios';

const contentType = 'application/json'

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

api.defaults.headers.post['Content-Type'] = contentType;

export default api;



// APTS


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



export const postApt = async (form) => {

    const res = await api.post('/apts', form)

    console.log(res, 'made a new apt successfully')

    return res

}

export const updateApt = async ({ form, id }) => {

    console.log(form, id)

    const res = await api.put(`/apts/${id}`, form)

    console.log(res, 'updated apt successful')

    return res

}



// FLATS

export const getFlats = async (userId) => {

    const res = await api.get(`/flats?id=${userId}`)
    const flats = res.data.data;

    return flats

}

export const getFlat = async ({ userId, flatId }) => {

    const res = await api.get(`/flats/${flatId}?userid=${userId}`)
    const flats = res.data.data;

    return flats

}


export const postFlat = async (formWithAuthor) => {

    const res = await api.post('/flats', formWithAuthor)

    console.log(res, 'made a new flat successfully')

    return res

}


export const updateFlat = async ({ form, id }) => {

    console.log(form, id)

    
    // const res = await fetch(`/flats/${id}`, {
    //     method: 'POST',
    //     headers: {
    //       Accept: contentType,
    //       'Content-Type': contentType,
    //     },
    //     body: JSON.stringify(form),
    //   })

    const res = await api.put(`/flats/${id}`, form)

    console.log(res, 'updated flat successful')

    return res

}

