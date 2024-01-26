import React, { useRef, useState, FC, FormEvent, ChangeEvent } from "react";
import style from "./forgot-password.module.css";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../services/actions/users";
import { useAppDispatch } from "../../services/hook";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onIconClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
    alert("Icon Click Callback");
  };

  const sendData = (e: FormEvent) => {
    e.preventDefault();

    if (!email) {
      return;
    }

    dispatch(forgotPassword(email));
    setEmail("");
    navigate("/reset-password");
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <form onSubmit={sendData} className={`${style.form} mt-30 mb-20`}>
        <p className="text text_type_main-medium mb-6">Востановление пароля</p>

        <div className="mb-6">
          <Input
            type={"email"}
            onChange={handleInputChange}
            value={email}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            placeholder={"Укажите e-mail"}
            size={"default"}
          />
        </div>

        <Button htmlType="submit" type="primary" size="medium">
          Востановить
        </Button>
      </form>

      <div className={`${style.container} mt-10`}>
        <p className="text text_type_main-default text_color_inactive ">
          Вспомнили пароль?
          <Link className={style.link} to={`/login`}>
            Войти
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
