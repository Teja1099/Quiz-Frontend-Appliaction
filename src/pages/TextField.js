import React from "react";
import { ErrorMessage, useField } from "formik";
import { FloatingLabel } from "react-bootstrap";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="mb-2">
      <FloatingLabel controlId={field.name} label={label}>
        {/* <label htmlFor={field.name}>{label}</label> */}
        <input
          className={`form-control shadow-none ${
            meta.touched && meta.error && "is-invalid"
          }`}
          {...field}
          {...props}
          autoComplete="on"
        />
      </FloatingLabel>
      <ErrorMessage component="div" name={field.name} className="error" />
    </div>
  );
};
