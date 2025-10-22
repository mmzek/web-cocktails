import { useEffect, useState } from "react";
import { getCocktails, type Cocktail } from "../actions/cocktails";
import { useQueries } from "@tanstack/react-query";

export function useCocktailsByCategory(categories: string[]) {
  const queries = useQueries({
    queries: categories.map((category) => ({
      queryKey: ["cocktails", category],
      queryFn: () => getCocktails(category),
      enabled: !!category,
    })),
  });

  const cocktailsByCategory: Record<string, Cocktail[]> = {};
  queries.forEach((q, i) => {
    if (q.data) {
      cocktailsByCategory[categories[i]] = q.data;
    }
  });

  const loading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);

  return { cocktailsByCategory, loading, isError };
}
