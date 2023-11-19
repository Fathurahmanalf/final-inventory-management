import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


const LogActivity = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOption, setSortOption] = useState('version'); // Default sorting option

    const isStaff = jwtDecode(localStorage.getItem("token")).data.role == "Staff"
    console.log(jwtDecode)
    console.log(jwtDecode(localStorage.getItem("token")))

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token:", token);

            if (!token) {
                return;
            }

            const response = await axios.get("http://localhost:5000/products", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchProductById = async (id) => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await axios.get(`http://localhost:5000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSelectedProduct(response.data);
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
        }
    };

    // const productQty = (productQty)  => productQty.reduce((a, b) => a.qty + b.qty);

    const productQty = (qty) => {
        let total = 0;
        qty.forEach(data => total += data.qty)
        return total
    }

    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token for deletion:", token);

            await axios.delete(`http://localhost:5000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(`Product with ID ${id} deleted successfully`);

            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error during deletion:", error);
        }
    };

    const showProductDetails = (product) => {
        setSelectedProduct(product);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        applySorting(event.target.value);
    };

    const applySorting = (option) => {
        let sortedProducts = [...products];

        if (option === 'version') {
            // Sort by version
            sortedProducts.sort((a, b) => a.name_version.localeCompare(b.name_version));
        } else if (option === 'date') {
            // Sort by date (assuming createdAt is in ISO format)
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setProducts(sortedProducts);
    };

    return (
        <section>
            <Navbar />
            <div className="container mx-auto mt-5">
                <div className="mb-4">
                    <Link to={`add`} className="button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        Add New
                    </Link>
                    <label className="ml-4">Sort By:</label>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="border rounded py-2 px-3 ml-2"
                    >
                        <option value="version">Version</option>
                        <option value="date">Date</option>
                    </select>
                </div>

                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Version</th>
                            <th className="px-4 py-2">User</th>
                            <th className="px-4 py-2">Stock</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{product.productName}</td>
                                <td className="border px-4 py-2">{product.Version.nameVersion}</td>
                                <td className="border px-4 py-2">{product.User.name}</td>
                                <td className="border px-4 py-2">{productQty(product.Logs)}</td>
                                {/* <td className="border px-4 py-2">{JSON.stringify(product.Logs)}</td> */}
                                <td className="border px-4 py-2">{product.createdAt}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => showProductDetails(product)}
                                        className="button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                                    >
                                        Details
                                    </button>
                                    
                                    { !isStaff &&
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="button bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                                        >
                                            Delete
                                        </button>
                                    }


                                    <Link
                                        to={`edit/${product.id}`}
                                        className="button bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {selectedProduct && (
                    <div className="bg-gray-100 p-4 mt-4">
                        <h2 className="text-lg font-bold mb-2">Product Details</h2>
                        <p>Version: {selectedProduct.name_version}</p>
                        <p>User: {selectedProduct.name_user}</p>
                        <p>Stock: {selectedProduct.stock}</p>
                        <p>Amount: {selectedProduct.amount}</p>
                        <p>Created At: {selectedProduct.createdAt}</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LogActivity;
