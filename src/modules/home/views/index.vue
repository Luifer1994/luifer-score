<template>
  <div class="px-3 mt-5 font-sans w-full max-w-lg mx-auto" v-if="isRendered">
    <p class="text-lg font-bold">
      {{ fixture ? matchStatus(fixture.fixture.status.short) : 'Último partido jugado' }} de tú equipo <van-icon
        name="like" class="text-red-500" />
    </p>
    <MatchScore v-if="fixture" :homeTeam="homeTeam" :awayTeam="awayTeam" :homeTeamScore="homeScore"
      :awayTeamScore="awayScore" :liveTime="liveTime" :status="status" :eventId="fixture.fixture.id"
      @event-click="handleEventClick" />

    <div v-if="allFixtures.length">
      <p class="text-lg font-bold my-5">
        Partidos en vivo
      </p>

      <van-tabs v-model:active="active" class="mt-5 w-full" animated>
        <van-tab v-for="(fixture, index) in allFixtures" :key="index" class="w-full">
          <template #title>
            <div class="flex flex-col items-center w-full">
              <van-image class="h-5 w-5 mb-1" fit="cover" lazy-load :src="fixture.country.flag" round
                v-if="fixture.country && fixture.country.flag" />
              <span class="text-sm">{{ fixture.country.name }}</span>
            </div>
          </template>
          <div class="w-full">
            <div v-for="(league, index) in fixture.leagues" :key="index">
              <div class="flex items-center my-5 w-full">
                <van-image class="h-5 w-5 mr-2" fit="cover" lazy-load :src="league.league.logo"
                  v-if="league.league && league.league.logo" />
                <span class="text-sm font-bold">{{ league.league.name }}</span>
              </div>

              <div class="mt-2 w-full">
                <div v-for="(match, index) in league.fixtures" :key="index" class="my-5 w-full">
                  <MatchScore :homeTeam="match.teams.home" :awayTeam="match.teams.away"
                    :homeTeamScore="match.goals.home" :awayTeamScore="match.goals.away"
                    :liveTime="match.fixture.status.elapsed" :status="match.fixture.status.short" class="w-full"
                    :eventId="match.fixture.id" @event-click="handleEventClick" />
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <WidgetAllMatch  />

  </div>

  <van-popup v-model:show="show" position="right" :style="{ width: '95%', height: '100%' }" closeable>

    <div class="w-full h-full">
      <SoccerField :eventId />
    </div>

  </van-popup>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import MatchScore from '@/components/MatchScore.vue';
import SoccerField from '@/components/SoccerField.vue';
import WidgetAllMatch from '@/components/WidgetAllMatch.vue';
import { useAbout } from '@/modules/about/composables/useAbout';
import { useLeague } from '@/modules/league/composables/useLeague';
import { useTeam } from '@/modules/team/composables/useTeam';
import { FixesTeam, AwayClass } from '@/modules/team/types/teamInterfaces';

const { myInfo } = useAbout();
const { allLeagues, getLastSeason, getAllFixturesLive, allFixturesLive } = useLeague();
const { getTeamByCountryAndLeague, getFixtureByTeam, fixesMyTeam, lineups, getLineupsByFixture } = useTeam();

const lastFixe = ref<FixesTeam>({
  currentFixture: undefined,
  lastFixture: undefined,
  nextFixture: undefined,
});

const active = ref(0);
const allFixtures = ref([]);
const isRendered = ref(false);
const show = ref(false);
const eventId = ref(null);

const fixture = computed(() => lastFixe.value.currentFixture ?? lastFixe.value.lastFixture);

const homeTeam = computed<AwayClass | undefined>(() => fixture.value?.teams.home as AwayClass);
const awayTeam = computed<AwayClass | undefined>(() => fixture.value?.teams.away as AwayClass);

const homeScore = computed<number | null>(() => {
  const home = fixture.value?.goals.home;
  return typeof home === 'number' ? home : null;
});

const awayScore = computed<number | null>(() => {
  const away = fixture.value?.goals.away;
  return typeof away === 'number' ? away : null;
});

const liveTime = computed(() => fixture.value?.fixture.status.elapsed);
const status = computed(() => fixture.value?.fixture.status.short);

function matchStatus(statusShort) {
  switch (statusShort) {
    case 'TBD':
    case 'NS':
    case '1H':
    case '2H':
    case 'ET':
    case 'BT':
    case 'P':
    case 'SUSP':
    case 'INT':
    case 'LIVE':
      return 'Partido en vivo';
    case 'HT':
      return 'Partido en el entretiempo';
    case 'FT':
    case 'AET':
    case 'PEN':
    case 'PST':
    case 'CANC':
    case 'ABD':
    case 'AWD':
    case 'WO':
      return 'Último partido jugado';
    default:
      return 'estado desconocido';
  }
}

async function handleEventClick(fixtureId: number) {
  await getLineupsByFixture(fixtureId);
  eventId.value = fixtureId;
  show.value = true
}

onMounted(async () => {
  const myLeague = allLeagues.value.find((league) => league.country.name === myInfo.value.country.name);
  if (myLeague) {
    const lastSeason = await getLastSeason(myLeague.league.id);
    await getTeamByCountryAndLeague(myInfo.value.country.name, myLeague.league.name, lastSeason);
    await getFixtureByTeam(myInfo.value.team.id, lastSeason);
    if (fixesMyTeam.value) {
      lastFixe.value = fixesMyTeam.value as FixesTeam;
    }
  }
  isRendered.value = true;

  await getAllFixturesLive();

  // Agrupo los partidos por país y luego por liga dentro de cada país
  const fixturesByCountryAndLeague = allFixturesLive.value.reduce((acc, fixture) => {
    const { league, teams, goals, score, fixture: fix } = fixture;
    const { id, name, logo, country, flag } = league;

    if (!acc[country]) {
      acc[country] = {
        country: { name: country, flag },
        leagues: {},
      };
    }

    if (!acc[country].leagues[id]) {
      acc[country].leagues[id] = {
        league: { id, name, logo },
        fixtures: [],
      };
    }

    acc[country].leagues[id].fixtures.push({
      fixture: fix,
      league: { id, name, country, logo, flag },
      teams,
      goals,
      score,
    });

    return acc;
  }, {});


  const arrayFixturesByCountryAndLeague = Object.values(fixturesByCountryAndLeague).map((country: any) => ({
    ...country,
    leagues: Object.values(country.leagues),
  }));


  allFixtures.value = arrayFixturesByCountryAndLeague;
});
</script>

<style scoped></style>
