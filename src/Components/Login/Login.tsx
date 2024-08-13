import axios from 'axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useContext } from 'react';
import '../../App.css';
import { AuthContext } from '../../Context/Context';

interface LoginForm {
  username: string;
  password: string;
}

export default function Login() {
  const { saveUserData } = useContext(AuthContext) as { saveUserData: () => void };
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    defaultValues: {
      username: 'emilys',
      password: 'emilyspass',
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axios.post('https://dummyjson.com/auth/login', data);
      localStorage.setItem('userToken', response.data.token);
      saveUserData();
      toast.success('Login Success');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid login-container px-4">
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-lg-4 col-12 bg-white py-4 px-4 rounded-4 responsive-tablet">
          <div className="pos-style position-relative ms-4">
            <h4 className="mt-3 mb-5 py-1">User Management System</h4>
          </div>
          <div className="text-form text-center">
            <h5 className="text-uppercase fw-bold">Sign-In</h5>
            <span className="text-muted">
              Enter your credentials to access your account
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="my-4">
            <div className="form-group">
              <label htmlFor="username" className="text-muted mb-1">Email</label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Enter Your email"
                {...register('username', {
                  required: 'Username is required',
                })}
              />
              {errors.username && (
                <span className="text-danger">{errors.username.message}</span>
              )}
            </div>
            <div className="form-group mt-3">
              <label htmlFor="password" className="text-muted mb-1">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                placeholder="Enter Your Password"
                {...register('password', {
                  required: 'Password is required',
                })}
              />
              {errors.password && (
                <span className="text-danger">{errors.password.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="btn btn-warning w-100 text-center text-light mt-4 mb-5 text-uppercase"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
