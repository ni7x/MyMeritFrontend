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
            URL="https://script.google.com/macros/s/AKfycbyEolx-7ro_nSPHf1DJQgIgZ6vg9quv9uPE3XWPDMUiwQLdMm_A4-mqBN03YsJ9BrEP/exec"
            fields={businessFields}
            contactMail="buisnessMail@xd.pl"
        />
    );
};

export default BusinessContact;