import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useOutletContext } from "react-router";
import type { TrainingItem } from "../types";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";
import { Button } from "@mui/material";



function Training() {

    const { trainings, setTrainings } = useOutletContext<{
        trainings: TrainingItem[],
        setTrainings: (Events: TrainingItem[]) => void
    }>();


    const columns: GridColDef[] = [
        {
            field: 'date', headerName: 'Date', flex: 1,
            valueFormatter: (value) => value ? dayjs(value).format("DD.MM.YYYY HH:mm") : "",
        },
        { field: 'duration', headerName: 'Duration', },
        { field: 'activity', headerName: 'Activitys', flex: 1 },
        
        //Dropdown list of already existing customers -> customer needs to be created in customerpage
        {
            field: 'customer', headerName: 'Customer', flex: 1,
            renderCell: ({ row }) => row.customer
                ? `${row.customer.firstname} ${row.customer.lastname}`
                : ""
        },
        //Delete button and function to every row
        {
            field: 'id',
            headerName: ' ',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <Button style={{ color: "red" }} onClick={() => handleDelete(params.row.id)}>
                    Delete
                </Button>
        }

    ]



    const fetchTrainings = () => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                return response.json();
            })

            .then(responseData => {
                console.log(responseData);
                setTrainings(responseData);
                console.log("Received:", responseData.length, responseData.map((item: TrainingItem) => item.id));

            })
            .catch(err => console.error(err))
    };

    //Fetch the data when page is opened
    useEffect(() => {
        fetchTrainings();
    }, []);

    //Search a correct training based on id of training and deletes it.
    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error when deleting a training");
                    }
                    return response.json();
                })
                .then(() => {
                    fetchTrainings();
                    
                })
                .catch(err => console.error(err))

        }
    }


    return (
        <>
            <AddTraining fetchTrainings={fetchTrainings} />
            <DataGrid
                rows={trainings || []}
                columns={columns}
                getRowId={row => row.id}

            />
        </>
    )
}

export default Training