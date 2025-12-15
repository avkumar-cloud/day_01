import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
    username: "",
    password: "",
    role: "customer" as "provider" | "customer",
  });

  const handleSubmit = async(e: React.FormEvent) => {
    try {
        e.preventDefault();
        setError("");
        setSuccess("");
        const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
        });
        const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration Successful!");
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
        setError("Something went wrong. Check backend.");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-xl rounded-xl w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

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

        <select
          value={form.role}
          className="w-full p-3 border rounded mb-4"
          onChange={(e) =>
            setForm({ ...form, role: e.target.value as "provider" | "customer" })
          }
        >
          <option value="customer">Customer</option>
          <option value="provider">Provider</option>
        </select>

        <button className="w-full bg-green-600 text-white p-3 rounded mt-2 hover:bg-green-700">
          Register
        </button>

        {error && <p className="text-red-500 text-center mt-3">{error}</p>}
        {success && <p className="text-green-500 text-center mt-3">{success}</p>}
      </form>
    </div>
  );
}
