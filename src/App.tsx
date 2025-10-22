import { Routes, Route } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import HeroSection from "./components/hero-section";
import CocktailsList from "./components/cocktails-list";
import Description from "./components/description";
import lottie from "lottie-web";
import { useCocktailsByCategory } from "./hooks/use-cocktails";
import { useCategories } from "./hooks/use-categories";
export default function App() {
  const { categories } = useCategories();
  const { loading, cocktailsByCategory } = useCocktailsByCategory(categories);
  const container = useRef<HTMLDivElement | null>(null);
  const [anim, setAnim] = useState(true);

  useEffect(() => {
    if (!container.current) return;

    const animation = lottie.loadAnimation({
      container: container?.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/Cheers!.json",
    });
    const timer = setTimeout(() => setAnim(false), 3000);

    return () => {
      animation.destroy();
      clearTimeout(timer);
    };
  }, []);

  const showAnimation = loading || anim;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            {showAnimation ? (
              <div className="fixed inset-0 flex items-center justify-center bg-black">
                <div ref={container} className="w-1/4" />
              </div>
            ) : (
              <>
                {" "}
                <Navbar cocktailsByCategory={cocktailsByCategory}/>
                <HeroSection />
                <CocktailsList
                  categories={categories}
                  cocktailsByCategory={cocktailsByCategory}
                  loading={loading}
                />{" "}
              </>
            )}
          </>
        }
      />
      <Route path="/description/:id" element={<Description />} />
    </Routes>
  );
}
