export interface Cocktail {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
}
export async function getCocktails(
  category: string,
): Promise<Cocktail[] | null> {
  const url = import.meta.env.VITE_COCKTAILS_API;
  let page = 1;
  let lastPage = 1;
  const all: Cocktail[] = [];

  try {
    while (page <= lastPage) {
      const response = await fetch(`${url}?category=${category}&page=${page}`);
      const result = await response.json();

      if (!response.ok) {
        console.error("Failed to fetch page", page);
        break;
      }
      const cocktails: Cocktail[] = result.data.map((data: any) => ({
        id: data.id,
        name: data.name,
        category: data.category,
        imageUrl: data.imageUrl,
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
