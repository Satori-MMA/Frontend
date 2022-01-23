import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../GlobalState";
import { LoadingMessage } from "../utilities/LoadingMessage";

export const Mensuality = () => {
  const [user, updateUser] = useGlobalState("user");
  let navigate = useNavigate();
  useEffect(() => {
    if ( user?.rolUser?.edges[0]?.node.rolName !== "TEACHER") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <h1 className="text-white text-center"> Gestion de Mensualidades </h1>
      <LoadingMessage />
    </div>
  );
};
