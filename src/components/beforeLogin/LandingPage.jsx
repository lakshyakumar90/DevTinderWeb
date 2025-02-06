import React from "react";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import Footer from "./Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
