import { useEffect, useState } from "react";

//placeholders for now
import drugiImg from "../assets/drugi.png";
import trzeciImg from "../assets/trzeci.png";
import czwartyImg from "../assets/czwarty.png";
const images = [drugiImg, trzeciImg, czwartyImg];

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const extendedImages = [...images, images[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex === extendedImages.length - 1) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 700); 

      return () => clearTimeout(timeout);
    } else {
      setIsTransitioning(true);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden h-[80vh] bg-black">
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {extendedImages.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0 h-[80vh]">
            <img
              src={img}
              alt={`Slide ${idx + 1}`}
              className="h-[80vh] w-[80vh] m-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
