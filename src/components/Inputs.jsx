import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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
          label={fieldName}
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
  if (type === "date")
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InputLabel htmlFor={id}>{fieldName}</InputLabel>
        <Stack spacing={3}>
          <DatePicker
            disablePast
            label={fieldName}
            openTo="year"
            views={["year", "month", "day"]}
            value={formData[id]}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.id]: dayjs(e.target.value) })
            }
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
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
