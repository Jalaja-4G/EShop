import { ADDRESSES_ENDPOINT } from "./api-endpoints";

export const FetchAddresses = async (token) => {
    try {
        const response = fetch(ADDRESSES_ENDPOINT, {
            method: "GET",
            headers: {
                "x-auth-token": token,
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        return response
    }
    catch(error) {
        // add an alert here that displays an error message that says wrong username or password
        console.log(error.message)
    }
}