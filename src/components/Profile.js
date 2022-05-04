import axios from "axios";
import React,{useState,useEffect} from "react";
import { Navigate , useNavigate  } from "react-router-dom";


function Profile() {
    const host = "http://localhost:8080";
    const [data,setdata] = useState({});
    const [companydata,setcompanydata] = useState({});

    useEffect(()=>{
       
    if(localStorage.getItem('token') === null || sessionStorage.getItem('userstatus') === null){
      return (<Navigate to="/"></Navigate>)

    }
    
        if (localStorage.getItem("token") !== null && sessionStorage.getItem("userstatus") !== null) {
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
              .post(`${host}/api/v1/routes/profile`, {
                headers: headers,
              })
              .then((response) => {
                  if(response.data.userdata.length > 0){
                       setdata(response.data.userdata[0])
                       if(response.data.usercompanydata.length > 0 ){
                          setcompanydata(response.data.usercompanydata[0])
                       }
                }

                if(response.data.usercompanydata.length > 0){
                      setcompanydata(response.data.usercompanydata[0])
                }
              })
              .catch((response) => {
                console.log(response);
              });
            
              
          }
         
    },[])

    
    

  return (
    <div className="container py-5">
      
      <div className="row">
        <div className="col-lg-4">
          <div className="card mb-4">
            <div className="card-body text-center">
              <img src={`http://localhost:3000/userprofile/${data.user_image}`} alt="avatar" className="rounded-circle img-fluid" style={{
                  "width": "150px"}} />
              <h5 className="my-3">{data.name+" "+data.surname}</h5>
              
             
            </div>
          </div>
          {/* <div className="card mb-4 mb-lg-0"> */}
            {/* <div className="card-body p-0">
              <ul className="list-group list-group-flush rounded-3">
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fas fa-globe fa-lg text-warning"></i>
                  <p className="mb-0">https://mdbootstrap.com</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-github fa-lg" style={{"color": "#333333"}}></i>
                  <p className="mb-0">mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-twitter fa-lg" style={{"color": "#55acee"}}></i>
                  <p className="mb-0">@mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-instagram fa-lg" style={{"color": "#ac2bac"}} ></i>
                  <p className="mb-0">mdbootstrap</p>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                  <i className="fab fa-facebook-f fa-lg" style={{"color": "#3b5998"}} ></i>
                  <p className="mb-0">mdbootstrap</p>
                </li>
              </ul>
            </div> */}
          {/* </div> */}
        </div>
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Full Name</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{data.name +" "+data.surname}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Email</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{data.email}</p>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">Phone</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{"+91 "+data.phone_number}</p>
                </div>
              </div>
              <hr/>
     {(Object.keys(companydata).length > 0)?(
       <>
         <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">stream</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{companydata.stream}</p>
                </div>
              </div>
              <hr/>


              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">year</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{companydata.year}</p>
                </div>
              </div>
              <hr/>

              <div className="row">
                <div className="col-sm-3">
                  <p className="mb-0">gender</p>
                </div>
                <div className="col-sm-9">
                  <p className="text-muted mb-0">{companydata.gender}</p>
                </div>
              </div>
              <hr/>
              </>):null}
              
            </div>
          </div>
          {/* <div className="row">
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</p>
                  <p className="mb-1" style={{"font-size":".77rem"}}>Web Design</p>
                  <div className="progress rounded" style={{"height":"5px"}}>
                    <div className="progress-bar" role="progressbar" style={{"width":"80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style={{"font-size":".77rem"}}>Website Markup</p>
                  <div className="progress rounded" style={{"height":"5px"}}>
                    <div className="progress-bar" role="progressbar" style={{"width":"72%"}} aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style={{"font-size":".77rem"}}>One Page</p>
                  <div className="progress rounded" style={{"height":"5px"}}>
                    <div className="progress-bar" role="progressbar" style={{"width":"89%"}} aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style={{"font-size":".77rem"}}>Mobile Template</p>
                  <div className="progress rounded" style={{"font-size":".77rem"}}>
                    <div className="progress-bar" role="progressbar" style={{"width":"55%"}} aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style={{"font-size":".77rem"}}>Backend API</p>
                  <div className="progress rounded mb-2" style={{"height":"5px"}}>
                    <div className="progress-bar" role="progressbar" style={{"width":"66%"}} aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4 mb-md-0">
                <div className="card-body">
                  <p className="mb-4"><span className="text-primary font-italic me-1">assigment</span> Project Status</p>
                  <p className="mb-1" style="font-size: .77rem;">Web Design</p>
                  <div className="progress rounded" style="height: 5px;">
                    <div className="progress-bar" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style="font-size: .77rem;">Website Markup</p>
                  <div className="progress rounded" style="height: 5px;">
                    <div className="progress-bar" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style="font-size: .77rem;">One Page</p>
                  <div className="progress rounded" style="height: 5px;">
                    <div className="progress-bar" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style="font-size: .77rem;">Mobile Template</p>
                  <div className="progress rounded" style="height: 5px;">
                    <div className="progress-bar" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <p className="mt-4 mb-1" style="font-size: .77rem;">Backend API</p>
                  <div className="progress rounded mb-2" style="height: 5px;">
                    <div className="progress-bar" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
