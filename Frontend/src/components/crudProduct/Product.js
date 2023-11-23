import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../../style/index.css';
import backgroundProduct from '../../assest/tes/Product.png';
import Swal from 'sweetalert2';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [sortOption, setSortOption] = useState('version'); // Default sorting option
    const [searchTerm, setSearchTerm] = useState('');

    const isStaff = jwtDecode(localStorage.getItem('token')).data.role === 'Staff';

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await axios.get('http://localhost:5000/products', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredProducts = products.filter((product) => {
        return (
            product.productName.toLowerCase().includes(searchTerm) ||
            product.Version.nameVersion.toLowerCase().includes(searchTerm) ||
            product.User.name.toLowerCase().includes(searchTerm)
        );
    });

    const productQty = (qty) => {
        let total = 0;
        qty.forEach((data) => (total += data.qty));
        return total;
    };

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    });
    
    const deleteProduct = async (id) => {
        try {
            const token = localStorage.getItem('token');
    
            if (!token) {
                console.error('Token not found. User may not be authenticated.');
                return;
            }
    
            const result = await swalWithBootstrapButtons.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
                reverseButtons: true
            });
    
            if (result.isConfirmed) {
                await axios.delete(`http://localhost:5000/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    
                swalWithBootstrapButtons.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire({
                    title: 'Cancelled',
                    text: 'Your file is safe :)',
                    icon: 'error'
                });
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        }
    }

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
            sortedProducts.sort((a, b) => a.name_version.localeCompare(b.name_version));
        } else if (option === 'date') {
            sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setProducts(sortedProducts);
    };

    return (

        <section className="bg-cover bg-center" style={{ backgroundImage: `url(${backgroundProduct})` }}>
    <Navbar />
    <div className="container mx-auto py-8 h-screen">
        <div className="flex items-center justify-between mb-4">
            <Link to={`add`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded inline-block">
                Add New
            </Link>
            <div className="flex items-center">
                <select
                    value={sortOption}
                    onChange={handleSortChange}
                    className="select select-bordered mr-4"
                >
                    <option value="version">Version</option>
                    <option value="date">Date</option>
                </select>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="border rounded px-2 py-1 w-64 focus:outline-none"
                />
            </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full table-auto rounded">
                <thead className="bg-gray-200">
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
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <td className="border px-4 py-2">{product.productName}</td>
                                <td className="border px-4 py-2">{product.Version.nameVersion}</td>
                                <td className="border px-4 py-2">{product.User.name}</td>
                                <td className="border px-4 py-2">{productQty(product.Logs)}</td>
                                <td className="border px-4 py-2">{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => showProductDetails(product)}
                                        className="btn btn-success text-white font-semibold mx-2"
                                    >
                                        Details
                                    </button>
                                    {!isStaff && (
                                        <button
                                            onClick={() => deleteProduct(product.id)}
                                            className="btn btn-error text-white font-semibold mx-2"
                                        >
                                            Delete
                                        </button>
                                    )}
                                    <Link to={`edit/${product.id}`} className="btn btn-info text-white font-semibold mx-2">
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center py-4">No data available</td>
                        </tr>
                    )}
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
