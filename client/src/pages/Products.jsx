import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import Success from "../components/toast/Success";
import Error from "../components/toast/Error";
import { useAuthContext } from "../hooks/useAuth";

export default function Products() {
  const { user } = useAuthContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
  });

  const fetchProductList = async () => {
    const res = await fetch("/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();
    if (res.ok) {
      setProducts(json);
    } else {
      setError(json.error || 'Failed to fetch products');
    }
  };

  useEffect(() => {
    if (user) {
        fetchProductList();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    images.forEach((image) => {
      data.append("images", image);
    });
    console.log(data);

    const res = await fetch("/api/protected/product", {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      setError(json.error || "Failed to create product");
      setSuccess(null);
    } else {
      setSuccess("Product created successfully!");
      console.log(data);
      setModalOpen(false);
    }

    setTimeout(() => {
      setError(null);
      setSuccess(null);
    }, 7000);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          <h2 className="text-lg font-bold text-center mb-2">Create Product</h2>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Product Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Product Description"
                rows="4"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="flex space-x-4">
              {/* Price */}
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Product Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Quantity */}
              <div className="flex-1">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium mb-2"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  min="0"
                  className="w-full p-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter Product Quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="groceries">Groceries</option>
                  <option value="beauty">Beauty</option>
                  <option value="books">Books</option>
                </select>
              </div>

              {/* Image Upload */}
              <div className="flex-1">
                <label
                  htmlFor="images"
                  className="block mb-2 text-sm font-medium"
                >
                  Product Images
                </label>
                <input
                  type="file"
                  name="images"
                  id="images"
                  className="block w-full text-sm text-gray-400 file:py-2 file:px-4 file:border file:border-gray-600 file:bg-gray-700 file:text-white file:rounded-lg hover:file:bg-gray-600"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:ring-primary-800"
            >
              Add Product
            </button>
          </form>
        </Modal>
      )}

      {success && <Success message={success} />}
      {error && <Error message={String(error)} />}

      <div className="flex justify-between items-center border-b-2 border-solid border-[#eee] pb-2">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={() => setModalOpen(true)}
        >
          Add New Product
        </button>
      </div>

      {products.length > 0 && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-400">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Category</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Quantity</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((data, i) => (
                <tr key={i} className="border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                    <td className="px-6 py-4">
                        <img src={`http://localhost:2006/${data.images[0].replace(/\\/g, "/")}`} className="w-8 h-8"/>
                    </td>
                  <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-white">
                    {data.name}
                  </td>
                  <td className="px-6 py-4">{data.category}</td>
                  <td className="px-6 py-4">{data.price}</td>
                  <td className="px-6 py-4">{data.quantity}</td>
                  <td className="flex items-center px-6 py-4">
                    <button onClick={() => editOnClick(data._id)} className="font-medium text-blue-500 hover:underline">Edit</button>
                    <button onClick={() => deleteOnClick(data._id)} className="font-medium text-red-500 hover:underline ms-3">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
