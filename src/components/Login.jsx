/* eslint-disable react/jsx-props-no-spreading */
import { useNavigate, useLocation } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import useAuth from '../hooks/useAuth';
import axios from '../api/axios';

const LOGIN_URL = '/login';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || '/';

  // console.log(from);
  return (
    <section className="flex flex-col items-center justify-center h-screen w-screen bg-green-600">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={async ({ email, password }, formikHelpers) => {
          console.log({ email, password });
          try {
            const response = await axios.post(
              LOGIN_URL,
              JSON.stringify({ email, password }),
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
            );
            console.log(response?.data);
            const accessToken = response?.data?.token;
            const roles = response?.data?.role;
            setAuth({
              email,
              password,
              roles,
              accessToken,
            });
            navigate(`/${roles[0].toLowerCase()}`, { replace: true });
          } catch (err) {
            if (!err?.response) {
              console.log('No Server Response');
            } else if (err.response?.status === 400) {
              console.log('Missing Email or Password');
            } else if (err.response?.status === 401) {
              console.log('Unauthorized');
            } else {
              console.log('Login Failed');
            }
          }
          formikHelpers.resetForm();
        }}
      >
        <Form className="flex flex-col gap-4 card bg-base-200 p-4 m-4 min-w-[350px] rounded-md">
          <div className="form-control">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <Field name="email">
              {({ field, meta: { touched, error } }) => (
                <input
                  {...field}
                  id="email"
                  autoComplete="off"
                  type="text"
                  className={
                    touched && error
                      ? 'input input-error input-bordered'
                      : 'input input-bordered'
                  }
                />
              )}
            </Field>
            <ErrorMessage
              component="span"
              name="email"
              className="text-center text-red-500 font-bold mt-2"
            />
          </div>
          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Username</span>
            </label>
            <Field name="password">
              {({ field, meta: { touched, error } }) => (
                <input
                  {...field}
                  id="password"
                  autoComplete="off"
                  type="password"
                  className={
                    touched && error
                      ? 'input input-error input-bordered'
                      : 'input input-bordered'
                  }
                />
              )}
            </Field>
            <ErrorMessage
              component="span"
              name="password"
              className="text-center text-red-500 font-bold mt-2"
            />
          </div>
          <button type="submit" className="btn btn-block my-4 bg-green-600">
            Sign In
          </button>
        </Form>
      </Formik>
    </section>
  );
}

export default Login;
