export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  category: string[];
  context: string;
  price: string;
  isFree: boolean;
  speed: string;
}

export const fetchModels = async (searchQuery = '', provider = 'All', tier = 'All', sort = 'Newest', page = 1): Promise<{ data: ModelConfig[], meta: any }> => {
  const params = new URLSearchParams({
    search: searchQuery,
    provider,
    tier,
    sort,
    page: String(page)
  });

  const response = await fetch(`/api/models?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch models');
  }

  const result = await response.json();

  // Backend'den gelen veriyi frontend formatına dönüştürüyoruz.
  const mappedData = result.data.map((item: any) => ({
    id: item.id,
    name: item.name,
    provider: item.provider.name,
    category: item.category ? [item.category] : [],
    context: item.context_size >= 1000 ? `${item.context_size / 1000}k` : String(item.context_size),
    price: item.is_free ? 'Free' : `$${item.price_per_1m} / 1M`,
    isFree: item.is_free,
    speed: `${item.speed_tok_s} tok/s`
  }));

  return {
    data: mappedData,
    meta: result.meta
  };
};

export const fetchProviders = async (): Promise<{ id: string, name: string }[]> => {
  const response = await fetch('/api/providers');
  if (!response.ok) {
    throw new Error('Failed to fetch providers');
  }
  return await response.json();
};
