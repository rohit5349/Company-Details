import React, { useState } from "react";
import axios from "axios";
import { Navigate , useNavigate} from "react-router-dom";
import Popup from "./Popup";

const CompanyForm = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [status , setStatus] = useState("idle");
  const [message , setMessage] = useState("");


  const [formData, setFormData] = useState({
     companyname : "",
     industry    : "",
     founded     : "",
     headquarters: "",
     employees   : "",
     revenue     : "",
     description : "",
  });

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(localStorage.getItem("isLoggedIn") !== "true"){
        setMessage("");
        setTimeout(()=>{
          setStatus("error");
          setMessage("You must be logged in to add a company.");
        },1200);
        return;
    }

    try {
       const res = await axios.post(`${backendUrl}/backend/company/company`, formData ,
        {
           withCredentials: true 
        });
      setMessage("");
      setTimeout(()=>{
        setStatus("success");
        setMessage("Data send Successfully.")
      },1200);

      navigate('/');

    } catch (error) {

       if(error.response?.status === 409){
         setMessage("");
         setTimeout(()=>{
           setStatus("error");
           setMessage("Company already exists.");
         },1200);
       } else{
           console.error(error);
           alert(error.response?.data?.message || "Data sending failed");
       }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
       <Popup status={status} message={message}/>
      <h2 className="text-2xl font-bold mb-4 text-center">Add Company</h2>

      <form 
        onSubmit={handleSubmit} 
        className="space-y-4"
      >
       
        <input
          type="text"
          name="companyname"
          placeholder="Company Name"
          value={formData.companyname}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

       
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        
        <input
          type="text"
          name="founded"
          placeholder="Founded Year"
          value={formData.founded}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        
        <input
          type="text"
          name="headquarters"
          placeholder="Headquarters"
          value={formData.headquarters}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

       
        <input
          type="text"
          name="employees"
          placeholder="No. of Employees"
          value={formData.employees}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

       
        <input
          type="text"
          name="revenue"
          placeholder="Revenue"
          value={formData.revenue}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows="3"
        />

        
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;
