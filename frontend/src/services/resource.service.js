import axios from 'axios';
import { SERVER_URL } from '../config'

export const create = async payload => {
    try {
        const res =  await axios.post(SERVER_URL + 'resources', payload)
        return res.data
    } catch (error) {
        return error
    }
}

export const getAllResouces = async () => {
    try {
        const res = await axios.get(SERVER_URL + 'resources');
        return res.data
    } catch (error) {
        return error
    }
}

export const updateResource = async payload => {
    try {
        const res = await axios.put(SERVER_URL + 'resources/' + payload.id, payload);
        return res.data
    } catch (error) {
        return error
    }
}

export const deleteResource = async id => {
    try {
        const res = await axios.delete(SERVER_URL + 'resources/' + id);
        return res.data
    } catch (error) {
        return error
    }
}