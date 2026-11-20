import { EventCalendar } from '@mui/x-scheduler/event-calendar';
import type { TrainingItem } from '../types';
import { useOutletContext } from 'react-router';
import { useEffect, useState } from 'react';
import { getTrainings } from '../personaltrainerapi';


type calendarEvent = {
    id: number,
    title: string,
    start: Date,
    end: Date

}


function Calendar() {

    const { trainings, setTrainings } = useOutletContext<{
        trainings: TrainingItem[]
        setTrainings: (Events: TrainingItem[]) => void
    }>();

    
//fetching trainings if trainings are empty
useEffect(() => {
    if (trainings.length === 0) {
        getTrainings()
        .then(responseData => {
                console.log(responseData);
                setTrainings(responseData);
                console.log("Received:", responseData.length, responseData.map((item: TrainingItem) => item.id));

            })
            .catch(err => console.error(err))
    }
},[])

//Making trainings to events
    const events = trainings.map( training =>
    ({
        id: training.id,
        title: training.activity + " / " + training.customer.firstname + " " + training.customer.lastname,
        start: new Date(training.date),
        end: new Date(new Date(training.date).getTime() + training.duration * 60000),

    }))


    return (
        <>
        
        <div style={{ height: 600, width: '100%' }}>
      <EventCalendar
        events={events}
        
      />
    </div>
        </>
    )
}

export default Calendar