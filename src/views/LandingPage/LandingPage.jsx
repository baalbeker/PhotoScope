import { useNavigate } from "react-router-dom";
import CallToActionWithVideo from "../../components/LandingPageComponents/CallToActionWithVideo";
import UserTestimonials from '../../components/LandingPageComponents/UserTestimonials';
import LandingPageNav from '../../components/LandingPageComponents/LandingPageNav'; 
import HowItWorks from '../../components/LandingPageComponents/HowItWorks';
import LandingPageFooter from '../../components/LandingPageComponents/LandingPageFooter'
import About from "../About/About"

/**
 * Renders the LandingPage component.
 */
const LandingPage = () => {
    const navigate = useNavigate();

    const navigateToLogin = () => {
        navigate("/login");
    };

    return (
        <div>
            <LandingPageNav /> 
            <div id="home">
              <CallToActionWithVideo onGetStartedClick={navigateToLogin} />
            </div>
            <div id="our-users">
              <UserTestimonials />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="howItWorks">
              <HowItWorks onGetStartedClick={navigateToLogin}/>
            </div>
            <div>
              <LandingPageFooter />
            </div>
        </div>
    );
};

export default LandingPage;