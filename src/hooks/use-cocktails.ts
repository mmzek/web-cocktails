import { useEffect, useState } from "react";
import { getCocktails, type Cocktail } from "../actions/cocktails";

export function useCocktailsByCategory(categories: string[]) {
  const [cocktailsByCategory, setCocktailsByCategory] = useState<
    Record<string, Cocktail[]>
  >({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSequentially() {
      setLoading(true);
      const newData: Record<string, Cocktail[]> = {};

      for (const category of categories) {
        const data = await getCocktails(category);
        if (data) {
          newData[category] = data;
          setCocktailsByCategory({ ...newData });
        }
      }
      setLoading(false);
    }
    if (categories.length > 0) {
      loadSequentially();
    }
  }, [categories]);

  return { cocktailsByCategory, loading };
}
