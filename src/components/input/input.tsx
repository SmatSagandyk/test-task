import { ChangeEvent, FC, memo } from "react";
import styles from "./input.module.scss";

type TProps = {
    onChange(e: ChangeEvent<HTMLInputElement>): void;
    value: string;
    name: string;
    disabled?: boolean;
    number?: boolean;
};

const Input: FC<TProps> = ({
    onChange,
    value,
    name,
    disabled = false,
    number = false,
}) => {
    return (
        <input
            className={styles.input}
            type={number ? "number" : "text"}
            min="0"
            name={name}
            placeholder={`Enter ${name}`}
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
    );
};

export default memo(Input);
