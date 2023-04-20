
import { useCallback, useState } from "react";
import { Welcome } from "../components/resources/welcome";
import { DataInput } from "../components/resources/data-input";
import PageHeader from "../layouts/page-header";
import { Container } from "react-bootstrap";

export const Resources = () => {
  // eslint-disable-next-line no-unused-vars
  const [isStatement, setIsStatement] = useState(false);
  const [step, setStep] = useState(0);

  const onChangeStatement = useCallback((value) => {
    setIsStatement(value);
    setStep(1);
  }, []);

  return (
    <Container>
      <PageHeader label="Resources" />
      {step === 0 && (
        <Welcome setIsStatement={onChangeStatement} />
      )}
      {step === 1 && (
        <DataInput />
      )}
    </Container>
  );
};
