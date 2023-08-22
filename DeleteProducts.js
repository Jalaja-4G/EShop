
  import { fetchdata } from "./FetchData";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import { PRODUCTS_ENDPOINT } from "./api-endpoints";
  import {Button, Grid, Paper} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";


  const DeleteProducts = () => {
    const [itemId, setItemId] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams(); 
    const productId = searchParams.get("id");
    
    const token = useSelector((state) => {
        console.log(state.users.token);
        return state.users.token
      })

    const [productName, setProductName] = useState("");

    useEffect(() => {
        fetchdata()
          .then(res => {
            var selectedItem;
            selectedItem = res[productId];
            setProductName(selectedItem.name);
            console.log(productId);
            setItemId(selectedItem._id)
          });
     }, []);

    const doDelete = () => {

        const DELETE_PRODUCT_ENDPOINT = PRODUCTS_ENDPOINT + "/" + itemId;
        console.log(DELETE_PRODUCT_ENDPOINT);
        fetch(DELETE_PRODUCT_ENDPOINT, {
          method: "DELETE",
          headers: {
            "Authentication" : "Bearer {" + token + "}",
            "Content-type": "application/json; charset=UTF-8"
          }
        })
        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error(response.status + ":" + response.statusText);
          }
          return response.json()
        })
        .then((json) => {
          console.log("Product Deleted successfully");
          //alert("Product Deleted successfully");
          //localStorage.setItem(email, json.access_token);
          //dispatch(userLogin(email, json.access_token));
          navigate("/products");
        })
        .catch (error => {
          // add an alert here that displays an error message that says wrong username or password
          console.log(error.message)
        })
    }

    return (
      <div>
            <h1>Product {productName} deleted successfully </h1>
            <Button onClick={doDelete}>Go Back to Products Page</Button>
      </div>
    );
};

  export default DeleteProducts;