import type { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
children: JSX.Element;
role?: ("admin" | "provider" | "customer")[];
}

export default function ProtectedRoute({ children, role }: Props) {
const savedUser = localStorage.getItem("user");
const user = savedUser ? JSON.parse(savedUser) : null;

if (!user) return <Navigate to="/login" replace />;

if (user.role === "admin") return children;

if (role && !role.includes(user.role)) return <Navigate to="/unauthorized" replace />;

return children;
}