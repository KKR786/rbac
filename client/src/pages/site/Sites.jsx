import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuth";
import Modal from "../../components/Modal";
import Success from "../../components/toast/Success";
import Error from "../../components/toast/Error";
import { Link } from "react-router-dom";

function Sites() {
    const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [sites, setSites] = useState([])
  const [site, setSite] = useState('')
  const [logos, setLogos] = useState([])


  const fetchSiteList = async () => {
    const res = await fetch("/api/protected/sites", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();
    if (res.ok) {
      setSites(json);
    } else {
      setError(json.error || 'Failed to fetch sites');
    }
  };

  useEffect(() => {
    if (user) {
      fetchSiteList();
    }
  }, [user]);

  const handleImageChange = (e) => {
    setLogos([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", site);
    logos.forEach((image) => {
        formData.append("logos", image);
      });

    const res = await fetch("/api/protected/site", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Failed to create site");
      setSuccess(null);
    } else {
      setSuccess("Site created successfully!");
      setModalOpen(false);
      fetchSiteList();
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 7000);
  };

  return (
    <div className='p-4'>
        {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-lg font-bold text-center mb-2">Create Role</h2>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
              <label htmlFor="role" className="block mb-2 text-sm font-medium">
                Domain
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Domain Name"
                autoFocus
                onChange={(e) => setSite(e.target.value)}
                required
              />
            </div>
            <div>
            <label
                  htmlFor="logos"
                  className="block mb-2 text-sm font-medium"
                >
                  Product Images
                </label>
                <input
                  type="file"
                  name="logos"
                  id="logos"
                  className="block w-full text-sm text-gray-400 file:py-2 file:px-4 file:border file:border-gray-600 file:bg-gray-700 file:text-white file:rounded-lg hover:file:bg-gray-600"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
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
        </Modal>
      )}

      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}

      <div className="flex justify-between items-center border-b-2 border-solid border-[#eee] pb-2">
        <h1 className="text-3xl font-bold text-gray-900">Select a site</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setModalOpen(true)}
        >
          Add New Site
        </button>
      </div>

      {sites.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Site</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sites.map((data, i) => (
                <tr key={i} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    <Link to={`/site-config/${data._id}`} className="underline">{data.name}</Link>
                  </td>
                  <td className="flex items-center px-6 py-4">
                    <button onClick={() => deleteOnClick(data._id)} className="font-medium text-red-500 hover:underline ms-3">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Sites
