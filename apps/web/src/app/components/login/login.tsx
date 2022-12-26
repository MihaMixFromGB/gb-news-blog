import useAuth from '../../hooks/useAuth';

/* eslint-disable-next-line */
export interface LoginProps {}

export function Login(props: LoginProps) {
  const { login } = useAuth();

  return (
    <div>
      <h1>Welcome to Login!</h1>
      <button
        onClick={() => {
          login('batman@gmail.com', 'batman001');
        }}
      >
        LOG IN
      </button>
    </div>
  );
}

export default Login;
