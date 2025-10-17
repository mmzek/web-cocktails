import {Button} from "../components/ui/button";
import { useCocktails } from "../hooks/use-cocktails";

export default function CocktailsList(){
  const { cocktails} = useCocktails();
  
  return (
    <div className="pt-20 pb-20">
    <div className="grid grid-cols-4 place-items-center gap-y-20">
    {cocktails.map((cocktail, idx) => (
          <div key={idx} className="w-4/5 h-100 bg-gray-100 z-100 rounded-b-2xl">
            <img
              src={cocktail.imageUrl}
              alt={cocktail.name}
              className="w-full z-101 rounded-t-2xl"
            />
            <h3 className="mt-4 mx-6 font-medium text-gray-600 text-sm">{cocktail.category}</h3>
            <Button variant="link" className="mx-2 font-medium text-lg">{cocktail.name}{cocktail.id}</Button>
          </div>
        ))}
    </div>
    </div>
  )
}