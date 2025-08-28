import React, { useState, useEffect } from "react";

const Edit = ({ savedUser, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    companyname: "",
    industry: "",
    founded: "",
    headquarters: "",
    employees: "",
    revenue: "",
    description: "",
  });

  useEffect(() => {
    if (savedUser) {
      setFormData({
        companyname: savedUser.companyname || "",
        industry: savedUser.industry || "",
        founded: savedUser.founded || "",
        headquarters: savedUser.headquarters || "",
        employees: savedUser.employees || "",
        revenue: savedUser.revenue || "",
        description: savedUser.description || "",
      });
    }
  }, [savedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...savedUser, ...formData };
    onUpdate(updatedUser);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4">Edit Company Info</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Company Name", name: "companyname" },
          { label: "Industry", name: "industry" },
          { label: "Founded", name: "founded" },
          { label: "Headquarters", name: "headquarters" },
          { label: "Employees", name: "employees" },
          { label: "Revenue", name: "revenue" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium mb-1">{field.label}</label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
