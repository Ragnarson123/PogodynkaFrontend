"use client";
import React, { useState } from "react";
import { styles } from "@/styles";
import LinedButtons from "@/components/LinedButtons";
import ActiveIndicator from "@/components/ActiveIndicator";
import { AnimatePresence, motion } from "framer-motion";
import Form from "@/components/Form";
import PopUpContainer from "@/components/PopUpContainer";
import { useRouter } from "next/navigation";


const AuthenticationForms = ({ className = "" }) => {
  const [selectedFormTypeIndex, setSelectedFormTypeIndex] = useState(0);
  const router = useRouter();

  const forms = [
    {
      type: "register",
      name: "Sign Up",
      title: "Create a new account",
      endpoint: "http://localhost:3000/api/auth/register",
      lowerText: "Already have account?",
      lowerTextLinkText: "Sign in",
      submitButtonTitle: "Sign up",
      fields: [
        { name: "Login", value: "", placeholder: "Enter your login" },
        { name: "Name", value: "", placeholder: "Enter your name" },
        { name: "Password", value: "", placeholder: "Enter your password" },
      ],
    },
    {
      type: "login",
      name: "Sign In",
      title: "Login to your account",
      endpoint: "http://localhost:3000/api/auth/login",
      lowerText: "Don't have an account?",
      lowerTextLinkText: "Sing up",
      submitButtonTitle: "Sign In",
      fields: [
        { name: "Login", value: "", placeholder: "Enter your login" },
        { name: "Password", value: "", placeholder: "Enter your password" },
      ],
    },
  ];
  const handleFormSubmit = async (formData, endpoint) => {
    console.log('Dane formularza:', formData);
    console.log('Endpoint:', endpoint);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (selectedFormTypeIndex === 1) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          router.push('/');
        } else {
          alert('Registration successful!');
          setSelectedFormTypeIndex(1);
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'An error occurred.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred.');
    }
  };

  return (
      <PopUpContainer
          className={`w-full h-fit flex flex-col gap-3 rounded-2xl ${styles.paddings} ${styles.bodyBgColor} ${styles.textDefault} ${className}`}
      >
        <LinedButtons
            className={"bg-neutral-800 w-fit"}
            items={forms}
            render={(button) => (
                <ActiveIndicator
                    key={button.name}
                    layoutId={"formActiveButton"}
                    active={
                        selectedFormTypeIndex ===
                        forms.findIndex((form) => form.name === button.name)
                    }
                >
                  <button
                      type={"button"}
                      onClick={() => setSelectedFormTypeIndex(forms.indexOf(button))}
                      className={"hover:cursor-pointer"}
                  >
                    {button.name}
                  </button>
                </ActiveIndicator>
            )}
        />

        <div className={"relative w-full h-full gap-4"}>
          {forms.map(
              (form, key) =>
                  key === selectedFormTypeIndex && (
                      <motion.div
                          key={form.type}
                          variants={{
                            initial: {
                              opacity: 0,
                              x: 100,
                              display: "hidden",
                            },
                            animate: {
                              opacity: 1,
                              x: 0,
                              display: "block",
                            },
                            exit: {
                              opacity: 0,
                              x: -200,
                            },
                          }}
                          initial="initial"
                          animate={selectedFormTypeIndex === key ? "animate" : "initial"}
                          transition={{
                            duration: 0.3,
                            ease: "easeInOut",
                            type: "spring",
                          }}
                          className={`h-full w-full ${
                              selectedFormTypeIndex === key ? "" : ""
                          }`}
                      >
                        <Form {...form} onSubmit={handleFormSubmit} />
                      </motion.div>
                  ),
          )}
        </div>
      </PopUpContainer>
  );
};

export default AuthenticationForms;
