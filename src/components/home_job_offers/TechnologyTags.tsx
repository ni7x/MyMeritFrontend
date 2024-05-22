import React from "react";

const TechnologyTags: React.FC<{ technologies: string[], languageColors: { [key: string]: string } }> = ({ technologies, languageColors }) => {
    return (
        <ul className="flex h-full gap-x-2">
            {technologies.map((technology) => {
                const color = languageColors[technology.toUpperCase()];
                return (
                    <li
                        className="px-4 py-1.5 text-xs rounded-md font-semibold"
                        style={{
                            backgroundColor: "transparent",
                            border: `2px solid ${color}`,
                            color: color,
                        }}
                        key={technology}
                    >
                        {technology}
                    </li>
                );
            })}
        </ul>
    );
};

export default TechnologyTags;
