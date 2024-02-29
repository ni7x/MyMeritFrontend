import React from "react";
import GenericContact from "./GenericContact";
import BusinessContact from "./BusinessContact";

const SupportContact: React.FC = () => {
    const supportFields = [
        { name: "Name", type: "text", required: false },
        { name: "E-mail", type: "email", required: true },
        { name: "Message", type: "textarea", required: true }
    ];

    return (
        <GenericContact
            title="Support"
            URL="https://script.google.com/macros/s/AKfycbx43bxEXuI9xN9tbGJ76C0z06R2jXbq90SVa2kcINVGcdtB0Zwwh4oeaL7f96p6xjNt/exec"
            fields={supportFields}
            contactMail="supportMain@xd.com"
        />
    );
};

export default SupportContact;