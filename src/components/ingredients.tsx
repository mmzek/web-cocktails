import { type Details } from "../actions/ingredients";
import "../globals.css";
interface IngredientsProps {
  details: Details | null;
}

export default function Ingredients({ details }: IngredientsProps) {
  return (
    <div className="w-full py-10">
      <h1 className="text-gray-900 text-6xl font-medium md:mx-30 sm:mx-20 my-10 animation-appear">
        Ingredients
      </h1>
      {details?.ingredients.map((data, idx) => (
        <div
          key={idx}
          className="mx-6 my-10 flex flex-col md:flex-row items-start gap-8 md:mx-30 md:my-15"
        >
          {data.imageUrl != null && (
            <div className="p-5 rounded-2xl section-color sm:w-full md:w-1/3 animation-appear">
              <img
                src={data.imageUrl}
                alt="ingredient img"
                className="w-full"
              />
            </div>
          )}
          {data.imageUrl == null && <div className="md:w-1/3 "></div>}
          <div className="p-2 rounded-2xl section-color sm:w-full md:w-2/3 animation-appear">
            <h2 className="text-gray-900 text-2xl font-medium my-10 text-center">
              {data.name}
            </h2>
            {data.description != null && (
              <p className="p-10 text-justify">{data.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
