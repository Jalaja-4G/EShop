import axios from 'axios';
import { USERS_ENDPOINT } from './api-endpoints';

export const fetchusers = async ()=>{
   try{
       const response = await axios.get(USERS_ENDPOINT)
       console.log(response)
       return response.data
    }
    catch (error) {
       console.log(error);
   }
}