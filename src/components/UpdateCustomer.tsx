import { useState } from "react";
import type { CustomerItem } from "../types";
import CustomerForm from "./CustomerForm";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

type UpdateCustomerProps = {
    fetchCustomers: () => void;
    CustomerItem: CustomerItem;
}

function UpdateCustomer(props: UpdateCustomerProps) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<CustomerItem>({} as CustomerItem);

    
    const handleClickOpen = () => {
    setOpen(true);

    setCustomer({
    firstname: props.CustomerItem.firstname,
    lastname: props.CustomerItem.lastname,
    streetaddress: props.CustomerItem.streetaddress,
    postcode: props.CustomerItem.postcode,
    city: props.CustomerItem.city,
    email: props.CustomerItem.email,
    phone: props.CustomerItem.phone
  })
  };

     const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(props.CustomerItem._links?.self.href  || "", {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error")
        }
        return response.json()
    })
    .then(() => props.fetchCustomers())
    .catch(err => console.log(err))
    handleClose();
  };

  

    return (
        <>
        <IconButton onClick={handleClickOpen} title="Edit">
        <EditIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Customer information</DialogTitle>
        <CustomerForm customer={customer} setCustomer={setCustomer} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
        </>
    );
}

export default UpdateCustomer