import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuth";
import Modal from "../components/Modal";

function RoleManagement() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [getRoles, setGetRoles] = useState([]);

  const fetchRoleList = async () => {
    const res = await fetch("/api/protected/role/all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
        },
    });

    const json = await res.json();
    if (res.ok) {
        setGetRoles(json);
    }
};

useEffect(() => {
    if (user) {
        fetchRoleList();
    }
}, [user]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const res = await fetch("/api/protected/role/create", {
      method: "POST",
      body: JSON.stringify({role, permissions}),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();
    
    if (!res.ok) {
      setError(json.error);
      setSuccess('')
    }
    if (res.ok) {
      setRole("");
      setPermissions([]);
      setSuccess("Role added successfully!");
      setError('')
    }
  };

  const handlePermissions = (e) => {
    const { value, checked } = e.target;
    
    if (checked) {
      setPermissions((prevPermissions) => [...prevPermissions, value]);
  } else {
      setPermissions((prevPermissions) => 
          prevPermissions.filter((permission) => permission !== value)
      );
  }
  };

  const editOnClick = () => {}

  const deleteOnClick = async (id) => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/protected/role/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      console.log('deleted', json);
      fetchRoleList();
    }
  };
  
  return (
    <div className="p-4">
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-lg font-bold text-center mb-2">Create Role</h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium">
                New Role
              </label>
              <input
                type="text"
                name="role"
                id="role"
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Role Name"
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

              <div className="flex justify-between items-center flex-wrap">
                <div className="flex items-center ps-4 pr-[5px] bg-gray-700 border rounded-lg border-gray-700 mb-2">
                  <input
                    id="bordered-checkbox-1"
                    type="checkbox"
                    value="read_record"
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600"
                    onChange={handlePermissions}
                  />
                  <label
                    htmlFor="bordered-checkbox-1"
                    className="w-full py-3 ms-2 text-sm font-medium text-white"
                  >
                    read_record
                  </label>
                </div>
                <div className="flex items-center ps-4 pr-[5px] bg-gray-700 border rounded-lg border-gray-700 mb-2">
                  <input
                    id="bordered-checkbox-2"
                    type="checkbox"
                    value="create_record"
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600"
                    onChange={handlePermissions}
                  />
                  <label
                    htmlFor="bordered-checkbox-2"
                    className="w-full py-3 ms-2 text-sm font-medium text-white"
                  >
                    create_record
                  </label>
                </div>
                <div className="flex items-center ps-4 pr-[5px] bg-gray-700 border rounded-lg border-gray-700 mb-2">
                  <input
                    id="bordered-checkbox-3"
                    type="checkbox"
                    value="update_record"
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600"
                    onChange={handlePermissions}
                  />
                  <label
                    htmlFor="bordered-checkbox-3"
                    className="w-full py-3 ms-2 text-sm font-medium text-white"
                  >
                    update_record
                  </label>
                </div>
                <div className="flex items-center ps-4 pr-[5px] bg-gray-700 border rounded-lg border-gray-700">
                  <input
                    id="bordered-checkbox-4"
                    type="checkbox"
                    value="delete_record"
                    name="bordered-checkbox"
                    className="w-4 h-4 text-blue-600 rounded ring-offset-gray-800 bg-gray-700 border-gray-600"
                    onChange={handlePermissions}
                  />
                  <label
                    htmlFor="bordered-checkbox-4"
                    className="w-full py-3 ms-2 text-sm font-medium text-white"
                  >
                    delete_record
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-800"
            >
              Create
            </button>
          </form>
        </Modal>
      )}

      <div className="flex items-center justify-between mb-3">
        <h1 className="list-heading">Roles List</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => setModalOpen(true)}
        >
          Add New Role
        </button>
      </div>

      {getRoles && <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
            {getRoles.map((data, i) => (
            <tr key={i} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white"
              >
                {data.role}
              </th>
              <td className="px-6 py-4">1</td>
              <td className="px-6 py-4">
                {data.permissions.join(', ')}
              </td>
              <td class="flex items-center px-6 py-4">
                <button onClick={() => editOnClick(data._id)} className="font-medium text-blue-500 hover:underline">
                  Edit
                </button>
                <button
                  onClick={() => deleteOnClick(data._id)}
                  className="font-medium text-red-500 hover:underline ms-3"
                >
                  Remove
                </button>
              </td>
            </tr>))}
          </tbody>
        </table>
      </div>}
    </div>
  );
}

export default RoleManagement;
