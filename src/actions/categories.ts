export async function getCategories(): Promise<string[] | null> {
  const url = import.meta.env.VITE_COCKTAILS_API;
  try {
    const response = await fetch(`${url}categories`);
    const result = await response.json();

    if (!response.ok) {
      console.error("Failed to fetch");
    }
    const categories: string[] = result.data;
    return categories;
  } catch (err) {
    console.error("Qeury error:", err);
    return [];
  }
}
