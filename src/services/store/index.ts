import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { mobileReducer } from "../mobile/reducer";
import { accountReducer } from "../account/reducer";
import { chatListReducer } from "../chat-list/reducer";
import { chatReducer } from "../chat/reducer";

export const rootReducer = combineReducers({
    mobile: mobileReducer,
    account: accountReducer,
    chatList: chatListReducer,
    chat: chatReducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});
