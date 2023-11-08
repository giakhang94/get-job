import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard';
import { SmallSidebar, BigSidebar, Navbar } from '../components';
import { createContext, useContext, useEffect, useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';

const DashboardContext = createContext();
//useLoader
export const doashboardLoader = async () => {
    try {
        const { data } = await customFetch.get('/user/current-user');
        return data.currentUser;
    } catch (error) {
        console.log(error);
        return redirect('/');
    }
};

// eslint-disable-next-line react/prop-types
const DashboardLayout = ({ getDarkTheme }) => {
    const user = useLoaderData();
    const navigator = useNavigate();
    const [showSidebar, setShowSidebar] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(getDarkTheme);
    const toggleDarkTheme = () => {
        // const newDarkTheme = !isDarkTheme;
        localStorage.setItem('darkTheme', !isDarkTheme);
        setIsDarkTheme(!isDarkTheme);
        document.body.classList.toggle('dark-theme');
    };
    useEffect(() => {
        if (getDarkTheme) {
            document.body.classList.add('dark-theme');
        }
        setIsDarkTheme(getDarkTheme);
    }, [getDarkTheme]);
    const toggleSideBar = () => {
        setShowSidebar(!showSidebar);
    };
    const logoutUser = async () => {
        console.log('logout user');
        try {
            const { data } = await customFetch('user/logout');
            toast.info(data.message);
            navigator('/');
        } catch (error) {
            toast.error(error?.reponse.data.message);
        }
    };

    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                isDarkTheme,
                toggleDarkTheme,
                toggleSideBar,
                logoutUser,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div className="dashboard-content">
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet context={{ user }} />
                        </div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};
export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
