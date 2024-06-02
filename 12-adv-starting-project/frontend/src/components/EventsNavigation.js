import { NavLink } from 'react-router-dom';
import classes from './EventsNavigation.module.css';

const EVENTS = [
  { path: '/events', title: 'All Events' },
  { path: '/events/new', title: 'New Event' }
];

function EventsNavigation() {
  return (
    <>
      <header className={classes.header}>
        <nav>
          <ul className={classes.list}>
            {EVENTS.map(({ path, title }) => <li key={path}><NavLink to={path} className={({ isActive }) => isActive ? classes.active : undefined} end>{title}</NavLink></li>)}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default EventsNavigation;
