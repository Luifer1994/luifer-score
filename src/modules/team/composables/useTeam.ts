import { storeToRefs } from "pinia";
import { teamStore } from "../store/teamStore";
import {
  getFixtureByTeamService,
  getLineupsByFixtureService,
  getTeamByCountryAndLeagueService,
  getWidgetByFixtureService,
} from "../services/countryService";
import { computed } from "vue";
import { ResponseFixture, FixesTeam } from "../types/teamInterfaces";

export const useTeam = () => {
  const useTeamStore = teamStore();
  const { featuresTeam, fixesMyTeam, teams, lineups } =
    storeToRefs(useTeamStore);

  const getTeamByCountryAndLeague = async (
    countryName: string,
    league,
    year: number
  ) => {
    try {
      const response = await getTeamByCountryAndLeagueService(
        countryName,
        league,
        year
      );
      if (!response.errors.length) {
        useTeamStore.setTeams(response.response);
      } else {
        useTeamStore.setTeams([]);
      }
    } catch (error) {
      console.error(error);
      useTeamStore.setTeams([]);
    }
  };

  const getFixtureByTeam = async (teamId: number, year: number) => {
    try {
      const response = await getFixtureByTeamService(teamId, year);
      if (!response.errors.length) {
        useTeamStore.setFeatureTeam(response.response);
        processMatches(response.response);
      } else {
        useTeamStore.setFeatureTeam([]);
      }
    } catch (error) {
      console.error(error);
      useTeamStore.setFeatureTeam([]);
    }
  };

  const processMatches = (matches: ResponseFixture[]) => {
    let processedMatches = matches;

    // Asegurarse de que 'matches' sea una matriz plana
    if (Array.isArray(processedMatches[0])) {
      processedMatches = processedMatches.flat();
    }

    const validMatches = processedMatches.filter(
      (match) =>
        match.fixture &&
        match.fixture.timestamp &&
        match.fixture.status &&
        match.fixture.status.short
    );
    const now = Date.now();
    const sortedMatches = validMatches.sort(
      (a, b) => a.fixture.timestamp - b.fixture.timestamp
    );

    let currentMatch = null;
    let previousMatch = null;
    let nextMatch = null;

    const inPlayStatuses = [
      "1H",
      "HT",
      "2H",
      "ET",
      "BT",
      "P",
      "SUSP",
      "INT",
      "LIVE",
    ];
    const finishedStatuses = ["FT", "AET", "PEN"];

    for (let i = 0; i < sortedMatches.length; i++) {
      const match = sortedMatches[i];
      const matchTime = match.fixture.timestamp * 1000;

      if (inPlayStatuses.includes(match.fixture.status.short)) {
        currentMatch = match;
        previousMatch = i > 0 ? sortedMatches[i - 1] : null;
        nextMatch = i < sortedMatches.length - 1 ? sortedMatches[i + 1] : null;
        break;
      }

      if (matchTime > now) {
        nextMatch = match;
        previousMatch = i > 0 ? sortedMatches[i - 1] : null;
        break;
      }

      if (
        finishedStatuses.includes(match.fixture.status.short) ||
        matchTime <= now
      ) {
        previousMatch = match;
      }
    }

    const fixesMyTeam: FixesTeam = {
      currentFixture: currentMatch ? currentMatch : null,
      lastFixture: previousMatch ? previousMatch : null,
      nextFixture: nextMatch ? nextMatch : null,
    };

    useTeamStore.setFixesMyTeam(fixesMyTeam);
  };

  const getLineupsByFixture = async (fixtureId: number) => {
    try {
      const response = await getLineupsByFixtureService(fixtureId);
      if (!response.errors.length) {
        useTeamStore.setLineups(response.response);
      } else {
        useTeamStore.setLineups([]);
      }
    } catch (error) {
      console.error(error);
      useTeamStore.setLineups([]);
    }
  };

  const getWidgetByFixture = async (fixtureId: number): Promise<string> => {
    const host = import.meta.env.VITE_RAPIDAPI_HOST;
    const key = import.meta.env.VITE_RAPIDAPI_KEY;

    const widgetHtml = `
      <div id="wg-api-football-game"
           data-host="${host}"
           data-key="${key}"
           data-id="${fixtureId}"
           data-theme=""
           data-refresh="300"
           data-show-errors="false"
           data-show-logos="true">
      </div>
      <script type="module" src="https://widgets.api-sports.io/2.0.3/widgets.js"></script>
    `;
    return widgetHtml;
  };

  const getWidgetAllFixtures = async (): Promise<string> => {
    const host = import.meta.env.VITE_RAPIDAPI_HOST;
    const key = import.meta.env.VITE_RAPIDAPI_KEY;

    const widgetHtml = `
        <div id="wg-api-football-games"
        data-host="${host}"
        data-key="${key}"
        data-date=""
        data-league=""
        data-season=""
        data-theme=""
        data-refresh="300"
        data-show-toolbar="true"
        data-show-errors="false"
        data-show-logos="true"
        data-modal-game="true"
        data-modal-standings="true"
        data-modal-show-logos="true">
   </div>
   <script
       type="module"
       src="https://widgets.api-sports.io/2.0.3/widgets.js">
   </script>
    `;
    return widgetHtml;
  };

  return {
    getTeamByCountryAndLeague,
    getFixtureByTeam,
    fixesMyTeam,
    teams,
    getLineupsByFixture,
    lineups,
    getWidgetByFixture,
    getWidgetAllFixtures
  };
};
