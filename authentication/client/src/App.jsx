/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import customFetch from "./wrapperFetch.js";

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:3000/user";

  // 1. Xử lý Đăng nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });
      // console.log(JSON.stringify({ username, password })); //{"email":"didfnffrlhrdz","password":"dinh2kk5"}
      const data = await res.json();
      if (res.ok) {
        setAccessToken(data.data[1]); //neu muon luu token o ram
        localStorage.setItem("access_token", data.data[1]);
        setMessage("Đăng nhập thành công!");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Loi: ", err.message);
    }
  };

  // 2. Gọi API Bảo vệ (Lấy danh sách Users) bằng Access Token
  const fetchUsers = async () => {
    try {
      const res = await customFetch(`${API_URL}/all`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(accessToken);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.data);
        setMessage("Lay user thanh cong");
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Loi: ", err.message);
    }
  };

  // 3. Đổi Access Token mới bằng Refresh Token (Lấy từ Cookie)
  const handleRefreshToken = async () => {};

  return (
    <div
      style={{ padding: "30px", fontFamily: "sans-serif", maxWidth: "500px" }}
    >
      <h2>Demo Cookie & JWT Authentication</h2>

      {/* Khung Login */}
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Đăng nhập</button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      {/* Thông báo trạng thái */}
      <p style={{ color: "blue" }}>
        <b>Thông báo:</b> {message}
      </p>

      <div
        style={{
          wordBreak: "break-all",
          background: "#f0f0f0",
          padding: "10px",
        }}
      >
        <b>Access Token hiện tại trong RAM:</b>
        <br />
        {accessToken || "Chưa có Token"}
      </div>

      <hr style={{ margin: "20px 0" }} />

      <button onClick={fetchUsers}>Get User</button>

      {/* Hiển thị danh sách User */}
      {users.length > 0 && (
        <ul>
          {users.map(
            (
              u, //map tra ve phan tu JSX. filter + map loc co dieu kien
            ) => (
              <li key={u.id}>
                {u.username} - {u.email}
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
