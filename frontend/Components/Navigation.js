import React from 'react';
import './Navigation.scss';
import { Outlet, NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
      <nav className='comp-navigation'>
        <ul>
          <li> <NavLink className='nav-button' to='/'>Animal Search</NavLink> </li>
          <li> <NavLink className='nav-button' to='/add-animal'>Add Animal</NavLink> </li>
        </ul>
      </nav>
      <Outlet />
    </>
  )
}

export default Navigation;
