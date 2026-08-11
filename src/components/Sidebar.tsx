import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

function Sidebar({ isOpen }: { isOpen: boolean }) {
  const { t } = useTranslation(["profile", "common"]);
  const context = useContext(AuthContext);
  if (!context) throw new Error("Cannot Use AuthContext");
  const { logout } = context;

  return (
    <aside
      id="sidebar"
      className={`sticky top-[50px] h-[calc(100vh-50px)] col-span-1 bg-yellow-100
      ${isOpen ? "w-64 sm:opacity-100" : "w-0 opacity-0"}
      sm:w-64 sm:opacity-100
      flex flex-col border-x border-gray-200 shadow-sm
      overflow-hidden transition-all duration-400 ease-in-out`}
    >
      <div className="text-lg font-semibold text-gray-800 text-center border-b-1 border-gray-400 w-full p-2">
        {t("profile:title")}
      </div>

      <ul className="flex flex-col mt-4 flex-1 py-4 px-2 gap-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block p-2 cursor-pointer transition-colors duration-500 rounded-lg hover:bg-yellow-200 hover:text-yellow-900 ${
                isActive ? "bg-yellow-200 text-yellow-900" : "active:scale-95"
              }`
            }
          >
            {t("profile:profile")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/add_post"}
            className={({ isActive }) =>
              `block p-2 cursor-pointer transition-colors duration-500 rounded-lg hover:bg-yellow-200 hover:text-yellow-900 ${
                isActive ? "bg-yellow-200 text-yellow-900" : "active:scale-95"
              }`
            }
          >
            {t("profile:posts.add")}
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/add_todo"}
            className={({ isActive }) =>
              `block p-2 cursor-pointer transition-colors duration-500 rounded-lg hover:bg-yellow-200 hover:text-yellow-900 ${
                isActive ? "bg-yellow-200 text-yellow-900" : "active:scale-95"
              }`
            }
          >
            {t("profile:todos.add")}
          </NavLink>
        </li>
        <li className="mt-auto before:content-[''] before:block before:w-full before:h-px before:bg-gray-400 before:mb-4">
          <button
            type="button"
            className="cursor-pointer text-red-500 hover:text-red-600 hover:bg-red-100 transition-colors duration-300 p-1 rounded-lg active:scale-95"
            onClick={logout}
          >
            {t("common:logout")}
          </button>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
