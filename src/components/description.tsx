import { useParams } from "react-router-dom";
import { Badge } from "../components/ui/badge";
import { getCocktailDetails, type Details } from "../actions/ingredients";
import { useState, useEffect } from "react";
import Ingredients from "./ingredients";
import "../globals.css";
import car from "../assets/car.svg";
import attention from "../assets/attention.svg";
import glass from "../assets/glass.svg";

export default function Description() {
  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<Details | null>(null);

  useEffect(() => {
    if (id) {
      getCocktailDetails(Number(id)).then(setDetails);
    }
  }, [id]);

  return (
    <div>
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
        </div>
      </div>
      <Ingredients details={details} />
    </div>
  );
}
