import React from "react";
import TextField from "@mui/material/TextField";

const Inputs = ({
  type = "text",
  id,
  fieldName,
  formData,
  setFormData,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={id}>{fieldName}</label>
      <TextField
        required
        id={id}
        {...props}
        type={type}
        value={formData[id]}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.id]: e.target.value })
        }
      />
    </div>
  );
};

export default Inputs;
