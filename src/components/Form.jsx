import React from "react";
import Inputs from "./Inputs";

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
        <button type="submit">{submitField}</button>
      </form>
    </div>
  );
};

export default Form;
