import { type CustomerItem, type TrainingItem } from "../types"
import { MenuItem, TextField } from "@mui/material";
import { DialogContent } from "@mui/material";
import { useState, useEffect } from "react";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";



type TrainingFormProps = {
    training: TrainingItem
    setTraining: React.Dispatch<React.SetStateAction<TrainingItem>>
    customerURL: string
    setCustomerURL: React.Dispatch<React.SetStateAction<string>>
}

function TrainingForm(props: TrainingFormProps) {

    const [customers, setCustomers] = useState<CustomerItem[]>([]);

    useEffect(() => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
            .then(response => {
                if (!response.ok) throw new Error("Could not load customers");
                return response.json();
            })
            .then(data => setCustomers(data._embedded.customers))
            .catch(console.error);
    }, []);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DialogContent>
            <DateTimePicker
                format="DD.MM.YYYY HH;mm"
                label="Date"
                value={props.training.date ? dayjs(props.training.date) : null}
                onChange={newDate => props.setTraining({ ...props.training, date: newDate?.isValid() ? newDate.toISOString() : ""})}
                slotProps={{
                textField: {
                    fullWidth: true,
                variant: "standard",
                required: true,
                margin: "dense"
            },
            }}
            />
            <TextField
                required
                margin="dense"
                label="Duration"
                type="number"
                value={props.training.duration}
                onChange={e => props.setTraining({ ...props.training, duration: parseInt(e.target.value) })}
                fullWidth
                variant="standard"
            /><TextField
                required
                margin="dense"
                label="Activity"
                value={props.training.activity}
                onChange={e => props.setTraining({ ...props.training, activity: e.target.value })}
                fullWidth
                variant="standard"
            /><TextField
            select
                required
                margin="dense"
                label="Customer"
                value={props.customerURL}
                onChange={e => props.setCustomerURL(e.target.value)}
                fullWidth
                variant="standard"
                >
                {customers.map(customer => {
                    const url  = customer._links?.self.href;
                    return url ? (
                        <MenuItem key={url} value={url}>
                            {customer.firstname} {customer.lastname}</MenuItem>
                    ) : null;
                })
                }
                
                </TextField>
        </DialogContent>
        </LocalizationProvider>
    );
}

export default TrainingForm