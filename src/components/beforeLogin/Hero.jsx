import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
         Find. Connect. Chat.
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Find your perfect coding buddy with devTinder
        </p>
        <Link
          to={"/signup"}
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg inline-flex items-center hover:bg-gray-200 transition"
        >
          Get Started
          <ArrowRight className="ml-2" size={20} />
        </Link>
      </div>
    </section>
  );
};

export default Hero;
