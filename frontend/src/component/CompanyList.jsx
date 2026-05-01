import React, {useState , useEffect} from 'react';
import axios from 'axios';
import Edit from './Edit.jsx';
import Popup from './Popup.jsx';

export const CompanyList = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [companies , setCompanies] = useState([]);
  const [editingCompany , setEditingCompany] = useState(null);
  const [message , setMessage] = useState("");
  const [status , setStatus] = useState("idle");

  const fetchCompanies = async () => {
     if(localStorage.getItem('isLoggedIn') !== 'true'){
        setStatus("error");
        setMessage("You must be logged in to view companies.");
        return;
     }

     try {
        const res = await axios.get(`${backendUrl}/backend/company`, {
            withCredentials : true,
        });
        setCompanies(res.data);
     } catch (error) {
       console.error("Error fetching companies:", error);
     }
  };

  const handleDelete = async (id) => {
       if(localStorage.getItem("isLoggedIn") !== "true"){
          setStatus("error");
          setMessage("You must be logged in to delete a company.");
          return;
       }

    if (!window.confirm("Are you sure you want to delete this company?"))
      return;
    
    try {
       await axios.delete(`${backendUrl}/backend/company/${id}`, {
          withCredentials : true,
       });
       
       setCompanies((prev) => prev.filter((item) => item._id !== id));

       setMessage("");
       setTimeout(()=>{
         setStatus("success");
         setMessage("Deleted Successfully");
       },1200);

    } catch (error) {
       console.error("Delete Error:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
      try {
        const res = await axios.put(`${backendUrl}/backend/company/${updatedData._id}`,
           updatedData,
           { withCredentials : true }
        );

        setCompanies((prev) => 
          prev.map((item) => 
            item._id === updatedData._id ? res.data : item
         )
        );

        setEditingCompany(null);
        setMessage("");
        setTimeout(()=>{
          setStatus("success");
          setMessage("Updated Successfully");
        },1200);
      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
     fetchCompanies();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-3 sm:p-6 mt-20'>
      <Popup status={status} message={message}/>
      <div className='max-w-7xl mx-auto bg-white shadow-xl rounded-2xl p-4 sm:p-6 transition-all duration-300'>
         <h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6'>
           Company List
         </h2>
         {editingCompany ? (
           <Edit
             savedUser={editingCompany}
             onUpdate={handleUpdate}
             onCancel={() => setEditingCompany(null)}
           />
         ) : (
           <>
            {/* Desktop Table */}
             <div className='hidden md:block overflow-x-auto rounded-xl border'>
                 <table className='w-full text-sm'>
                   <thead>
                     <tr className='bg-gray-200 text-gray-700'>
                        <th className='p-3'>Company</th>
                        <th className='p-3'>Industry</th>
                        <th className='p-3'>Founded</th>
                        <th className='p-3'>HQ</th>
                        <th className='p-3'>Employees</th>
                        <th className='p-3'>Revenue</th>
                        <th className='p-3'>Description</th>
                        <th className='p-3'>Actions</th>
                     </tr>
                   </thead>

                   <tbody>
                     {companies.map((company) => (
                        <tr
                         key={company._id}
                         className='border-t hover:bg-gray-50 transition'
                        >
                          <td className='p-3'>{company.companyname}</td>
                          <td className='p-3'>{company.industry}</td>
                          <td className='p-3'>{company.founded}</td>
                          <td className='p-3'>{company.headquarters}</td>
                          <td className='p-3'>{company.employees}</td>
                          <td className='p-3'>{company.revenue}</td>
                          <td className='p-3 max-w-xs truncate'>{company.description}</td>

                          <td className='p-3 flex gap-2'>

                            <button
                              onClick={() => setEditingCompany(company)}
                              className='bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg transition'
                            >
                              Edit
                            </button>

                           <button
                            onClick={() => handleDelete(company._id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition'
                           >
                             Delete
                           </button>

                          </td>
                         
                        </tr>
                     ))}
                   </tbody>
                 </table>
             </div>

              {/* Mobile Cards */}

             <div className='grid gap-4 md:hidden'>
               {companies.map((company) => (
                 <div
                   key={company._id}
                   className='bg-white border shadow-md rounded-2xl p-4 space-y-3 hover:shadow-lg transition-all duration-300'
                 >
                   <h3 className='text-xl font-semibold text-gray-800'>
                     {company.companyname}
                   </h3>
                   
                   <div className='grid grid-cols-[110px_10px_1fr] gap-y-1 text-sm'>
                       
                       <span className='font-medium'>Industry</span>
                       <span>:</span>
                       <span>{company.industry}</span>

                       <span className='font-medium'>Founded</span>
                       <span>:</span>
                       <span>{company.founded}</span>

                       <span className='font-medium'>Headquarters</span>
                       <span>:</span>
                       <span>{company.headquarters}</span>

                       <span className='font-medium'>Employees</span>
                       <span>:</span>
                       <span>{company.employees}</span>

                       <span className='font-medium'>Revenue</span>
                       <span>:</span>
                       <span>{company.revenue}</span>

                       <span className='font-medium'>Description</span>
                       <span>:</span>
                       <span>{company.description}</span>

                   </div>

                   <div className='flex gap-3 pt-3'>
                       <button
                        onClick={() => setEditingCompany(company)}
                        className='flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl transition'
                       >
                         Edit
                       </button>

                       <button
                        onClick={() => handleDelete(company._id)}
                        className='flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition'
                       >
                         Delete
                       </button>
                   </div>
                 </div>
               ))}
             </div>
              
              {companies.length === 0 && (
                  <p className="text-center text-gray-500 mt-8">
                      No companies found.
                  </p>
              )}
           </>
         )}
      </div>
    </div>
  );
};

export default CompanyList;
