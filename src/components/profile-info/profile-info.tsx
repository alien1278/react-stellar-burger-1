import {
  ChangeEvent,
  FC,
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { sendUserData } from "../../services/actions/users";
import style from "./profile-info.module.css";
import { useAppDispatch, useAppSelector } from "../../services/hook";

const ProfileInfo: FC = () => {
  const { token, userInfo } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDataChanged, setIsDataChanged] = useState<boolean>(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onNameClick = () => nameRef.current?.focus();
  const onEmailClick = () => emailRef.current?.focus();
  const onPasswordClick = () => passwordRef.current?.focus();

  const onNameChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setName(value);
    value === (userInfo ? userInfo.name : null)
      ? setIsDataChanged(false)
      : setIsDataChanged(true);
  };

  const onEmailChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setLogin(value);
    value === (userInfo ? userInfo.email : null)
      ? setIsDataChanged(false)
      : setIsDataChanged(true);
  };
  const onPasswordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setPassword(value);
    value === password ? setIsDataChanged(false) : setIsDataChanged(true);
  };

  const onSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendUserData(token, name, login, password));
    setIsDataChanged(false);
  };

  const onCancelEditing = (evt: SyntheticEvent<Element, Event>) => {
    evt.preventDefault();
    if (userInfo) {
      setName(userInfo.name);
      setLogin(userInfo.email);
    }
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
          <Button
            htmlType="submit"
            onClick={onCancelEditing}
            type="secondary"
            size="medium"
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default ProfileInfo;
