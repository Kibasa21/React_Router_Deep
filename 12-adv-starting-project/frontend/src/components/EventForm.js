import { Form, redirect, json, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();// useActionData serve para pegar os dados da action que foi disparada
  const navigate = useNavigate();
  const navigation = useNavigation();// useNavigation serve para pegar informações sobre a navegação, se estamos numa transição, estamos carregando

  const isSubmitting = navigation.state === 'submitting' // dados para uma transição ou não há transição de páginas.

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}> {/* Form is a component from react-router-dom, ele é diferente de form. Ele ja vem com o event.preventDefault() e pega os dados do forms e manda para a action*/}
      {(data && data.errors) && <ul>
        {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
      </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required defaultValue={event ? event.title : ''} />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event ? event.date : ''} />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export async function action({ request, params }) { //Quero fazer com que essa action seja mais dinâmica, ela pode criar eventos e também editá-los
  //request, no geral, serve para pegar os dados do formulário e o params serve para pegar os parametros da URL
  const method = request.method; //O request é o que foi passado pelo Form do EventForm no App.js, e o method é um método que pega o método do formulário
  const data = await request.formData(); //O request é o que foi passado pelo Form do EditEventPage no App.js, e o formData é um método que pega os dados do formulário

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description')
  } //O get é um método que pega o valor do input com o name passado

  let URL = 'http://localhost:8080/events';

  if (method === 'PATCH') {
    const eventId = params.eventId;
    URL += '/' + eventId;
  }
  
  const response = await fetch(URL, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  if (response.status === 422) { //422 é um erro de validação
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could no save event.' }, { status: 500 })
  } else {
    return redirect('/events');
  }
} //Esse action serve para pegar os dados do formulário e mandar para a API, e redirecionar para a página de eventos
