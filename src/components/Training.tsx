import { useEffect } from "react";
import { DataGrid, Toolbar } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { useOutletContext } from "react-router";
import type { TrainingItem } from "../types";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";
import { deleteTraining, getTrainings } from "../personaltrainerapi";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';


import Tooltip from '@mui/material/Tooltip';
import { ToolbarButton } from '@mui/x-data-grid';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportCsv } from "@mui/x-data-grid";



function CustomToolBar() {
    return(
        <Toolbar>
        <Tooltip title="Download as CSV">
              <ExportCsv render={<ToolbarButton />}>
                <FileDownloadIcon fontSize="small" />
              </ExportCsv>
            </Tooltip>
            </Toolbar>
    );
}


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
            field: 'customer', 
            headerName: 'Customer', 
            flex: 1,
            renderCell: ({ row }) => row.customer
                ? `${row.customer.firstname} ${row.customer.lastname}`
                : ""
        },

        //Delete button and function to every row
        {
            field: 'id',
            headerName: 'Delete',
            sortable: false,
            filterable: false,
            disableExport: true,  
            renderCell: (params: GridRenderCellParams) =>
                <IconButton onClick={() => handleDelete(params.row.id)} title="Delete">
                    <DeleteIcon color="error" />
                </IconButton>
        }

    ]



    const fetchTrainings = () => {
        
            getTrainings()  // -> personaltrainerapi.ts

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
            
                deleteTraining(id)   // -> personaltrainerapi.ts
                
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
                showToolbar
                slots={{ toolbar: CustomToolBar }}
            />
        </>
    )
}

export default Training