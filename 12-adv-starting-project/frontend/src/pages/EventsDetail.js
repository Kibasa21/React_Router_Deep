import { Link, useParams } from "react-router-dom";

export default function EventsDetailPage() {

    const event = useParams();

    return (
        <>
            <h1>Events Detail Page</h1>
            <p>{event.eventId}</p>
            <p><Link to='edit'>Edit Event</Link></p>
            <p><Link to='..' relative="path">Back to Events Page</Link></p>
        </>
    );
}