import { NavLink } from "react-router-dom";
import Wrapper from "../assets/wrappers/SmallSidebar";
import links from "../utils/links.jsx";
import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";
const SmallSidebar = () => {
  const { showSidebar, toggleSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSideBar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>

          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
