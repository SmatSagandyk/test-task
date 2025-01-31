import { FC, PropsWithChildren, SyntheticEvent, memo } from "react";
import styles from "./button.module.scss";

type TProps = PropsWithChildren & {
    blocked?: boolean;
    submit?: boolean;
    mobile?: boolean;
    onClick?: (() => void) | ((e: SyntheticEvent) => void);
};
const Button: FC<TProps> = ({
    children,
    blocked = false,
    submit = false,
    mobile = false,
    onClick = undefined,
}) => {
    return (
        <button
            type={submit ? "submit" : "button"}
            className={`${styles.button} ${blocked && styles.blocked} ${
                mobile && styles.mobile
            }`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default memo(Button);
