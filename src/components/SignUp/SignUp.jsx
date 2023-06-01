import React, { useContext, useState } from "react";
import css from "./SignUp.module.css";
import axios from "axios";
import { Input, Button } from "../common/Form/Form";
import { StoreContext } from "../../context/store";

export const SignUp = () => {
  const { apiDomain } = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clientId, setClientId] = useState("3532b404-5b2e-4f76-a59a-30d0cf6a1c4a");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeClientId = (e) => {
    setClientId(e.target.value);
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const sendData = (e) => {
    e.preventDefault();

    const signUpUrl = "auth/sign_up";

    setErrorMessage("");
    setMessage("");

    if (!email) {
      setErrorMessage("Введите Email.");
    }

    if (password) {
      if (password.length < 3 || password.length > 12) {
        setErrorMessage("Пароль должен быть от 3 до 12 символов.");
        return;
      }
    }

    if (!password) {
      setErrorMessage("Введите пароль.");
    }
    if (!clientId) {
      setErrorMessage("Введите clientId.");
    }

    const data = {
      email,
      password,
      clientId,
      firstName,
      lastName,
    };

    axios
      .post(apiDomain + signUpUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setErrorMessage("");
        setMessage("Пользователь успешно зарегистрирован");
      })
      .catch((error) => {
        console.log(error);
        setMessage("");
      });
  };

  return (
    <div className={css.signUpWrapper}>
      <h1>Регистрация</h1>
      <form className={css.signUpForm} onSubmit={sendData}>
        <Input
          type="text"
          name="email"
          label="Email"
          placeholder="Введите Email"
          value={email}
          onChange={changeEmail}
        ></Input>
        <Input
          type="password"
          name="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={password}
          onChange={changePassword}
        ></Input>
        <Input
          type="text"
          name="clientId"
          label="ClientId"
          placeholder="Введите clientId"
          value={clientId}
          onChange={changeClientId}
        ></Input>
        <Input
          type="text"
          name="firstName"
          label="Имя"
          placeholder="Введите Имя"
          value={firstName}
          onChange={changeFirstName}
        ></Input>
        <Input
          type="text"
          name="lastName"
          label="Фамилия"
          placeholder="Введите Фамилию"
          value={lastName}
          onChange={changeLastName} 
         
        ></Input>
        {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
        <Button>Зарегистрировать</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
