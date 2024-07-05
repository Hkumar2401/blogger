import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch("http://localhost:3000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: credentials.fullName,
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();
      if(data.status){
        navigate("/");
      } else{
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <form
        className="bg-gray-200 w-1/3 h-fit flex flex-col gap-5 p-20"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="p-3 rounded-md focus-within:outline-blue-400"
          value={credentials.fullName}
          onChange={(e) => {
            setCredentials({
              fullName: e.target.value,
              email: credentials.email,
              password: credentials.password,
            });
          }}
          placeholder="Full Name"
          type="text"
        />
        <input
          className="p-3 rounded-md focus-within:outline-blue-400"
          value={credentials.email}
          onChange={(e) => {
            setCredentials({
              fullName: credentials.fullName,
              email: e.target.value,
              password: credentials.password,
            });
          }}
          placeholder="Email address"
          type="email"
        />
        <input
          className="p-3 rounded-md focus-within:outline-blue-400"
          value={credentials.password}
          onChange={(e) => {
            setCredentials({
              fullName: credentials.fullName,
              email: credentials.email,
              password: e.target.value,
            });
          }}
          placeholder="Password"
          type="password"
        />
        <button
          className="w-full bg-blue-500 font-bold p-3 mt-5"
          onClick={handleSignup}
        >
          Sign up
        </button>
        <p>
          Already have an account?{" "}
          <Link to={"/login"} className="cursor-pointer text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
