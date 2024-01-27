import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../services/hook";
import { FC, ReactElement } from "react";

interface IProtectedRouteElement {
  children: ReactElement;
}

const ProtectedRoute: FC<IProtectedRouteElement> = ({ children }) => {
  const location = useLocation();
  const { userInfo } = useAppSelector((state) => state.users);

  return userInfo ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
