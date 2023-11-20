import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import '../../style/index.css';
import Popup from './Edit';
import Swal from 'sweetalert2';


const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOption, setSortOption] = useState('version'); // Default sorting option
    const [isOpenPopup, setIsOpenPopup] = useState(false);

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
    
            if (!token) {
                console.error("Token not found. User may not be authenticated.");
                return;
            }
    
            console.log("Token for deletion:", token);
    
            await axios.delete(`http://localhost:5000/products/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            console.log(`Product with ID ${id} deleted successfully`);
    
            // Assuming setProducts is a state updater function
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
        } catch (error) {
            console.error("Error during deletion:", error);
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
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
        <section className='bg-slate-800'>
            <Navbar />
            <div className="container mx-auto h-screen">
                <div className="mb-4">
                    <Link to={`add`} className="btn btn-info text-white font-semibold">
                        Add New
                    </Link>
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="select select-bordered w-30 max-w-xs mx-5 select-info text-black font-semibold">
                        <option value="version">Version</option>
                        <option value="date">Date</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="table rounded w-full ">
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
                                            className="btn btn-success text-white font-semibold mx-2"
                                        >
                                            Details
                                        </button>
                                        
                                        { !isStaff &&
                                            <button
                                                onClick={() => deleteProduct(product.id)}
                                                className="btn btn-error text-white font-semibold mx-2"
                                            >
                                                Delete
                                            </button>
                                        }
                                         <button onClick={setIsOpenPopup.bind(this, true)} className="btn btn-info text-white font-semibold mx-2"
                                            >Edit</button>
                                         {isOpenPopup && <Popup setIsOpenPopup={setIsOpenPopup} />}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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

export default Product;
