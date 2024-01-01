import {
  NavLink,
  Routes,
  Route,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/users";
import React, { FC } from "react";
import ProfileInfo from "../../components/profile-info/profile-info";
import style from "./profile.module.css";
import { useAppDispatch } from "../../services/hook";
import OrdersFeedHistory from "../feed-history/feed-history";
import Modal from "../../components/modal/modal";
import FeedId from "../feed-id/feed-id";
interface NavParams {
  id?: string;
}
const Profile: FC = () => {
  const dispatch = useAppDispatch();
  const navParams: NavParams = useParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(logout(refreshToken));
  };

  return (
    <div className={style.container}>
      <nav className={style.navigation}>
        <ul className={`${style.items}`}>
          <li>
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? `${style.link_active} text text_type_main-medium`
                  : `${style.link} text text_type_main-medium`
              }
              to=""
            >
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? `${style.link_active} text text_type_main-medium`
                  : `${style.link} text text_type_main-medium`
              }
              to="orders"
            >
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                isActive
                  ? `${style.link_active} text text_type_main-medium`
                  : `${style.link} text text_type_main-medium`
              }
              to="/login"
              onClick={handleLogout}
            >
              Выход
            </NavLink>
          </li>
        </ul>
        <p
          className={`${style.text} text text_type_main-default text_color_inactive`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      {navParams && navParams.id && (
        <Modal title="" onClose={() => navigate("/profile/orders")}>
          <FeedId />
        </Modal>
      )}
      <div className="content">
        <Routes>
          <Route index element={<ProfileInfo />} />
          <Route path="/orders" element={<OrdersFeedHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;
