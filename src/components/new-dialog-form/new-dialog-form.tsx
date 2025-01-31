import { FC, memo, useEffect, useState } from "react";

import { useForm } from "../../utils/hooks";
import styles from "./new-dialog-form.module.scss";
import stylesInput from "../input/input.module.scss";
import Input from "../input/input";
import Button from "../button/button";
import { FormInputType, ERequestStatus } from "../../utils/vars";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { getAccountWid } from "../../services/account/selectors";
import InputMask from "react-input-mask";
import {
    getCheckRequestStatus,
    getCheckUserNotUseWA,
} from "../../services/chat-list/selectors";
import {
    CHECK_USER_СLEAR,
    СHECK_NEW_DIALOG,
} from "../../services/chat-list/actions";
import { useNavigate } from "react-router-dom";

const NewDialogForm: FC = () => {
    const wid: string = useAppSelector(getAccountWid);
    const isLoading: boolean =
        useAppSelector(getCheckRequestStatus) === ERequestStatus.LOADING
            ? true
            : false;
    const isLoaded: boolean =
        useAppSelector(getCheckRequestStatus) === ERequestStatus.SUCCESS
            ? true
            : false;
    const userNotUseWA: boolean = useAppSelector(getCheckUserNotUseWA);

    const [inputError, setInputError] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // работаем с формой
    const { formState, handleChange } = useForm();
    const isFormFilled = formState.phone && formState.name;
    const number = formState.phone.replace(/[^0-9]/g, "");
    const id = `${number.toString()}@c.us`;

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (isFormFilled) {
            const sendData = {
                phoneNumber: Number(number),
                id: id,
                name: formState.name,
            };
            if (wid === sendData.id) {
                dispatch(CHECK_USER_СLEAR());
                setInputError(true);
            } else {
                setInputError(false);
                dispatch(СHECK_NEW_DIALOG(sendData));
            }
        }
    };

    useEffect(() => {
        if (isLoaded && !userNotUseWA) {
            dispatch(CHECK_USER_СLEAR());
            navigate(`/${id}`);
        }
    }, [dispatch, id, isLoaded, navigate, userNotUseWA]);

    return (
        <>
            <form className={styles.form} onSubmit={handleSubmit}>
                {inputError && (
                    <span className={styles.input__error}>
                        Enter a number other than your own
                    </span>
                )}
                {userNotUseWA && (
                    <span className={styles.input__error}>
                        This phone number does not use WhatsApp
                    </span>
                )}
                <InputMask
                    mask="+7(999)999-99-99"
                    // maskPlaceholder="-"
                    placeholder={`Enter ${FormInputType.PHONE}`}
                    onChange={handleChange}
                    value={formState.phone}
                    name={FormInputType.PHONE}
                    disabled={isLoading}
                    className={stylesInput.input}
                />

                <Input
                    onChange={handleChange}
                    value={formState.name}
                    name={FormInputType.NAME}
                    disabled={isLoading}
                />
                <Button
                    blocked={isLoading ? true : !isFormFilled ? true : false}
                    submit
                >
                    {isLoading ? "Loading" : "Add"}
                </Button>
            </form>
        </>
    );
};

export default memo(NewDialogForm);
