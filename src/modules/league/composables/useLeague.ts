import { storeToRefs } from "pinia";
import { leagueStore } from "../store/leagueStore";
import {
  getAllFixturesLiveService,
  getAllLeaguesService,
  getLeaguesService,
} from "../services/leagueService";
import { League, Response, Season } from "../types/leagueInterfaces";

export const useLeague = () => {
  const useLeagueStore = leagueStore();

  const { leagues, allLeagues, allFixturesLive } = storeToRefs(useLeagueStore);

  const getLeagues = async (country: string) => {
    const response = await getLeaguesService(country);
    if (!response.errors.length) {
      useLeagueStore.setLeagues(response.response);
    } else {
      useLeagueStore.setLeagues([]);
    }
  };

  const getAllLeagues = async () => {
    const response = await getAllLeaguesService();
    if (!response.errors.length) {
      useLeagueStore.setAllLeagues(response.response);
    } else {
      useLeagueStore.setAllLeagues([]);
    }
  };

  const getLastSeason = (leagueId: number): number | null => {
    const leagues = useLeagueStore.allLeagues;
    const league = leagues.find(
      (league: Response) => league.league.id === leagueId
    );

    if (league) {
      const year = league.seasons.find(
        (season: Season) => season.current === true
      );

      if (year) {
        return year.year;
      }
      return null;
    }
    return null;
  };

  const getAllFixturesLive = async () => {
    const response = await getAllFixturesLiveService();
    if (!response.errors.length) {
      useLeagueStore.setAllFixturesLive(response.response);
    } else {
      useLeagueStore.setAllFixturesLive([]);
    }
  };

  return {
    leagues,
    allLeagues,
    getLeagues,
    getAllLeagues,
    getLastSeason,
    allFixturesLive,
    getAllFixturesLive,
  };
};
