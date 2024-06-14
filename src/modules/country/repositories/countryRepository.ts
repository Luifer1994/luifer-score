import { http } from "@/utils/http";
import { CountryListResponse } from "../types/countryInterfaces";

export const getCountriesApi = async (): Promise<CountryListResponse> => {
  const response = await http.request<CountryListResponse>({
    url: "/countries",
    method: "GET",
  });
  return response;
};
