import React, { useState } from "react";

interface LanguageToggleButtonProps {
  languages: string[];
  setCurrentLanguage: (language: string) => void;
  currentLanguage: string;
}

const LanguageToggleButton: React.FC<LanguageToggleButtonProps> = ({
  languages,
  setCurrentLanguage,
  currentLanguage,
}) => {
  const [selectedLanguage, setSelectedLanguage] =
    useState<string>(currentLanguage);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.target.value);
    setCurrentLanguage(event.target.value);
  };

  return (
    <div>
      <select
        value={selectedLanguage}
        onChange={handleChange}
        className="p-1.5 rounded bg-ide-color font-semibold border-2 border-main-border text-xs text-task-lighter outline-none"
      >
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageToggleButton;
