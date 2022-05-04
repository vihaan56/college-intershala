import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const Contactus = () => {
  const [message, setmessage] = useState({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};
  return (
    <section className="form">
      <div className="form-companyregistration">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="heading-container">
            <h1 className="h4 mb-3 fw-normal">Contact us</h1>
          </div>
          {Object.keys(message).length > 0 ? (
            <div
              className="alert alert-danger"
              role="alert"
              data-mdb-color="danger"
            >
              <i className="fas fa-times-circle me-3"></i>
              {Object.keys(message).length > 0 && message.response.message}
            </div>
          ) : null}
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className={
                errors.name ? "form-control is-invalid" : "form-control"
              }
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: { value: 3, message: "Name is incorrect" },
              })}
              name="name"
              placeholder="Enter your Name"
            />
            {errors.name && (
              <small className="invalid-feedback">{errors.name.message}</small>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="surname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              className={
                errors.surname ? "form-control is-invalid" : "form-control"
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
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className={
                errors.message ? "form-control is-invalid" : "form-control"
              }
              {...register("message", {
                required: "Enter your message/query",
              })}
              name="message"
              id="message"
              placeholder="Enter your message/query"
              rows="3"
            ></textarea>

            {errors.message && (
              <small className="invalid-feedback">
                {errors.message.message}
              </small>
            )}
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              {loading === true ? "Loading.." : "Contact us"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contactus;
