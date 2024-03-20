import React, { useState } from "react";
import "./adddata.css";
import Logo from "../../svgs/logo";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function AddData() {
  const [data, setData] = useState({
    supplier_name: "",
    supplier_id: "",
    designation_place: "",
    supplier_phone: "",
    country_code: "+92",
    item_name: "",
    item_id: "",
    item_quantity: "",
    item_price: "",
  });


  const insertData = async (e) => {
    e.preventDefault();
    console.log("Form data state: ", data);
    const formValue = {
      supplier_name: data.supplier_name,
      supplier_id: data.supplier_id,
      designation_place: data.designation_place,
      supplier_phone: data.country_code + data.supplier_phone,
      item_id: data.item_id,
      item_name: data.item_name,
      item_quantity: data.item_quantity,
      item_price: data.item_price,
    };
    console.log(formValue);

    const res = await fetch("http://localhost/IMS-backend/adddata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValue),
    });

    const resData = await res.text();
    if (resData) {
      setData({
        supplier_name: "",
        supplier_id: "",
        designation_place: "",
        supplier_phone: "",
        country_code: "+92",
        item_name: "",
        item_id: "",
        item_quantity: "",
        item_price: "",
      });

      toast.success("Insertion Successful", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  function handleChange(e) {
    const { name, value } = e.target; //---> OBJ De-structuring
    setData({ ...data, [name]: value });
  }

  return (
    <main className="signup-container">
      <div className="identity-container">
        <Logo />
        <h1>IMS</h1>
        <h2>Inventory Management System</h2>
        <i>Management made easy and smooth</i>
      </div>

      <div className="form-container">
        <form onSubmit={insertData}>
          <div>
            <h2>Inventory Data</h2>
            <hr />
          </div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <div>
                <label>Supplier Name</label>
                <br />
                <input
                  type="text"
                  size={30}
                  maxLength={16}
                  required
                  autoFocus
                  onChange={handleChange}
                  name="supplier_name"
                  value={data.supplier_name}
                ></input>
              </div>
              <div>
                <label>Supplier ID</label>
                <br />
                <input
                  type="text"
                  size={30}
                  maxLength={12}
                  required
                  autoFocus
                  onChange={handleChange}
                  name="supplier_id"
                  pattern="[A-Z]{2,3}-[0-9]{3}"
                  value={data.supplier_id}
                ></input>
              </div>
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label>Designation Place</label>
                <br />
                <input
                  type="text"
                  size={30}
                  maxLength={22}
                  required
                  autoFocus
                  name="designation_place"
                  onChange={handleChange}
                  pattern="[A-Za-z ]{0,22}"
                  value={data.designation_place}
                ></input>
              </div>
              <div>
                <label>Supplier Phone#</label>
                <br />
                <select
                  value={data.country_code}
                  className="country-code"
                  onChange={handleChange}
                  name="country_code"
                >
                  <option value="+92">+92</option>
                  <option value="+61">+61</option>
                  <option value="+44">+44</option>
                  <option value="+61">+61</option>
                  <option value="+86">+86</option>
                  <option value="+91">+91</option>
                </select>
                <input
                  type="text"
                  size={20}
                  maxLength={10}
                  required
                  autoFocus
                  name="supplier_phone"
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  value={data.supplier_phone}
                ></input>
              </div>
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label>Item Name</label>
                <br />
                <input
                  type="text"
                  size={30}
                  maxLength={20}
                  required
                  autoFocus
                  name="item_name"
                  onChange={handleChange}
                  pattern="[A-Za-z ]{0,20}"
                  value={data.item_name}
                ></input>
              </div>
              <div>
                <label>Item ID</label>
                <br />
                <input
                  type="text"
                  size={30}
                  maxLength={12}
                  required
                  autoFocus
                  name="item_id"
                  onChange={handleChange}
                  pattern="[A-Z]{2}-[0-9]{0,4}"
                  value={data.item_id}
                ></input>
              </div>
            </div>

            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <label>Stock Quantity</label>
                <br />
                <input
                  type="number"
                  required
                  autoFocus
                  className="count"
                  min={0}
                  max={1000}
                  name="item_quantity"
                  onChange={handleChange}
                  value={data.item_quantity}
                ></input>
              </div>
              <div>
                <label>Price (Per unit)</label>
                <br />
                <input
                  type="number"
                  required
                  autoFocus
                  className="count"
                  min={0}
                  max={1000}
                  name="item_price"
                  onChange={handleChange}
                  value={data.item_price}
                ></input>
              </div>
            </div>
          </div>
          <div className="button--container">
            <button type="submit" className="data-button">
              Submit
              <ToastContainer position="top-left" draggable pauseOnHover />
            </button>
            <button type="button" className="data-button">
              <a href="/viewdata.jsx">View Data</a>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
