import { AiOutlineCloseSquare } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Edit = ({ setIsOpenPopup }) => {
      const [Version, setVersion] = useState("");
      const [Product, setProduct] = useState("");
      const [Stock, setQty] = useState("");
      const { id } = useParams();
    
      useEffect(() => {
        getProductById();
      }, []);
    
      const Edit = async (e) => {
        e.preventDefault();
        try {
          await axios.put(`http://localhost:5000/products/${id}`, {
            versionId: Version,
            productName: Product,
            qty: Stock,
          });

        } catch (error) {
          console.log(error);
        }
      };
    
      const getProductById = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/products/${id}`);
          console.log('Response from getProductById:', response.data);
      
          setVersion(response.data.versionId);
          setProduct(response.data.productName);
          setQty(response.data.qty);
        } catch (error) {
          console.error('Error in getProductById:', error);
        }
      };  

    return (
    <div
      onClick={setIsOpenPopup.bind(this, false)}
      style={{
        position: "fixed",
        background: "rgba(0,0,0,0.6)",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          background: "white",
          borderRadius: "8px",
          width: "600px",
          padding: "20px 10px",
          animation: "dropTop .3s linear"
        }}
      >
        {/* Header */}
        <div
          style={{ borderBottom: "1px solid lightgray", paddingBottom: "10px" }}
        >
          <h1 style={{ margin: 0 }}>EditProduct</h1>
          <div
            onClick={setIsOpenPopup.bind(this, false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 10,
              right: 10
            }}
          >
            <AiOutlineCloseSquare />
          </div>
        </div>
        {/* Body */}
        <div>
            <div className="columns mt-5 is-centered">
                <div className="column is-half">
                    <form onSubmit={Edit}>
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
                    <div className="field">
                        <label className="label">Product</label>
                        <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={Product}
                            onChange={(e) => setProduct(e.target.value)}
                            placeholder="Product"
                        />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Qty</label>
                        <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={Stock}
                            onChange={(e) => setQty(e.target.value)}
                            placeholder="Qty"
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
        </div>
      </div>
    </div>
  );
};
export default Edit;