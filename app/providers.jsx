"use client";

import {Provider, useDispatch} from "react-redux";
import  store  from "../redux/store";
import {useEffect} from "react";
import {login} from "@/redux/authSlice";

export function Providers({ children }) {
    return <Provider store={store}>{children}</Provider>;
}
export default function AppWrapper({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(login(token));
        }
    }, []);

    return children;
}