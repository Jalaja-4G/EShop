  import {
    Grid,
    TextField,
    Paper,
    Button
  } from "@mui/material";
  import { fetchdata } from "./FetchData";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import { useState, useEffect } from "react";
  import { useSelector } from "react-redux";
  import { PRODUCTS_ENDPOINT } from "./api-endpoints";

  const ModifyProducts = () => {
    const [quantity, setQuantity] = useState(0)
    const [description, setDescription] = useState("")
    const [manufacturer, setManufacturer] = useState("")
    const [itemId, setItemId] = useState("")
    const navigate = useNavigate()
    const [searchParams] = useSearchParams(); 
    const productId = searchParams.get("id");
    
    const token = useSelector((state) => {
        console.log(state.users.token);
        return state.users.token
      })

    useEffect(() => {
        fetchdata()
          .then(res => {
            var selectedItem;
            selectedItem = res[productId];
            console.log(selectedItem._id)
            console.log(selectedItem.availableItems)
            console.log(selectedItem.description)
            console.log(selectedItem.manufacturer)
            console.log(token)
            setQuantity(selectedItem.availableItems)
            setDescription(selectedItem.description)
            setManufacturer(selectedItem.manufacturer)
            setItemId(selectedItem._id)
          });
     }, []);

    const doUpdate = () => {
        const UPDATE_PRODUCT_ENDPOINT = PRODUCTS_ENDPOINT + "/" + itemId;
        console.log(UPDATE_PRODUCT_ENDPOINT);
        fetch(UPDATE_PRODUCT_ENDPOINT, {
          method: "PUT",
          body: JSON.stringify({
            availableItems:quantity,
            description:description,
            manufacturer:manufacturer
          }),
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
          console.log("Product Updated successfully");
          alert("Product "+json.name+ " modified successfully");
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
      <div style={{ padding: 30 }}>
        <Paper>
          <Grid
            container
            spacing={3}
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
          >
            <Grid item xs={12}>
              <TextField label="Quantity" value={quantity} onChange={(event) => setQuantity(event.target.value)}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" value={description} type={description} onChange={(event) => setDescription(event.target.value)}></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Manufacturer" value={manufacturer} type={manufacturer} onChange={(event) => setManufacturer(event.target.value)}></TextField>
            </Grid>
            <Button fullWidth onClick={doUpdate}> Update </Button>
            </Grid>
        </Paper>
      </div>
    );
  };
  
  export default ModifyProducts;