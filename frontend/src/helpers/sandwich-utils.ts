import citiesGeoData from "./geo-location.json";

export const parseSandwichName = (name: string) => {
  const names = name.match(/^([\w\s]+)\s*(?:\(([^)]+)\))?$/);
  return {
    name: names ? names[1].toUpperCase() : "",
    vietnameseName: names ? names[2] : "",
  };
};

export const getCities = (sandwichesList: Sandwich[]) => {
  const cities = new Map<
    string,
    { sandwiches: Sandwich[]; lat: number; lon: number }
  >();

  citiesGeoData.forEach((city: { name: string; lat: number; lon: number }) => {
    cities.set(city.name, {
      sandwiches: [],
      lat: city.lat,
      lon: city.lon,
    });
  });

  sandwichesList.forEach((sandwich: Sandwich) => {
    const { originCity } = sandwich;
    cities.get(originCity)?.sandwiches.push(sandwich);
  });

  const citiesMap = Array.from(cities, ([name, data]) => ({
    name,
    sandwiches: data.sandwiches,
    lat: data.lat,
    lon: data.lon,
  })).filter((city) => city.sandwiches.length > 0);

  return citiesMap
};

export const getToppingTypes = (toppingsList: Topping[]) => {
  const toppingTypes = new Set<string>();

  toppingsList.forEach((topping: Topping) => {
    toppingTypes.add(topping.type);
  });

  return Array.from(toppingTypes);
} 
