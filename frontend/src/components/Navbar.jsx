import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white flex justify-between items-center p-4">
      <Link to="/" className="text-2xl font-bold hover:text-gray-200">
        GripInvest
      </Link>
      <div>
        {token ? (
          <>
            <Link to="/dashboard" className="mx-2 hover:underline">
              Dashboard
            </Link>
            <Link to="/products" className="mx-2 hover:underline">
              Products
            </Link>
            <Link to="/portfolio" className="mx-2 hover:underline">
              Portfolio
            </Link>
            <Link to="/logs" className="mx-2 hover:underline">
              Logs
            </Link>
            <Link to="/profile" className="mx-2 hover:underline">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mx-2 hover:underline">
              Login
            </Link>
            <Link to="/signup" className="mx-2 hover:underline">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}


// import React from 'react';

// export default function Navbar() {
//   return (
//     <nav className="bg-indigo-900 text-white px-8 py-4 flex justify-between items-center shadow">
//       <div className="font-extrabold text-lg tracking-wide">GripInvest</div>
//       <div className="flex gap-6 items-center text-base">
//         <a href="/strategies" className="hover:text-indigo-400">Strategies</a>
//         <a href="/managers" className="hover:text-indigo-400">Managers</a>
//         <a href="/about" className="hover:text-indigo-400">About Us</a>
//         <a href="/faq" className="hover:text-indigo-400">FAQ</a>
//         <button className="bg-green-500 px-4 py-2 rounded text-white ml-4 hover:bg-green-600">
//           Personal Account
//         </button>
//       </div>
//     </nav>
//   );
// }
