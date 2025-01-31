import { ChangeEvent, useState } from "react";

export const useForm = () => {
    let initialSate = {
        id: "",
        token: "",
        message: "",
        phone: "",
        name: "",
    };

    const [formState, setFormState] = useState(initialSate);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleReset = (e: { preventDefault: () => void }) => {
        setFormState(initialSate);
    };

    return {
        formState,
        handleChange,
        handleReset,
    };
};
