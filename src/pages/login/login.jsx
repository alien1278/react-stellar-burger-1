import React, { useEffect, useRef, useState } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/actions/users";
import style from "./login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { userInfo } = useSelector((state) => state.users);

  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (e) => {
    setPassword(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    navigate(-1);
    dispatch(login(email, password));
  };
  //переход после входа
  useEffect(() => {
    if (userInfo) {
      location.state && location.state.from
        ? navigate(location.state.from.pathname)
        : navigate("/");
    }
  }, [userInfo, navigate, location]);

  return (
    <>
      <form onSubmit={sendData} className={`${style.form} mt-30`}>
        <p className="text text_type_main-medium mb-6">Вход</p>
        <div className="mb-6">
          <Input
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={false}
            ref={inputRef}
            onIconClick={""}
            errorText={"Ошибка"}
            size={"default"}
            placeholder={"E-mail"}
          />
        </div>

        <div className="mb-6">
          <PasswordInput
            onChange={onChange}
            value={password}
            name={"password"}
          />
        </div>

        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>

      <div className={`${style.container} mt-15`}>
        <p className="text text_type_main-default text_color_inactive">
          Вы — новый пользователь?
          <Link className={style.link} to="/register">
            Зарегистрироваться
          </Link>
        </p>

        <p className="text text_type_main-default text_color_inactive">
          Забыли пароль?
          <Link className={style.link} to="/forgot-password">
            Восстановить пароль
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
