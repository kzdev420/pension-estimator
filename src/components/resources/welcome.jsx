import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
export const Welcome = (props) => {
  const { setIsStatement } = props;
  const [agreeStatus, setAgreeStatus] = useState(false);
  return (
    <div className="p-4">
      <h5 className="mb-4">
        Curious about what your pension will be? Use this pension estimator to compare different scenarios for your retirement. Try as many different scenarios as you wish, to see the changes in your results.
      </h5>

      <h4 className="fw-bold mb-2">What you’ll need</h4>
      <p className="mb-4">We recommend that you use the information provided to you in your most recent Annual Entitlement Statement (AES) to simplify your data entry and increase your accuracy. The statement provides a comprehensive summary of your membership, including annual earnings and pensionable service—two important factors that form the basis of your pension entitlement. If you do not have a copy of your AES, you can request one from <Link to="mailto:membercare@ttcpp.ca" className="fw-bold">mailto:membercare@ttcpp.ca</Link>.
      </p>

      <p className="fw-bold mb-2">
        Special considerations
      </p>
      <p>
        This pension estimator is intended for active TTCPP members. If you are a deferred or postponed member, have a <span className="text-danger">retirement compensation arrangement (RCA)</span>, or are subject to a settlement due to a marriage breakdown or the end of a spousal relationship, please contact <Link to="mailto:membercare@ttcpp.ca" className="fw-bold">mailto:membercare@ttcpp.ca</Link> for your pension estimate.
      </p>
      <p className="mb-4">
        The pension estimator generates your potential future pension income based on a number of assumptions. Estimates are for informational purposes only and do not guarantee future pension income.
      </p>
      
      <p className="fw-bold mb-2">Privacy</p>
      <p className="mb-4">
        Your information is <Link to="/privacy" className="fw-bold">private</Link>. The data you enter into the Pension Estimator and the results generated will not be saved. Your information will not be seen by the TTC Pension Plan.
      </p>

      <p className="fw-bold mb-2">Terms of service</p>
      <p className="mb-3">
        By clicking the checkbox below, I confirm that I have read and understand the Pension Estimator <Link to="/terms-of-service" className="fw-bold">terms of service</Link> and want to use the Pension Estimator.
      </p>
      <Form.Group className="mb-4" controlId="formAgreeCheckbox">
        <Form.Check
          type="checkbox"
          label="I agree to the terms of service"
          value={agreeStatus}
          onChange={(e) => setAgreeStatus(e.target.checked)}
        />
      </Form.Group>

      <Button
        variant="outline-danger"
        disabled={!agreeStatus}
        className="me-5"
        onClick={() => setIsStatement(true)}
      >
        I have my statement
      </Button>
      <Button
        variant="outline-danger"
        disabled={!agreeStatus}
        onClick={() => setIsStatement(false)}
      >
        I DON'T have my statement
      </Button>
    </div>
  );
};