import { useEffect, useState } from "react";
import { useCocktails } from "../hooks/use-cocktails";

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [images, setImages] = useState<string[]>([]);
const { cocktails } = useCocktails();
const ids = [11053, 12474, 12256];

useEffect(() => {
  if (cocktails.length > 0) {
    const chosen = cocktails.filter(c => ids.includes(Number(c.id)));
    setImages(chosen.map(c => c.imageUrl));
  }
}, [cocktails]);
 console.log(images)
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
    <div className="relative w-full overflow-hidden h-[100vh] bg-black">
      <div
        className={`m-20 flex ${isTransitioning ? "transition-transform duration-700 ease-in-out" : ""}`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {extendedImages.map((cocktail, idx) => (
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
