import Wrapper from '../assets/wrappers/LogoutContainer';
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
const LogoutContainer = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    const toggleShowDrop = () => {
        setShowDropDown(!showDropDown);
    };
    return (
        <Wrapper>
            <button type="button" className="logout-btn btn " onClick={toggleShowDrop}>
                {user.avatar ? (
                    <img src={user.avatar} alt="avat" className="img" />
                ) : (
                    <span>
                        <FaUserCircle />
                    </span>
                )}
                {user?.name}
                <span className="">
                    <FaCaretDown />
                </span>
            </button>
            <div className={showDropDown ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type="button" className="dropdown-btn" onClick={logoutUser}>
                    Logout
                </button>
            </div>
        </Wrapper>
    );
};
export default LogoutContainer;
