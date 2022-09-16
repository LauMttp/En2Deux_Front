import React from "react";
import Inputs from "./Inputs";

const Form = ({
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Form;
