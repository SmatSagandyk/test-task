import { FC, memo, useEffect } from "react";
import styles from "./modal.module.scss";

type TProps = {
    closeModal: () => void;
};

const ModalOverlay: FC<TProps> = ({ closeModal }) => {
    useEffect(() => {
        const onKeypress = (e: KeyboardEvent) => {
            if (e.key === "Escape" && closeModal) {
                closeModal();
            }
        };

        document.addEventListener("keydown", onKeypress);

        return () => {
            document.removeEventListener("keydown", onKeypress);
        };
    });

    return <div className={styles.overlay} onClick={closeModal}></div>;
};

export default memo(ModalOverlay);
