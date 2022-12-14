import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_APP_URL


// APTS


export const getApts = async () => {

    console.log(process.env.NEXT_APP_URL)

    const res = await axios.get('/api/apts?limit=100')
    const apts = res.data.data;

    console.log(apts)

    return apts
}



export const getApt = async (id) => {

    console.log(process.env.NEXT_APP_URL)

    const res = await axios.get(`/api/apts/${id}`)
    const apt = res.data.data;

    console.log(apt)


    return apt
}



export const postApt = async (form) => {

    const res = await axios.post('/api/apts', form)

    return res

}

export const updateApt = async ({ form, id }) => {

    const res = await axios.put(`/api/apts/${id}`, form)

    return res

}



// FLATS

export const getFlats = async (userId) => {

    const res = await axios.get(`/api/flats?id=${userId}`)
    const flats = res.data.data;

    return flats

}

export const getFlat = async ({ userId, flatId }) => {

    const res = await axios.get(`/api/flats/${flatId}?userid=${userId}`)
    const flats = res.data.data;

    return flats

}


export const postFlat = async (formWithAuthor) => {

    const res = await axios.post('/api/flats', formWithAuthor)


    return res

}


export const updateFlat = async ({ form, id }) => {

    const res = await axios.put(`/api/flats/${id}`, form)

    return res

}

