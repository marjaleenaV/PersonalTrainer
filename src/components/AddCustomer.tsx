import type { CustomerItem } from "../types";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import CustomerForm from "./CustomerForm";
import { addNewCustomer } from "../personaltrainerapi";


type AddCustomerProps = {
    fetchCustomers: () => void;
}

export default function AddCustomer(props: AddCustomerProps) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerItem>({} as CustomerItem);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
   addNewCustomer(customer)  // -> personeltrainerapi.ts
    .then(() => props.fetchCustomers())
    .catch(err => console.log(err))
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Customer</DialogTitle>
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