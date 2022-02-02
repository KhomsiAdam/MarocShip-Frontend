import Users from './Users';

function Supervisors() {
  return (
    <section>
      <div className="bg-gray-100 w-full h-screen overflow-y-auto users">
        <div className="container px-10 mx-auto grid">
          <div className="flex justify-between items-center">
            <h2 className="my-6 text-2xl font-semibold text-gray-100">
              Supervisors
            </h2>

            <a
              href="/admin/managers/create"
              className="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-gray-800 border border-transparent rounded-lg active:bg-green-600 hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            >
              Create Supervisor
              <span className="ml-2">+</span>
            </a>
          </div>

          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                    <th className="px-4 py-3">Id</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Created</th>
                    <th className="px-4 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <Users endpoint="/manager/supervisors" />
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Supervisors;
