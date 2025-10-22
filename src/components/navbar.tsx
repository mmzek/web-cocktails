import {Button} from "../components/ui/button";
import "../globals.css"
import CocktailIcon from "../assets/cocktail.svg";
import { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area";
import { Search } from "lucide-react"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../components/ui/input-group"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}


export default function Navbar(){
     const categories = [ "Cocktail", "Ordinary Drink", "Party Drink", "Shake", "Homemade Liqueur", "Soft Drink" ];
    const isMobile = useIsMobile();
    
    function scrollToCategory(category: string){
        document.getElementById(category)?.scrollIntoView({ behavior: "smooth", block: "center"});
    }

    return (
        <div className="fixed inset-x-0 top-0 z-999 h-15 w-full bg-black/50 backdrop-blur-[12px]">
            <img className="absolute w-8 h-8 m-4" src={CocktailIcon} alt="cocktail icon"/>
            {!isMobile && <h1 className="text-white text-2xl inline-block px-14 font-medium">Coktails</h1>}
            {isMobile && <div className="ml-20 mt-5 w-full"><ScrollArea> <div className="flex w-max space-x-4"> {categories.map((data) => (
             <Button variant="ghost" className="text-white text-md" onClick={()=> scrollToCategory(data)}>
                {data}
            </Button>
        ))}  </div> <ScrollBar orientation="horizontal" /> </ScrollArea></div>}
            {!isMobile && <>
            {categories.map((data, idx) => (
            <div key={idx}className="pl-4 pt-4 inline-block">
             <Button variant="ghost" className="text-white text-md" onClick={()=> scrollToCategory(data)}>
                {data}
            </Button>
            </div>
        )) }
        <div className="w-1/5 inline-block absolute right-10 top-2"><InputGroup className="bg-transparent border-transparent">
  <InputGroupInput className="text-white" placeholder="Search..." />
  <InputGroupAddon>
    <Search className="text-white"/>
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupButton className="text-white">Search</InputGroupButton>
  </InputGroupAddon>
</InputGroup>
</div> </>
        }
        </div>
    )
}
