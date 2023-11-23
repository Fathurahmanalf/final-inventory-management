import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { jwtDecode } from "jwt-decode";
import '../../style/index.css';
import backgroundHistory from '../../assest/history.jpg';

const itemsPerPage = 10; // Ubah sesuai kebutuhan Anda

const LogActivity = () => {
    const [historys, setHistorys] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [sortOption, setSortOption] = useState('version');

    const isStaff = jwtDecode(localStorage.getItem("token")).data.role === "Staff";

    useEffect(() => {
        fetchHistorys();
    }, []);

    const fetchHistorys = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                return;
            }

            const response = await axios.get("http://localhost:5000/logs", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setHistorys(response.data);
        } catch (error) {
            console.error("Error fetching historys:", error);
        }
    };

    const showHistoryDetails = (history) => {
        setSelectedHistory(history);
    };

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
        applySorting(event.target.value);
    };

    const applySorting = (option) => {
        let sortedHistorys = [...historys];

        if (option === 'version') {
            sortedHistorys.sort((a, b) => a.name_version.localeCompare(b.name_version));
        } else if (option === 'date') {
            sortedHistorys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setHistorys(sortedHistorys);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalItems = historys.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const visibleHistorys = historys.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <section className="hero is-fullheight" style={{ background: `url(${backgroundHistory})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar />
            <div className="container mx-auto h-screen p-6">
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">User</th>
                                <th className="px-6 py-3 text-left">Stock</th>
                                <th className="px-6 py-3 text-left">Created At</th>
                                <th className="px-6 py-3 text-left">Update At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleHistorys.map((history, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                    <td className="border px-6 py-4">{history.Product.productName}</td>
                                    <td className="border px-6 py-4">{history.User.name}</td>
                                    <td className="border px-6 py-4">{history.qty}</td>
                                    <td className="border px-6 py-4">{new Date(history.createdAt).toLocaleDateString()}</td>
                                    <td className="border px-6 py-4">{new Date(history.updatedAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Kontrol Pagination */}
                <div className="mt-4 flex justify-end">
                    <nav className="pagination">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <a
                                key={index}
                                className={`pagination-link ${currentPage === index + 1 ? 'is-current' : ''}`}
                                onClick={() => handlePageChange(index + 1)}
                            >
                                {index + 1}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default LogActivity;
