import { type Cocktail } from "../actions/cocktails";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import binIcon from "../assets/bin-icon.svg";

export function useFavourites() {
  const queryClient = useQueryClient();

  const { data: favourites = [] } = useQuery({
    queryKey: ["favouritesIds"],
    queryFn: () => [],
    initialData: [] as number[],
  });

  const toggle = (id: number) => {
    queryClient.setQueryData<number[]>(["favouritesIds"], (old = []) =>
      old.includes(id) ? old.filter((x) => x !== id) : [...old, id],
    );
  };

  return { favourites, toggle };
}

type FavouritesProps = {
  cocktailsByCategory: Record<string, Cocktail[]>;
};

export default function Favourites({ cocktailsByCategory }: FavouritesProps) {
  const navigate = useNavigate();
  const { favourites, toggle } = useFavourites();
  const allCocktails = Object.values(cocktailsByCategory).flat();
  const favouriteCocktails = allCocktails.filter((cocktail) =>
    favourites.includes(cocktail.id),
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
                className="cursor-pointer bg-gray-100 rounded-2xl "
                onClick={() => navigate(`/description/${cocktail.id}`)}
              >
                <div className="inline-block overflow-hidden rounded-t-2xl ">
                  <img
                    src={cocktail.imageUrl}
                    alt={cocktail.name}
                    className="hover:scale-120 duration-500 transition-transform"
                  />
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex flex-col">
                    <h3 className="font-medium text-gray-600 text-sm">
                      {cocktail.category}
                    </h3>
                    <Button variant="link" className="p-0 text-lg font-medium">
                      {cocktail.name}
                    </Button>
                  </div>

                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center bg-gray-300 hover:bg-gray-400 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(cocktail.id);
                    }}
                  >
                    <img className="h-6 w-6" src={binIcon} alt="bin icon" />
                  </div>
                </div>
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
