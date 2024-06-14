import { getCountriesApi } from "../repositories/countryRepository";
import { CountryListResponse } from "../types/countryInterfaces";

export const getCountriesService = async (): Promise<CountryListResponse> => {
  try {
    const response = await getCountriesApi();
    return response;
  } catch (error) {
    
    return error;
  }
};
