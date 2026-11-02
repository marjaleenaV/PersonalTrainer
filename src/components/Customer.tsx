import { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import type { CustomerItem } from "../types";
import { useOutletContext } from "react-router";


function Customer() {

    const { customers, setCustomers } = useOutletContext<{
        customers: CustomerItem[],
        setCustomers: (Events: CustomerItem[]) => void
    }>();


    const columns: GridColDef[] = [
        { field: 'firstname', headerName: 'Firstname' },
        { field: 'lastname', headerName: 'Lastname', flex: 1 },
        { field: 'streetaddress', headerName: 'Address', flex: 1 },
        { field: 'postcode', headerName: 'Postcode' },
        { field: 'city', headerName: 'City' },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },

    ]

    const fetchCustomers = () => {
        fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")

            .then(response => {

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                return response.json();

            })

            .then(responseData => {
                console.log(responseData);
                setCustomers(responseData._embedded.customers);
            })
            .catch(err => console.error(err))
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <>
            <DataGrid
                rows={customers || []}
                columns={columns}
                getRowId={row => row._links.self.href}
                
            />
        </>
    )
}

export default Customer