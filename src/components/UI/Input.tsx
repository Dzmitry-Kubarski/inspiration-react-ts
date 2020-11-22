// core
import React, { FC, InputHTMLAttributes } from 'react';

// ts
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}


const Input: FC<InputProps> = ({ type = 'text', placeholder, value, name, onChange, label, multiple }) => {
  return (
    <div className='form__row'>
      <div className='form__control'>
        {label && <label htmlFor={name}>{label}</label>}

        <input
          className='input'
          type={type}
          placeholder={placeholder}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          required
          autoComplete='off'
          multiple={multiple}
        />
      </div>
    </div>
  );
}

export default Input;