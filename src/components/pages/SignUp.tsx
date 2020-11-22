// core
import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// components
import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';

// actions
import { signup, setError } from '../../store/actions/authActions';

// store
import { RootState } from '../../store';


const SignUp: FC = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }
    }
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (error) {
      dispatch(setError(''));
    }
    setLoading(true);
    dispatch(signup({ email, password, firstName }, () => setLoading(false)));
  }

  return (
    <section className='form-page'>
      <div className='container'>
        <h2 className='form-page__title'>Регистрация</h2>

        <form className='form' onSubmit={submitHandler}>
          {error && <Message type='danger' msg={error} />}
          <Input
            name='firstName'
            value={firstName}
            onChange={(e) => setFirstName(e.currentTarget.value)}
            placeholder='First name'
          />

          <Input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='Email address'
          />

          <Input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            placeholder='Password'
          />

          <div className='form__row'>
            <Button text={loading ? 'Loading...' : 'Зарегистрироваться'} className='primary' disabled={loading} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;