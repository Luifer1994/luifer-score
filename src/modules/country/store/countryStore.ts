import { defineStore } from "pinia";
import { Country } from "../types/countryInterfaces";
import { set } from "nprogress";

export const countryStore = defineStore("countryStore", {
  state: () => ({
    countries :localStorage.getItem('countries') ? JSON.parse(localStorage.getItem('countries') || '[]') : ([] as Country[]),
  }),
  getters: {
    
  },
  actions: {
    setCountries(countries: Country[]) {
      this.countries = countries;
      localStorage.setItem('countries', JSON.stringify(countries));
    }
  },
});
