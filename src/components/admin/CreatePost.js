import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import AdminNavbar from "./AdminNavbar";
const CreatePost = () => {
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState({});
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <div className="container-fluid">
      <div className="row">
        <AdminNavbar></AdminNavbar> 
        <main className="col-md-9 col-lg-9 ">
          <div className="align-items-center border-bottom">
            <section className="form">
              <div className="form-companyregistration">
                <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="heading-container">
                    <h1 className="h4 mb-3 fw-normal">Create Post of Company</h1>
                  </div>
                  {Object.keys(message).length > 0 ? (
                    <div
                      className="alert alert-danger"
                      role="alert"
                      data-mdb-color="danger"
                    >
                      <i className="fas fa-times-circle me-3"></i>
                      {Object.keys(message).length > 0 &&
                        message.response.message}
                    </div>
                  ) : null}
                  <div className="col-md-6">
                    <label htmlFor="cname" className="form-label">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className={
                        errors.cname ? "form-control is-invalid" : "form-control"
                      }
                      id="cname"
                      {...register("cname", {
                        required: "Name is required",
                        minLength: { value: 3, message: "Name is incorrect" },
                      })}
                      name="cname"
                      placeholder="Enter Company Name"
                    />
                    {errors.cname && (
                      <small className="invalid-feedback">
                        {errors.cname.message}
                      </small>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="surname" className="form-label">
                      Surname
                    </label>
                    <input
                      type="text"
                      className={
                        errors.surname
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("surname", {
                        required: "surname is required",
                      })}
                      id="surname"
                      name="surname"
                      placeholder="Enter your surname"
                    />
                    {errors.surname && (
                      <small className="invalid-feedback">
                        {errors.surname.message}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className={
                        errors.email
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("email", {
                        required: "Email is required",
                      })}
                      name="email"
                      id="email"
                      placeholder="Enter an Email Address"
                    />
                    {errors.email && (
                      <small className="invalid-feedback">
                        {errors.email.message}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className={
                        errors.phone
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("phone", {
                        required: "Phone Number is required",
                        minLength: {
                          value: 10,
                          message: "Phone number is incorrect",
                        },
                        maxLength: {
                          value: 10,
                          message: "Phone number is incorrect",
                        },
                      })}
                      name="phone"
                      id="phone"
                      placeholder="Enter your active Phone Number"
                    />
                    {errors.phone && (
                      <small className="invalid-feedback">
                        {errors.phone.message}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <label htmlFor="roll" className="form-label">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      className={
                        errors.roll ? "form-control is-invalid" : "form-control"
                      }
                      {...register("roll", {
                        required: "Roll Number is required",
                        minLength: {
                          value: 10,
                          message: "Roll Number is incorrect",
                        },
                        maxLength: {
                          value: 12,
                          message: "Roll number is incorrect",
                        },
                      })}
                      name="roll"
                      id="roll"
                      placeholder="Enter your Roll Number"
                    />
                    {errors.roll && (
                      <small className="invalid-feedback">
                        {errors.roll.message}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={
                        errors.password
                          ? "form-control is-invalid"
                          : "form-control"
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
                  <div className="col-md-6">
                    <label htmlFor="resume" className="form-label">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      className={
                        errors.profilepic
                          ? "form-control is-invalid"
                          : "form-control"
                      }
                      {...register("profilepic", {
                        required: "Your Profile Image is required",
                      })}
                      id="profilepic"
                      name="profilepic"
                    />
                    {errors.profilepic && (
                      <small className="invalid-feedback">
                        {errors.profilepic.message}
                      </small>
                    )}
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                      {loading === true ? "Loading.." : "Sign up"}
                    </button>
                  </div>
                </form>

                <div className="login-footer my-4">
                  Already have an account?
                  <a
                    className="login-link mx-1"
                    href="/login"
                    data-purpose="login-link-signup-popup"
                  >
                    Log In
                  </a>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePost;
