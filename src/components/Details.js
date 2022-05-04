import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams, Navigate } from "react-router-dom";
const Details = () => {
  const host = "http://localhost:8080";
  const { companyname, companyinfo } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState({});

  const [flag, setflag] = useState(true);

  // history.push('/')
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      console.log("vihaan");
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
          if (response.data.status === "error") {
            setflag(false);
          }
        })
        .catch((response) => {
          console.log(response);
        });
    }

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
      .post(`${host}/api/v1/routes/userdata`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.userdata.length > 0) {
          const data = response.data.userdata[0];
          reset({
            name: `${data.name}`,
            surname: `${data.surname}`,
            email: `${data.email}`,
            phone: `${data.phone_number}`,
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  if (
    localStorage.getItem("token") === null ||
    sessionStorage.getItem("userstatus") === null
  ) {
    console.log("vihaan");
    return <Navigate to="/register"></Navigate>;
  }
  if (flag === false) {
    return <Navigate to="/register"></Navigate>;
  }
  const onSubmit = (data) => {
    setLoading(true);
    const { name, surname, email, phone, gender, stream, year, resume_file } =
      data;

    const headers = {
      "auth-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };

    let data2 = new FormData();

    data2.append("resume_filename", resume_file[0].name);
    data2.append("name", name);
    data2.append("surname", surname);
    data2.append("email", email);
    data2.append("phone", phone);
    data2.append("stream", stream);
    data2.append("year", year);
    data2.append("company_id", companyinfo);
    data2.append("gender", gender);
    data2.append("resume_file", resume_file[0]);

    // {name:name,email:email,surname:surname,phone:phone,stream:stream,year:year,company_id:companyinfo,gender:gender,resume_filename:resume_file[0].name}
    axios
      .post(`${host}/api/v1/routes/companyRegistration`, data2, {
        headers: headers,
      })
      .then((response) => {
        setLoading(false);

        if (response.data.status === "success") {
          setmessage({ response: response.data });
          reset({
            name: "",
            surname: "",
            email: "",
            phone: "",
            stream: "",
            year: "",
            resume_file: "",
          });
        } else {
          setmessage({ response: response.data });
        }
      });
  };

  return (
    <section className="form">
      <div className="form-companyregistration">
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="heading-container">
            <h1 className="h4 mb-3 fw-normal">
              Enroll now in {companyname} for Internship
            </h1>
          </div>
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
          <div className="col-8">
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className={
                errors.phone ? "form-control is-invalid" : "form-control"
              }
              {...register("phone", {
                required: "Phone number is required",
                minLength: { value: 10, message: "Phone number is incorrect" },
                maxLength: { value: 10, message: "Phone number is incorrect" },
              })}
              name="phone"
              id="phone"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <small className="invalid-feedback">{errors.phone.message}</small>
            )}
          </div>
          <div className="col-4">
            <label htmlFor="gender" className="form-label ">
              Gender
            </label>
            <select
              id="gender"
              defaultValue={"Male"}
              className={
                errors.gender ? "form-select is-invalid" : "form-select"
              }
              {...register("gender", {
                required: "Gender is required",
              })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="others">others</option>
            </select>
            {errors.gender && (
              <small className="invalid-feedback">
                {errors.gender.message}
              </small>
            )}
          </div>
          <div className="col-md-4">
            <label htmlFor="stream" className="form-label">
              Stream
            </label>
            <input
              type="text"
              className={
                errors.stream ? "form-control is-invalid" : "form-control"
              }
              {...register("stream", {
                required: "Stream is required",
              })}
              id="stream"
              name="stream"
              placeholder="eg BECSE"
            />
            {errors.stream && (
              <small className="invalid-feedback">
                {errors.stream.message}
              </small>
            )}
          </div>
          <div className="col-md-2">
            <label htmlFor="year" className="form-label">
              Year
            </label>
            <input
              type="text"
              className={
                errors.year ? "form-control is-invalid" : "form-control"
              }
              {...register("year", {
                required: "Year is required",
                maxLength: { value: 1, message: "Enter valid year" },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Enter valid year",
                },
              })}
              placeholder="eg 1"
              name="year"
              id="year"
            />
            {errors.year && (
              <small className="invalid-feedback">{errors.year.message}</small>
            )}
          </div>
          <div className="col-md-6">
            <label htmlFor="resume" className="form-label">
              resume *(only pdf format)
            </label>
            <input
              type="file"
              className={
                errors.resume_file ? "form-control is-invalid" : "form-control"
              }
              {...register("resume_file", {
                required: "resume is required",
              })}
              id="resume"
              name="resume_file"
            />
            {errors.resume_file && (
              <small className="invalid-feedback">
                {errors.resume_file.message}
              </small>
            )}
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
            <button type="submit" className="btn btn-primary">
              {loading === true ? (
                <div
                  className="spinner-border spinner-border-sm mx-2"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Details;
