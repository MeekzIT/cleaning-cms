import React from "react";
import { Button, TextField } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import "./login.scss";
import axios from "axios";
import { useDispatch } from "react-redux";
import { thchangeAuAC } from "../../store/actions/authAction";
import Swal from "sweetalert2";
import { baseUrl } from "../../config/config";

const Login = () => {
  const dispatch = useDispatch();
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 charaters")
      .required("Password is required"),
  });

  return (
    <div className="box boxHeigth">
      <div className="loginBox">
        <h2>Login</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={(values) => {
            axios
              .post(`${baseUrl}/admin/login`, {
                email: values.email,
                password: values.password,
              })
              .then(function (response) {
                if (response.data.error) {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: response.data.error,
                  });
                } else {
                  dispatch(thchangeAuAC(true));
                  localStorage.setItem(
                    "myToken",
                    JSON.stringify(response.data.token)
                  );
                  localStorage.setItem(
                    "email",
                    JSON.stringify(response.data.email)
                  );
                  window.location.href = "/category";
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <div className="inputsBox">
              <form onSubmit={handleSubmit}>
                <div>
                  <TextField
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="email"
                    variant="outlined"
                  />
                  {errors.email && touched.email && (
                    <p className="error">Require</p>
                  )}
                </div>
                <div>
                  <TextField
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="password"
                    variant="outlined"
                  />
                  {errors.password && touched.password && (
                    <p className="error">Require</p>
                  )}
                </div>
                <div>
                  <Button type="submit" variant="contained" color="secondary">
                    Login
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
