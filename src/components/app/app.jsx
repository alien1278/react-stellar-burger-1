import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/ingredent";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import IngredientsId from "../../pages/ingredients-id/ingredients-id";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import Profile from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import { hideModal } from "../../services/modalSlice";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getUserData, refreshToken } from "../../services/actions/users";

const BurgerIngredientRoute = () => {
  let { state } = useLocation();

  return state?.showModal ? <Main /> : <IngredientsId />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const exec = async () => {
      const token = localStorage.getItem("refreshToken");

      if (token) {
        const accessToken = await dispatch(refreshToken(token));

        dispatch(getUserData(accessToken));
      }
    };
    exec();
  }, [dispatch]);

  return (
    <>
      <Router>
        <div className={styles.app}>
          <div className="pb-4 pt-4">
            <AppHeader />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/ingredients/:id" element={<BurgerIngredientRoute />} />

          <Route path="/login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="*" element={<NotFound404 />} />
          <Route
            path="profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
