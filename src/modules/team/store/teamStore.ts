import { defineStore } from "pinia";
import {
  ResponseFixture,
  Response,
  FixesTeam,
  ResponseLineups,
} from "../types/teamInterfaces";

export const teamStore = defineStore("teamStore", {
  state: () => ({
    teams: [] as Response[],
    featuresTeam: [] as ResponseFixture[],
    fixesMyTeam: [] as FixesTeam[],
    lineups: [] as ResponseLineups[],
  }),
  getters: {},
  actions: {
    setTeams(teams: Response[]) {
      this.teams = teams;
    },

    setFeatureTeam(fixtures: ResponseFixture[]) {
      this.featuresTeam.push(fixtures);
    },

    setFixesMyTeam(fixesMyTeam: FixesTeam) {
      this.fixesMyTeam = fixesMyTeam;
    },

    setLineups(lineups: ResponseLineups[]) {
      this.lineups = lineups;
    },
  },
});
