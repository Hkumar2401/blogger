import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [fullName, setFullName] = useState(localStorage.getItem("fullName"));



  const handleLogout = () =>{
    localStorage.removeItem('fullName');
    localStorage.removeItem('token');
    setFullName("");
  }

  return (
    <div className="flex justify-between items-center p-5 px-44 border-b-[1px] border-[#e5e7eb]">
      <div>
        <h1 className="text-4xl font-semibold">Hemant Kumar</h1>
      </div>
      <div className="flex gap-10 text-xl cursor-pointer">
        <button className="hover:bg-zinc-100 p-2 rounded-md">About</button>
        <button className="hover:bg-zinc-100 p-2 rounded-md">Other</button>
        <button className="hover:bg-zinc-100 p-2 rounded-md">
          Affiliations
        </button>
        {fullName ? (
          <div className="flex gap-4">
            <button className="hover:bg-zinc-100 p-2 rounded-md">
              {fullName}
            </button>
            <button className=" bg-zinc-100 p-2 rounded-md" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"}>
            <button className="hover:bg-zinc-100 p-2 rounded-md">
              Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
