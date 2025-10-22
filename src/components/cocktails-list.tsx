import { Button } from "../components/ui/button";
import { type Cocktail } from "../actions/cocktails";
import { useNavigate } from "react-router-dom";
import heart from "../assets/white-heart.svg";

import "../globals.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

type CocktailsListProps = {
  cocktailsByCategory: Record<string, Cocktail[]>;
  loading: boolean;
  categories: string[];
};

export default function CocktailsList({
  cocktailsByCategory,
  loading,
}: CocktailsListProps) {
  const navigate = useNavigate();

  return (
    <div className="pt-10 pb-20 w-9/10 m-auto">
      <div
        className="fixed bottom-4 right-4 w-12 h-12 rounded-xl bg-gray-500 flex items-center justify-center shadow-lg"
        onClick={() => navigate(`/favourites`)}
      >
        <img src={heart} alt="heart icon" className="w-5 h-5" />
      </div>
      {loading && Object.keys(cocktailsByCategory).length === 0 && (
        <p className="text-center text-gray-500">Ładowanie koktajli...</p>
      )}
      {Object.entries(cocktailsByCategory).map(([category, cocktails]) => (
        <div key={category}>
          <h2
            className="animation-slide text-3xl mx-6 mt-30 mb-10 font-bold"
            id={category}
          >
            {category}
          </h2>
          <Carousel className="w-full animation-appear">
            <CarouselContent className="pl-4 ">
              {cocktails.map((cocktail) => (
                <CarouselItem
                  key={cocktail.id}
                  onClick={() => navigate(`/description/${cocktail.id}`)}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4  ml-2"
                >
                  <div className="bg-gray-100 rounded-2xl">
                    <div className="inline-block overflow-hidden rounded-t-2xl ">
                      <img
                        src={cocktail.imageUrl}
                        alt={cocktail.name}
                        className="hover:scale-120 duration-500 transition-transform"
                      />
                    </div>
                    <h3 className="mt-1 mx-6 font-medium text-gray-600 text-sm">
                      {cocktail.category}
                    </h3>
                    <Button variant="link" className="mx-2 font-medium text-lg">
                      {cocktail.name}
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ))}

      {!loading && Object.keys(cocktailsByCategory).length === 0 && (
        <p className="text-center text-gray-500">
          Brak danych do wyświetlenia.
        </p>
      )}
    </div>
  );
}
