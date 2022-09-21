import { Button, InputLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const StepTwo = ({ setEvent, event, setStep, step }) => {
  return (
    <div className="NewEvent">
      <InputLabel htmlFor={event.dateSuggestion}>Time Range</InputLabel>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          value={event.dateSuggestion}
          onChange={(newValue) => {
            setEvent({ ...event, dateSuggestion: newValue });
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </>
          )}
        />
      </LocalizationProvider>
      <div>
        <Button
          variant="outlined"
          color="success"
          onClick={(e) => setStep(step - 1)}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={(e) => setStep(step + 1)}
        >
          Next Step
        </Button>
      </div>
    </div>
  );
};

export default StepTwo;
