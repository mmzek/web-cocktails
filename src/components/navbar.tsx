import {Button} from "../components/ui/button";
import "../globals.css"
import CocktailIcon from "../assets/cocktail.svg";

export default function Navbar(){
    const categories = [ "Cocktail", "Ordinary Drink", "Party Drink", "Shake", "Homemade Liqueur", "Soft Drink" ];
    return (
        <div className="fixed inset-x-0 top-0 z-999 h-15 bg-black/50 backdrop-blur-[12px]">
            <img className="absolute w-8 h-8 mx-4 mt-4" src={CocktailIcon} alt="cocktail icon"/>
            <h1 className="text-white text-2xl inline-block pl-14 pr-10 font-medium">Coktails</h1>
            {categories.map((data, idx) => (
            <div key={idx}className="pl-4 pt-4 inline-block">
             <Button variant="ghost" className="text-white text-md">
                {data}
            </Button>
            </div>
        ))}
        </div>
    )
}
