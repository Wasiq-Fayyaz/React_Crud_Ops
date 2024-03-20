import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export default function EditData(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState({
    supplier_name: props.name,
    supplier_id: props.id,
    designation_place: props.designation,
    supplier_phone: props.phone.substring(3),
    country_code: props.phone.substring(0, 3),
    item_name: props.item_name,
    item_id: props.item_id,
    item_quantity: props.item_quantity,
    item_price: props.item_price.replace("$", ""),
  });

  function handleChange(e) {
    const { name, value } = e.target; //---> OBJ De-structuring
    setData({ ...data, [name]: value });
  }
  async function updateData() {
    const updateData = {
      supplier_id: data.supplier_id,
      supplier_name: data.supplier_name,
      supplier_designation: data.designation_place,
      supplier_phone: data.country_code + data.supplier_phone,
      item_id: data.item_id,
      item_name: data.item_name,
      item_quantity: data.item_quantity,
      item_price: data.item_price,
    };

    const res = await fetch("http://localhost/IMS-backend/adddata.php", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    props.Data();
    const result = await res.json();
    console.log("Response:", result);
  }

  return (
    <React.Fragment>
      <IconButton aria-label="settings" onClick={handleClickOpen}>
        <SettingsIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            updateData();
            handleClose();
          },
        }}
      >
        <DialogContent>
          {/* <DialogContentText>
        To subscribe to this website, please enter your email address here.
        We will send updates occasionally.
      </DialogContentText> */}
          <div>
            <h2>Edit Data</h2>
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
                  name="supplier_name"
                  id="supplier_name"
                  value={data.supplier_name}
                  onChange={handleChange}
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
                  name="supplier_id"
                  pattern="[A-Z]{2,3}-[0-9]{3}"
                  value={data.supplier_id}
                  onChange={handleChange}
                  disabled
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
                  pattern="[A-Za-z ]{0,22}"
                  value={data.designation_place}
                  onChange={handleChange}
                ></input>
              </div>
              <div>
                <label>Supplier Phone#</label>
                <br />
                <select
                  className="country-code"
                  name="country_code"
                  value={data.country_code}
                  onChange={handleChange}
                >
                  <option value="+92">+92</option>
                  <option value="+1">+1</option>
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
                  pattern="[0-9]{10}"
                  value={data.supplier_phone}
                  onChange={handleChange}
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
                  pattern="[A-Za-z ]{0,20}"
                  value={data.item_name}
                  onChange={handleChange}
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
                  pattern="[A-Z]{2}-[0-9]{0,4}"
                  value={data.item_id}
                  onChange={handleChange}
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
                  value={data.item_quantity}
                  onChange={handleChange}
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
                  id="item_price"
                  value={data.item_price}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button type="buttomn" className="data-button" onClick={handleClose}>
            Cancel
          </button>
          <button type="submit" className="data-button">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
