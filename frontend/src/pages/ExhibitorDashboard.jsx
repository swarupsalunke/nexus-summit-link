// import "../index.css";
// import Navbar from "../components/Navbar";

// export default function Exhibitor() {

//   const packages = [

//     {
//       title: "Basic Stall",
//       price: "₹25,000",
//       features: [
//         "1 Booth Space",
//         "Brand Logo",
//         "Visitor Access"
//       ]
//     },

//     {
//       title: "Premium Stall",
//       price: "₹50,000",
//       features: [
//         "Prime Location",
//         "Large Booth",
//         "Stage Mention",
//         "Networking Access"
//       ]
//     },

//     {
//       title: "Demo Booth",
//       price: "₹75,000",
//       features: [
//         "Live Product Demo",
//         "LED Display",
//         "VIP Networking",
//         "Premium Branding"
//       ]
//     }

//   ];

//   return (
//     <>
//       <Navbar />

//       <div
//         style={{
//           background: "#f3f4f6",
//           minHeight: "100vh",
//           padding: "40px 20px"
//         }}
//       >

//         {/* 🔥 TITLE */}
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: "40px"
//           }}
//         >
//           <h1
//             style={{
//               fontSize: "42px",
//               marginBottom: "10px"
//             }}
//           >
//             Exhibitor Packages
//           </h1>

//           <p
//             style={{
//               color: "#555",
//               fontSize: "18px"
//             }}
//           >
//             Showcase your brand at
//             Nexus Link Summit 2026
//           </p>
//         </div>

//         {/* 🔥 CARDS */}
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns:
//               "repeat(auto-fit, minmax(300px, 1fr))",
//             gap: "25px",
//             maxWidth: "1200px",
//             margin: "0 auto"
//           }}
//         >

//           {packages.map((pkg, index) => (

//             <div
//               key={index}
//               className="card"
//               style={{
//                 padding: "30px",
//                 borderRadius: "14px",
//                 background: "white",
//                 boxShadow:
//                   "0 4px 12px rgba(0,0,0,0.1)"
//               }}
//             >

//               {/* TITLE */}
//               <h2
//                 style={{
//                   marginBottom: "15px",
//                   fontSize: "28px"
//                 }}
//               >
//                 {pkg.title}
//               </h2>

//               {/* PRICE */}
//               <h1
//                 style={{
//                   color: "#2563eb",
//                   marginBottom: "20px",
//                   fontSize: "42px"
//                 }}
//               >
//                 {pkg.price}
//               </h1>

//               {/* FEATURES */}
//               <ul
//                 style={{
//                   listStyle: "none",
//                   padding: 0,
//                   marginBottom: "25px"
//                 }}
//               >

//                 {pkg.features.map((feature, i) => (

//                   <li
//                     key={i}
//                     style={{
//                       marginBottom: "12px",
//                       fontSize: "17px"
//                     }}
//                   >
//                     ✅ {feature}
//                   </li>

//                 ))}

//               </ul>

//               {/* BUTTON */}
//               <button
//                 className="btn btn-primary"
//                 style={{
//                   width: "100%",
//                   padding: "12px"
//                 }}
//               >
//                 Choose Package
//               </button>

//             </div>

//           ))}

//         </div>

//       </div>
//     </>
//   );
// }