// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import "../index.css";

// export default function AdminExhibitors() {

//   const [exhibitors, setExhibitors] = useState([]);

//   const user = JSON.parse(localStorage.getItem("user"));

//   // ======================================================
//   // 🔥 FETCH EXHIBITORS
//   // ======================================================

//   const fetchExhibitors = async () => {

//     try {

//       const { data } = await axios.get(
//         "http://localhost:5000/api/exhibitor",
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );

//       setExhibitors(data);

//     } catch (error) {

//       console.log(error.response?.data);

//       alert("Error ❌");
//     }
//   };

//   useEffect(() => {
//     fetchExhibitors();
//   }, []);

//   // ======================================================
//   // 🔥 UPDATE STATUS
//   // ======================================================

//   const updateStatus = async (id, status) => {

//     try {

//       await axios.put(
//         `http://localhost:5000/api/exhibitor/${id}`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`
//           }
//         }
//       );

//       alert(`Exhibitor ${status} ✅`);

//       fetchExhibitors();

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
//           Exhibitor Applications
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
//                 <th>Website</th>
//                 <th>Package</th>
//                 <th>Contact</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>

//             </thead>

//             <tbody>

//               {exhibitors.length > 0 ? (

//                 exhibitors.map((e) => (

//                   <tr key={e._id}>

//                     <td>{e.company}</td>

//                     <td>{e.website}</td>

//                     <td>{e.package}</td>

//                     <td>{e.contactPerson}</td>

//                     <td>{e.email}</td>

//                     <td>{e.status}</td>

//                     <td>

//                       {e.status === "approved" ? (

//                         <span
//                           style={{ color: "green" }}
//                         >
//                           Approved ✅
//                         </span>

//                       ) : e.status === "rejected" ? (

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
//                                 e._id,
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
//                                 e._id,
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
//                     colSpan="7"
//                     style={{
//                       textAlign: "center"
//                     }}
//                   >
//                     No exhibitor applications
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