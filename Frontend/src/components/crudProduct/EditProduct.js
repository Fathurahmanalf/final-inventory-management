import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [name_version, setVersion] = useState("");
  const [name_user, setUser] = useState("");
  const [name_product, setProduct] = useState("");
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getProductById();
  }, []);

  const Edit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/products/${id}`, {
        name_version,
        name_user,
        name_product,
        stock,
        amount,
      });
      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/products/${id}`);
      console.log('Response from getProductById:', response.data);
  
      setVersion(response.data.name_version);
      setUser(response.data.name_user);
      setProduct(response.data.name_product);
      setStock(response.data.stock);
      setAmount(response.data.amount);
    } catch (error) {
      console.error('Error in getProductById:', error);
    }
  };
  
  return (
    <div className="columns mt-5 is-centered">
      <div className="column is-half">
        <form onSubmit={Edit}>
          <div className="field">
            <label className="label">Version</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name_version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="Version"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">User</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name_user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="User"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Product</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={name_product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="Product"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Stock</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Amount</label>
            <div className="control">
              <input
                type="text"
                className="input"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
