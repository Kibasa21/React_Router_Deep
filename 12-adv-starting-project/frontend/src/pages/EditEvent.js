import { useRouteLoaderData } from 'react-router-dom';
import EventForm from '../components/EventForm';

export default function EditEventPage() {

    const data = useRouteLoaderData('event-detail'); //O useRouteLoaderData é um hook que pega os dados que foram carregados no loader. Mas ele precisa do id do loader que foi passado no App.js

    return (
        <EventForm event={data.event} method='PATCH' /> //Patch é um método HTTP que serve para atualizar um recurso
    );
}