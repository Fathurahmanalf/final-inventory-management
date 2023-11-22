import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import { jwtDecode } from "jwt-decode";
import '../../style/index.css';
import backgroundHistory from '../../assest/history.jpg';




const LogActivity = () => {
    const [historys, setHistorys] = useState([]);
    const [selectedHistory, setSelectedHistory] = useState(null);
    const [sortOption, setSortOption] = useState('version');

    const isStaff = jwtDecode(localStorage.getItem("token")).data.role == "Staff"
    console.log(jwtDecode)
    console.log(jwtDecode(localStorage.getItem("token")))

    useEffect(() => {
        fetchHistorys();
    }, []);

    const fetchHistorys = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log("Token:", token);

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


    // const historyQty = (historyQty)  => historyQty.reduce((a, b) => a.qty + b.qty);

    // const historyQty = (qty) => {
    //     let total = 0;
    //     qty.forEach(data => total += data.qty)
    //     return total
    // }

    

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
            // Sort by version
            sortedHistorys.sort((a, b) => a.name_version.localeCompare(b.name_version));
        } else if (option === 'date') {
            // Sort by date (assuming createdAt is in ISO format)
            sortedHistorys.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setHistorys(sortedHistorys);
    };



    return (
        <section className="hero is-fullheight" style={{ background: `url(${backgroundHistory})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Navbar />
            <div className="container mx-auto h-screen p-6">
                <div className="mb-4 flex justify-end">
                    <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="select select-bordered w-40 max-w-xs select-info text-black font-semibold">
                        <option value="version">Sort by Version</option>
                        <option value="date">Sort by Date</option>
                    </select>
                </div>

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
                            {historys.map((history, index) => (
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
            </div>
        </section>
    );
};

export default LogActivity;
