import { FC, memo } from "react";
import { Link, useMatch } from "react-router-dom";
import styles from "./header.module.scss";
import logo from "../../images/logo.svg";
import { LOGOUT } from "../../services/account/actions";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { getAccount } from "../../services/account/selectors";
import { getIsMobile } from "../../services/mobile/selectors";

const Header: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const id = useMatch("/chat/:id");
    const user = useAppSelector(getAccount);
    const dispatch = useAppDispatch();
    const logout = () => {
        dispatch(LOGOUT());
    };
    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.nav}>
                    {isMobile && id ? (
                        <Link to="/" className={styles.logo}>
                            <span className={styles.link}>{`< Back`}</span>
                        </Link>
                    ) : (
                        <Link to="/" className={styles.logo}>
                            <img src={logo} alt="Logo" />
                            <span className={styles.link}>GREEN-API</span>
                        </Link>
                    )}
                    {user && (
                        <span className={styles.link} onClick={logout}>
                            Logout
                        </span>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default memo(Header);
