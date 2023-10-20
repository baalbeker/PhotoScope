import { useNavigate } from "react-router-dom";
import GetStarted from "../../components/LandingPageComponents/GetStarted";
import UserTestimonials from '../../components/LandingPageComponents/UserTestimonials';
import LandingNavigation from '../../components/LandingPageComponents/LandingNavigation'; 
import HowItWorks from '../../components/LandingPageComponents/HowItWorks';
import LandingFooter from '../../components/LandingPageComponents/LandingFooter'
import About from "../../components/LandingPageComponents/About";

const LandingPage = () => {
    const navigate = useNavigate();
    const navigateToLogin = () => navigate("/login");

    return (
        <div>
          <LandingNavigation /> 
          <div id="home">
            <GetStarted onGetStartedClick={navigateToLogin} />
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
            <LandingFooter />
          </div>
        </div>
    );
};

export default LandingPage;