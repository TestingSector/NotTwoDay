import { ApplicationFormPage } from "./ApplicationFormPage";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../helpers/useCurrentUser";
import { canCreateApplication } from "../helpers/permissions";
export const CreateApplicationPage = () => {
  const user = useCurrentUser();

  if (!canCreateApplication(user.role)) {
    return <Navigate to="/" replace />;
  }
  return <ApplicationFormPage mode="create" />;
};
