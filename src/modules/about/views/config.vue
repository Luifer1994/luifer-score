<template>
    <div class="max-w-auto rounded overflow-hidden shadow p-0">
      <van-form @submit="onSubmit">
        <van-field v-model="username" name="Username" label="Nombre" placeholder="Ingresa tu nombre completo"
                   label-align="top" :rules="[{ required: true, message: 'El nombre es requerido' }]" />
  
        <van-field v-model="country" readonly name="País" label="País de tu equipo favorito"
                   placeholder="Selecciona el país de tu equipo favorito"
                   :rules="[{ required: true, message: 'El país es requerido' }]" @click="showPickerCountry = true"
                   label-align="top" />
        <van-popup v-model:show="showPickerCountry" position="bottom">
          <van-picker :columns="columnsCountry" @confirm="onConfirmCountry" @cancel="() => showPickerCountry = false">
            <template #option="option">
              <div class="flex items-center">
                <div class="w-8 h-8 flex-shrink-0">
                  <van-image width="100%" height="100%" fit="cover" lazy-load :src="option.flag" round v-if="option.flag" />
                </div>
                <span class="ml-2">{{ option.text }}</span>
              </div>
            </template>
          </van-picker>
        </van-popup>
  
        <van-field v-if="columnsLeague.length" v-model="league" readonly name="Liga"
                   label="Liga de tu equipo favorito" placeholder="Selecciona la liga de tu equipo favorito"
                   :rules="[{ required: true, message: 'La liga es requerida' }]" @click="showPickerLeague = true"
                   label-align="top" />
        <van-popup v-model:show="showPickerLeague" position="bottom">
          <van-picker :columns="columnsLeague" @confirm="onConfirmLeague" @cancel="() => showPickerLeague = false">
            <template #option="option">
              <div class="flex items-center">
                <div class="w-8 h-8 flex-shrink-0">
                  <van-image width="100%" height="100%" fit="cover" lazy-load :src="option.logo" round v-if="option.logo" />
                </div>
                <span class="ml-2">{{ option.text }}</span>
              </div>
            </template>
          </van-picker>
        </van-popup>
  
        <van-field v-if="columnsTeam.length" v-model="team" readonly name="Equipo" label="Equipo favorito"
                   placeholder="Selecciona tu equipo favorito"
                   :rules="[{ required: true, message: 'El equipo es requerido' }]" @click="showPickerTeam = true"
                   label-align="top" />
        <van-popup v-model:show="showPickerTeam" position="bottom">
          <van-picker :columns="columnsTeam" @confirm="onConfirmTeam" @cancel="() => showPickerTeam = false">
            <template #option="option">
              <div class="flex items-center">
                <div class="w-8 h-8 flex-shrink-0">
                  <van-image width="100%" height="100%" fit="cover" lazy-load :src="option.logo" round v-if="option.logo" />
                </div>
                <span class="ml-2">{{ option.text }}</span>
              </div>
            </template>
          </van-picker>
        </van-popup>
  
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            Guardar
          </van-button>
        </div>
      </van-form>
    </div>
  </template>
  
  <script setup lang="ts" name="About">
  import { ref, watch, onMounted } from 'vue';
  import { useCountry } from '@/modules/country/composables/useCountry';
  import { useTeam } from '@/modules/team/composables/useTeam';
  import { useLeague } from '@/modules/league/composables/useLeague';
  import { useAbout } from '../composables/useAbout';
  import router from "@/router";
  
  const { getCountries, countries } = useCountry();
  const { getTeamByCountryAndLeague, teams } = useTeam();
  const { getLeagues, leagues } = useLeague();
  const { setMyInfo } = useAbout();
  
  const username = ref('');
  const country = ref('');
  const league = ref('');
  const team = ref('');
  
  const showPickerCountry = ref(false);
  const showPickerLeague = ref(false);
  const showPickerTeam = ref(false);
  const columnsCountry = ref([]);
  const columnsLeague = ref([]);
  const columnsTeam = ref([]);
  
  const onConfirmCountry = ({ selectedOptions }) => {
    country.value = selectedOptions[0]?.text;
    showPickerCountry.value = false;
    getLeaguesByCountry(selectedOptions[0]?.text);
  };
  
  const onConfirmLeague = ({ selectedOptions }) => {
    league.value = selectedOptions[0]?.text;
    showPickerLeague.value = false;
    getTeamsByLeague(selectedOptions[0]?.value);
  };
  
  const onConfirmTeam = ({ selectedOptions }) => {
    team.value = selectedOptions[0]?.text;
    showPickerTeam.value = false;
  };
  
  const onSubmit = () => {
    const myCountry = countries.value.find((countryData) => countryData.name === country.value);
    const myTeam = teams.value.find((teamData) => teamData.team.name === team.value);
    const myInfo = {
      name: username.value,
      country: myCountry,
      team: myTeam?.team
    };
    setMyInfo(myInfo);
    router.push({ path: '/' });
  };
  
  const getLeaguesByCountry = async (countryCode: string) => {
    await getLeagues(countryCode);
  };
  
  const getTeamsByLeague = async (leagueId: number) => {
    const league = leagues.value.find((league) => league.league.id === leagueId);
    if (league) {
      const latestSeason = league.seasons.reduce((latest, season) => (season.year > latest.year ? season : latest), league.seasons[0]);
      await getTeamByCountryAndLeague(country.value, leagueId, latestSeason.year);
    }
  };
  
  watch(countries, (newCountries) => {
    columnsCountry.value = newCountries.map((country) => ({
      text: country.name,
      value: country.code,
      flag: country.flag || '',
    }));
  });
  
  watch(leagues, (newLeagues) => {
    league.value = '';
    team.value = '';
    columnsLeague.value = newLeagues.map((league) => ({
      text: league.league.name,
      value: league.league.id,
      logo: league.league.logo || '',
    }));
  });
  
  watch(teams, (newTeams) => {
    team.value = '';
    columnsTeam.value = newTeams.map((team) => ({
      text: team.team.name,
      value: team.team.code,
      logo: team.team.logo || '',
    }));
  });
  
  onMounted(async () => {
    await getCountries();
    columnsCountry.value = countries.value.map((country) => ({
      text: country.name,
      value: country.code,
      flag: country.flag || '',
    }));
  });
  </script>
  
  <style>
  .van-field__control {
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    padding: 7px;
  }
  </style>
  