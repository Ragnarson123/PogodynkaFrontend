import React, { useEffect } from "react";
import Input from "@/components/Input";
import SubmitButton from "@/components/SubmitButton";

const Form = ({
                  title,
                  submitButtonTitle,
                  lowerText,
                  lowerTextLinkText,
                  fields,
                  endpoint,
                  onSubmit,
              }) => {
    const [formFields, setFormFields] = React.useState([]);
    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = formFields.reduce((acc, field) => {
                acc[field.name] = field.value;
                return acc;
            }, {});

            await onSubmit(formData, endpoint);
        } catch (error) {
            console.error("Error in form submission:", error);
        }
    };

    const onInputChange = (e, name) => {
        const oldField = formFields.filter((input) => input.name === name)[0];
        const oldFieldIndex = formFields.indexOf(oldField);

        setFormFields((prev) =>
            prev.toSpliced(oldFieldIndex, 1, {
                ...oldField,
                value: e.target.value,
            }),
        );
    };

    useEffect(() => setFormFields(fields), [fields]);

    return (
        <form className={"flex flex-col gap-4 w-full"} onSubmit={onFormSubmit}>
            <h2 className={"text-3xl"}>{title}</h2>

            {formFields.map((input, key) => (
                <div key={key} className={"flex flex-col gap-1 group"}>
                    <label
                        htmlFor={input.name}
                        className={
                            "text-sm group-focus-within:text-purple-700 transition-all ease-in-out"
                        }
                    >
                        {input.name}
                    </label>
                    <Input
                        id={key}
                        value={input.value}
                        name={input.name}
                        onChange={(e) => onInputChange(e, input.name)}
                        placeholder={input.placeholder}
                        className={"peer"}
                    />
                </div>
            ))}

            <SubmitButton title={submitButtonTitle} />

            <p className={"text-sm"}>
                {lowerText}{" "}
                <span
                    className={
                        "text-purple-700 hover:underline hover:cursor-pointer font-semibold"
                    }
                >
          {lowerTextLinkText}
        </span>
            </p>
        </form>
    );
};

export default Form;
