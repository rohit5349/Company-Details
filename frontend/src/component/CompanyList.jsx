import React, {useState , useEffect} from 'react';
import axios from 'axios';
import Edit from './Edit.jsx';

export const CompanyList = () => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [companies , setCompanies] = useState([]);
  const [editingCompany , setEditingCompany] = useState(null);

  const fetchCompanies = async () => {
     if(localStorage.getItem('isLoggedIn') !== 'true'){
        alert("You must be logged in to view companies.");
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
          alert("You must be logged in to delete a company.");
          return;
       }

    if (!window.confirm("Are you sure you want to delete this company?"))
      return;
    
    try {
       await axios.delete(`${backendUrl}/backend/company/${id}`, {
          withCredentials : true,
       });
       
       setCompanies((prev) => prev.filter((item) => item._id !== id));
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
        alert("Updated Successfully");
      } catch (error) {
        console.error(error);
      }
  };

  useEffect(() => {
     fetchCompanies();
  }, []);

  return (
    <div className='min-h-screen bg-gray-100 p-3 sm:p-6'>
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
                   className='bg-white border shadow-md rounded-2xl p-4 space-y-2 hover:shadow-lg transition-all duration-300'
                 >
                   <h3 className='text-xl font-semibold text-gray-800'>
                     {company.companyname}
                   </h3>
                   
                   <p><span className='font-medium'>Industry:</span>{company.industry}</p>
                   <p><span className='font-medium'>Founded:</span>{company.founded}</p>
                   <p><span className='font-medium'>HQ:</span>{company.headquarters}</p>
                   <p><span className='font-medium'>Employees:</span>{company.employees}</p>
                   <p><span className='font-medium'>Revenue:</span>{company.revenue}</p>
                   <p><span className='font-medium'>Description:</span>{company.description}</p>

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
