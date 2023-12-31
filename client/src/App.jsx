import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Error, HomeLayout, Landing, Login, Register, AddJob, Stats, AllJob, Admin, Profile, EditJob } from './pages';
import DashboardLayout, { doashboardLoader } from './pages/DashboardLayout';
import { registerAction } from './pages/Register';
import { LoginActon } from './pages/Login';
import { AddJobAction } from './pages/AddJob';
import { loaderAllJobs } from './pages/AllJob';
import { EditJobAction, EditJobLoader } from './pages/EditJob';
import deleteJobAction from './pages/DeleteJob';
import { StatsLoader } from './pages/Admin';
import { profileAction } from './pages/Profile';
import { LandingPageLoader } from './pages/Landing';
import { statsLoader } from './pages/Stats';
let getDarkTheme = true;
const theme = localStorage.getItem('darkTheme');
if (!theme) {
    getDarkTheme = true;
} else {
    getDarkTheme = localStorage.getItem('darkTheme') === 'true' ? true : false;
}

if (getDarkTheme) {
    document.body.classList.add('dark-theme');
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
                loader: LandingPageLoader,
            },
            {
                path: 'login',
                element: <Login />,
                action: LoginActon,
            },
            {
                path: 'register',
                element: <Register />,
                action: registerAction,
            },
            {
                path: 'dashboard',
                element: <DashboardLayout getDarkTheme={getDarkTheme} />,
                loader: doashboardLoader,
                children: [
                    {
                        index: true,
                        element: <AddJob />,
                        action: AddJobAction,
                    },
                    {
                        path: 'stats',
                        element: <Stats />,
                        loader: statsLoader,
                    },
                    {
                        path: 'all-jobs',
                        element: <AllJob />,
                        loader: loaderAllJobs,
                    },
                    {
                        path: 'profile',
                        element: <Profile />,
                        action: profileAction,
                    },
                    {
                        path: 'admin',
                        element: <Admin />,
                        loader: StatsLoader,
                    },
                    {
                        path: 'edit-job/:jobId',
                        element: <EditJob />,
                        loader: EditJobLoader,
                        action: EditJobAction,
                    },
                    {
                        path: 'delete-job/:jobId',
                        action: deleteJobAction,
                    },
                ],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};
export default App;
