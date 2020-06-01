import axios from 'axios';
import { SERVER_URL } from '../config'

export const create = async payload => {
    try {
        const res =  await axios.post(SERVER_URL + 'documents', payload)
        return res.data
    } catch (error) {
        return error
    }
}


export const getAll = async () => {
    try {
        const res = await axios.get(SERVER_URL + 'documents');
        return res.data
    } catch (error) {
        return error
    }
}

export const update = async payload => {
    try {
        const res = await axios.put(SERVER_URL + `documents/${payload.id}`, payload);
        return res.data
    } catch (error) {
        return error
    }
}