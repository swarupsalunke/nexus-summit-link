// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import "../index.css";

// export default function AdminSponsors() {

//   const [sponsors, setSponsors] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   // ======================================================
//   // 🔥 FETCH SPONSORS
//   // ======================================================

//   const fetchSponsors = async () => {

//     try {

//       const { data } = await axios.get(
//         "https://nexus-summit-link.onrender.com/api/sponsor",
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );

//       setSponsors(data);

//     } catch (error) {

//       console.log(error.response?.data);

//       alert("Error ❌");
//     }
//   };

//   useEffect(() => {
//     fetchSponsors();
//   }, []);

//   // ======================================================
//   // 🔥 UPDATE STATUS
//   // ======================================================

//   const updateStatus = async (id, status) => {

//     try {

//       await axios.put(
//         `https://nexus-summit-link.onrender.com/api/sponsor/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );

//       alert(`Sponsor ${status} ✅`);

//       fetchSponsors();

//     } catch (error) {

//       console.log(error.response?.data);

//       alert("Error ❌");
//     }
//   };

//   // ======================================================
//   // 🔥 UI
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

//         <h1
//           style={{
//             marginBottom: "20px"
//           }}
//         >
//           Sponsor Inquiries
//         </h1>

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
//                 <th>Company</th>
//                 <th>Interest</th>
//                 <th>Budget</th>
//                 <th>Message</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>

//             </thead>

//             <tbody>

//               {sponsors.length > 0 ? (

//                 sponsors.map((s) => (

//                   <tr key={s._id}>

//                     <td>{s.company}</td>

//                     <td>{s.interest}</td>

//                     <td>{s.budget}</td>

//                     <td>{s.message}</td>

//                     <td>{s.status}</td>

//                     <td>

//                       {s.status === "approved" ? (

//                         <span
//                           style={{ color: "green" }}
//                         >
//                           Approved ✅
//                         </span>

//                       ) : s.status === "rejected" ? (

//                         <span
//                           style={{ color: "red" }}
//                         >
//                           Rejected ❌
//                         </span>

//                       ) : (

//                         <>
//                           <button
//                             className="btn btn-primary"
//                             onClick={() =>
//                               updateStatus(
//                                 s._id,
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
//                                 s._id,
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
//                     colSpan="6"
//                     style={{
//                       textAlign: "center"
//                     }}
//                   >
//                     No sponsor inquiries
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