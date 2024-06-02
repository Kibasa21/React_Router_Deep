import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";

import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

export default function EventsDetailPage() {

    const { event, events } = useRouteLoaderData('event-detail'); //Isso serve para pegar o dado de um loader na pagina em que ele reside ou num componente atrelado a essa pagina

    return (
        <>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={event}>
                    {(loadedEvent) => <EventItem event={loadedEvent} />}
                </Await>
            </Suspense>
            <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
                <Await resolve={events}>
                    {(loadedEvent) => <EventsList events={loadedEvent} />}
                </Await>
            </Suspense>
        </>
    );
}

async function loadEvent(id) {
    const response = await fetch('http://localhost:8080/events/' + id) //Isso serve para dar load no dado atrelado ao evento clicado, o qual tem seu próprio id

    if (!response.ok) {
        throw json({ message: 'Could not fetch details for selected event.' }, { status: 500 })
    } else {
        const resData = await response.json(); //Tive que fazer parse pq o defer não já faz parse
        return resData.event;
    }
}

async function loadedEvents() {
    const response = await fetch('http://localhost:8080/events');

    if (!response.ok) {
        // return {isError: true, message: 'Failed to fetch events.'};
        // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {satatus: 500});
        throw json({ message: 'Could not fetch events.' }, { status: 500 });
    } else {
        const resData = await response.json(); //Tive que fazer parse pq o defer não já faz parse
        return resData.events;
    }
}//Esse loader serve para pegar os dados da API e passar para a pagina

export async function loader({ request, params }) {

    const id = params.eventId; //Esse params é o que está no path do App.js, O params serve para pegar os parametros da URL

    return defer({
        event: await loadEvent(id), //Esse await serve para esperar o dado ser carregado, ele é bom para quando você quer carregar um dado antes de renderizar a página, ele fará com que o outro load tenha que esperar
        events: loadedEvents(),
    });
}

export async function action({ params, request }) { //A diferença entre action e loader é que o action é executado no frontend, enquanto o loader é executado no backend

    const id = params.eventId;

    const response = await fetch('http://localhost:8080/events/' + id, {
        method: request.method, //O request é o que foi passado pelo eventItem no App.js, mas podem ser outros, por isso ele ta pegando o input.
    });

    if (!response.ok) {
        throw json({ message: 'Could not delete event.' }, { status: 500 })
    } else {
        return redirect('/events');
    }
}