import { useEffect, useState } from "react";
import { getCategories } from "../actions/categories";

export function useCategories() {
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    getCategories().then((response) => {
      console.log("data::::", response);
      if (response) setCategories(response.map(String));
    });
  }, []);

  return { categories };
}
