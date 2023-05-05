import { useEffect, useState } from "react";
import { PersonalInformation } from "./personal-information";
import { BaseYearEarnings } from "./base-year-earnings";
import { NonBaseYearEarnings } from "./non-base-year-earnings";
import { RetirementEligibility } from "./retirement-eligibility";
import { GenerateEstimate } from "./generate-estimate";
import { OneStepComponent } from "./one-step-component";
import { EenerateEstimation } from "./generate-estimation";

import { calcRetirementEligibility } from "../../utils/calculations";
import {
  YMPE,
  staticData,
  initBaseYearEarnings,
  initGenerateEstimate,
  initNonBaseYearEarnings,
  initPersonalInformation,
  initRetirementEligibility
} from "../../utils/data";

export const statusList = ['inactive', 'active', 'progress', 'complete'];

const baseYear = (new Date()).getFullYear() - 1;
const MAX_EARNING = 500000;

const getDiffYear = (date) => {
  const nowTime = (new Date()).getTime();
  const dateTime = (new Date(date)).getTime();
  const diffYear = parseInt((nowTime - dateTime) / (1000 * 60 * 60 * 24 * 365));
  return diffYear;
}
export const DataInput = () => {
  const [errorPI, setErrorPI] = useState({});
  const [showEstimation, setEstimation] = useState(true);
  const [isFocus, setFocus] = useState(false);
  const [personalInformation, setPersonalInformation] = useState(initPersonalInformation);

  const [stepPI, setStepPI] = useState(0);
  useEffect(() => {
    let curStep = 0;
    Object.keys(personalInformation).forEach((key) => {
      if (personalInformation[key] && !errorPI[key]) curStep++;
    });
    setStepPI(curStep);
  }, [personalInformation, errorPI]);

  const [statusPI, setStatusPI] = useState(1);
  const updateStatusPI = (val) => {
    if (val === 'dob') {
      setFocus(true)
    }
    setStatusPI(1);
    setStatusBYE(stepBYE === 4 ? 2 : 0);
    setStatusNBYE(stepNBYE === 3 ? 2 : 0);
    setStatusRE(stepRE === 3 ? 2 : 0);
    setStatusGE(stepGE === 1 ? 2 : 0);
  }

  const handleBlur = () => {
    setFocus(false)
  }

  const [baseYearEarnings, setBaseYearEarnings] = useState(initBaseYearEarnings);
  const [errorBYE, setErrorBYE] = useState(new Array(4).fill({}));
  const updateBaseYearEarnings = (index, variable, value) => {

    console.log({ index, variable, value });
    const newData = baseYearEarnings
    newData[index][variable] = value;
    newData[index] = {
      ...newData[index],
      'underYMPE': parseFloat(Math.min(YMPE[newData[index].year], newData[index].earning)).toFixed(2),
      'overYMPE': parseFloat(Math.abs(YMPE[newData[index].year] - newData[index].earning)).toFixed(2)
    }
    setBaseYearEarnings([...newData]);
    let errMessage = '';
    const newError = JSON.parse(JSON.stringify(errorBYE));

    switch (variable) {
      case 'year':
        if (value >= baseYear) {
          errMessage = 'Must be up to or before statement base year.';
        }
        if (baseYearEarnings.some(({ year }, i) => i !== index && year === value)) {
          errMessage = 'All years must be unique';
        } else if (baseYearEarnings.indexOf(({ year }) => year === value)) {
          errMessage = '';
          for (let i = 0; i < baseYearEarnings.length; i++) {
            for (let j = 0; j < baseYearEarnings.length; j++) {
              if (i == j) continue;
              if (baseYearEarnings[i]['year'] !== '' && baseYearEarnings[i]['year'] === baseYearEarnings[j]['year']) {
                newError[j][variable] = 'All years must be unique';
              } else {
                newError[j][variable] = '';
              }
            }
          }
        }
        break;
      case 'earning':
        if (value < 0 || value > MAX_EARNING) {
          errMessage = 'Cannot be negative, must be less than 500,000';
        }
        break;
      default:
    }
    newError[index][variable] = errMessage;
    setErrorBYE(newError);
  };

  const [stepBYE, setStepBYE] = useState(0);
  useEffect(() => {
    let curStep = 0;
    baseYearEarnings.forEach((item, index) => {
      if (item.year && item.earning && !errorBYE[index]?.year && !errorBYE[index]?.earning) curStep++;
    })
    setStepBYE(curStep);
  }, [baseYearEarnings, errorBYE]);

  const [statusBYE, setStatusBYE] = useState(0);
  const updateStatusBYE = () => {
    setStatusPI(stepPI === 3 ? 2 : 0);
    setStatusBYE(1);
    setStatusNBYE(stepNBYE === 3 ? 2 : 0);
    setStatusRE(stepRE === 3 ? 2 : 0);
    setStatusGE(stepGE === 1 ? 2 : 0);
  }

  const [nonBaseYearEarnings, setNonBaseYearEarnings] = useState(initNonBaseYearEarnings);
  const [errorNBYE, setErrorNBYE] = useState({});
  const updateNonBaseYearEarnings = (variable, value) => {
    let errMessage = '';
    switch (variable) {
      case 'currentPensionableEarnings':
      case 'estimatedYearPensionableEarnings':
        if (value < 0 || value > MAX_EARNING) {
          errMessage = 'Cannot be negative, must be less than 500,000';
        }
        break;
      case 'estimatedAnnualSalaryIncrease':
        if (value < 0)
          value = 0;
        else if (value > 5)
          value = 5;
        break;
      default:
    }
    const newData = {
      ...nonBaseYearEarnings
    };
    newData[variable] = value;
    setNonBaseYearEarnings(newData);
    const newError = {
      ...errorNBYE
    };
    newError[variable] = errMessage;
    setErrorNBYE(newError);
  };

  const [stepNBYE, setStepNBYE] = useState(0);
  useEffect(() => {
    let curStep = 0;
    Object.keys(nonBaseYearEarnings).forEach((key) => {
      if (nonBaseYearEarnings[key] && !errorNBYE[key]) curStep++;
    });
    setStepNBYE(curStep);
  }, [nonBaseYearEarnings, errorNBYE]);

  const [statusNBYE, setStatusNBYE] = useState(0);
  const updateStatusNBYE = () => {
    setStatusPI(stepPI === 3 ? 2 : 0);
    setStatusBYE(stepBYE === 4 ? 2 : 0);
    setStatusNBYE(1);
    setStatusRE(stepRE === 3 ? 2 : 0);
    setStatusGE(stepGE === 1 ? 2 : 0);
  }

  const [retirementEligibility, setRetirementEligibility] = useState(initRetirementEligibility);
  const updateRetirementEligibility = (variable, value) => {
    const newData = {
      ...retirementEligibility
    };
    newData[variable] = value;
    setRetirementEligibility(newData);
  };


  // Update Personal Information

  const updatePersonalInformation = (variable, value) => {
    let errMessage = '';
    const newData = {
      ...personalInformation
    };
    newData[variable] = value;
    const newError = JSON.parse(JSON.stringify(errorPI));
    setPersonalInformation(newData);
    setFocus(false)
    switch (variable) {
      case 'dob':
        if (getDiffYear(value) < 17) {
          errMessage = 'Must be earlier than 17 years as of today.';
        } else if ((new Date()).getFullYear() - new Date(value).getFullYear() >= 71) {
          errMessage = `No later than Dec 31 of ${(new Date()).getFullYear() - 71}`;
        }
        break;
      case 'totalCreditedService':
        if (personalInformation.totalContinuousService && parseFloat(value).toFixed(2) > parseFloat(personalInformation.totalContinuousService).toFixed(2) - 0.5) {
          errMessage = 'Must be less than continuous service - .5 years.';
        } else {
          errMessage = '';
          if (value && parseFloat(personalInformation.totalCreditedService).toFixed(2) < parseFloat(value).toFixed(2) - 0.5) {
            errMessage = '';
            variable = 'totalContinuousService';
          }
        }
        break;
      case 'totalContinuousService':
        if (value && parseFloat(personalInformation.totalCreditedService).toFixed(2) > parseFloat(value).toFixed(2) - 0.5) {
          errMessage = 'Must be more than credit service - .5 years.';
        } else {
          errMessage = '';
          if (personalInformation.totalContinuousService && parseFloat(value).toFixed(2) < parseFloat(personalInformation.totalContinuousService).toFixed(2) - 0.5) {
            errMessage = '';
            variable = 'totalCreditedService';
          }
        }
        break;
      default:
    }

    setErrorPI({
      ...errorPI,
      [variable]: errMessage
    });

    const {
      earliestReducedRetirementDate,
      earliestUnReducedRetirementDate,
      compulsoryPensionStartDate
    } = calcRetirementEligibility(newData.totalContinuousService, newData.dob);

    setRetirementEligibility({
      ...retirementEligibility,
      earliestReducedRetirementDate,
      earliestUnReducedRetirementDate,
      compulsoryPensionStartDate
    });
  };

  const [errorRE, setErrorRE] = useState({});

  const [stepRE, setStepRE] = useState(0);
  useEffect(() => {
    let curStep = 0;
    Object.keys(retirementEligibility).forEach((key) => {
      if (retirementEligibility[key] && !errorRE[key]) curStep++;
    });
    setStepRE(curStep);
  }, [retirementEligibility, errorRE]);

  const [statusRE, setStatusRE] = useState(0);
  const updateStatusRE = () => {
    setStatusPI(stepPI === 3 ? 2 : 0);
    setStatusBYE(stepBYE === 4 ? 2 : 0);
    setStatusNBYE(stepNBYE === 3 ? 2 : 0);
    setStatusRE(1);
    setStatusGE(stepGE === 1 ? 2 : 0);
  }

  const [generateEstimate, setGenerateEstimate] = useState(initGenerateEstimate);
  const [errorGE, setErrorGE] = useState({});
  const updateGenerateEstimate = (variable, value) => {
    const newData = {
      ...generateEstimate
    };
    newData[variable] = value;
    setGenerateEstimate(newData);

    let errMessage = '';
    if (generateEstimate.estimatedRetirementDate) {
      if (generateEstimate.estimatedRetirementDate.getFullYear() <= baseYear) {
        errMessage = 'Must be this calendar year or later';
      } else if (retirementEligibility.compulsoryPensionStartDate && generateEstimate.estimatedRetirementDate > retirementEligibility.compulsoryPensionStartDate) {
        errMessage = 'Must be earlier than compulsory date';
      }
    }
    const newError = {
      ...errorGE
    };
    newError[variable] = errMessage;
    setErrorGE(newError);
  };

  const [stepGE, setStepGE] = useState(0);
  useEffect(() => {
    let curStep = 0;
    Object.keys(generateEstimate).forEach((key) => {
      if (generateEstimate[key] && !errorGE[key]) curStep++;
    });
    setStepGE(curStep);
  }, [generateEstimate, errorGE]);

  const [statusGE, setStatusGE] = useState(0);
  const updateStatusGE = (val) => {
    if (val === 'date') {
      setFocus(true)
    }
    setStatusPI(stepPI === 3 ? 2 : 0);
    setStatusBYE(stepBYE === 4 ? 2 : 0);
    setStatusNBYE(stepNBYE === 3 ? 2 : 0);
    setStatusRE(stepRE === 3 ? 2 : 0);
    setStatusGE(1);
  }

  const generate = (val) => {
    setEstimation(val)
  }

  return (
    <div className="data-input py-5 px-2">
      <OneStepComponent
        index={1}
        title={staticData[0].title}
        description={staticData[0].description}
        status={statusPI}
        current={stepPI}
        steps={3}
        showEstimation={showEstimation}
      >
        <PersonalInformation
          personalInformation={personalInformation}
          handleChange={updatePersonalInformation}
          handleFocus={(v) => updateStatusPI(v)}
          handleBlur={handleBlur}
          isFocus={isFocus}
          error={errorPI}
        />
      </OneStepComponent>
      <OneStepComponent
        index={2}
        title={staticData[1].title}
        description={staticData[1].description}
        status={statusBYE}
        current={stepBYE}
        steps={4}
        showEstimation={showEstimation}
      >
        <BaseYearEarnings
          baseYearEarnings={baseYearEarnings}
          handleChange={updateBaseYearEarnings}
          handleFocus={updateStatusBYE}
          disabled={stepPI != 3}
          error={errorBYE}
        />
      </OneStepComponent>
      <OneStepComponent
        index={3}
        title={staticData[2].title}
        description={staticData[2].description}
        status={statusNBYE}
        current={stepNBYE}
        steps={3}
        showEstimation={showEstimation}
      >
        <NonBaseYearEarnings
          nonBaseYearEarnings={nonBaseYearEarnings}
          handleChange={updateNonBaseYearEarnings}
          handleFocus={updateStatusNBYE}
          disabled={stepPI != 3 || stepBYE != 4}
          error={errorNBYE}
        />
      </OneStepComponent>
      <OneStepComponent
        index={4}
        title={staticData[3].title}
        description={staticData[3].description}
        status={statusRE}
        current={stepRE}
        steps={3}
        showEstimation={showEstimation}
      >
        <RetirementEligibility
          retirementEligibility={retirementEligibility}
          handleChange={updateRetirementEligibility}
          handleFocus={updateStatusRE}
          disabled={stepPI != 3 || stepBYE != 4 || stepNBYE != 3}
          error={errorRE}
        />
      </OneStepComponent>
      <OneStepComponent
        index={5}
        title={staticData[4].title}
        description={staticData[4].description}
        status={statusGE}
        current={stepGE}
        steps={1}
        showEstimation={showEstimation}
        noLine
      >
        <GenerateEstimate
          generateEstimate={generateEstimate}
          handleChange={updateGenerateEstimate}
          handleFocus={(v) => updateStatusGE(v)}
          handleBlur={handleBlur}
          isFocus={isFocus}
          generate={() => generate(false)}
          disabled={stepPI != 3 || stepBYE != 4 || stepNBYE != 3}
          error={errorGE}
        />
      </OneStepComponent>
      <EenerateEstimation
        personalData={personalInformation}
        baseYearEarnings={baseYearEarnings}
        nonBaseYearEarnings={nonBaseYearEarnings}
        retirementEligibility={retirementEligibility}
        generateEstimate={generateEstimate}
        generate={() => generate(true)}
        showEstimation={showEstimation}
        handleChange={updateBaseYearEarnings} />
    </div>
  );
};
