import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const PATHS = [
  {path: '/', title: 'Home'},
  {path: '/events', title: 'Events'},
  // {path: '/events/new', title: 'New Event'}
];

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {PATHS.map(({path, title}) => <li key={path}><NavLink to={path} className={({isActive}) => isActive ? classes.active : undefined} end>{title}</NavLink></li>)}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
