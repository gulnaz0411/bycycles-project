import React, { useContext, useState } from "react";
import css from "./OfficerDetail.module.css";
import { Input, Button } from "../common/Form/Form";
import { StoreContext } from "../../context/store";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";

export const OfficerDetail = () => {
  const { apiDomain, userToken } = useContext(StoreContext);
  const updateOfficerUrl = "officers/";
  const { state } = useLocation();
  const officer = state;
  const [email] = useState(officer.email);
  const [password, setPassword] = useState("");
  const [clientId] = useState(officer.clientId);
  const [firstName, setFirstName] = useState(officer.firstName);
  const [lastName, setLastName] = useState(officer.lastName);
  const [approved, setApproved] = useState(officer.approved);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeApproved = (e) => {
    setApproved(!approved);
  };

  const updateOfficer = (e) => {
    e.preventDefault();

    if (password && (password.length < 3 || password.length > 12)) {
      setErrorMessage("Пароль должен быть от 3 до 12 символов.");
      return;
    }

    const data = {
      firstName,
      lastName,
      approved,
    };

    if (password !== "") {
      data.password = password;
    }

    axios
      .put(apiDomain + updateOfficerUrl + officer._id, data, {
        headers: {
          Authorization: "bearer " + userToken,
        },
      })
      .then(() => {
        navigate("/officers");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={css.officer}>
      <div>
        <Link className={css.backLink} to="/officers">
          Назад
        </Link>
      </div>
      <h1 className={css.title}>Детальная страница сотрудника</h1>
      <div className={css.detail}>
        <form className={css.officerForm} onSubmit={updateOfficer}>
          <Input
            type="text"
            name="firstName"
            label="Имя"
            placeholder="Имя сотрудника"
            value={firstName}
            onChange={changeFirstName}
          ></Input>
          <Input
            type="text"
            name="lastName"
            label="Фамилия"
            placeholder="Фамилия сотрудника"
            value={lastName}
            onChange={changeLastName}
          ></Input>
          <Input
            type="text"
            name="clientId"
            label="clientId"
            disabled={true}
            value={clientId}
          ></Input>
          <Input
            type="text"
            name="Email"
            label="Email"
            disabled={true}
            value={email}
          ></Input>
          <Input
            type="password"
            placeholder="Введите пароль"
            label="Пароль"
            value={password}
            onChange={changePassword}
          ></Input>
          <Input
            type="checkbox"
            label="Одобрить"
            inputGroupClassName={css.inputCheck}
            checked={approved}
            onChange={changeApproved}
          ></Input>
          <Button type="submit">Сохранить</Button>
          {errorMessage && <p className={css.errorMessage}>{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};
