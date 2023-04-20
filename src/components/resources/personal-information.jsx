import { Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { CalendarIcon } from "./calendar-icon";

const prevYear = (new Date()).getFullYear() - 2;

export const PersonalInformation = (props) => {
  const {
    personalInformation,
    error,
    handleChange,
    handleFocus
  } = props;
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Date of birth</Form.Label>
        <DatePicker
          className={`dob-picker ${error?.dob ? 'is-invalid' : ''}`}
          clearIcon={null}
          calendarClassName="dob-picker-calander"
          calendarIcon={
            <CalendarIcon isValid={!error?.dob} />
          }
          dayPlaceholder="dd"
          monthPlaceholder="mm"
          yearPlaceholder="yyyy"
          maxDate={new Date()}
          onChange={(v) => handleChange('dob', v)}
          onFocus={handleFocus}
          value={personalInformation.dob}
        />
        <Form.Control.Feedback type="invalid">
          {error?.dob}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Total credited service to Dec 31, {prevYear}</Form.Label>
        <Form.Control
          type="number"
          placeholder="0.000"
          value={personalInformation.totalCreditedService}
          onChange={(e) => handleChange('totalCreditedService', e.target.value)}
          onFocus={handleFocus}
          isInvalid={error.totalCreditedService}
        />
        <Form.Control.Feedback type="invalid">
          {error?.totalCreditedService}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>
          Total continuous service to Dec 31, {prevYear}
        </Form.Label>
        <Form.Control
          type="number"
          placeholder="0.000"
          value={personalInformation.totalContinuousService}
          onChange={(e) => handleChange('totalContinuousService', e.target.value)}
          isInvalid={error.totalContinuousService}
        />
        <Form.Control.Feedback type="invalid">
          {error?.totalContinuousService}
        </Form.Control.Feedback>
      </Form.Group>
    </>
  );
};
  