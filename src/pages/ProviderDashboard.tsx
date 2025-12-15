import { useState } from "react"
import { useAuth } from "../components/AuthContext";

export default function ProviderDashboard() {
  const {user} = useAuth();
  const [form,setForm] = useState({
    name: "",
    price: "",
    category: ""
  });

  const [message,setMessage] = useState("");

  const handleSubmit = async(e:React.FormEvent) =>{
    e.preventDefault();
    setMessage("");
    try {
      const token = user?.token
      console.log('token', token);      
      const res = await fetch("http://localhost:5000/api/product/add",{
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body:JSON.stringify(form),
      });
      
      const data = await res.json();

      if(!res.ok){
        setMessage(data.message || "Something went wrong")
      }

      setMessage("Product added successfully");

      // setForm({
      //   name: "",
      //   price: "",
      //   category: ""
      // });

    } catch (error) {
      setMessage("Server Error");
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Provider Dashboard
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="w-full p-3 border rounded mb-4"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full p-3 border rounded mb-4"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full p-3 border rounded mb-4"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700">
            Add Product
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-600 font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
      
