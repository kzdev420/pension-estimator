import { useState } from "react";
import { Form } from "react-bootstrap";

import { transferMoneyToText, transferTextToMoney } from "../../utils/calculations";

export const EarningsInput = ({
    className,
    value,
    onChange,
    onFocus,
    isInvalid,
    disabled,
    min
}) => {
    const [inputValue, setInputValue] = useState(value);

    const handleChange = (e) => {
        e.preventDefault();
        const money = transferTextToMoney(e.target.value);
        setInputValue(e.target.value);
        onChange(money);
    }

    const handleOnFocus = () => {
        const money = transferTextToMoney(inputValue);
        if(!money) setInputValue('');
        else setInputValue(`${money}`);
        onFocus();
    }

    const handleOnBlur = () => {
        const money = transferTextToMoney(inputValue);
        const moneyText = transferMoneyToText(money);
        setInputValue(moneyText);
        onChange(money);
    }

    return (
        <Form.Control
            type="string"
            placeholder="$00,000.00"
            className={className}
            min={min}
            value={inputValue}
            onChange={(e) => handleChange(e)}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            isInvalid={isInvalid}
            disabled={disabled}
        />
    )
}