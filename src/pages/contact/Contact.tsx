import React from "react";
import BusinessContact from "../../components/contact/BusinessContact";
import SecondWrapper from "../../components/SecondWrapper";
import SupportContact from "../../components/contact/SupportContact";

const Contact: React.FC = () => {
    return (
            <SecondWrapper>
                <h2 className="text-3xl font-semibold my-5 text-center">Contact</h2>
                <BusinessContact/>
                <SupportContact/>
            </SecondWrapper>
    );
};

export default Contact;