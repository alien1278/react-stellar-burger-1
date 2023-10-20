import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../services/actions/users";
import style from "./reset-password.module.css";

const ResetPassword = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [icon, setIcon] = useState("ShowIcon");
  const { userInfo, isForgotPassword } = useSelector((state) => state.users);
  const inputRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    setTypeInput(typeInput === "password" ? "email" : "password");
    setIcon(icon === "ShowIcon" ? "HideIcon" : "ShowIcon");
  };

  const sendData = (e) => {
    e.preventDefault();

    if (!code || !password) {
      return;
    }

    dispatch(resetPassword(password, code));
    setCode("");
    setPassword("");
    navigate("/");
  };

  useEffect(() => {
    if (userInfo) {
      location.state && location.state.from
        ? navigate(location.state.from.pathname)
        : navigate("/");
    } else {
      !isForgotPassword && navigate("/forgot-password");
    }
  }, [userInfo, navigate, location, isForgotPassword]);

  return (
    <>
      <form onSubmit={sendData} className={`${style.form} mt-30 mb-20`}>
        <p className="text text_type_main-medium mb-6">Востановление пароля</p>

        <div className="mb-6">
          <Input
            type={typeInput}
            onChange={(e) => setPassword(e.target.value)}
            icon={icon}
            value={password}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
            placeholder={"Введите новый пароль"}
          />
        </div>

        <div className="mb-6">
          <Input
            type={"text"}
            onChange={(e) => setCode(e.target.value)}
            value={code}
            name={"code"}
            error={false}
            ref={inputRef}
            onIconClick={""}
            errorText={"Ошибка"}
            size={"default"}
            placeholder={"Введите код из письма"}
          />
        </div>

        <Button type="primary" size="medium">
          Сохранить
        </Button>
      </form>

      <div className={`${style.container} mt-15`}>
        <p className="text text_type_main-default text_color_inactive">
          Вспомнили пароль?
          <Link className={style.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default ResetPassword;
