import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
         const res = await fetch("http://localhost:5000/api/auth/login", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(form), 
      });
        
       const data =  await res.json();        
        
       if(!res.ok){
        setError(data.message || "Invalid credentials");
        return
       }

       const userObj = {
        username: data.username,
        role: data.role,
        token: data.token
       }


        login(userObj)      

        const user = JSON.parse(localStorage.getItem("user")!);
        
        switch (user.role) {
        case "admin":
            navigate("/admin");
            break;
        case "provider":
            navigate("/provider");
            break;
        case "customer":
            navigate("/customer");
            break;
        default:
            navigate("/login");
        }     
    } catch (error) {
        setError("Backend error. Check server.");
    }
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 border rounded mb-4"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border rounded mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
          Login
        </button>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <p className="mt-4 text-center text-gray-600">
          New here?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
