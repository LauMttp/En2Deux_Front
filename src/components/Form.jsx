import React from "react";
import Inputs from "./Inputs";
import { Button } from "@mui/material";

const Form = ({
  submitField,
  fields,
  formData,
  setFormData,
  initialFormDataState,
  submitFunc,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    submitFunc();
    setFormData(initialFormDataState);
  }

  return (
    <div className="Form">
      <form onSubmit={handleSubmit}>
        {fields.map((fieldInfo) => (
          <Inputs
            key={fieldInfo.id}
            {...fieldInfo}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
        <Button variant="outlined" color="success" type="submit">
          {submitField}
        </Button>
      </form>
    </div>
  );
};

export default Form;
