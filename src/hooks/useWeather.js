import { WeatherAreas } from "../datas/WeatherAreas";

export const useWeather = () => {
  const getAreaByBeachName = (beachName) => {
    const now = new Date();
    now;
    return WeatherAreas[beachName];
  };
  return {
    getAreaByBeachName,
  };
};
