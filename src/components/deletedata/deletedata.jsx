import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function DeleteData(props) {

    async function Delete(){
        const formValue = {
            supplier_id: props.id
        }
        console.log(formValue);
        const res = await fetch('http://localhost/IMS-backend/adddata.php',{
            method:"DELETE",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(formValue),
        })
        props.Data();
        const result = await res.text();
        console.log("Result:",result);
    }

    return (
          <IconButton aria-label="delete" onClick={Delete}>
            <DeleteIcon/>
          </IconButton>
    )
  }