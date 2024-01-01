import React, { useRef, useState, FC, ChangeEvent, FormEvent } from "react";
import {
  Input,
  Button,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/users";
import style from "./register.module.css";
import { useAppDispatch } from "../../services/hook";

const Register: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

  const inputRef = useRef<HTMLInputElement>(null);


  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const sendData = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return;
    }

    dispatch(register(email, name, password));
    navigate("/");
  };

  return (
    <>
      <form onSubmit={sendData} className={`${style.form} mt-30`}>
        <p className="text text_type_main-medium mb-6">Регистрация</p>
        <div className="mb-6">
          <Input
            type={"text"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            error={false}
            ref={inputRef}
            // onIconClick={""}
            errorText={"Ошибка"}
            size={"default"}
            placeholder={"Имя"}
          />
        </div>
        <div className="mb-6">
          <Input
            type={"email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={false}
            ref={inputRef}
            // onIconClick={""}
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

        <Button type="primary" size="medium" htmlType="submit">
          Зарегистрироваться
        </Button>
      </form>

      <div className={`${style.container} mt-15`}>
        <p className="text text_type_main-default text_color_inactive">
          Уже зарегистрированы?
          <Link className={style.link} to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
