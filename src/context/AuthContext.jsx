import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null 
  
  const navigate = useNavigate();
  const [user, setUser] = useState(currentUser);

  // Lấy danh sách user đã đăng ký
  const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

  const register = (email, password) => {
    if (!email || !password) {
      toast.error("Nhập đầy đủ thông tin!");
      return;
    }

    const users = getUsers();
    const exists = users.find(u => u.email === email);

    if (exists) {
      toast.error("Email này đã đăng ký rồi!");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify({ email }));
    setUser({ email });
    toast.success("Đăng ký thành công!");
    navigate("/");
  };

  const login = (email, password) => {
    if (!email || !password) {
      toast.error("Nhập đầy đủ thông tin!");
      return;
    }

    const users = getUsers();
    const existUser = users.find(u => u.email === email && u.password === password);

    if (!existUser) {
      toast.error("Email hoặc mật khẩu không đúng!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify({ email }));
    setUser({ email });
    toast.success("Đăng nhập thành công!");
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
    toast.info("Đăng xuất thành công!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook tiện dụng
export const useAuth = () => useContext(AuthContext);
