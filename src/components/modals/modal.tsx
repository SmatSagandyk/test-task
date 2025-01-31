import { FC, PropsWithChildren, memo } from "react";
import ReactDOM from "react-dom";
import CloseModal from "./close-modal";
import ModalOverlay from "./modal-overlay";
import styles from "./modal.module.scss";

interface IProps extends PropsWithChildren {
    closeModal: () => void;
    title?: string;
}

const Modal: FC<IProps> = (props) => {
    return ReactDOM.createPortal(
        <>
            <div className={`${styles.modal} anim-open-modal`}>
                <div className={styles.header}>
                    <h3 className="title">New dialog</h3>
                    <CloseModal closeModal={props.closeModal} />
                </div>
                <div className={styles.content}>{props.children}</div>
            </div>
            <ModalOverlay closeModal={props.closeModal} />
        </>,
        document.getElementById("modals") as HTMLElement
    );
};

export default memo(Modal);
