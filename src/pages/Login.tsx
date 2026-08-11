import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/Loading";
import LanguageSwitcher from "../components/LanguageSwitcher";
import SubmitButton from "../components/SubmitButton";

function Login() {
  const { t } = useTranslation("auth");
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot use AuthContext");
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [seePass, setSeePass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { loginUser, isAuthenticated } = context;

  useEffect(() => {
    document.title = t("login.submit");
  }, [t]);
  const handleLogin: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!username || !password) {
      setError(t("login.empty_fields"));
      setLoading(false);

      return;
    }
    try {
      await loginUser(username, password);

      return navigate("/");
    } catch {
      setError(t("login.invalid_fields"));
    } finally {
      setLoading(false);
    }
  };
  if (isAuthenticated) return <Navigate to="/" />;
  if (loading) return <Loading />;
  return (
    <>
      <div className="relative h-screen">
        <div className="absolute top-5 start-5 z-50">
          <LanguageSwitcher />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
          {/* Form */}
          <div className="flex flex-col justify-center ">
            {error && (
              <div className="text-red-500 font-bold text-center">{error}</div>
            )}
            <div className="flex flex-col justify-center items-center gap-10 p-4">
              <div className="text-center font-semibold text-2xl ">
                {t("login.login_title")}
              </div>
              <form
                onSubmit={handleLogin}
                method="POST"
                className="flex flex-col gap-3 items-center w-72"
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
                        name="username"
                        value={username}
                        onChange={(e) => {
                          const content = e.target.value;
                          setUsername(content);
                          setError("");
                        }}
                        placeholder={t("login.username_plch")}
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
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
                        name="password"
                        value={password}
                        onChange={(e) => {
                          const content = e.target.value;
                          setPassword(content);
                          setSeePass(false);
                          setError("");
                        }}
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
                  </div>
                </div>
                <div className="w-full bg-red-100 ">
                  <SubmitButton content={t("login.submit")} />
                </div>
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
