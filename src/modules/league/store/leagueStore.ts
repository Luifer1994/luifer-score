import { defineStore } from "pinia";
import { Response } from "../types/leagueInterfaces";
import { ResponseFixture } from "@/modules/team/types/teamInterfaces";

export const leagueStore = defineStore("leagueStore", {
  state: () => ({
    leagues : [] as Response[],
    allLeagues: localStorage.getItem('allLeagues') ? JSON.parse(localStorage.getItem('allLeagues') || '[]') : ([] as Response[]),
    allFixturesLive: [] as ResponseFixture[],
  }),
  getters: {
    
  },
  actions: {
    setLeagues(leagues: Response[]) {
      this.leagues = leagues;
    },

    setAllLeagues (allLeagues: Response[]) {
      this.allLeagues = allLeagues;
      localStorage.setItem('allLeagues', JSON.stringify(allLeagues));
    },

    setAllFixturesLive (allFixturesLive: ResponseFixture[]) {
      this.allFixturesLive = allFixturesLive;
    }
  },
});
