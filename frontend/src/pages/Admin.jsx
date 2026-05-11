// import { useEffect, useState } from "react";
// import axios from "axios";
// import "../index.css";
// import Navbar from "../components/Navbar";

// export default function Admin() {

//   // 🔹 Delegates
//   const [delegates, setDelegates] = useState([]);

//   // 🔥 Filter
//   const [filter, setFilter] = useState("all");

//   // 🔥 Search
//   const [search, setSearch] = useState("");

//   // 🔥 Stats
//   const [stats, setStats] = useState({
//     total: 0,
//     approved: 0,
//     pending: 0,
//     rejected: 0
//   });

//   // 🔹 Current User
//   const user = JSON.parse(localStorage.getItem("user"));

//   // ======================================================
//   // 🔹 Fetch Delegates
//   // ======================================================

//   const fetchDelegates = async () => {

//     try {

//       const { data } = await axios.get(
//         "https://nexus-summit-link.onrender.com/api/delegate",
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );

//       // 🔥 Save delegates
//       setDelegates(data);

//       // 🔥 Calculate stats
//       setStats({

//         total: data.length,

//         approved: data.filter(
//           (d) => d.status === "approved"
//         ).length,

//         pending: data.filter(
//           (d) => d.status === "pending"
//         ).length,

//         rejected: data.filter(
//           (d) => d.status === "rejected"
//         ).length
//       });

//     } catch (error) {

//       console.log(error.response?.data);

//       alert("Not authorized ❌");
//     }
//   };

//   // ======================================================
//   // 🔹 Load Delegates
//   // ======================================================

//   useEffect(() => {
//     fetchDelegates();
//   }, []);

//   // ======================================================
//   // 🔹 Update Status
//   // ======================================================

//   const updateStatus = async (id, status) => {

//     try {

//       await axios.put(
//         `https://nexus-summit-link.onrender.com/api/delegate/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );

//       alert(`Delegate ${status} ✅`);

//       // 🔥 Refresh
//       fetchDelegates();

//     } catch (error) {

//       console.log(error.response?.data);

//       alert(
//         error.response?.data?.message ||
//         "Error ❌"
//       );
//     }
//   };

//   // ======================================================
//   // 🔥 FILTER + SEARCH
//   // ======================================================

//   const filteredDelegates = delegates.filter((d) => {

//     // 🔥 Filter check
//     const matchesFilter =
//       filter === "all" ||
//       d.status === filter;

//     // 🔥 Search check
//     const matchesSearch =

//       d.name
//         .toLowerCase()
//         .includes(search.toLowerCase())

//       ||

//       d.company
//         .toLowerCase()
//         .includes(search.toLowerCase());

//     return matchesFilter && matchesSearch;
//   });

//   // ======================================================
//   // 🔹 UI
//   // ======================================================

//   return (
//     <>
//       {/* 🔥 NAVBAR */}
//       <Navbar />

//       <div
//         style={{
//           padding: "20px",
//           background: "#f3f4f6",
//           minHeight: "100vh"
//         }}
//       >

//         {/* 🔥 TITLE */}
//         <h1 style={{ marginBottom: "20px" }}>
//           Admin Dashboard
//         </h1>

//         {/* ================================================== */}
//         {/* 🔥 STATS CARDS */}
//         {/* ================================================== */}

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(180px, 1fr))",
//             gap: "15px",
//             marginBottom: "25px"
//           }}
//         >

//           {/* TOTAL */}
//           <div className="card">
//             <h3>Total Delegates</h3>
//             <h1>{stats.total}</h1>
//           </div>

//           {/* APPROVED */}
//           <div className="card">
//             <h3>Approved</h3>
//             <h1>{stats.approved}</h1>
//           </div>

//           {/* PENDING */}
//           <div className="card">
//             <h3>Pending</h3>
//             <h1>{stats.pending}</h1>
//           </div>

//           {/* REJECTED */}
//           <div className="card">
//             <h3>Rejected</h3>
//             <h1>{stats.rejected}</h1>
//           </div>

//         </div>

//         {/* ================================================== */}
//         {/* 🔥 FILTER BUTTONS */}
//         {/* ================================================== */}

//         <div
//           style={{
//             display: "flex",
//             gap: "10px",
//             marginBottom: "20px",
//             flexWrap: "wrap"
//           }}
//         >

//           <button
//             className="btn"
//             onClick={() => setFilter("all")}
//           >
//             All
//           </button>

//           <button
//             className="btn btn-primary"
//             onClick={() => setFilter("pending")}
//           >
//             Pending
//           </button>

//           <button
//             className="btn btn-green"
//             onClick={() => setFilter("approved")}
//           >
//             Approved
//           </button>

//           <button
//             className="btn btn-yellow"
//             onClick={() => setFilter("rejected")}
//           >
//             Rejected
//           </button>

//         </div>

//         {/* ================================================== */}
//         {/* 🔥 SEARCH BAR */}
//         {/* ================================================== */}

//         <input
//           type="text"
//           placeholder="Search by name or company..."
//           className="input"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             marginBottom: "20px",
//             width: "300px",
//             maxWidth: "100%"
//           }}
//         />

//         {/* ================================================== */}
//         {/* 🔥 TABLE */}
//         {/* ================================================== */}

//         <div
//           style={{
//             overflowX: "auto",
//             background: "white",
//             padding: "15px",
//             borderRadius: "10px"
//           }}
//         >

//           <table
//             border="1"
//             cellPadding="10"
//             style={{
//               width: "100%",
//               borderCollapse: "collapse"
//             }}
//           >

//             <thead>

//               <tr>
//                 <th>Name</th>
//                 <th>Company</th>
//                 <th>Industry</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>

//             </thead>

//             <tbody>

//               {filteredDelegates.length > 0 ? (

//                 filteredDelegates.map((d) => (

//                   <tr key={d._id}>

//                     <td>{d.name}</td>

//                     <td>{d.company}</td>

//                     <td>{d.industry}</td>

//                     <td>{d.status}</td>

//                     <td>

//                       {/* 🔥 APPROVED */}
//                       {d.status === "approved" ? (

//                         <span style={{ color: "green" }}>
//                           Approved ✅
//                         </span>

//                       ) : d.status === "rejected" ? (

//                         /* 🔥 REJECTED */
//                         <span style={{ color: "red" }}>
//                           Rejected ❌
//                         </span>

//                       ) : (

//                         /* 🔥 PENDING BUTTONS */
//                         <>
//                           <button
//                             className="btn btn-primary"
//                             onClick={() =>
//                               updateStatus(
//                                 d._id,
//                                 "approved"
//                               )
//                             }
//                           >
//                             Approve
//                           </button>

//                           <button
//                             className="btn"
//                             onClick={() =>
//                               updateStatus(
//                                 d._id,
//                                 "rejected"
//                               )
//                             }
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                     </td>

//                   </tr>
//                 ))

//               ) : (

//                 <tr>
//                   <td
//                     colSpan="5"
//                     style={{ textAlign: "center" }}
//                   >
//                     No delegates found
//                   </td>
//                 </tr>
//               )}

//             </tbody>

//           </table>

//         </div>

//       </div>
//     </>
//   );
// }