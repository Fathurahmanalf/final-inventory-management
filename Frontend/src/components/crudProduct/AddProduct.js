import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar';
import { MdError } from 'react-icons/md';

const AddProduct = () => {
  const [versionId, setVersionId] = useState("");
  const [productName, setProductName] = useState("");
  const [qty, setQty] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("Token is missing or invalid");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/products",
        {
          versionId: versionId,
          productName: productName,
          qty: qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 2000
      });

      navigate("/product");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage || 'Check your data again!',
        });
      }
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center">
        <div className="max-w-xl mx-auto w-full">
          <form
            className="bg-white shadow-md rounded px-5 pt-6 pb-8 mb-4"
            onSubmit={createProduct}
          >
            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="version"
              >
                Version
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black bg-white leading-tight focus:outline-none focus:shadow-outline"
                id="version"
                value={versionId}
                onChange={(e) => setVersionId(e.target.value)}
              >
                <option value="" disabled selected></option>
                <option value="1">Playstation 1</option>
                <option value="2">Playstation 2</option>
                <option value="3">Playstation 3</option>
                <option value="4">Playstation 4</option>
                <option value="5">Playstation 5</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="product"
              >
                Product
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="product"
                type="text"
                placeholder="Product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-black text-sm font-bold mb-2"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                id="stock"
                type="text"
                placeholder="Stock"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>

            {errorMessage && (
              <div role="alert" className="text-black text-md font-light alert alert-warning my-5">
              <p className='flex justify-center items-center text-black text-sm'> <MdError /> {errorMessage}</p>
              </div>
            )}

            <div className="flex items-center justify-center">
              <button
                className="btn btn-info w-full text-white font-bold"
                type="submit"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
