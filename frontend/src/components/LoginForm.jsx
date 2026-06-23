
import { useState } from "react";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!username && !password) {
      setMessage("Username and Password are required");
      return;
    }

    if (!username) {
      setMessage("Username is required");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    if (username === "admin" && password === "admin123") {
      setMessage("Login Successful");
      return;
    }

    setMessage("Invalid username or password");
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="button"
        onClick={handleLogin}
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Login
      </button>

      {message && (
        <p
          role="alert"
          className="text-sm text-center"
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginForm;