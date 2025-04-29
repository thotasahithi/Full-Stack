// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import useAuth from "../Hooks/UseAuth";

// const Logout = () => {
//   const navigate = useNavigate();
//   const [, , removeCookie] = useCookies(["user"]);
//   const { logout } = useAuth();
//   const timeoutRef = useRef(null); 

//   const handleLogout = () => {
//     logout(); 
//     removeCookie("user", { path: "/" });
//     navigate("/home");
//   };
  
//     // useEffect(() => {
//     //   timeoutRef.current = setTimeout(() => {
//     //     logout();
//     //     removeCookie("user", { path: "/" });
//     //     navigate("/login");
//     //   }, 5 * 60 * 1000); // 5 minutes inactivity
  
//     //   return () => clearTimeout(timeoutRef.current); // Cleanup
//     // }, [logout, removeCookie, navigate]); // ✅ No ESLint warning
  
//     return {
//       handleLogout,
//     };
//   };
  
//   export default Logout;