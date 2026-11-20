import type { CustomerItem, TrainingItem } from "./types.ts";

export function getCustomers() {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers")
    
                .then(response => {
    
                    if (!response.ok) {
                        throw new Error("Something went wrong");
                    }
                    return response.json();
    
                })
}

export function getTrainings() {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/gettrainings")
            .then(response => {

                if (!response.ok) {
                    throw new Error("Something went wrong");
                }
                return response.json();
            })
}

export function deleteCustomer(url: string) {
    return fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error when deleting a customer");
                    }
                    return response.json();
                })
}

export function deleteTraining(id: number) {
    return fetch(`https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/${id}`, {method: 'DELETE' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Error when deleting a training");
                    }
                    return response.json();
                })
}

export function addNewCustomer(customer: CustomerItem) {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Error")
        }
        return response.json()
    })
}

export function addNewTraining(training: TrainingItem, customerURL: string) {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
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
} 
