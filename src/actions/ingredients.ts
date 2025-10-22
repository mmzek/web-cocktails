export interface Ingredient {
  id: number;
  name: string;
  description: string;
  alcohol: boolean;
  type: string;
  percentage: number;
  imageUrl: string;
}

export interface Details {
  id: number;
  name: string;
  category: string;
  description: string;
  glass: string;
  instructions: string;
  imageUrl: string;
  alcoholic: boolean;
  ingredients: Ingredient[];
}

export async function getCocktailDetails(id: number): Promise<Details | null> {
  const url = import.meta.env.VITE_COCKTAILS_API;
  try {
    const response = await fetch(`${url}${id}`);
    const result = await response.json();
    console.log("result", result);

    if (!response.ok) {
      console.error("Failed to fetch cocktail details");
      return null;
    }

    const data = result.data;

    if (!data) {
      console.error("No data returned from API");
      return null;
    }

    const details: Details = {
      id: data.id,
      name: data.name,
      category: data.category,
      description: data.description,
      glass: data.glass,
      instructions: data.instructions,
      imageUrl: data.imageUrl,
      alcoholic: data.alcoholic,
      ingredients: data.ingredients.map((ing: Ingredient) => ({
        id: ing.id,
        name: ing.name,
        description: ing.description,
        alcohol: ing.alcohol,
        type: ing.type,
        percentage: ing.percentage,
        imageUrl: ing.imageUrl,
      })),
    };

    return details;
  } catch (err) {
    console.error("Query error:", err);
    return null;
  }
}
