// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const CompanyList = ({ onEdit }) => {
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [companies, setCompanies] = useState([]);

//   const fetchCompanies = async () => {
//      if(localStorage.getItem("isLoggedIn") !== "true"){
//         alert("You must be logged in to add a company.");
//         return;
//     }

//     try {
//       const res = await axios.get(`${backendUrl}/backend/company`, {
//         withCredentials: true,
//       });
//       setCompanies(res.data);
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//      if(localStorage.getItem("isLoggedIn") !== "true"){
//         alert("You must be logged in to add a company.");
//         return;
//     }

//     if (!window.confirm("Are you sure you want to delete this company?")) return;

//     try {
//       await axios.delete(`${backendUrl}/backend/company/${id}`, {
//         withCredentials: true,
//       });
//       setCompanies((prev) => prev.filter((company) => company._id !== id));
//     } catch (error) {
//       console.error("Error deleting company:", error);
//     }
//   };

//   const handleUpdate = async (id, updatedData) => {
//      if(localStorage.getItem("isLoggedIn") !== "true"){
//         alert("You must be logged in to add a company.");
//         return;
//     }

//     try {
//       const res = await axios.put(
//         `${backendUrl}/backend/company/${id}`,
//         updatedData,
//         { withCredentials: true }
//       );

//       setCompanies((prev) =>
//         prev.map((company) => (company._id === id ? res.data : company))
//       );

//       alert("Company updated successfully!");
//     } catch (error) {
//       console.error("Error updating company:", error);
//       alert(error.response?.data?.message || "Failed to update company");
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">Company List</h2>
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Company Name</th>
//             <th className="p-2">Industry</th>
//             <th className="p-2">Founded Year</th>
//             <th className="p-2">Headquarters</th>
//             <th className="p-2">No. of Employees</th>
//             <th className="p-2">Revenue</th>
//             <th className="p-2">Description</th>
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {companies.map((company) => (
//             <tr key={company._id} className="border">
//               <td className="p-2">{company.companyname}</td>
//               <td className="p-2">{company.industry}</td>
//               <td className="p-2">{company.founded}</td>
//               <td className="p-2">{company.headquarters}</td>
//               <td className="p-2">{company.employees}</td>
//               <td className="p-2">{company.revenue}</td>
//               <td className="p-2">{company.description}</td>
//               <td className="p-2 flex gap-2">
//                 {onEdit && (
//                   <button
//                     onClick={() => onEdit(company, handleUpdate)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>
//                 )}
//                 <button
//                   onClick={() => handleDelete(company._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CompanyList;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Edit from "./Edit.jsx";

const CompanyList = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null); // Track which company is being edited

  const fetchCompanies = async () => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      alert("You must be logged in to view companies.");
      return;
    }

    try {
      const res = await axios.get(`${backendUrl}/backend/company`, {
        withCredentials: true,
      });
      setCompanies(res.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleDelete = async (id) => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      alert("You must be logged in to delete a company.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this company?")) return;

    try {
      await axios.delete(`${backendUrl}/backend/company/${id}`, {
        withCredentials: true,
      });
      setCompanies((prev) => prev.filter((company) => company._id !== id));
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleUpdate = async (updatedData) => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      alert("You must be logged in to update a company.");
      return;
    }

    try {
      const res = await axios.put(
        `${backendUrl}/backend/company/${updatedData._id}`,
        updatedData,
        { withCredentials: true }
      );

      setCompanies((prev) =>
        prev.map((company) =>
          company._id === updatedData._id ? res.data : company
        )
      );

      setEditingCompany(null); // close the edit form
      alert("Company updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      alert(error.response?.data?.message || "Failed to update company");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-bold mb-4">Company List</h2>

      {editingCompany ? (
        <Edit
          savedUser={editingCompany}
          onUpdate={handleUpdate}
          onCancel={() => setEditingCompany(null)}
        />
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Company Name</th>
              <th className="p-2">Industry</th>
              <th className="p-2">Founded Year</th>
              <th className="p-2">Headquarters</th>
              <th className="p-2">No. of Employees</th>
              <th className="p-2">Revenue</th>
              <th className="p-2">Description</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id} className="border">
                <td className="p-2">{company.companyname}</td>
                <td className="p-2">{company.industry}</td>
                <td className="p-2">{company.founded}</td>
                <td className="p-2">{company.headquarters}</td>
                <td className="p-2">{company.employees}</td>
                <td className="p-2">{company.revenue}</td>
                <td className="p-2">{company.description}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => setEditingCompany(company)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(company._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CompanyList;
