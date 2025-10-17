import { useEffect, useState } from "react";
import { getCocktails, type Cocktail } from "../actions/cocktails";

export function useCocktails() {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCocktails().then(data => {
      if (data) setCocktails(data);
      setLoading(false);
    });
  }, []);

  return { cocktails, loading };
}