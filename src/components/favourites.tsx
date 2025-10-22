import { type Cocktail } from "../actions/cocktails";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

type FavouritesProps = {
  favouritesTable: number[];
  cocktailsByCategory: Record<string, Cocktail[]>;
};

export default function Favourites({
  favouritesTable,
  cocktailsByCategory,
}: FavouritesProps) {
  const navigate = useNavigate();
  const allCocktails = Object.values(cocktailsByCategory).flat();
  const favouriteCocktails = allCocktails.filter((cocktail) =>
    favouritesTable.includes(cocktail.id),
  );

  return (
    <div>
      {favouriteCocktails.length > 0 ? (
        <div>
          {" "}
          <h1 className="text-gray-900 text-6xl font-medium md:mx-30 sm:mx-20 my-10 animation-appear">
            Favourites
          </h1>
          <div className="m-30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4 p-4">
            {favouriteCocktails.map((cocktail) => (
              <div
                key={cocktail.id}
                className=" bg-gray-100 rounded-2xl "
                onClick={() => navigate(`/description/${cocktail.id}`)}
              >
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
            ))}{" "}
          </div>
        </div>
      ) : (
        <p className="text-gray-900 text-6xl font-medium text-center col-span-2">
          No favourites yet!
        </p>
      )}
    </div>
  );
}
