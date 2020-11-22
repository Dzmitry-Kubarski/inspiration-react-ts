// core
import React, { FC } from 'react';
import { useHistory, Link, useLocation, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// components
import Button from '../UI/Button';

// store
import { RootState } from '../../store';

// actions
import { signout } from '../../store/actions/authActions';

// icons
import LogoSvg from './../SVG/LogoSvg';


const Header: FC = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  }

  return (
    <header className='header'>
      <div className='container'>
        <div className='header__inner'>

          <div className='logo'>
            <Link className='logo__link' to={!authenticated ? '/' : location.pathname === '/dashboard' ? '/' : '/dashboard'}>
              <LogoSvg />
            Вдохновение
            </Link>
          </div>

          <nav className='header__menu'>
            <NavLink className='header__link' to='/' exact>Все фото</NavLink>
            <NavLink className='header__link' to='/dashboard' exact>Моё</NavLink>
          </nav>

          {!authenticated
            ? <div className='header__buttons'>
              <Button text='Регистрация' onClick={() => history.push('/signup')} className='primary' />
              <Button text='Войти' onClick={() => history.push('/signin')} className='secondary' />
            </div>

            : <Button text='Выйти' onClick={logoutClickHandler} className='primary' />
          }
        </div>
      </div>
    </header>
  );
}

export default Header;