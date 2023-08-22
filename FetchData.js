import axios from 'axios';
import { PRODUCTS_ENDPOINT} from './api-endpoints';

export const fetchdata = async () => {
   try{
       const response = await axios.get(PRODUCTS_ENDPOINT)
       return response.data
    }
    catch (error) {
       console.log(error);
   }
}