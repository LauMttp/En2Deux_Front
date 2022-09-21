import React from "react";
import Inputs from "./Inputs";
import { Button, CircularProgress } from "@mui/material";

const Form = ({
  submitField,
  fields,
  formData,
  setFormData,
  initialFormDataState,
  isSubmit,
  submitFunc,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    submitFunc();
    setFormData(initialFormDataState);
  }
  if (!formData) return <CircularProgress color="secondary" />;
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
        {isSubmit ? (
          <Button variant="outlined" color="success" type="submit">
            {submitField}
          </Button>
        ) : (
          <div></div>
        )}
      </form>
    </div>
  );
};

export default Form;
