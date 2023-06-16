import React, {useEffect} from 'react';
import {Box} from "@mui/material";
import HomeFooter from "../footerComponents/HomeFooter";
import DetailFooter from "../footerComponents/DetailFooter";

const Footer = () => {

    useEffect(()=>console.clear(),[])

    return (
        <Box m={2}>
            <h2 mt={3} mb={3}>Footers Settings</h2>
            <Box>
                <hr style={{margin:"20px"}}/>
                <HomeFooter/>
                {/*<hr style={{margin:"20px"}}/>*/}
                {/*<AboutFooter/>*/}
                {/*<hr style={{margin:"20px"}}/>*/}
                {/*<ProductFooter/>*/}
                {/*<hr style={{margin:"20px"}}/>*/}
                <DetailFooter/>
                <hr style={{margin:"20px"}}/>
            </Box>
        </Box>
    );
};

export default Footer;