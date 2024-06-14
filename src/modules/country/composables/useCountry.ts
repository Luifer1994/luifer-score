import { storeToRefs } from "pinia";
import { countryStore } from "../store/countryStore";
import { getCountriesService } from "../services/countryService";

export const useCountry = () => {
  const useCountryStore = countryStore();

  const { countries } = storeToRefs(useCountryStore);

  const getCountries = async () => {
    if (countries.value.length) return;
    const response = await getCountriesService();
    if (!response.errors.length) {
      useCountryStore.setCountries(response.response);
    } else {
      useCountryStore.setCountries([]);
    }
  };

  return {
    countries,
    getCountries,
  };
};
