import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import '../style/login.css'

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => {
        console.log('Data from API:', response.data);
        setInventoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching inventory data:', error);
      });
  }, []);

  const filteredInventory = inventoryData.filter((item) => {
    const includesSearchTerm = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    console.log(`Item: ${item.name}, Search Term: ${searchTerm}, Result: ${includesSearchTerm}`);
    return includesSearchTerm;
  });

  return (
    <div>
      <section className="hero bg-slate-800 is-fullheight">
        <Navbar />
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title is-size-1 has-text-white">
              Inventory Management Dashboard
            </h1>
            <h2 className="subtitle is-size-3 has-text-white">
              Explore the Cool Features
            </h2>

            {/* Modern Search Bar */}
            <div className="field has-addons is-centered mt-5">
              <p className="control is-expanded">
                <input
                  className="input is-medium is-rounded"
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </p>
              <p className="control">
                <button className="button is-info is-medium is-rounded">
                  <span className="icon is-small">
                    <i className="fas fa-search"></i>
                  </span>
                  <span>Search</span>
                </button>
              </p>
            </div>

            {/* Render hasil pencarian */}
            {filteredInventory.map((item) => (
              <div key={item.id} className="columns is-centered mt-5">
                <div className="column is-two-thirds">
                  <div className="box has-background-grey-lighter has-text-dark">
                    <p className="title">{item.name}</p>
                    {/* Tambahkan info lainnya sesuai kebutuhan */}
                    <p>Version: {item.version}</p>
                    <p>User: {item.user}</p>
                    <p>Stock: {item.stock}</p>
                    <p>Amount: {item.amount}</p>
                    <p>Created At: {item.createdAt}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* CD Playstation Section */}
            <div className="columns is-centered mt-5">
              <div className="column is-two-thirds">
                <div className="box has-background-grey-lighter has-text-dark">
                  <p className="title">CD Playstation Info</p>
                  <p className="subtitle">Explore CD Playstation details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
