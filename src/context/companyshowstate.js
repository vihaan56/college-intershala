import axios from "axios";
import { useState,useEffect} from "react";
import companyshowcontext from './companyshowcontext';

const Companyshowstate = (props) =>{
    const host = "http://localhost:8080";

    const [companies, setcompanies] = useState([]);
    const [isauth,setisauth] = useState(false);
    const [registermsg,setregistermsg] = useState({});
    

    const getcompanies = async () =>{

        const response = await fetch(`${host}/api/v1/routes/companyinfo`, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin",
            withCredentials: true,
            origin:true, // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
          
              //AxiosRequestConfig parameter
              //correct
            
          });

          const json = await response.json();
          setcompanies(json);
          


    }

    const userregistrationutil = (name,email,password)=>{

       axios.post(`${host}/api/v1/routes/register`,{
        name:name,
        email:email,
        password:password
      })
      .then(function(response){
       
        if(response.data.status === "success"){
          
        }
        else{
          
        }

      })
      .catch(function(response){
        console.log(response.data);

      })

     

      
    }

    const checktoken = async (token)=>{

      const response =   await fetch(`${host}/api/v1/routes/checktoken`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
           'auth-token': token
          
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const json =  await response.json();
      return json;
      // return (<Redirect to="/"></Redirect>);
    }

    
    const userregistration = async (name,email,password)=>{

        const response = await fetch(`${host}/api/v1/routes/register`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name,email,password }),
          });

          const json = await response.json();

          setregistermsg(json)

        }


    const userlogin = async (email,password)=>{

        const response = await fetch(`${host}/api/v1/routes/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
              "Content-Type": "application/json",
              
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({email,password }),
          });

          const json = await response.json();

          return json;
    }

    


    return (
        <companyshowcontext.Provider
          value={{ companies,getcompanies,setcompanies,userregistration,isauth,setisauth,userlogin,registermsg,userregistrationutil,checktoken}}
        >
          {props.children}
     </companyshowcontext.Provider>   
   );


}
export default Companyshowstate;