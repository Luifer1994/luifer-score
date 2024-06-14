import {
  getFixtureByTeamApi,
  getLineupsByFixtureApi,
  getTeamByCountryAndLeagueApi,
  getWidgetByFixtureApi,
} from "../repositories/teamRepository";
import {
  FixtureResponse,
  LineupsResponse,
  TeamListResponse,
} from "../types/teamInterfaces";

export const getTeamByCountryAndLeagueService = async (
  countryName: string,
  league,
  year
): Promise<TeamListResponse> => {
  try {
    const response = await getTeamByCountryAndLeagueApi(
      countryName,
      league,
      year
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getFixtureByTeamService = async (
  teamId: number,
  year: number
): Promise<FixtureResponse> => {
  try {
    const response = await getFixtureByTeamApi(teamId, year);
    return response;
  } catch (error) {
    return error;
  }
};

export const getLineupsByFixtureService = async (
  fixtureId: number
): Promise<LineupsResponse> => {
  try {
    const response = await getLineupsByFixtureApi(fixtureId);
    return response;
  } catch (error) {
    return error;
  }
};


export const getWidgetByFixtureService = async (fixtureId: number) => {
  try {
    const response = await getWidgetByFixtureApi(fixtureId);
    return response;
  } catch (error) {
    return error;
  }
}