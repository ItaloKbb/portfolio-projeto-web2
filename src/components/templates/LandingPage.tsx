import React from 'react';
import HeroSection from "../molecules/HeroSection";
import Services from "../molecules/Services";
import CallAction from "../molecules/CallAction";
import Contact from "../molecules/Contact";
import { User } from "../../types/User";

interface LandingPageProps {
  users: User[];
}

const LandingPage: React.FC<LandingPageProps> = ({ users }) => {
  return (
    <div className="index-page">
      <main className="main">
        <HeroSection users={users}/>
        <Services users={users}/>
        <CallAction />
        <Contact />
      </main>
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
};

export default LandingPage;