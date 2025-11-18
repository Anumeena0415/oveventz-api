// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Customer = () => {
//   const [customers, setcustomers] = useState([]);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await axios.get("https://ovevents.onrender.com/api/eventplan/showAllEvent");
//         setcustomers(res.data.data);
//         console.log("data ---------",res.data.data);

//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };
//     fetchCustomers();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-5">
//       <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
//         All Customer
//       </h1>

//       {customers.length === 0 ? (
//         <p className="text-center text-gray-600">No customers found...</p>
//       ) : (
// <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//   {customers.map((customer) => (
//     <div
//       key={customer._id}
//       className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
//     >
//       <h2 className="text-xl font-semibold text-gray-800">{customer.type}</h2>
//        <p className="text-gray-600">Name : {customer.name}</p>
//        <p className="text-gray-600">Email : {customer.email}</p>
//        <p className="text-gray-600">Phone No : {customer.phoneNo}</p>
//       <p className="text-gray-600">Date: {customer.date}</p>
//       <p className="text-gray-600">City: {customer.city}</p>
//       <p className="text-gray-600">Price: ₹{customer.budget}</p>
//       <p className="text-gray-600">Venue: {customer.venuePreference}</p>
//       <p className="text-gray-600">Services: {customer.services}</p>
//       <p className="text-gray-500 text-sm mt-2">Guests :{customer.guests}</p>

//       <div className="flex gap-3">
//         <button className="mt-4 w-[40%] bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
//         Done
//       </button>
//       <button className="mt-4 w-[40%] bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition">
//         Reject
//       </button>
//       </div>
//     </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Customer;

import axios from "axios";
import { useState, useEffect } from "react";

const ITEMS_PER_PAGE = 6;

const Customer = ({ title }) => {
  const [customers, setCustomers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  // --- Fetch all customers
  const fetchCustomers = async () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
    try {
      const data = await axios.get(
        `${BASE_URL}/api/eventplan/showAllEvent`
      );
      // const data = await res.json();
      console.log("data----------------------------------", data.data.data);
      setCustomers(data.data.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  // --- Handle status update (Approve / Reject)
  const handleClick = async (customer, status) => {
    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const updated = { ...customer, status };
      const res = await axios.put(
        `${BASE_URL}/api/eventplan/update/${customer._id}`,
        updated
      );
      console.log("cuatomerid ----------", customer._id);
      if(status==="Approved"){
      handSendEmail(customer, status);
      }else if(status==="Done"){
        handleRejectSendEmail(customer, status);
      }else{
        handleRejectSendEmail(customer, status); 
      }

      console.log("Updated:", res.data);
      fetchCustomers(); // refresh after update
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
    const handleRejectSendEmail = async (customer, status) => {
    try {
      console.log("customer in send Aproved email", customer);
      const updated = { ...customer, status };
      console.log("customerid---------", customer._id);
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await axios.post(
        `${BASE_URL}/api/eventplan/sendEmailRejected/${customer._id}`,
        updated
      );

      console.log("Updated:", res.data);
      fetchCustomers(); // refresh after update
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
  const handSendEmail = async (customer, status) => {
    try {
      console.log("customer in send Aproved email", customer);
      const updated = { ...customer, status };
      console.log("customerid---------", customer._id);
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await axios.post(
        `${BASE_URL}/api/eventplan/sendApproved/${customer._id}`,
        updated
      );

      console.log("Updated:", res.data);
      fetchCustomers(); // refresh after update
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  // --- Separate customers by status
  const pendingCustomers = customers.filter((c) => c.status === "pending");
  const approvedCustomers = customers.filter((c) => c.status === "Approved");
  const rejectedCustomers = customers.filter((c) => c.status === "Reject");
  const doneCustomers = customers.filter((c) => c.status === "Done");

  const displayedPending = showAll
    ? pendingCustomers
    : pendingCustomers.slice(0, ITEMS_PER_PAGE);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>

      {/* ================= Pending Section ================= */}
      <h3 className="text-xl font-semibold text-blue-700 mb-3">Pending</h3>
      {displayedPending.length === 0 ? (
        <p className="text-gray-500 mb-4">No pending customers</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPending.map((customer) => (
            <div
              key={customer._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {customer.type}
              </h2>
              <p className="text-gray-600">Name: {customer.name}</p>
              <p className="text-gray-600">Email: {customer.email}</p>
              <p className="text-gray-600">Phone No: {customer.phoneNo}</p>
              <p className="text-gray-600">Date: {customer.date}</p>
              <p className="text-gray-600">City: {customer.city}</p>
              <p className="text-gray-600">Price: ₹{customer.budget}</p>
              <p className="text-gray-600">Venue: {customer.venuePreference}</p>
              <p className="text-gray-600">Services: {customer.services}</p>
              <p className="text-blue-700 font-semibold">
                Status: {customer.status}
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Guests: {customer.guests}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    handleClick(customer, "Approved");
                    handSendEmail(customer, "Approved");
                  }}
                  className="mt-4 w-[40%] bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
                >
                  Approved
                </button>
                <button
                  onClick={() => handleClick(customer, "Reject")}
                  className="mt-4 w-[40%] bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Approved Section ================= */}
      <h3 className="text-xl font-semibold text-green-700 mt-10 mb-3">
        Approved
      </h3>
      {approvedCustomers.length === 0 ? (
        <p className="text-gray-500 mb-4">No approved customers</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {approvedCustomers.map((customer) => (
            <div
              key={customer._id}
              className="bg-green-50 border border-green-300 rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {customer.type}
              </h2>
              <p className="text-gray-600">Name: {customer.name}</p>
              <p className="text-gray-600">Email: {customer.email}</p>
              <p className="text-gray-600">Phone No: {customer.phoneNo}</p>
              <p className="text-gray-600">Date: {customer.date}</p>
              <p className="text-gray-600">City: {customer.city}</p>
              <p className="text-gray-600">Price: ₹{customer.budget}</p>
              <p className="text-gray-600">Venue: {customer.venuePreference}</p>
              <p className="text-gray-600">Services: {customer.services}</p>
              <p className="text-green-700 font-semibold">Status: Approved</p>
              <div className="flex gap-3">
                <button  onClick={() => handleClick(customer, "Done")} className="mt-4 w-[40%] bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition">
                  Done
                </button>
                <button
                  onClick={() => handleClick(customer, "Reject")}
                  className="mt-4 w-[40%] bg-red-600 text-white py-2 rounded-xl hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Rejected Section ================= */}
      <h3 className="text-xl font-semibold text-red-700 mt-10 mb-3">
        Rejected
      </h3>
      {rejectedCustomers.length === 0 ? (
        <p className="text-gray-500 mb-4">No rejected customers</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rejectedCustomers.map((customer) => (
            <div
              key={customer._id}
              className="bg-red-50 border border-red-300 rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {customer.type}
              </h2>
              <p className="text-gray-600">Name: {customer.name}</p>
              <p className="text-gray-600">Email: {customer.email}</p>
              <p className="text-gray-600">Phone No: {customer.phoneNo}</p>
              <p className="text-gray-600">Date: {customer.date}</p>
              <p className="text-gray-600">City: {customer.city}</p>
              <p className="text-gray-600">Price: ₹{customer.budget}</p>
              <p className="text-gray-600">Venue: {customer.venuePreference}</p>
              <p className="text-gray-600">Services: {customer.services}</p>
              <p className="text-red-700 font-semibold">Status: Rejected</p>
              <button
                onClick={() => handleClick(customer, "Approved")}
                className="mt-4 w-[40%] bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                Approved
              </button>
            </div>
          ))}
        </div>
      )}

       {/* ================= Done Section ================= */}
      <h3 className="text-xl font-semibold text-green-700 mt-10 mb-3">
        Done
      </h3>
      {doneCustomers.length === 0 ? (
        <p className="text-gray-500 mb-4">No done customers</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doneCustomers.map((customer) => (
            <div
              key={customer._id}
              className="bg-red-50 border border-red-300 rounded-2xl shadow-md hover:shadow-lg transition p-4"
            >
              <h2 className="text-xl font-semibold text-gray-800">
                {customer.type}
              </h2>
              <p className="text-gray-600">Name: {customer.name}</p>
              <p className="text-gray-600">Email: {customer.email}</p>
              <p className="text-gray-600">Phone No: {customer.phoneNo}</p>
              <p className="text-gray-600">Date: {customer.date}</p>
              <p className="text-gray-600">City: {customer.city}</p>
              <p className="text-gray-600">Price: ₹{customer.budget}</p>
              <p className="text-gray-600">Venue: {customer.venuePreference}</p>
              <p className="text-gray-600">Services: {customer.services}</p>
              <p className="text-green-700 font-semibold">Status: {customer.status}</p>
              {/* <button
                onClick={() => handleClick(customer, "Approved")}
                className="mt-4 w-[40%] bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
              >
                Approved
              </button> */}
            </div>
          ))}
        </div>
      )}

      {pendingCustomers.length > ITEMS_PER_PAGE && (
        <button
          className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show Less" : "Show All"}
        </button>
      )}
    </div>
  );
};

export default Customer;
