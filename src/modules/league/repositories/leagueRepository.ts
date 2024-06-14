import { http } from "@/utils/http";
import { LeagueListResponse } from "../types/leagueInterfaces"; 
import { FixtureResponse } from "@/modules/team/types/teamInterfaces";

export const getLeaguesApi = async (country:string): Promise<LeagueListResponse> => {
  const response = await http.request<LeagueListResponse>({
    url: "/leagues?country="+country,
    method: "GET",
  });
  return response;
};

export const getAllLeaguesApi = async (): Promise<LeagueListResponse> => {
  const response = await http.request<LeagueListResponse>({
    url: "/leagues",
    method: "GET",
  });
  return response;
}


export const getAllFixturesLiveApi = async (): Promise<FixtureResponse> => {
  const response = await http.request<FixtureResponse>({
    url: "/fixtures?live=all",
    method: "GET",
  });
  return response;
}