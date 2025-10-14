import { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }

    setError("");

    console.log("Form submitted:", formData);

    // Simulate sending data to a mock API
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log("Mock API Response:", data))
      .catch((err) => console.error("Error:", err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "350px",
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        background: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
        User Registration
      </h2>

      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        style={{ marginBottom: "10px", padding: "8px" }}
      />

      {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

      <button
        type="submit"
        style={{
          padding: "10px",
          background: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
