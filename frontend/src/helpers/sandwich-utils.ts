import citiesGeoData from "./geo-location.json";

/**
 * Parses the sandwich name and returns an object with the name and Vietnamese name.
 * @param {string} name - The name of the sandwich.
 * @returns {Object} - An object with the parsed name and Vietnamese name.
 */
export const parseSandwichName = (name: string) => {
  const names = name.match(/^([\w\s]+)\s*(?:\(([^)]+)\))?$/);
  return {
    name: names ? names[1].toUpperCase() : "",
    vietnameseName: names ? names[2] : "",
  };
};

/**
 * Retrieves a list of cities along with their sandwich data based on the provided sandwiches list.
 * @param sandwichesList - The list of sandwiches.
 * @returns An array of cities with their corresponding sandwich data.
 */
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
  })).filter(city => city.sandwiches.length > 0);

  return citiesMap;
};

/**
 * Retrieves the unique topping types from a list of toppings.
 * @param {Topping[]} toppingsList - The list of toppings.
 * @returns {string[]} An array of unique topping types.
 */
export const getToppingTypes = (toppingsList: Topping[]) => {
  const toppingTypes = new Set<string>();

  toppingsList.forEach((topping: Topping) => {
    toppingTypes.add(topping.type);
  });

  return Array.from(toppingTypes);
};

/**
 * Populates the orders with sandwich and topping information.
 * @param {Order[]} orders - The array of orders.
 * @param {Sandwich[]} sandwiches - The array of sandwiches.
 * @param {Topping[]} toppings - The array of toppings.
 * @returns {Order[]} - The updated array of orders with populated sandwich and topping information.
 */
export const populateOrders = (
  orders: Order[],
  sandwiches: Sandwich[],
  toppings: Topping[],
) => {
  return orders.map(order => ({
    ...order,
    sandwich: sandwiches.find(s => s._id === order.sandwichId),
    toppings: order.toppings.map(toppingId =>
      toppings.find(t => t._id === toppingId),
    ),
  }));
};
