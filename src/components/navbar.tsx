import { Button } from "../components/ui/button";
import "../globals.css";
import CocktailIcon from "../assets/cocktail.svg";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { type Cocktail } from "../actions/cocktails";
import { useNavigate } from "react-router-dom";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../components/ui/input-group";
import { Drawer, DrawerContent } from "../components/ui/drawer";
import { DialogTitle } from "@radix-ui/react-dialog";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 880);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

interface NavbarProps {
  cocktailsByCategory: Record<string, Cocktail[]>;
}

export default function Navbar({ cocktailsByCategory }: NavbarProps) {
  const categories = ["Cocktail", "Ordinary Drink", "Party Drink", "Shake"];
  const isMobile = useIsMobile();
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  function scrollToCategory(category: string) {
    document
      .getElementById(category)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  const [searchItem, setSearchItem] = useState("");
  const [filtered, setFiltered] = useState<Cocktail[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    console.log("cocktailsByCategory:", cocktailsByCategory);
    const allCocktails = Object.values(cocktailsByCategory).flat();
    console.log("all ocktails", allCocktails);
    const filteredData = allCocktails.filter((data) =>
      data.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFiltered(filteredData);
    setOpenDrawer(true);
    console.log(filteredData);
  };

  return (
    <div className="fixed inset-x-0 h-15 top-0 z-999 w-full bg-black/50 backdrop-blur-[12px]">
      <img
        className="absolute w-8 h-8 m-4"
        src={CocktailIcon}
        alt="cocktail icon"
      />
      {!isMobile && (
        <>
          {" "}
          <h1 className="text-white text-2xl inline-block px-14 font-medium">
            Coktails
          </h1>
          {categories.map((data, idx) => (
            <div key={idx} className="pl-4 pt-4 inline-block">
              <Button
                variant="ghost"
                className="text-white text-md"
                onClick={() => scrollToCategory(data)}
              >
                {data}
              </Button>
            </div>
          ))}{" "}
        </>
      )}
      <div className="md:w-1/5 sm:w-1/2 inline-block absolute right-5 top-3">
        <InputGroup className="bg-transparent border-transparent">
          <InputGroupInput
            onChange={handleInputChange}
            value={searchItem}
            className="text-white"
            placeholder="Search..."
          />
          <InputGroupAddon>
            <Search className="text-white" />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              onClick={() => setOpenDrawer(true)}
              className="text-white"
            >
              Search
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>{" "}
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer} direction="top">
        <DialogTitle></DialogTitle>
        <DrawerContent className="pt-15 bg-black/30 backdrop-blur-[12px]">
          <ul className="max-h-50vh overflow-y-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-black m-10">
            {filtered?.map((data) => (
              <div
                key={data.id}
                className="flex items-center p-2 my-1 mx-10 rounded-xl"
                onClick={() => navigate(`/description/${data.id}`)}
              >
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <span className="text-white text-xl ml-4">{data.name}</span>
              </div>
            ))}
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
