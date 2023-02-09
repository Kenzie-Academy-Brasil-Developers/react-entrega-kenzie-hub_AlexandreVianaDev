import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Input from "../../components/Input";
import logo from "../../assets/images/logo.svg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import api from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import formSchema from "./validations";
import LinkSmall from "../../components/LinkSmall";
import StyledRegister from "./style";
import Header from "../../components/Header";

const Register = () => {
  const [disabled, setDisabled] = useState(false);

  const token = localStorage.getItem("@TOKEN") || "";
  const userID = localStorage.getItem("@USERID") || "";

  useEffect(() => {
    token.length > 0 ? navigate("/dashboard") : null;
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmitFunction = (data) => {
    console.log(data);
    const registerUser = async () => {
      try {
        const response = await api.post("/users", data);
        console.log(response);
        navigate("/login");
        toast.success("Cadastro realizado com sucesso");
      } catch (error) {
        error.response.data.message === "Email already exists" ? toast.error("Email já existe") : (null)
      } finally {
      }
    };
    registerUser();
  };

  return (
    <StyledRegister className="container">
      <Header>
        <img src={logo} alt="Kenzie Hub" />
        <LinkSmall to={"/login"}>Voltar</LinkSmall>
      </Header>
      <main>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h2 className="title-1">Crie sua conta</h2>
            <p className="headline text-center">Rapido e grátis, vamos nessa</p>
            <label htmlFor="name">Nome</label>
            <input
              label="Nome"
              type="text"
              placeholder="Digite aqui seu nome"
              id="name"
              {...register("name")}
            />
            <p className="field__error">{errors.name?.message}</p>
            <label htmlFor="email">Email</label>
            <input
              label="Email"
              type="text"
              placeholder="Digite aqui seu email"
              id="email"
              {...register("email")}
            />
            <p className="field__error">{errors.email?.message}</p>
            <label htmlFor="password">Senha</label>
            <input
              label="Senha"
              type="password"
              placeholder="Digite aqui sua senha"
              id="password"
              {...register("password")}
            />
            <p className="field__error">{errors.password?.message}</p>
            <label htmlFor="confirmPassword">Confirmar senha</label>
            <input
              label="Confirmar Senha"
              type="password"
              placeholder="Digite aqui sua senha"
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            <p className="field__error">{errors.confirmPassword?.message}</p>
            <label htmlFor="bio">Bio</label>
            <input
              label="Bio"
              type="text"
              placeholder="Fale sobre você"
              id="bio"
              {...register("bio")}
            />
            <p className="field__error">{errors.bio?.message}</p>
            <label htmlFor="contact">Contato</label>
            <input
              label="Contato"
              type="text"
              placeholder="Opção de contato"
              id="contact"
              {...register("contact")}
            />
            <p className="field__error">{errors.contact?.message}</p>
            <label htmlFor="course_module">Selecionar módulo</label>
            <div className="select__container">
              <select
                label="Selecionar módulo"
                type="text"
                placeholder="Digite aqui seu nome"
                id="course_module"
                {...register("course_module")}
              >
                <option value="Primeiro módulo (Introdução ao Frontend)">
                  Primeiro Módulo
                </option>
                <option value="Segundo módulo (Frontend Avançado)">
                  Segundo Módulo
                </option>
                <option value="Terceiro módulo (Introdução ao Backend)">
                  Terceiro Módulo
                </option>
                <option value="Quarto módulo (Backend Avançado)">
                  Quarto Módulo
                </option>
              </select>
              <p className="field__error">{errors.course_module?.message}</p>
            </div>
            <Button disabled={disabled}>Cadastrar</Button>
          </form>
      </main>
    </StyledRegister>
  );
};

export default Register;
