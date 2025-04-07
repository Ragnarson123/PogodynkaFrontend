import React from "react";
import { styles } from "@/styles";

const SubmitButton = ({ title = "Send", ...props }) => {
  return (
    <button
      className={`rounded-xl px-2 py-1 ${styles.bodyBgColor} border-[1px] ${styles.borderColor} hover:border-purple-700 transition-all ease-in-out hover:bg-purple-700 hover:cursor-pointer`}
      type={"submit"}
    >
      {title}
    </button>
  );
};

export default SubmitButton;
