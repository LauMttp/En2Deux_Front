import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const Inputs = ({
  type = "text",
  id,
  fieldName,
  formData,
  setFormData,
  ...props
}) => {
  if (type === "select")
    return (
      <FormControl fullWidth>
        <InputLabel htmlFor={id}>{fieldName}</InputLabel>
        <Select
          type={type}
          id={id}
          value={formData[id]}
          label="Gender"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.id]: e.target.value })
          }
        >
          {props.values.map((val) => {
            return <MenuItem value={val}>{val}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  return (
    <div>
      <label htmlFor={id}>{fieldName}</label>
      <TextField
        fullWidth
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
