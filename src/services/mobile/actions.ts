import { createAction } from "@reduxjs/toolkit";

const REDUCER_NAME = "mobile";

// глобальненько на всё приложение
export const MOBILE_TURN_ON = createAction(`${REDUCER_NAME}/turn_on`);
export const MOBILE_TURN_OFF = createAction(`${REDUCER_NAME}/turn_off`);
