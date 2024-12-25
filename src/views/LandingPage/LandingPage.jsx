import { useNavigate } from "react-router-dom";
import GetStarted from "../../components/LandingPageComponents/GetStarted";
import UserTestimonials from '../../components/LandingPageComponents/UserTestimonials';
import LandingNavigation from '../../components/LandingPageComponents/LandingNavigation';
import LandingFooter from '../../components/LandingPageComponents/LandingFooter';
import About from "../../components/LandingPageComponents/About";

const LandingPage = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => navigate("/login");

    return (
        <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
                <LandingNavigation /> 
            <div id="home" style={{ padding: '0 16px' }}>
                <GetStarted onGetStartedClick={navigateToLogin} />
            </div>
            <div id="our-users" style={{ padding: '0 16px' }}>
                <UserTestimonials />
            </div>
            <div id="about" style={{ padding: '0 16px' }}>
                <About />
            </div>
            <div style={{ padding: '0 16px' }}>
                <LandingFooter />
            </div>
        </div>
    );
};

export default LandingPage;
