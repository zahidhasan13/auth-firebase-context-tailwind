import { useContext } from "react";
import {  Link, NavLink } from "react-router-dom";
import { AuthContext } from "./providers/AuthProvider";

const Header = () => {
  const {user, logOut} = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
    .then(()=>{})
    .catch((err)=>{
      console.log(err)
    })
  }
  return (
    <div className="bg-indigo-600 text-white py-2 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between">
        <div>
          <Link to="/" className="text-xl">Auth Master</Link>
        </div>
        <div className="space-x-4 font-medium">
          <NavLink to="/"  className={({ isActive }) =>
                      isActive
                        ? "text-gray-900"
                        : "text-white"
                    }>Home</NavLink>
          <NavLink to="/order"  className={({ isActive }) =>
                      isActive
                        ? "text-gray-900"
                        : "text-white"
                    }>Order</NavLink>
          {
            !user && <NavLink to="/login"  className={({ isActive }) =>
            isActive
              ? "text-gray-900"
              : "text-white"
          }>Login</NavLink>
          }
          {
            !user && <NavLink to="/register"  className={({ isActive }) =>
            isActive
              ? "text-gray-900"
              : "text-white"
          }>Register</NavLink> 
          }
                    <>
                      {
                        user && <span>{user.email} <button onClick={handleLogOut} className="bg-red-500 px-3 py-1 rounded">sign out</button></span>
                      }
                    </>
        </div>
      </div>
    </div>
  );
};

export default Header;
