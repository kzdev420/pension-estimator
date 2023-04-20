import { CaretDownFill, ExclamationCircle } from "react-bootstrap-icons";

export const CalendarIcon = ({ isValid }) => {
  return (
    isValid
      ?
        <CaretDownFill color="white" className="mx-auto"/>
      :  
        <ExclamationCircle color="red" className="mx-auto" />
  );
};