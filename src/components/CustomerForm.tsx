import type { CustomerItem } from "../types"
import { TextField } from "@mui/material";
import { DialogContent } from "@mui/material";

type CustomerFormProps= {
    customer: CustomerItem
    setCustomer: React.Dispatch<React.SetStateAction<CustomerItem>>
}

function CustomerForm(props: CustomerFormProps) {
    return(
        <DialogContent>
                <TextField
                  required
                  margin="dense"
                  label="Firstname"
                  value={props.customer.firstname}
                  onChange={e => props.setCustomer({ ...props.customer, firstname:e.target.value})}
                  fullWidth
                  variant="standard"
                />
                <TextField
                  required
                  margin="dense"
                  label="Lastname"
                  value={props.customer.lastname}
                  onChange={e => props.setCustomer({ ...props.customer, lastname:e.target.value})}
                  fullWidth
                  variant="standard"
                /><TextField
                  required
                  margin="dense"
                  label="Street Address"
                  value={props.customer.streetaddress}
                  onChange={e => props.setCustomer({ ...props.customer, streetaddress:e.target.value})}
                  fullWidth
                  variant="standard"
                /><TextField
                  required
                  margin="dense"
                  label="Post Code"
                  value={props.customer.postcode}
                  onChange={e => props.setCustomer({ ...props.customer, postcode:e.target.value})}
                  fullWidth
                  variant="standard"
                /><TextField
                  required
                  margin="dense"
                  label="City"
                  value={props.customer.city}
                  onChange={e => props.setCustomer({ ...props.customer, city:e.target.value})}
                  fullWidth
                  variant="standard"
                /><TextField
                  required
                  margin="dense"
                  label="Email"
                  value={props.customer.email}
                  onChange={e => props.setCustomer({ ...props.customer, email: e.target.value})}
                  fullWidth
                  variant="standard"
                /><TextField
                  required
                  margin="dense"
                  label="Phone"
                  value={props.customer.phone}
                  onChange={e => props.setCustomer({ ...props.customer, phone: e.target.value})}
                  fullWidth
                  variant="standard"
                />
            </DialogContent>
    )
}

export default CustomerForm