export interface Cocktail{
    id: number,
    name: string,
    category: string,
    glass: string, 
    instructions: string,
    imageUrl: string
    alcoholic: string
}
export async function getCocktails(): Promise<Cocktail[] | null>{
    const url = import.meta.env.VITE_COCKTAILS_API;
    let page = 1;
    let lastPage = 1;
   const all: Cocktail[] = [];

  try {
    while (page <= lastPage) {
      const response = await fetch(`${url}?page=${page}`);
      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch page", page);
        break;
      }
    const cocktails: Cocktail[] = result.data.map((data: any) => ({
      id: data.id,
      name: data.name,
      category: data.category,
      glass: data.glass,
      instructions: data.instructions,
      imageUrl: data.imageUrl,
      alcoholic: data.alcoholic,
    }));
    all.push(...cocktails);
     lastPage = result.meta.lastPage ?? 1;
      page++;
    }
    return all;
    } catch (err) {
      console.error("Qeury error:", err);
      return null;
    }
}