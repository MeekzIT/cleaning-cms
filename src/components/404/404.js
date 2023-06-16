import { Box } from "@mui/material";
import React from "react"
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";


const NotFound = () => {
    let navigate = useNavigate();
    return (
        <Box style={{
            width:"100%",
            height:"90vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            flexDirection:"column"
        }} className="boxHeigth">
            <h1 style={{
                fontSize:"60px",
                color:"#644bff",
                filter:"drop-shadow(10px 6px 4px black)"
            }}>
                404
            </h1>
            <div>
                <img src="https://cdn-icons.flaticon.com/png/512/3585/premium/3585596.png?token=exp=1651739586~hmac=a190fb851f5e9aad2f1685a364b60ed1"
                        alt="notFound" width={200} height={200}
                />
            </div>

            <h1 style={{
                fontSize:"70px",
                color:"#644bff",
                filter:"drop-shadow(10px 6px 4px black)"
            }}>Not Found</h1>
            <Button variant="contained" color="secondary" size="large" onClick={()=>navigate('/')}>Go Back</Button>
        </Box>
    )
}


export default NotFound;