import { useEffect } from "react";

import { DataGrid, Toolbar } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import type { CustomerItem } from "../types";
import { useOutletContext } from "react-router";
import AddCustomer from "./AddCustomer";

import UpdateCustomer from "./UpdateCustomer";
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
        {
            field: '_links.customer.href',
            headerName: 'Edit',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <UpdateCustomer fetchCustomers={fetchCustomers} CustomerItem={params.row} />
        },
        {
            field: '_links.self.href',
            headerName: 'Delete',
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <IconButton onClick={() => handleDelete(params.row._links.self.href)} title="Delete">
                    <DeleteIcon color="error" />
                </IconButton>
        }

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

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error when deleting a customer");
                    }
                    return response.json();
                })
                .then(() => {
                    fetchCustomers();
                    //setOpen(true);
                })
                .catch(err => console.error(err))

        }

    }


    return (
        <>
            <AddCustomer fetchCustomers={fetchCustomers} />
            <DataGrid
                rows={customers || []}
                columns={columns}
                getRowId={row => row._links.self.href}
                showToolbar
                slots={{ toolbar: CustomToolBar }}
            />
        </>
    )
}

export default Customer