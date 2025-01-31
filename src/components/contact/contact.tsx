import { FC, memo } from "react";
import { NavLink } from "react-router-dom";
import styles from "./contact.module.scss";
import { TChatElement } from "../../utils/types";

type TProps = {
    contact: TChatElement;
};

const Contact: FC<TProps> = ({ contact }) => {
    return (
        <NavLink
            to={`/chat/${contact.id}`}
            className={({ isActive }) =>
                `${styles.link} ${isActive ? styles.active : ""}`
            }
        >
            <span className={styles.link__name}>
                {contact.name ? contact.name : contact.id}
            </span>
        </NavLink>
    );
};

export default memo(Contact);
