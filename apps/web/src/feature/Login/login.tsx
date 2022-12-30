import React from 'react';
import { ChangeEvent, useState } from 'react';
import useAuth from '../../hooks/useAuth';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { type: inputType, value } = e.target;
    if (inputType === 'email') {
      setEmail(value);
    } else if (inputType === 'password') {
      setPassword(value);
    }
  };

  return (
    <div className="flex flex-col xl:w-5/12 lg:w-5/12 md:w-8/12 my-6 mx-auto">
      <div className="mb-6">
        <input
          type="email"
          className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          className="block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>
      <div className="flex justify-between gap-3">
        <button
          className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => {
            login(email, password);
          }}
        >
          LOG IN
        </button>
        <button
          className="inline-block w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          onClick={() => {
            setEmail('batman@gmail.com');
            setPassword('batman001');
          }}
          title="Set Batman's credetials"
        >
          Like Batman
        </button>
      </div>
    </div>
  );
}

export default Login;
