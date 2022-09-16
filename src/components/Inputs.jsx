import React from "react";

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

      <input
        {...props}
        type={type}
        id={id}
        value={formData[id]}
        onChange={(e) =>
          setFormData({ ...formData, [e.target.id]: e.target.value })
        }
      ></input>
    </div>
  );
};

export default Inputs;
