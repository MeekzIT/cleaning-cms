import { Box } from "@mui/material";
import React, {useEffect, useState} from "react";
import Navbar from "../navbar/Navbar";
import Pages from "../Pages/Pages";
import Sidebar from "../sidebar/Sidebar";
import "./home.scss";
import {token} from "../../config/config";
import {thchangeAuAC} from "../../store/actions/authAction";
import {useDispatch} from "react-redux";
import Footer from "../footer/Footer";
import {useLocation} from "react-router-dom";

const Home = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        token !== null && dispatch(thchangeAuAC(true));
    },[])
  const [close, setClose] = useState(true);

  return (
    <div className="home">
      {close ? <Sidebar /> : null}
      <div className="homeContainer">
        <Navbar close={close} setClose={setClose} />
        <Box>
          <Pages />
        </Box>
          <Footer/>
      </div>
    </div>
  );
};

export default Home;
