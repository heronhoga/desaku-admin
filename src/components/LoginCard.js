import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/LoginCard.css";

function Card() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/admin/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Content-Type-Options": "nosniff",
          },
          body: JSON.stringify({ username, password }),
          credentials: "include",
        }
      );

      setLoading(false);

      if (response.status === 200) {
        const token = response.headers.get("Set-Cookie");
        document.cookie = `token=${token}; path=/`;

        navigate("/home", { replace: true });
      } else if (response.status === 400) {
        setErrorMessage("Invalid");
        navigate("/login", { replace: true });
      } else {
        console.error("Unexpected response:", response);
        setErrorMessage("An error occurred. Please try again later.");
      }
    } catch (error) {
      setLoading(false);
      console.error("An error occurred:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="card">
      <h2>LOGIN - ADMIN</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Card;
