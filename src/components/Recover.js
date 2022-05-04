import React, { useEffect, useContext, useState } from "react";
import companyshowcontext from "../context/companyshowcontext";
import {  useParams,Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Recover() {
    const host = "http://localhost:8080";

    const {id,token} = useParams();
    const [flag,setflag] = useState(false);
    const [message,setmessage] = useState({});
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();

    
      const onSubmit = (data)=>{


        axios.post(`${host}/api/v1/routes/recover`,{id:id,auth_token:token,password:data.password})
        .then((response)=>{
            if (response.data.status === "success") {
                 setflag(true);
            } else{
                setmessage({ response: response.data });

            }
        })
      }

      if(flag === true){
        return (<Navigate to="/login"></Navigate>)
    }
  return (
    <section className="form">
      <div className="form-companyregistration">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="heading-container">
            <h1 className="h4 mb-3 fw-normal">Enter your New Password</h1>
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
            <label htmlFor="password" className="form-label">
              New Password
            </label>
            <input
              type="text"
              className={
                errors.password ? "form-control is-invalid" : "form-control"
              }
              {...register("password", {
                required: "Enter New Password",
              })}
              name="password"
              id="password"
              placeholder="Enter new password"
            />
            {errors.password && (
              <small className="invalid-feedback">{errors.password.message}</small>
            )}
          </div>
     
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
             Change Password
            </button>
          </div>
        </form>

       
      </div>
    </section>  )
}

export default Recover