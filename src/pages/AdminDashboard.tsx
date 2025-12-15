import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    const fetchProducts = async () =>{
    const token = localStorage.getItem('token');
    const res = await fetch("http://localhost:5000/api/admin/products", {
      headers: {Authorization: `Bearer ${token}`}
    });
    const data = await res.json();
    setProducts(data);
  };
  fetchProducts();
  },[]);

  const handleApprove = async(id: string) =>{
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:5000/api/admin/products/${id}/approve`,{
      method: "PATCH",
      headers: {"Authorization": `Bearer ${token}`}
    });
    fetchProducts();
  }

  const handleReject = async(id: string) =>{
    const token = localStorage.getItem('token');
    await fetch(`http://localhost:5000/api/admin/products/${id}/reject`,{
      method: "DELETE",
      headers: {"Authorization": `Bearer ${token}`}
    });
    fetchProducts();
  }
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {
        products.length===0 ? (
          <p className="text-gray-600 text-lg">No pending products</p>
        ) : (
          <div className="space-y-4">
            {
              products.map((p:any)=>(
                <div 
                key={p._id} 
                className="bg-white p-4 rounded shadow flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg">{p.name}</h3>
                    <p>Price: ₹{p.price}</p>
                    <p>Category: {p.category}</p>
                    <p className="text-sm text-gray-500">
                      Provider: {p.provider?.username}
                    </p>
                 </div>
                
                  <div className="flex gap-3">
                    <button
                    onClick={()=>handleApprove(p._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
                      Approve
                    </button>
                    <button
                    onClick={()=>handleReject(p._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
                      Reject
                    </button>
                  </div>
               </div> 
              ))
            }
          </div>
        )
      }
    </div>
  );
}
