import React from 'react'
import {  } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Navigate,useParams,useNavigate } from "react-router-dom";
import axios from 'axios'
import AdminNavbar from './AdminNavbar'
import AdminHome from './AdminHome'
const AdminPanel = ()=> {
    const history = useNavigate();
    const host = "http://localhost:8080";

 const {admintoken} = useParams();
 if(admintoken !== "iBgQM6tj55arHpfazcD9"  || localStorage.getItem('token') === null  ||  sessionStorage.getItem('userstatus') === null || sessionStorage.getItem('userstatus') !== 'admin'){
   return (<Navigate to="/"></Navigate>)
 }
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
      .post(`${host}/api/v1/routes/checktokensecure`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.status === "error") {
            history("/")
        }
        
      })
      .catch((response) => {
        console.log(response);
      });
  }

  return (
    <>

    
<div className="container-fluid">
  <div className="row">
     <AdminNavbar></AdminNavbar>
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        {/* <div className="btn-toolbar mb-2 mb-md-0"> */}
          {/* <div className="btn-group me-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
            <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
          </div> */}
          {/* <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
            <span data-feather="calendar"></span>
            This week
          </button> */}
        {/* </div> */}
      </div>

      {/* <canvas className="my-4 w-100" id="myChart" width="900" height="380"></canvas> */}

      <h2>Your Info</h2>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
              <th scope="col">Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1,001</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
            </tr>
            <tr>
              <td>1,002</td>
              <td>placeholder</td>
              <td>irrelevant</td>
              <td>visual</td>
              <td>layout</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>data</td>
              <td>rich</td>
              <td>dashboard</td>
              <td>tabular</td>
            </tr>
            <tr>
              <td>1,003</td>
              <td>information</td>
              <td>placeholder</td>
              <td>illustrative</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,004</td>
              <td>text</td>
              <td>random</td>
              <td>layout</td>
              <td>dashboard</td>
            </tr>
            <tr>
              <td>1,005</td>
              <td>dashboard</td>
              <td>irrelevant</td>
              <td>text</td>
              <td>placeholder</td>
            </tr>
            <tr>
              <td>1,006</td>
              <td>dashboard</td>
              <td>illustrative</td>
              <td>rich</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,007</td>
              <td>placeholder</td>
              <td>tabular</td>
              <td>information</td>
              <td>irrelevant</td>
            </tr>
            <tr>
              <td>1,008</td>
              <td>random</td>
              <td>data</td>
              <td>placeholder</td>
              <td>text</td>
            </tr>
            <tr>
              <td>1,009</td>
              <td>placeholder</td>
              <td>irrelevant</td>
              <td>visual</td>
              <td>layout</td>
            </tr>
            <tr>
              <td>1,010</td>
              <td>data</td>
              <td>rich</td>
              <td>dashboard</td>
              <td>tabular</td>
            </tr>
            <tr>
              <td>1,011</td>
              <td>information</td>
              <td>placeholder</td>
              <td>illustrative</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,012</td>
              <td>text</td>
              <td>placeholder</td>
              <td>layout</td>
              <td>dashboard</td>
            </tr>
            <tr>
              <td>1,013</td>
              <td>dashboard</td>
              <td>irrelevant</td>
              <td>text</td>
              <td>visual</td>
            </tr>
            <tr>
              <td>1,014</td>
              <td>dashboard</td>
              <td>illustrative</td>
              <td>rich</td>
              <td>data</td>
            </tr>
            <tr>
              <td>1,015</td>
              <td>random</td>
              <td>tabular</td>
              <td>information</td>
              <td>text</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</div>
</>
  )
}

export default AdminPanel