import { Form, Button } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { CalendarIcon } from "./calendar-icon";

export const GenerateEstimate = (props) => {
  const {
    generateEstimate,
    error,
    handleChange,
    handleFocus,
    generate
  } = props;

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Earliest reduced retirement date</Form.Label>
        <DatePicker
          className={`dob-picker ${error?.estimatedRetirementDate ? 'is-invalid' : ''}`}
          clearIcon={null}
          calendarClassName="dob-picker-calander"
          calendarIcon={
            <CalendarIcon isValid={!error?.estimatedRetirementDate} />
          }
          dayPlaceholder="dd"
          monthPlaceholder="mm"
          yearPlaceholder="yyyy"
          onChange={(v) => handleChange('estimatedRetirementDate', v)}
          onFocus={handleFocus}
          value={generateEstimate.estimatedRetirementDate}
        />
        <Form.Control.Feedback type="invalid">
          {error?.estimatedRetirementDate}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        variant="danger"
        onClick={generate}
      >
        Generate Estimate
      </Button>
    </>
  );
};
  