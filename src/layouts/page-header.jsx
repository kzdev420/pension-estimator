import { Breadcrumb } from "react-bootstrap"

const PageHeader = (props) => {
  const { label } = props;
  return (
    <div className="d-flex">
      <div className="page-header p-4">
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>{label}</Breadcrumb.Item>
        </Breadcrumb>
        <h2 className="fw-bold text-danger">Pension Estimator</h2>
      </div>
      <div className="page-header-end"></div>
    </div>
  )
};
export default PageHeader;