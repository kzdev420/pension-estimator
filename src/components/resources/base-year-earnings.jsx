import { Form } from "react-bootstrap";

export const BaseYearEarnings = (props) => {
  const {
    baseYearEarnings,
    error,
    handleChange,
    handleFocus
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
            />
            <Form.Control.Feedback type="invalid">
              {error[index]?.year}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            {index === 0 && <Form.Label>Pensionable earnings</Form.Label>}
            <Form.Control
              type="number"
              placeholder="$00,000.00"
              className="medium"
              min="0"
              value={earning.earning}
              onChange={(e) => handleChange(index, 'earning', e.target.value)}
              onFocus={handleFocus}
              isInvalid={error[index]?.earning}
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
  