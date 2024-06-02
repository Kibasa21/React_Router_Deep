import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

export default function EventsPage() {

    const { events } = useLoaderData(); //Isso serve para pegar o dado de um loader na pagina em que ele reside ou num componente atrelado a essa pagina

    return (
        <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}> {/*Esse suspense serve para mostrar uma mensagem enquanto o dado está sendo carregado*/}
            <Await resolve={events}>{/*Esse await serve para esperar o dado ser carregado, ele é bom para quando você quer carregar um dado antes de renderizar a página, ele está atrelado ao defer*/}
                {(loadeEvents) => <EventsList events={loadeEvents} />}{/*Esse é o children do await, ele é uma função que é chamada quando o dado é carregado, ele é bom para renderizar o dado que foi carregado*/}
            </Await>
        </Suspense>
    );
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

export function loader() {
    return defer({ //nesse defer você pode passar um objeto com todos os https requests que têm nessa pagina, cada propriedade é um request
        events: loadedEvents(), //o retorno deve ser um promise
    });
}