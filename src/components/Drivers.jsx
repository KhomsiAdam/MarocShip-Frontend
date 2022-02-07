/* eslint-disable react/jsx-props-no-spreading */
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { axiosPrivate } from '../api/axios';
import Users from './Users';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

function Drivers() {
  return (
    <section>
      <div className="bg-gray-700 w-full h-screen overflow-y-auto users">
        <div className="container px-10 mx-auto grid">
          <div className="flex justify-between items-center">
            <h2 className="my-6 text-2xl font-semibold text-gray-100">
              Drivers
            </h2>

            <label
              htmlFor="driver-modal"
              className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            >
              Create Driver
              <span className="ml-2">+</span>
            </label>
            <input type="checkbox" id="driver-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box bg-base-200">
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validationSchema={LoginSchema}
                  onSubmit={async ({ email, password }, formikHelpers) => {
                    console.log({ email, password });
                    try {
                      const response = await axiosPrivate.post(
                        '/manager/driver',
                        JSON.stringify({ email, password }),
                        {
                          headers: { 'Content-Type': 'application/json' },
                          withCredentials: true,
                        }
                      );
                      console.log(response);
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
                        <span className="label-text">Password</span>
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
                    <div className="modal-action">
                      <button type="submit" className="btn bg-green-600">
                        <label htmlFor="driver-modal">Confirm</label>
                      </button>
                      <label htmlFor="driver-modal" className="btn bg-gray-600">
                        Close
                      </label>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>

          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-700 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Created</th>
                  </tr>
                </thead>
                <Users endpoint="/manager/drivers" />
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Drivers;
