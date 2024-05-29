import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Redirect404 = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    Navigate("/404");
  }, []);
  return <div></div>;
};

export default Redirect404;
