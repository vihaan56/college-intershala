import React, { useEffect, useContext, useState } from "react";
import companyshowcontext from "../context/companyshowcontext";
import { Navigate, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import axios from "axios";
function Login() {
  const host = "http://localhost:8080";

  const [flag, setflag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState({});
  // history.push('/')
  if (localStorage.getItem("token") != null) {
    const authaxios = axios.create({
      baseURL: host,
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });
    const headers = {
      auth: localStorage.getItem("token"),
    };
    authaxios
      .post(`${host}/api/v1/routes/checktoken`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.status === "success") {
          //  history.push("/")
          setflag(true);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (flag === true) {
    return <Navigate to="/"></Navigate>;
  }
  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${host}/api/v1/routes/login`, {
        email: data.email,
        password: data.password,
      })
      .then(function (response) {
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.authtoken);
          sessionStorage.setItem("userstatus", response.data.userstatus);

          setLoading(false);
          window.location.href = "/";
        } else {
          setmessage({ response: response.data });
          setLoading(false);
        }
      })
      .catch(function (response) {
        console.log(response.data);
      });
  };

  return (
    <section className="form">
      <div className="form-companyregistration">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="heading-container">
            <h1 className="h4 mb-3 fw-normal">Login</h1>
          </div>
          {Object.keys(message).length > 0 ? (
            <div
              className={
                message.response.status === "success"
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {Object.keys(message).length > 0 && message.response.message}
            </div>
          ) : null}
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className={
                errors.email ? "form-control is-invalid" : "form-control"
              }
              {...register("email", {
                required: "Email is required",
              })}
              name="email"
              id="email"
              placeholder="Enter an Email Address"
            />
            {errors.email && (
              <small className="invalid-feedback">{errors.email.message}</small>
            )}
          </div>
          <div className="col-12">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
              {...register("password", {
                required: "Password is required",
              })}
              name="password"
              id="password"
              placeholder="Enter a password"
            />
            {errors.password && (
              <small className="invalid-feedback">
                {errors.password.message}
              </small>
            )}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {loading === true ? "Loading.." : "Log in"}
            </button>
          </div>
        </form>

        <div className="login-footer my-4">
          <a
            className="login-link mx-1"
            href="/forgetPassword"
            data-purpose="login-link-signup-popup"
          >
          Forget Password?          
          </a>
        </div>
      </div>
    </section>
  );
}

export default Login;
