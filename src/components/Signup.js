import React, { useEffect, useState } from "react";
import { API } from "../API_LINK";
import { useFormik } from "formik";
import { Button, TextField, Typography } from "@mui/material";
import ClipLoader from "react-spinners/ClipLoader";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const formValidationSchema = yup.object({
  name: yup.string().required("Why not? Fill the Full Name!"),
  email: yup
    .string()
    .email("Must be a valid Email Address")
    .required("Why not? Fill the Email!"),
  password: yup
    .string()
    .min(4, "Atleast 4 characters required")
    .max(10, "Too many characters")
    .required("Why not? Fill the Password!"),
});

function Signup() {
  useEffect(() => {
    if (!localStorage.getItem("token") && !localStorage.getItem("role")) {
      navigate("/", { replace: true });
    } else if (localStorage.getItem("role") === "student") {
      navigate("/student");
    } else if (localStorage.getItem("role") === "admin") {
      navigate("/admin");
    }
  }, []);

  const signupStyle = {
    backgroundColor: "#FB8122",
  };

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      console.log(values);
      createUser(values);
    },
  });

  const createUser = (newUser) => {
    fetch(`${API}/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.token) {
          setErr(data.message);
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          alert(data.message);
          navigate("/login");
        } else {
          setErr(data.error);
        }
      });
  };

  return (
    <div className="signup">
      <form onSubmit={formik.handleSubmit} className="container form-div">
        <h1 className="signin-welcome">WELCOME</h1>
        <h3 className="signin-create">Create an Account to Start</h3>
        <div>
          <TextField
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            label="Full Name"
          />
          {formik.touched.name && formik.errors.name ? (
            <p className="err-p">{formik.errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <TextField
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            label="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="err-p">{formik.errors.email}</p>
          ) : (
            ""
          )}
        </div>
        <div>
          <TextField
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            variant="outlined"
            label="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="err-p">{formik.errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <div className="signup-login-div flex justify-content-end">
          Already have an Account!{" "}
          <span onClick={() => navigate("/login")} className="loginLink">
            Login
          </span>
        </div>
        <div>
          {loading ? (
            <ClipLoader size={50} color={"green"} loading={loading} />
          ) : (
            <Typography className="mt-3" color={"error"}>
              {err}
            </Typography>
          )}
        </div>
        <div>
          <Button type="submit" style={signupStyle} variant="contained">
            SIGNUP
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
