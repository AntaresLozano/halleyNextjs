export async function fetchData(endpoint: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fullEndpoint = `${apiUrl}${endpoint}${endpoint.includes('?') ? '&' : '?'}populate=*`;
    const res = await fetch(fullEndpoint, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching data from ${endpoint}: ${res.status}`);
    }

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return null;
  }
}
