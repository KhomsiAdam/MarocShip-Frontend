/* eslint-disable react/jsx-props-no-spreading */
import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const DeliverySchema = Yup.object().shape({
  weight: Yup.string().required('Weight is required'),
  region: Yup.string().required('Region is required'),
  from: Yup.string().required('From is required'),
  to: Yup.string().required('To is required'),
  date: Yup.date().required('Date is required'),
});

function Deliveries({ endpoint }) {
  const [deliveries, setDeliveries] = useState();
  const [supervisor, setSupervisor] = useState(false);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const claimDelivery = async (e) => {
    try {
      const response = await axiosPrivate.patch(
        `/driver/delivery/${e.target.value}`
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelivery = async (e) => {
    try {
      const response = await axiosPrivate.patch(
        `/supervisor/deliver/${e.target.value}`
      );
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const activateDeliveries = async () => {
    try {
      const response = await axiosPrivate.patch('/supervisor/deliveries');
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.pathname.split('/')[1] === 'supervisor') setSupervisor(true);
    let isMounted = true;
    const controller = new AbortController();

    const getDeliveries = async () => {
      try {
        const response = await axiosPrivate.get(endpoint, {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setDeliveries(response.data);
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getDeliveries();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [endpoint]);

  return (
    <section>
      <div className="bg-gray-700 w-full h-screen overflow-y-auto users">
        <div className="container px-10 mx-auto grid">
          <div className="flex justify-between items-center">
            <h2 className="my-6 text-2xl font-semibold text-gray-100">
              Deliveries
            </h2>

            {supervisor ? (
              <>
                <button
                  type="button"
                  onClick={activateDeliveries}
                  className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Activate Deliveries
                </button>
                <label
                  htmlFor="delivery-modal"
                  className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Create Delivery
                  <span className="ml-2">+</span>
                </label>
                <input
                  type="checkbox"
                  id="delivery-modal"
                  className="modal-toggle"
                />
                <div className="modal">
                  <div className="modal-box bg-base-200">
                    <Formik
                      initialValues={{
                        weight: '',
                        region: '',
                        from: '',
                        to: '',
                        date: '',
                      }}
                      validationSchema={DeliverySchema}
                      onSubmit={async (
                        { weight, region, from, to, date },
                        formikHelpers
                      ) => {
                        console.log({ weight, region, from, to, date });
                        try {
                          const response = await axiosPrivate.post(
                            '/supervisor/delivery',
                            JSON.stringify({ weight, region, from, to, date }),
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
                            console.log('Missing Inputs');
                          } else if (err.response?.status === 401) {
                            console.log('Unauthorized');
                          } else {
                            console.log('Delivery creation Failed');
                          }
                        }
                        formikHelpers.resetForm();
                      }}
                    >
                      <Form className="flex flex-col gap-4 card bg-base-200 p-4 m-4 min-w-[350px] rounded-md">
                        <div className="form-control">
                          <label className="label" htmlFor="weight">
                            <span className="label-text">Weight</span>
                          </label>
                          <Field name="weight">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                {...field}
                                id="weight"
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
                            name="weight"
                            className="text-center text-red-500 font-bold mt-2"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label" htmlFor="region">
                            <span className="label-text">region</span>
                          </label>
                          <Field name="region">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                {...field}
                                id="region"
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
                            name="region"
                            className="text-center text-red-500 font-bold mt-2"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label" htmlFor="from">
                            <span className="label-text">from</span>
                          </label>
                          <Field name="from">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                {...field}
                                id="from"
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
                            name="from"
                            className="text-center text-red-500 font-bold mt-2"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label" htmlFor="to">
                            <span className="label-text">to</span>
                          </label>
                          <Field name="to">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                {...field}
                                id="to"
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
                            name="to"
                            className="text-center text-red-500 font-bold mt-2"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label" htmlFor="date">
                            <span className="label-text">date</span>
                          </label>
                          <Field name="date">
                            {({ field, meta: { touched, error } }) => (
                              <input
                                {...field}
                                id="date"
                                autoComplete="off"
                                type="date"
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
                            name="date"
                            className="text-center text-red-500 font-bold mt-2"
                          />
                        </div>
                        <div className="modal-action">
                          <button type="submit" className="btn bg-green-600">
                            <label htmlFor="delivery-modal">Confirm</label>
                          </button>
                          <label
                            htmlFor="delivery-modal"
                            className="btn bg-gray-600"
                          >
                            Close
                          </label>
                        </div>
                      </Form>
                    </Formik>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <Link
                  to="/driver/deliveries"
                  className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Available
                </Link>
                <Link
                  to="/driver/claimed"
                  className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Claimed
                </Link>
                <Link
                  to="/driver/delivered"
                  className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                >
                  Delivered
                </Link>
              </div>
            )}
          </div>

          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-700 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Weight</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Region</th>
                    <th className="px-4 py-3">From</th>
                    <th className="px-4 py-3">To</th>
                    <th className="px-4 py-3">Distance</th>
                    <th className="px-4 py-3">Status</th>
                    {supervisor ? <th className="px-4 py-3">Driver</th> : ''}
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                {deliveries?.length ? (
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    {deliveries.map((delivery) => {
                      const { driver } = delivery;
                      return (
                        <tr
                          key={delivery?._id}
                          className="text-gray-700 dark:text-gray-400"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <p className="font-semibold">{delivery?._id}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.weight} kg
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.amount} dh
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.region}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.from}
                          </td>
                          <td className="px-4 py-3 text-sm">{delivery?.to}</td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.distance} km
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {delivery?.status}
                          </td>
                          {supervisor ? (
                            <td className="px-4 py-3 text-sm">
                              {driver?.email}
                            </td>
                          ) : (
                            ''
                          )}
                          {supervisor && delivery?.status === 'Claimed' ? (
                            <td className="flex items-center justify-center space-x-4 my-4 text-sm">
                              <button
                                type="button"
                                value={delivery?._id}
                                onClick={confirmDelivery}
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg focus:shadow-outline-gray active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                                aria-label="Confirm"
                              >
                                Confirm
                              </button>
                            </td>
                          ) : (
                            ''
                          )}
                          {supervisor && delivery?.status !== 'Claimed' ? (
                            <td className="px-4 py-3 text-sm"></td>
                          ) : (
                            ''
                          )}
                          {!supervisor && delivery?.status === 'Pending' ? (
                            <td className="flex items-center justify-center space-x-4 my-4 text-sm">
                              <button
                                type="button"
                                value={delivery?._id}
                                onClick={claimDelivery}
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-white rounded-lg focus:shadow-outline-gray active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
                                aria-label="Claim"
                              >
                                Claim
                              </button>
                            </td>
                          ) : (
                            ''
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                ) : (
                  <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                    <tr className="text-gray-700 dark:text-gray-400">
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                      <td className="px-4 py-3" />
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Deliveries;
