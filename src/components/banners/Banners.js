import React, {useEffect} from "react";
import {Box} from "@mui/material";
import HomeBanner from "../bannerComponents/HomeBanner";
const Banners = () => {
    useEffect(() => console.clear(), [])
    return (
        <Box m={3} className="boxHeigth">
            <h1 mt={3} mb={3}>
            Բաններների կարգավորումներ
            </h1>
            <HomeBanner/>
            <hr/>
        </Box>
    );
};

export default Banners;
