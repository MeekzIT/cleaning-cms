import React from "react";
import { Route, Routes } from "react-router-dom";
import { isAuthPages, isntAuthPages } from "../../utils/routing/routes";
import {  useSelector } from 'react-redux'
import NotFound from "../../components/404/404";
import {LOGIN_PAGE} from "../../utils/routing/urls";
import Login from "../../components/login/Login";

const Pages = () => {

  const isAuth = useSelector(state => state.isAuthReducer.isAuth)
  return (
    <Routes>
      {isAuth
        ? isAuthPages.map((i) => {
            return <Route path={i.path} element={<i.Component />} key={i.id} />;
          })
        : isntAuthPages.map((i) => {
            return <Route path={i.path} element={<i.Component />} key={i.id} />;
          })}
        {
            isAuth ?  <Route path="*" element={<NotFound />}/> : <Route path={LOGIN_PAGE} element={<Login/>}/>
        }

    </Routes>
  );
};

export default Pages;
