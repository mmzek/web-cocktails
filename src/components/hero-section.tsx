import firstHeroDrink from "../assets/firstDrink.png";
import secondHeroDrink from "../assets/secondDrink.png";
import thirdHeroDrink from "../assets/thirdDrink.png";
import "./hero-section.css";

const images = [
  firstHeroDrink,
  secondHeroDrink,
  thirdHeroDrink,
  firstHeroDrink,
];

function HeroSection() {
  return (
    <div className="pt-[10vh] w-full overflow-hidden bg-black h-100vh">
      <div className="animation">
        {images.map((cocktail, idx) => (
          <div key={idx} className="image-parent">
            <img src={cocktail} alt={cocktail} className="hero-image" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
