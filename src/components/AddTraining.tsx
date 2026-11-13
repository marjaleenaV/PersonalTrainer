import type { TrainingItem } from "../types";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Dialog, DialogTitle, DialogActions } from "@mui/material";
import TrainingForm from "./TrainingForm";


type AddTrainingProps = {
    fetchTrainings: () => void;
}

function AddTraining(props: AddTrainingProps) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState<TrainingItem>({} as TrainingItem);
  const [customerURL, setCustomerURL] = useState("");

  const handleClickOpen = () => {
    setTraining({} as TrainingItem);
    setCustomerURL("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
   fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...training, customer: customerURL})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error")
        }
        return response.json()
    })
    .then(() => props.fetchTrainings())
    .catch(err => console.log(err))
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <TrainingForm training={training} setTraining={setTraining} customerURL={customerURL} setCustomerURL={setCustomerURL}/>
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

export default AddTraining