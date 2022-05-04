import React, { useEffect, useContext, useState } from "react";
import companyshowcontext from "../context/companyshowcontext";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function ForgetPassword() {
  const host = "http://localhost:8080";
  const [message,setmessage] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post(`${host}/api/v1/routes/recoverpassword`,{email:data.email})
    .then((response)=>{
        console.log(response)
        setmessage({ response: response.data })

      })
  }
  return (
    <section className="form">
      <div className="form-companyregistration">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="heading-container">
            <h1 className="h4 mb-3 fw-normal">Trouble Logging In?</h1>
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
                required: "Please Enter Email",
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
            <button type="submit" className="btn btn-primary">
             Send reset link
            </button>
          </div>
        </form>

       
      </div>
    </section>
  )
}

export default ForgetPassword