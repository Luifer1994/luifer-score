import { http } from "@/utils/http";
import { FixtureResponse, LineupsResponse, TeamListResponse } from "../types/teamInterfaces";

export const getTeamByCountryAndLeagueApi = async (countryName:string, league, year): Promise<TeamListResponse> => {

  countryName = countryName.toLowerCase();

  const response = await http.request<TeamListResponse>({
    url: "/teams/?country="+countryName+"&league="+league+"&season="+year,
    method: "GET",
  });
  return response;
};


export const getFixtureByTeamApi = async (teamId: number, year: number): Promise<FixtureResponse> => {
  const response = await http.request<FixtureResponse>({
    url: "/fixtures?team="+teamId+"&season="+year,
    method: "GET",
  });
  return response;
}


export const getLineupsByFixtureApi = async (fixtureId: number): Promise<LineupsResponse> => {
  const response = await http.request<LineupsResponse>({
    url: "/fixtures/lineups?fixture="+fixtureId,
    method: "GET",
  });
  return response;
}

export const getWidgetByFixtureApi = async (fixtureId: number) => {
  const response = await http.request({
    url: "/widgets/game?data-id="+fixtureId,
    method: "GET",
  });
  return response;
}