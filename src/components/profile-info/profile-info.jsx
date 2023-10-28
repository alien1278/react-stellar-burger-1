import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { sendUserData } from "../../services/actions/users";
import style from "./profile-info.module.css";

const ProfileInfo = () => {
  const { token, userInfo } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isDataChanged, setIsDataChanged] = useState(false);

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const onNameClick = () => nameRef.current.focus();
  const onEmailClick = () => emailRef.current.focus();
  const onPasswordClick = () => passwordRef.current.focus();

  const onNameChange = (evt) => {
    const value = evt.target.value;
    setName(value);
    value === userInfo.name ? setIsDataChanged(false) : setIsDataChanged(true);
  };
  const onEmailChange = (evt) => {
    const value = evt.target.value;
    setLogin(value);
    value === userInfo.email ? setIsDataChanged(false) : setIsDataChanged(true);
  };
  const onPasswordChange = (evt) => {
    const value = evt.target.value;
    setPassword(value);
    value === password ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    dispatch(sendUserData(token, name, login, password));
    setIsDataChanged(false);
  };

  const onCancelEditing = (evt) => {
    evt.preventDefault();
    setName(userInfo.name);
    setLogin(userInfo.email);
    setPassword("");
    setIsDataChanged(false);
  };

  useEffect(() => {
    if (userInfo) {
      setLogin(userInfo.email);
      setName(userInfo.name);
      setPassword("");
    }
  }, [userInfo]);

  return (
    <form onSubmit={onSubmit} className={style.form}>
      <div className="mb-6">
        <Input
          type={"text"}
          onChange={onNameChange}
          icon={"EditIcon"}
          value={name}
          error={false}
          ref={nameRef}
          onIconClick={onNameClick}
          errorText={"Ошибка"}
          size={"default"}
          placeholder={"Имя"}
        />
      </div>
      <div className="mb-6">
        <Input
          type={"email"}
          onChange={onEmailChange}
          icon={"EditIcon"}
          value={login}
          error={false}
          ref={emailRef}
          onIconClick={onEmailClick}
          errorText={"Ошибка"}
          size={"default"}
          placeholder={"Логин"}
        />
      </div>
      <div className="mb-6">
        <Input
          type={"password"}
          onChange={onPasswordChange}
          icon={"EditIcon"}
          value={password}
          error={false}
          ref={passwordRef}
          onIconClick={onPasswordClick}
          errorText={"Ошибка"}
          size={"default"}
          placeholder={"Пароль"}
        />
      </div>

      {isDataChanged && (
        <div className={style.buttons}>
          <Button onClick={onCancelEditing} type="secondary" size="medium">
            Отмена
          </Button>
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileInfo;
