import { FC, memo, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  GET_SETTINGS,
  GET_STATE_INSTANCE,
} from "../../services/account/actions";
import { getAccountRequestStatus } from "../../services/account/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { useForm } from "../../utils/hooks";
import { ERequestStatus, FormInputType } from "../../utils/vars";
import Button from "../button/button";
import Input from "../input/input";
import styles from "./login.module.scss";

const Login: FC = () => {
  const isLoading: boolean =
    useAppSelector(getAccountRequestStatus) === ERequestStatus.LOADING
      ? true
      : false;
  const isLoadError: boolean =
    useAppSelector(getAccountRequestStatus) === ERequestStatus.ERROR
      ? true
      : false;
  const dispatch = useAppDispatch();

  const onDispatch = useCallback(
    (sendData: { id: string; token: string }) => {
      dispatch(GET_SETTINGS(sendData));
      dispatch(GET_STATE_INSTANCE(sendData));
    },
    [dispatch]
  );

  // работаем с формой
  const { formState, handleChange } = useForm();
  const isFormFilled = formState.id && formState.token;
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (isFormFilled) {
      const sendData = {
        id: formState.id,
        token: formState.token,
      };
      onDispatch(sendData);
    }
  };

  // забираем ключи из URL
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const token = searchParams.get("token") || "";

  useEffect(() => {
    if (id && token) {
      const sendData = {
        id: id,
        token: token,
      };
      onDispatch(sendData);
    }
  }, [dispatch, id, onDispatch, token]);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        {isLoadError && <span className={styles.error}>Login error</span>}
        <Input
          onChange={handleChange}
          value={formState.id}
          name={FormInputType.ID}
          disabled={isLoading}
        />
        <Input
          onChange={handleChange}
          value={formState.token}
          name={FormInputType.TOKEN}
          disabled={isLoading}
        />
        <Button
          blocked={isLoading ? true : !isFormFilled ? true : false}
          submit
        >
          {isLoading ? "Loading" : "Login"}
        </Button>
      </form>
    </>
  );
};

export default memo(Login);
