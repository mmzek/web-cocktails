import { useEffect, useState } from "react";
import firstHeroDrink from "../assets/firstDrink.png";
import secondHeroDrink from "../assets/secondDrink.png";
import thirdHeroDrink from "../assets/thirdDrink.png";

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const images = [firstHeroDrink, secondHeroDrink, thirdHeroDrink, firstHeroDrink];

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  useEffect(() => {
    if (currentIndex === images.length - 1) {
      const transitionTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700);
      return () => clearTimeout(transitionTimeout);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full overflow-hidden h-[100vh] bg-black">
      <div
        className={`m-20 flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((cocktail, idx) => (
          <div key={idx} className="w-full flex-shrink-0 h-[90vh]">
            <img
              src={cocktail}
              alt={cocktail}
              className="h-[90vh] w-[90vh] m-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
