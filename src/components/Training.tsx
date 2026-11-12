import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { useOutletContext } from "react-router";
import type { TrainingItem } from "../types";
import dayjs from "dayjs";




function Training() {

        const { trainings, setTrainings } = useOutletContext<{
        trainings: TrainingItem[],
        setTrainings: (Events: TrainingItem[]) => void
    }>();


    const columns: GridColDef[] = [
        { field: 'date', headerName: 'Date', flex: 1, 
            valueFormatter: (value) => value ? dayjs(value).format("DD.MM.YYYY hh:mm") : "",
        },
        { field: 'duration', headerName: 'Duration', },
        { field: 'activity', headerName: 'Activitys', flex: 1 },
        { field: 'customer', headerName: 'Customer', flex: 1,
          renderCell: ({ row }) => `${row.customer.firstname} ${row.customer.lastname}`
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

    useEffect(() => {
        fetchTrainings();
    }, []);

    

    return (
        <>
            <DataGrid
                rows={trainings || []}
                columns={columns}
                getRowId={row => row.id}
                
            />
        </>
    )
}

export default Training