import React, { useEffect, useRef, useState, FC, ChangeEvent, FormEvent } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../services/actions/users";
import style from "./login.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hook";

const Login: FC = () => {
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { userInfo } = useAppSelector((state) => state.users);

  
  const inputRef = useRef<HTMLInputElement>(null);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const sendData = (e: FormEvent) => {
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

        <Button htmlType="submit" type="primary" size="medium">
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
