import React, { useEffect, useState } from "react";
import NotFoundImage from "../../assets/404.jpeg";

const NotFound: React.FC = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div
      className="absolute top-0 left-0 w-full h-full flex
     flex-col items-center justify-center bg-main-bg-color text-center"
    >
      <h1 className="mt-4 text-4xl font-bold font-['Courier_New'] tracking-widest">
        <span className="opacity-50">{"<"}</span>
        <span className="text-[MediumSeaGreen]">{"NotFound"}</span>
        <span className="opacity-50">{"/>"}</span>
      </h1>
      <div className="relative flex items-center justify-center animate-float">
        <img
          src={NotFoundImage}
          width="256"
          height="256"
          alt="404 Image"
          className={`${
            loaded ? "opacity-100" : "opacity-0"
          } transition-opacity duration-500 ease-linear w-64 h-auto rounded-full shadow-lg`}
        />
      </div>
    </div>
  );
};

export default NotFound;
