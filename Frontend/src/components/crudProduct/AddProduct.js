import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../../style/index.css";


const AddProduct = () => {
  const [Version, setVersion] = useState("");
  const [Product, setProduct] = useState("");
  const [Stock, setStock] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Di sini, kita ambil dan cetak token setiap kali komponen dipasang
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    console.log(jwtDecode(token));

    // Jika Anda perlu melakukan sesuatu dengan token setiap kali halaman baru dimuat, Anda dapat melakukannya di sini.
  }, []); // Array kosong menandakan bahwa efek ini hanya berjalan saat komponen dipasang (seperti componentDidMount).

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);

      if (!token) {
        console.error("Token is missing or invalid");
        return;
      }

      await axios.post(
        "http://localhost:5000/products",
        {
          versionId: Version,
          productName: Product,
          qty: Stock,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate("/product");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="bg-slate-800 h-screen">
      <div className="flex justify-center items-center">
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
                value={Version}
                onChange={(e) => setVersion(e.target.value)}
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
                value={Product}
                onChange={(e) => setProduct(e.target.value)}
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
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
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
