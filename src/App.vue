<template>
  <HeaderTop :title="title" :title-short="titleShort" :links="links" class="header"/>
  <div class="vld-parent">
    <loading :active="isLoading" 
        color="#043659"
        loader="bars"
    ></loading>
  </div>
  <div v-if="!isLoading">
    <SchedulerTable :h_start="8" :h_end="20" :step="30" :rows="rows" :events="events" />
    <!-- <DivScheduler style="display: none" :h_start="8" :h_end="20" :step="30" :rows="rows" :events="events" /> -->
  </div>
</template>

<script>
import HeaderTop from './components/HeaderTop.vue'
import SchedulerTable from './components/SchedulerTable.vue'


// Import component
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
// import DivScheduler from './components/DivScheduler.vue'

export default {
  name: 'App',
  components: {
    HeaderTop,
    SchedulerTable,
    // DivScheduler,
    Loading,
  },
  created() {
    document.title = "PAG - Poli con Aule Gestite";
  },
  data() {
    return {
      title: 'Poli con Aule Gestite',
      titleShort: 'PAG',
      links: [
        { id: 1, url: 'https://unipi.prod.up.cineca.it/calendarioPubblico/linkCalendarioId=63223a029f080a0aab032afc ', label: 'Originale' },
      ],
      rows: null,
      events: null,
      isLoading: true,
    }
  },
  async mounted() {
    this.fetchData();
  },
  methods: {
    async fetchAule() {
      let aule_req = {
        "linkCalendarioId": "63223a029f080a0aab032afc",
        "clienteId": "628de8b9b63679f193b87046",
        "auleIds": [],
        "edificiIds": [],
        "order": "edificio.codice, descrizione",
        "limit": 250
      }
      let aule_resp = await fetch("https://apache.prod.up.cineca.it/api/Aule/getAulePerCalendarioPubblico", {
        "headers": {
          "Accept": "application/json, text/plain, */*",
          "Accept-Language": "it,en-US;q=0.7,en;q=0.3",
          "Content-Type": "application/json;charset=utf-8",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-site",
          "Sec-GPC": "1"
        },
        "referrer": "https://unipi.prod.up.cineca.it/",
        "body": JSON.stringify(aule_req),
        "method": "POST",
        "mode": "cors"
      });
      let aule_json = await aule_resp.json();
      return aule_json;
    },
    async fetchImpegni(auleIds) {

      const urlParams = new URLSearchParams(window.location.search);
      const date = urlParams.get('date');
      let d = new Date();
      if (date) {
          d = new Date(date);
      }
      let yesterday = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate() - 1, 22)).toISOString();
      let today = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 22)).toISOString();
      let impegni_req = {
        "mostraImpegniAnnullati":false,
        "mostraIndisponibilitaTotali":true,
        "linkCalendarioId":"63223a029f080a0aab032afc",
        "clienteId":"628de8b9b63679f193b87046",
        "pianificazioneTemplate":false,
        "auleIds": auleIds,
        "limitaRisultati":false,
        "dataInizio": yesterday,
        "dataFine": today,
      }
      let impegni_resp = await fetch("https://apache.prod.up.cineca.it/api/Impegni/getImpegniCalendarioPubblico", {
      "credentials": "omit",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "it,en-US;q=0.7,en;q=0.3",
        "Content-Type": "application/json;charset=utf-8",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-site",
        "Sec-GPC": "1",
        "Pragma": "no-cache",
        "Cache-Control": "no-cache"
      },
      "referrer": "https://unipi.prod.up.cineca.it/",
      "body": JSON.stringify(impegni_req),
      "method": "POST",
      "mode": "cors"
      });
      let impegni_json = await impegni_resp.json();
      return impegni_json;
    },
    async fetchData() {
      this.rows = await this.fetchAule();
      let auleIds = this.rows.map(aula => aula.id);
      this.events = await this.fetchImpegni(auleIds);
      this.isLoading = false;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}

body {
  margin: 0;
  padding: 0;
}
</style>
