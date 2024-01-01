import { useEffect, FC } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { getIngredients } from "../../services/actions/ingredient";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import IngredientsPage from "../../pages/ingredients-page/ingredients-page";
import NotFound404 from "../../pages/not-found-404/not-found-404";
import Profile from "../../pages/profile/profile";
import ProtectedRoute from "../protected-route/protected-route";
import { getUserData, refreshToken } from "../../services/actions/users";
import { useAppDispatch } from "../../services/hook";
import OrdersFeed from "../../pages/feed/feed";
import FeedId from "../../pages/feed-id/feed-id";
import OrdersFeedHistory from "../../pages/feed-history/feed-history";

const BurgerIngredientRoute: FC = () => {
  let { state } = useLocation();

  return state?.showModal ? <Main /> : <IngredientsPage />;
};
const BurgerOrderRoute: FC = () => {
  let { state } = useLocation();

  return state?.showModal ? <OrdersFeed /> : <FeedId />;
};
const BurgerMyOrderRoute: FC = () => {
  let { state } = useLocation();

  return state?.showModal ? (
    <Profile>
      <OrdersFeedHistory />
    </Profile>
  ) : (
    <FeedId authed />
  );
};
const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    const exec = async () => {
      const token = localStorage.getItem("refreshToken");

      if (token) {
        const accessToken = await dispatch(refreshToken(token));

        if (typeof accessToken === "string") {
          dispatch(getUserData(accessToken));
        }
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
          <Route path="feed" element={<OrdersFeed />} />
          <Route path="feed/:id" element={<BurgerOrderRoute />} />
          <Route
            path="profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="profile/orders/:id" element={<BurgerMyOrderRoute />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
