import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { CalendarIcon } from "./calendar-icon";

export const RetirementEligibility = (props) => {
  const {
    retirementEligibility,
    error,
    handleChange,
    handleFocus
  } = props;

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Earliest reduced retirement date</Form.Label>
        <DatePicker
          className={`dob-picker ${error?.earliestReducedRetirementDate ? 'is-invalid' : ''}`}
          clearIcon={null}
          calendarClassName="dob-picker-calander"
          calendarIcon={
            <CalendarIcon isValid={!error?.earliestReducedRetirementDate} />
          }
          dayPlaceholder="dd"
          monthPlaceholder="mm"
          yearPlaceholder="yyyy"
          onChange={(v) => handleChange('earliestReducedRetirementDate', v)}
          onFocus={handleFocus}
          value={retirementEligibility.earliestReducedRetirementDate}
        />
        <Form.Control.Feedback type="invalid">
          {error?.earliestReducedRetirementDate}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Earliest unreduced retirement date</Form.Label>
        <DatePicker
          className={`dob-picker ${error?.earliestUnReducedRetirementDate ? 'is-invalid' : ''}`}
          clearIcon={null}
          calendarClassName="dob-picker-calander"
          calendarIcon={
            <CalendarIcon isValid={!error?.earliestUnReducedRetirementDate} />
          }
          dayPlaceholder="dd"
          monthPlaceholder="mm"
          yearPlaceholder="yyyy"
          onChange={(v) => handleChange('earliestUnReducedRetirementDate', v)}
          onFocus={handleFocus}
          value={retirementEligibility.earliestUnReducedRetirementDate}
        />
        <Form.Control.Feedback type="invalid">
          {error?.earliestUnReducedRetirementDate}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Compulsory pension start date</Form.Label>
        <DatePicker
          className={`dob-picker ${error?.compulsoryPensionStartDate ? 'is-invalid' : ''}`}
          clearIcon={null}
          calendarClassName="dob-picker-calander"
          calendarIcon={
            <CalendarIcon isValid={!error?.compulsoryPensionStartDate} />
          }
          dayPlaceholder="dd"
          monthPlaceholder="mm"
          yearPlaceholder="yyyy"
          onChange={(v) => handleChange('compulsoryPensionStartDate', v)}
          onFocus={handleFocus}
          value={retirementEligibility.compulsoryPensionStartDate}
        />
        <Form.Control.Feedback type="invalid">
          {error?.compulsoryPensionStartDate}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
  