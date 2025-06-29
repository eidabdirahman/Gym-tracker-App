import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center px-4"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571019613914-85f342c1d4b2?auto=format&fit=crop&w=1950&q=80')",
      }}
    >
      <div className="bg-white/80 dark:bg-black/80 p-6 sm:p-8 rounded-lg shadow-lg transition-colors">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-3 text-yellow-600 dark:text-yellow-400">
          Train Hard. Stay Strong.
        </h1>
        <p className="text-base sm:text-xl mb-5 text-yellow-700 dark:text-yellow-300">
          Track your fitness journey with Lions Gate Gym.
        </p>
        <Link to="/contact">
          <Button className="bg-yellow-400 text-black font-bold hover:bg-yellow-300">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;
