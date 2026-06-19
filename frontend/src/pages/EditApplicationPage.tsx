import { Navigate } from "react-router-dom";
import { ApplicationFormPage } from "./ApplicationFormPage";
import { useCurrentUser } from "../helpers/useCurrentUser";
import { canEditApplication } from "../helpers/permissions";

export const EditApplicationPage = () => {
  const user = useCurrentUser();

  if (!canEditApplication(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <ApplicationFormPage mode="edit" />;
};
