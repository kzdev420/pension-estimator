import { Row, Col } from "react-bootstrap";
import { Check2 } from "react-bootstrap-icons";

export const statusList = ['inactive', 'active', 'complete'];
export const OneStepComponent = (props) => {
  const {
    index,
    title,
    description,
    status,
    current,
    steps,
    noLine,
    children,
    showEstimation
  } = props;

  const oneHeight = steps ? 100/steps : 100;
  const bars = [];
  for (let i = 0; i < steps ; i++) {
    bars.push(
      <div
        key={i}
        className={`left-line ${current > i || status === 2 ? 'active' : ''}`}
        style={
          {
            height: `${oneHeight}%`,
            top: `${oneHeight * i}%`
          }
        }
      />
    );
  };

  return (
    <div className={`one-step ${statusList[status]} ${showEstimation ? '' : 'd-none'}`}>
      <div className="d-flex">
        <div className="step-number-container me-3">
          <div className="step-number">
            {status === 2 ? <Check2 /> : index}
          </div>
        </div>
        <Row className="flex-fill">
          <Col lg={4}>
            <div
              className="step-title"
              dangerouslySetInnerHTML={{__html: title}}
            />
            <div className="step-description fade" dangerouslySetInnerHTML={{__html: description}} />
          </Col>
          <Col lg={{span:4, offset: 1}}>
            {children}
          </Col>
        </Row>
      </div>
      {!noLine && bars}
    </div>
  );
};