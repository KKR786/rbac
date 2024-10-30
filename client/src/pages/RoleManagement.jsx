import {useState} from "react"
import Modal from "../components/Modal";

function RoleManagement() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState('');
  const [permissions, setPermissions] = useState([]);

  const handleSubmit = () => {
    console.log(role, permissions);
  }

  return (
    <div className="p-4">
    {isModalOpen && 
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-lg font-bold text-center mb-2">Create Role</h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium"
                >
                  New Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Member"
                  autoFocus
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="permissions"
                  className="block mb-2 text-sm font-medium"
                >
                  Permissions
                </label>
                <input
                  type="text"
                  name="permissions"
                  id="permissions"
                  placeholder="read_record"
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setPermissions(e.target.value)}
                  required
                />
              </div>
 
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-800"
              >
                Create
              </button>
            </form>
          
      </Modal>}
      <div className="flex items-center justify-between mb-3">
          <h1 className='list-heading'>Roles List</h1>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setModalOpen(true)}>
            Add New Role
          </button>
        </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-400">
          <thead className="text-xs uppercase bg-gray-700 text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                # Users
              </th>
              <th scope="col" className="px-6 py-3">
                Permissions
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Supreme
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">
                create_record, read_record, update_record, delete_record
              </td>
              <td class="flex items-center px-6 py-4">
                    <a href="#" class="font-medium text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Admin
              </th>
              <td className="px-6 py-4">3</td>
              <td className="px-6 py-4">
                create_record, read_record, update_record
              </td>
              <td class="flex items-center px-6 py-4">
                    <a href="#" class="font-medium text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
            <tr className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                Member
              </th>
              <td className="px-6 py-4">9</td>
              <td className="px-6 py-4">read_record</td>
              <td class="flex items-center px-6 py-4">
                    <a href="#" class="font-medium text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="font-medium text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RoleManagement;
