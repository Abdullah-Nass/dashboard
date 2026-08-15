import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import LanguageSwitcher from "../components/LanguageSwitcher";
import SubmitButton from "../components/SubmitButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
const loginSchema = z.object({
  username: z.string().min(1, "login.empty_username"),
  password: z.string().min(1, "login.empty_password"),
});

type LoginFormData = z.infer<typeof loginSchema>;

function Login() {
  const { t } = useTranslation("auth");
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot use AuthContext");
  const navigate = useNavigate();
  const [seePass, setSeePass] = useState<boolean>(false);
  const { loginUser, isAuthenticated } = context;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    document.title = t("login.submit");
  }, [t]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      await loginUser(data.username.trim(), data.password.trim());
    },
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      setError("root", {
        message: t("login.invalid_fields"),
      });
    },
  });
  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  if (isAuthenticated) return <Navigate to="/" />;
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute top-5 start-5 z-50">
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Form */}
          <div className="flex flex-col justify-center ">
            {errors.root && (
              <div className="text-red-500 font-bold text-center">
                {errors.root.message}
              </div>
            )}
            <div className="flex flex-col justify-center items-center gap-10 p-4">
              <div className="text-center font-semibold text-2xl ">
                {t("login.login_title")}
              </div>
              <form
                method="POST"
                className="flex flex-col gap-3 items-center w-72"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 ">
                    <label htmlFor="username">{t("login.username")}</label>
                    <div className="flex items-center gap-2 px-4 py-2 m-auto w-full shadow-md rounded-lg focus-within:ring-2 focus-within:ring-yellow-200 ">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-gray-500"
                      />
                      <input
                        type="text"
                        id="username"
                        {...register("username")}
                        placeholder={t("login.username_plch")}
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                    {errors.username && (
                      <div className="text-red-500 font-bold">
                        {t(errors.username.message as "login.empty_username")}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="password">{t("login.password")}</label>

                    <div className="flex items-center gap-2 px-4 py-2 m-auto w-full shadow-md rounded-lg focus-within:ring-2 focus-within:ring-yellow-200 ">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="text-gray-500"
                      />
                      <input
                        type={seePass ? "text" : "password"}
                        id="password"
                        {...register("password")}
                        placeholder={t("login.password_plch")}
                        className="w-full bg-transparent outline-none"
                      />
                      <FontAwesomeIcon
                        id="eyeIcon"
                        icon={faEye}
                        onClick={() => {
                          setSeePass((prev) => !prev);
                        }}
                        className={`${seePass ? "text-gray-600" : "text-gray-400"}`}
                      />
                    </div>
                    {errors.password && (
                      <div className="text-red-500 font-bold">
                        {t(errors.password.message as "login.empty_password")}
                      </div>
                    )}
                  </div>
                </div>
                <SubmitButton
                  disabled={loginMutation.isPending}
                  content={
                    loginMutation.isPending
                      ? t("login.loading")
                      : t("login.submit")
                  }
                />
              </form>
              <a
                href="https://dummyjson.com/users"
                rel="noopener noreferrer"
                target="_blank"
                className="transition hover:underline hover:text-yellow-600"
              >
                {t("login.users_list")}
              </a>
            </div>
          </div>

          {/* side */}
          <div className="bg-yellow-100 hidden lg:flex flex-col justify-center gap-8 p-5 rounded-md ring-2">
            <div className="text-4xl text-gray-900 font-bold">
              {t("login.side.title")}
            </div>
            <div className="text-gray-700 leading-loose indent-4">
              {t("login.side.body")}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
