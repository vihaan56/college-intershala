import React, {  useState,useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

function Signup() {
  const host = "http://localhost:8080";

  const history = useNavigate();
  const [flag, setflag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setmessage] = useState({});
  // history.push('/')
  useEffect(()=>{
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
  
  },[])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (flag === true) {
    console.log("vihaan")
    return <Navigate to="/"></Navigate>;
  }
  const sendmail = (name, email) => {
    axios.post(`${host}/api/v1/routes/sendmail`, { name: name, email: email });
  };
  const onSubmit = (data) => {
    setLoading(true);
    const { name, surname, email, phone ,password,profilepic } =
    data;
    let data2 = new FormData();

    data2.append("profilepic_filename", profilepic[0].name);
    data2.append("name", name);
    data2.append("surname", surname);
    data2.append("email", email);
    data2.append("phone", phone);
    data2.append("password", password);

    data2.append("profilepic", profilepic[0]);

    axios
      .post(`${host}/api/v1/routes/register`, data2)
      .then(function (response) {
        if (response.data.status === "success") {
          localStorage.setItem("token", response.data.authtoken);
          sessionStorage.setItem("userstatus", response.data.userstatus);
          sendmail(data.name, data.email);
          setLoading(false);
          // reset({ name: "", surname: "", email: "", password: "" });

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
            <h1 className="h4 mb-3 fw-normal">Sign up and Enroll</h1>
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
                required: "surname is required"
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
            <label htmlFor="phone" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              className={
                errors.phone ? "form-control is-invalid" : "form-control"
              }
              {...register("phone", {
                required: "Phone Number is required",
                minLength: { value: 10, message: "Phone number is incorrect" },
                maxLength: { value: 10, message: "Phone number is incorrect" },
              })}
              name="phone"
              id="phone"
              placeholder="Enter your active Phone Number"
            />
            {errors.phone && (
              <small className="invalid-feedback">{errors.phone.message}</small>
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
                minLength: { value: 10, message: "Roll Number is incorrect" },
                maxLength: { value: 12, message: "Roll number is incorrect" },
              })}
              name="roll"
              id="roll"
              placeholder="Enter your Roll Number"
            />
            {errors.roll && (
              <small className="invalid-feedback">{errors.roll.message}</small>
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
          <div className="col-md-6">
            <label htmlFor="resume" className="form-label">
              Profile Image
            </label>
            <input
              type="file"
              className={
                errors.profilepic ? "form-control is-invalid" : "form-control"
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
  );
}

export default Signup;
