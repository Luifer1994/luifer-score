import { FixtureResponse } from "@/modules/team/types/teamInterfaces";
import { getAllFixturesLiveApi, getAllLeaguesApi, getLeaguesApi } from "../repositories/leagueRepository";
import { LeagueListResponse } from "../types/leagueInterfaces"; 

export const getLeaguesService = async (country:string): Promise<LeagueListResponse> => {
  try {
    const response = await getLeaguesApi(country);
    return response;
  } catch (error) {
    return error;
  }
};


export const getAllLeaguesService = async (): Promise<LeagueListResponse> => {
  try {
    const response = await getAllLeaguesApi();
    return response;
  } catch (error) {
    
    return error;
  }
}


export const getAllFixturesLiveService = async (): Promise<FixtureResponse> => {
  try {
    const response = await getAllFixturesLiveApi();
    return response;
  } catch (error) {
    return error;
  }
}

