import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Formik form data:", values);

    // Simulate API request
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => console.log("Mock API Response:", data))
      .catch((err) => console.error("Error:", err));

    resetForm();
  };

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "350px",
          margin: "40px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          background: "#ec5e8dff",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Formik Registration
        </h2>

        <Field
          name="username"
          placeholder="Username"
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <ErrorMessage
          name="username"
          component="p"
          style={{ color: "red", marginBottom: "10px" }}
        />

        <Field
          type="email"
          name="email"
          placeholder="Email"
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <ErrorMessage
          name="email"
          component="p"
          style={{ color: "red", marginBottom: "10px" }}
        />

        <Field
          type="password"
          name="password"
          placeholder="Password"
          style={{ marginBottom: "10px", padding: "8px" }}
        />
        <ErrorMessage
          name="password"
          component="p"
          style={{ color: "red", marginBottom: "10px" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#1b0e16ff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default FormikForm;
