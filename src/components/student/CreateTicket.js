import { Button, TextField } from "@mui/material";
import { API } from "../../API_LINK";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import Home from "./Home";

const formValidationSchema = yup.object({
  title: yup
    .string()
    .min(4, "Atleast 4 characters required")
    .required("Why not? Fill the Title!"),
  description: yup
    .string()
    .min(10, "Atleast 10 characters required")
    .required("Why not? Fill the Description!"),
});

function CreateTicket() {
  const [comp, setComp] = useState("create");
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: formValidationSchema,
    onSubmit: (values) => {
      newTicket(values);
    },
  });
  const newTicket = async (values) => {
    const res = await fetch(`${API}/user/add`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    const data = res.json();
    if (!data.error) {
      setComp("home");
    } else {
      console.log(data.error);
    }
  };
  return (
    <div>
      {comp === "create" ? (
        <div className="container mt-5 flex flex-column align-items-center">
          <h1>CreateTicket</h1>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-5 w-50 flex flex-column gap-5"
          >
            <div>
              <TextField
                id="title"
                name="title"
                type="text"
                fullWidth
                label="Title"
                variant="outlined"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.title && formik.errors.title ? (
                <p className="text-danger mt-1">{formik.errors.title}</p>
              ) : (
                ""
              )}
            </div>
            <div>
              <TextField
                id="description"
                name="description"
                type="text"
                fullWidth
                label="Description"
                variant="outlined"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              {formik.touched.description && formik.errors.description ? (
                <p className="text-danger mt-1">{formik.errors.description}</p>
              ) : (
                ""
              )}
            </div>
            <div className="w-100 flex justify-content-center">
              <Button type="submit" variant="contained">
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Home />
      )}
    </div>
  );
}

export default CreateTicket;
