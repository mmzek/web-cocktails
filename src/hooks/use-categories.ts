import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../actions/categories";

export function useCategories() {
  const {
    data: categories = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return { categories, isLoading, isError, error };
}
