import React from "react";
import GenericContact from "./GenericContact";
// import BusinessContact from "./BusinessContact";

const SupportContact: React.FC = () => {
    const supportFields = [
        { name: "Name", type: "text", required: false },
        { name: "E-mail", type: "email", required: true },
        { name: "Message", type: "textarea", required: true }
    ];

    return (
        <GenericContact
            title="Support"
            URL={import.meta.env.VITE_CONTACT_SUPPORT}
            fields={supportFields}
            contactMail="support.mail@example.com"
        />
    );
};

export default SupportContact;
