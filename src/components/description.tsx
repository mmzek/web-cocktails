import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { getCocktailDetails, type Details } from "../actions/ingredients";
import { useState, useEffect } from "react";
import Ingredients from "./ingredients";
import "../globals.css";
import car from "../assets/car.svg";
import attention from "../assets/attention.svg";
import glass from "../assets/glass.svg";
import { Button } from "./ui/button";
import whiteHeart from "../assets/white-heart.svg";
import redHeart from "../assets/red-heart.svg";
import { useNavigate } from "react-router-dom";

type DescriptionProps = {
  setFavouritesTable: React.Dispatch<React.SetStateAction<number[]>>;
  favouritesTable: number[];
};

export default function Description({
  setFavouritesTable,
  favouritesTable,
}: DescriptionProps) {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<Details | null>(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getCocktailDetails(Number(id)).then(setDetails);
    }
  }, [id]);

  useEffect(() => {
    if (details?.id) {
      setIsFavourite(favouritesTable.includes(details.id));
    }
  }, [details, favouritesTable]);

  function toggleFavourite(drinkId: number) {
    setIsFavourite((prev) => !prev);
    setFavouritesTable((prev) => {
      if (prev.includes(drinkId)) {
        return prev.filter((favId) => favId !== drinkId);
      } else {
        return [...prev, drinkId];
      }
    });
  }

  return (
    <div>
      <div
        className="fixed bottom-4 right-4 w-12 h-12 rounded-xl bg-gray-500 flex items-center justify-center shadow-lg"
        onClick={() => navigate(`/favourites`)}
      >
        <img src={whiteHeart} alt="heart icon" className="w-5 h-5" />
      </div>
      <div className="mx-6 my-10 flex flex-col md:flex-row items-start gap-8 md:mx-30 md:my-15">
        <div className="md:w-3/5 sm:w-full inline-block overflow-hidden rounded-2xl">
          <img
            src={details?.imageUrl}
            alt="drink image"
            className="hover:scale-120 duration-500 transition-transform w-full animation-appear"
          ></img>
        </div>
        <div className="md:w-2/5 md:ml-15 sm:w-full">
          <h1 className="text-gray-900 text-6xl font-medium">
            {details?.name}
          </h1>
          <h2 className="text-gray-600 mt-4 font-bold text-xl mb-6">
            {details?.category}
          </h2>
          {details?.ingredients.map((data, idx) => (
            <Badge
              variant="secondary"
              key={idx}
              className="mr-4 mb-2 border-1 section-color font-mono"
            >
              {data.name}
            </Badge>
          ))}
          {details?.instructions && (
            <h3 className="text-gray-900 text-2xl font-medium mt-6 mb-2">
              How can I make one?
            </h3>
          )}
          <p className="text-gray-900 text-lg">{details?.instructions}</p>
          {details?.glass && (
            <div className="flex items-center gap-8 mt-10">
              <img src={glass} alt="glass icon" className="w-12 h-12" />
              <h3 className="text-gray-900 text-xl font-medium mb-2">
                {details.glass}
              </h3>
            </div>
          )}
          {details?.alcoholic == true && (
            <div className="flex items-center gap-8 mt-10">
              <img src={attention} alt="attention sign" className="w-12 h-12" />
              <h3 className="text-gray-900 text-xl font-medium mb-2">
                This beverage contains alcohol. <br /> Please enjoy responsibly!
              </h3>
            </div>
          )}
          {details?.alcoholic == false && (
            <div className="flex items-center gap-8 mt-10">
              <img src={car} alt="car icon" className=" w-12 h-12" />
              <h3 className="text-gray-900 text-xl font-medium mb-2">
                This drink is completely alcohol-free. <br /> Enjoy the full
                flavour without compromise!
              </h3>
            </div>
          )}
          <div className="flex justify-center">
            <Button
              variant="secondary"
              className="section-color h-10 m-10"
              onClick={() =>
                details?.id !== undefined && toggleFavourite(details.id)
              }
            >
              {" "}
              {isFavourite ? (
                <img src={redHeart} alt="heart icon" className=" w-6 h-6" />
              ) : (
                <img src={whiteHeart} alt="heart icon" className=" w-6 h-6" />
              )}
              Add to favourites
            </Button>
          </div>
        </div>
      </div>
      <Ingredients details={details} />
    </div>
  );
}
