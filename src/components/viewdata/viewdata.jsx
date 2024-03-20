import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DeleteData from "../deletedata/deletedata";
import "./viewdata.css";
import EditData from "../editdata/editdata";
export default function ViewData() {

  const getData = async () => {
    const response = await fetch("http://localhost/IMS-backend/adddata.php");
    const result = await response.json();
    console.log("Data: ", result);

    const data = result.map((row) => ({
      id: row.supplier_id,
      name: row.supplier_name,
      designation: row.supplier_designation,
      phone: row.supplier_phone,
      item_id: row.item_id,
      item_name: row.item_name,
      item_quantity: row.item_quantity,
      item_price: `$${row.item_price}`,
    }));
    console.log(data);
    setrowdata(data);
  };


  const [rowdata, setrowdata] = useState([
    {
      id: "",
      name: "",
      designation: "",
      phone: "",
      item_id: "",
      item_name: "",
      item_quantity: "",
      item_price: "",
    },
  ]);

  const [colDefs, setcolDefs] = useState([
    { field: "id", flex: 1, filter: true, editable: true, resizable: true },
    { field: "name", flex: 1, filter: true, resizable: true },
    { field: "designation", flex: 1, filter: true, resizable: true },
    { field: "phone", flex: 1, filter: true, resizable: true },
    { field: "item_id", flex: 1, filter: true, resizable: true },
    { field: "item_name", flex: 1, filter: true, resizable: true },
    { field: "item_quantity", flex: 1, filter: true, resizable: true },
    { field: "item_price", flex: 1, filter: true, resizable: true },
    {
      field: "action",
      flex: 1,
      cellRenderer: (params) => (
        <div className="action-button-container">
          <DeleteData id={params.data.id} Data = {getData}/>
          <EditData
            id={params.data.id}
            name={params.data.name}
            designation={params.data.designation}
            phone={params.data.phone}
            item_id={params.data.item_id}
            item_name={params.data.item_name}
            item_quantity={params.data.item_quantity}
            item_price={params.data.item_price.replace("$", "")}
            Data = {getData}
          />
        </div>
      ),
    },
  ]);
  useEffect(() => {
    getData();
  }, []);


  return (
    <section className="view-data-container">
      <div className="table-container">
        <div className="ag-theme-alpine" style={{ height: 500 }}>
          <AgGridReact
            rowData={rowdata}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={500}
            paginationPageSizeSelector={[200, 500, 100]}
          />
        </div>
      </div>
    </section>
  );
}
