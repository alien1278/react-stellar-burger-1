import { NavLink, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../services/actions/users";
import ProfileInfo from "../../components/profile-info/profile-info";
import style from "./profile.module.css";
const Profile = () => {
  const dispatch = useDispatch();

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
              className={({ isActive }) =>
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
              className={({ isActive }) =>
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
              className={({ isActive }) =>
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

      <Routes>
        <Route index element={<ProfileInfo />} />
        {/* <Route path="orders"/> */}
      </Routes>
    </div>
  );
};

export default Profile;
