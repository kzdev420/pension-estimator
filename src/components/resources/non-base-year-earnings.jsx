import { Form } from "react-bootstrap";
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const currentYear = (new Date()).getFullYear();

export const NonBaseYearEarnings = (props) => {
  const {
    nonBaseYearEarnings,
    error,
    handleChange,
    handleFocus,
    disabled
  } = props;

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{currentYear - 1} pensionable earnings</Form.Label>
        <Form.Control
          type="number"
          placeholder="$00,000.00"
          value={nonBaseYearEarnings.currentPensionableEarnings}
          onChange={(e) => handleChange('currentPensionableEarnings', e.target.value)}
          onFocus={handleFocus}
          isInvalid={error.currentPensionableEarnings}
          disabled={disabled}
        />
        <Form.Control.Feedback type="invalid">
          {error?.currentPensionableEarnings}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Estimated {currentYear} pensionable earnings</Form.Label>
        <Form.Control
          type="number"
          placeholder="$00,000.00"
          value={nonBaseYearEarnings.estimatedYearPensionableEarnings}
          onChange={(e) => handleChange('estimatedYearPensionableEarnings', e.target.value)}
          onFocus={handleFocus}
          isInvalid={error.estimatedYearPensionableEarnings}
          disabled={disabled}
        />
        <Form.Control.Feedback type="invalid">
          {error?.estimatedYearPensionableEarnings}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-1">
        <Form.Label>Estimated annual salary increase</Form.Label>
        <Form.Control
          type="number"
          placeholder="0.0%"
          min={0}
          max={5}
          step={0.5}
          value={nonBaseYearEarnings.estimatedAnnualSalaryIncrease}
          onChange={(e) => handleChange('estimatedAnnualSalaryIncrease', e.target.value)}
          onFocus={handleFocus}
          disabled={disabled}
        />
        <div className="range-slider-container d-flex mt-2">
          <span>0%</span>
          <RangeSlider
            className="single-thumb align-self-center mx-3"
            min={0}
            max={5}
            step={0.1}
            defaultValue={[0, 5]}
            thumbsDisabled={[true, false]}
            value={[0, nonBaseYearEarnings.estimatedAnnualSalaryIncrease]}
            onInput={(v) => handleChange('estimatedAnnualSalaryIncrease', v[1])}
            rangeSlideDisabled={true}
            onFocus={handleFocus}
            disabled={disabled}
          />
          <span>5%</span>
        </div>
      </Form.Group>
    </>
  );
};
  