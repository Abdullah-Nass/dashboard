import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/logo.png";
import LanguageSwitcher from "./LanguageSwitcher";
function Navbar({ onToggle }: { onToggle: () => void }) {
  return (
    <nav className="bg-yellow-100 h-[50px] px-4 py-3 flex items-center sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        <button
          onClick={onToggle}
          className="sm:invisible flex items-center justify-center
                     w-10 h-10 rounded-lg
                     text-gray-800 hover:bg-yellow-200
                     transition-colors duration-200 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} className="text-xl" />
        </button>
        <img src={logo} alt="Logo" className="max-w-40 object-contain" />
        <LanguageSwitcher />
      </div>
    </nav>
  );
}

export default Navbar;
