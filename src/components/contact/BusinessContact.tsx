import React from "react";
import GenericContact from "./GenericContact";

const BusinessContact: React.FC = () => {
    const businessFields = [
        { name: "First Name", type: "text", required: false },
        { name: "Second Name", type: "text", required: false },
        { name: "E-mail", type: "email", required: true },
        { name: "Company Name", type: "text", required: true },
        { name: "Message", type: "textarea", required: false }
    ];

    return (
        <GenericContact
            title="Business"
            URL={import.meta.env.VITE_CONTACT_BUSINESS}
            fields={businessFields}
            contactMail="buisnessMail@xd.pl"
        />
    );
};

export default BusinessContact;