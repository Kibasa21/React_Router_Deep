import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';

export default function EventsPage() {

    const data = useLoaderData(); //Isso serve para pegar o dado de um loader na pagina em que ele reside ou num componente atrelado a essa pagina
    const events = data.events;
    
    return (
        <EventsList events={events} />
    );
}

export async function loader() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {

    } else {
        return response;
    }
}