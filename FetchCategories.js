import axios from 'axios';
import {CATEGORIES_ENDPOINT } from './api-endpoints';

export const fetchcategories = async ()=>{
   try{
       const response = await axios.get(CATEGORIES_ENDPOINT)
       return response.data
    }
    catch (error) {
       console.log(error);
   }
}