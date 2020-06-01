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