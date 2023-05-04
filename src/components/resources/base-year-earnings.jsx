import { Form } from "react-bootstrap";
import { EarningsInput } from "../input/earnings";

export const BaseYearEarnings = (props) => {
  const {
    baseYearEarnings,
    error,
    handleChange,
    handleFocus,
    disabled
  } = props;

  return (
    <>
      {baseYearEarnings.map((earning, index) => (
        <div className="d-flex" key={index}>
          <Form.Group className="mb-3 me-4">
            {index === 0 && <Form.Label>Year</Form.Label>}
            <Form.Control
              type="number"
              placeholder="YYYY"
              className="small"
              value={earning.year}
              onChange={(e) => handleChange(index, 'year', e.target.value)}
              onFocus={handleFocus}
              isInvalid={error[index]?.year}
              disabled={disabled}
            />
            <Form.Control.Feedback type="invalid" className="base-year-check">
              {error[index]?.year}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            {index === 0 && <Form.Label>Pensionable earnings</Form.Label>}
            <EarningsInput
              className="medium"
              min="0"
              value={earning.earning}
              onChange={(value) => handleChange(index, 'earning', value)}
              onFocus={handleFocus}
              isInvalid={error[index]?.earning}
              disabled={disabled}
            />
            <Form.Control.Feedback type="invalid">
              {error[index]?.earning}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      ))}
    </>
  );
};
  