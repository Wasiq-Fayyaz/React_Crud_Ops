<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$connection = pg_connect(
    "
    host=localhost
    port=5432
    dbname=postgres
    user=postgres
    password=admin
    "
);

// var_dump($conne/ction)/;
// exit;

if ($connection) {


    $req_type = $_SERVER['REQUEST_METHOD'];

    switch ($req_type) {
            // CASE POST
        case 'POST':
            $data = json_decode(file_get_contents('php://input'));
            if ($data === null) {
                echo json_encode(['message' => "Not Data Found"]);
                return;
            } else {    
                $supplier_name = $data->supplier_name;
                $supplier_id = $data->supplier_id;
                $designation_place = $data->designation_place;
                $supplier_phone = $data->supplier_phone;
                $item_id = $data->item_id;
                $item_name = $data->item_name;
                $item_quantity = $data->item_quantity;
                $item_price = $data->item_price;

                $store_supplier_query = "INSERT INTO suppliers(supplier_id, supplier_name, supplier_designation,supplier_phone) VALUES('$supplier_id','$supplier_name','$designation_place','$supplier_phone');";
                $supplier_result = pg_query($connection, $store_supplier_query);

                if ($supplier_result) {
                    $store_stock_query = "INSERT INTO stocks(item_id, item_name, item_quantity, item_price, supplier_id) VALUES('$item_id','$item_name','$item_quantity','$item_price','$supplier_id');";
                    $stock_result = pg_query($connection, $store_stock_query);

                    if ($stock_result) {
                        echo json_encode(['message' => "Data Insertion Successful"]);
                        return;
                    } else {
                        echo json_encode(['message' => "Data Insertion Failed"]);
                    }
                }
            }
            break;

            //CASE GET
        case 'GET':
            $retrieve_query = "SELECT suppliers.supplier_id, suppliers.supplier_name, suppliers.supplier_designation, suppliers.supplier_phone, stocks.item_id, stocks.item_name, stocks.item_quantity, stocks.item_price, stocks.supplier_id FROM suppliers INNER JOIN stocks ON suppliers.supplier_id = stocks.supplier_id";

            $retrieve_result = pg_query($connection, $retrieve_query);
            $json_array = array();
            while ($row = pg_fetch_assoc($retrieve_result)) {
                $json_array[] = $row;
            }
            print(json_encode($json_array));
            break;

        case 'DELETE':
            $data = json_decode(file_get_contents('php://input'));
            if ($data === null) {
                echo json_encode(["message: " => "Data not Found"]);
            } else {
                print json_encode(["message: " => "Data Found"]);
                $supplier_id = $data->supplier_id;
                $stock_delete_query = "DELETE FROM stocks WHERE supplier_id = '$supplier_id'";
                $stock_delete_result = pg_query($connection, $stock_delete_query);
                $supplier_delete_query = "DELETE FROM suppliers WHERE supplier_id = '$supplier_id'";
                $supplier_delete_result = pg_query($connection, $supplier_delete_query);
                if ($supplier_delete_result && $stock_delete_result) {
                    echo json_encode(['message: ' => "Data Deleted"]);
                }
            }
        case 'PUT':
            $data = json_decode(file_get_contents('php://input'));
            if ($data != null) {
                $supplier_id = $data->supplier_id;
                $supplier_name = $data->supplier_name;
                $supplier_designation = $data->supplier_designation;
                $supplier_phone = $data->supplier_phone;
                $item_id = $data->item_id;
                $item_name = $data->item_name;
                $item_quantity = $data->item_quantity;
                $item_price = $data->item_price;

                $stock_update_query = "UPDATE stocks SET item_id = '$item_id', item_name = '$item_name', item_quantity = '$item_quantity', item_price = '$item_price' WHERE supplier_id = '$supplier_id'";
                $stock_query_result = pg_query($connection, $stock_update_query);

                $supplier_update_query = "UPDATE suppliers SET supplier_id='$supplier_id', supplier_name='$supplier_name', supplier_designation='$supplier_designation', supplier_phone='$supplier_phone' WHERE supplier_id='$supplier_id'";
                $supplier_query_result = pg_query($connection, $supplier_update_query);


                if ($supplier_update_query && $stock_update_query) {
                    echo json_encode(["Response" => "Data Updated Successfully"]);
                }
            } else {
                echo json_encode(['Response: ' => 'Data not found']);
            }
    }
} else {
    echo json_encode(['message' => "Connection Failed"]);
    exit;
}
