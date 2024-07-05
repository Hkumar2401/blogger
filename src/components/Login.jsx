import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () =>{
    try {
      const response = await fetch("http://localhost:3000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });
      const data = await response.json();
      if(data.token){
        navigate("/");
        localStorage.setItem('token', data.token);
        localStorage.setItem('fullName', data.fullName);
      } else{
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center items-center w-screen h-screen ">
      <form
        className="bg-gray-200 w-1/3 h-fit flex flex-col gap-5 p-20"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="p-3 rounded-md focus-within:outline-blue-400"
          value={credentials.email}
          onChange={(e) => {
            setCredentials({
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
              email: credentials.email,
              password: e.target.value,
            });
          }}
          placeholder="Password"
          type="password"
        />
        <button
          className="w-full bg-blue-500 font-bold p-3 mt-5"
          onClick={handleLogin}
        >
          Log In
        </button>
        <p>
          New User ?{" "}
          <Link to={"/signup"} className="cursor-pointer text-blue-700">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
