import Wrapper from '../assets/wrappers/LandingPage.js';
import main from '../assets/images/main.svg';
import { Link, useLoaderData } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch.js';
export const LandingPageLoader = async () => {
    try {
        const resp = await customFetch('/user/current-user');
        return resp.data.currentUser;
    } catch (error) {
        return null;
    }
};
const Landing = () => {
    const user = useLoaderData();
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1 className="">
                        job <span>tracking</span> app
                    </h1>
                    <p>
                        I am baby tumblr cold-pressed pop-up everyday carry bitters hexagon fixie fashion axe celiac
                        kombucha fam meditation leggings. Wayfarers DSA vinyl ennui blog, bitters pitchfork plaid
                        sartorial literally activated charcoal chillwave vape jean shorts cold-pressed.
                    </p>
                    {user?.role ? (
                        <Link to="/dashboard" className="btn register-link">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="btn register-link">
                                Register
                            </Link>
                            <Link to="/login" className="btn register-link">
                                Login / Demo User
                            </Link>
                        </>
                    )}
                </div>
                <img src={main} alt="job hunt" className="img main-img" />
            </div>
        </Wrapper>
    );
};

export default Landing;
