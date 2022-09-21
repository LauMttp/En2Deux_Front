import { Button } from "@mui/material";
import Form from "../../Form";

const StepThree = ({
  setEvent,
  event,
  setStep,
  step,
  initialEventState,
  createEvent,
}) => {
  const thirdStepFields = [
    {
      id: "informationGatheringDeadline",
      fieldName: "informationGatheringDeadline",
      type: "date",
    },
    {
      id: "votingStageDeadline",
      fieldName: "votingStageDeadline",
      type: "date",
    },
  ];

  return (
    <div className="NewEvent">
      <Form
        submitField="Create"
        fields={thirdStepFields}
        formData={event}
        setFormData={setEvent}
        initialFormDataState={initialEventState}
        submitFunc={createEvent}
        isSubmit={true}
      />
      <div>
        <Button
          variant="outlined"
          color="success"
          onClick={(e) => setStep(step - 1)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default StepThree;
