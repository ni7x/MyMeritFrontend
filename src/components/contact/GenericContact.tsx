import React, { useState } from "react";

interface ContactProps {
    title: string;
    URL: string;
    contactMail: string;
    fields: Field[];
}

interface Field {
    name: string;
    type: string;
    required: boolean;
}

const GenericContact: React.FC<ContactProps> = ({ title, URL , contactMail, fields}) => {
    const [status, setStatus] = useState<string>("");

    const submitData = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        setStatus("Loading..");

        fetch(URL, {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    setStatus("Submitted");
                } else {
                    setStatus("Couldn't submit")
                    throw new Error("Failed to submit form");
                }
            })
            .catch(error => {
                console.error(error);
                setStatus("Couldn't submit");
            });
    };

    return (
        <div className="flex flex-col mt-10">
            <h2 className="text-xl font-semibold mb-5">{title}</h2>
            <form className="flex flex-row flex-wrap w-full gap-[2%]" onSubmit={submitData}>
                {fields.map(field => (
                    <label
                        key={field.name}
                        className={"mb-3 flex flex-col " + (field.type === "textarea" ? "w-[98%]": "w-[98%] md:w-[48%]")
                    }>
                        <span className="font-medium text-sm">{field.name}</span>
                        {field.type === "textarea" ? (
                            <textarea
                                name={field.name.toLowerCase().replace(/\s/g, "_")}
                                placeholder={field.name}
                                required={field.required}
                                className="bg-secondary-bg-color p-3 rounded my-2 outline-none min-h-[8rem]"
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name.toLowerCase().replace(/\s/g, "_")}
                                placeholder={field.name}
                                required={field.required}
                                className="bg-secondary-bg-color p-3 rounded my-2 outline-none"
                            />
                        )}
                    </label>
                ))}
                <div className="flex items-center justify-between w-[98%]">
                    <button type="submit" className="bg-emerald-500 p-2.5 px-6 rounded text-sm font-medium mr-5">
                        Submit
                    </button>
                    <p className={"text-center pr-5 text-sm font-medium " + (status === "Submitted" ? "text-emerald-300" : (status === "Error" ? "text-red-500" : "text-gray-300"))}>{status}</p>
                    <p className="text-main-lighter">You can also e-mail us at <span className="text-white">{contactMail}</span></p>
                </div>
            </form>
        </div>
    );
};

export default GenericContact;