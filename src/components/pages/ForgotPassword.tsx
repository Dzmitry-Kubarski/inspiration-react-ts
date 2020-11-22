// core
import React, { FC, useState, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// componnets
import Input from '../UI/Input';
import Button from '../UI/Button';
import Message from '../UI/Message';

// actions
import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions';

// store
import { RootState } from '../../store';


const ForgotPassword: FC = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(''));
      }

      if (success) {
        dispatch(setSuccess(''));
      }
    }
  }, [error, dispatch, success]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (success) {
      dispatch(setSuccess(''));
    }

    if (error) {
      dispatch(setError(''));
    }

    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, 'Email sent!'));
    setLoading(false);
  }

  return (
    <section className='form-page'>
      <div className='container'>
        <h2 className='form-page__title'>Сброс пароля</h2>

        <form className='form' onSubmit={submitHandler}>
          {error && <Message type='danger' msg={error} />}

          {success && <Message type='success' msg={success} />}

          <Input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder='Email address'
          />

          <div className='form__row'>
            <Button text={loading ? 'Loading...' : 'Отправить письмо для сброса пароля'} className='primary' disabled={loading} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ForgotPassword;