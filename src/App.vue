<template>
  <div>
    <GameRoot v-if="isReady" :getGameState="getGameState" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameRoot from "@/components/GameRoot.vue";

@Component({
  name: "App",
  components: { GameRoot },
})
export default class App extends Vue {
  mounted() {
    this.$socket.onopen = () => this.$store.commit("SOCKET_ONOPEN");
    this.$socket.onerror = () => this.$store.commit("SOCKET_ONERROR");
    this.$socket.onclose = () => this.$store.commit("SOCKET_ONCLOSE");
    this.$socket.onmessage = (data) =>
      this.$store.commit("SOCKET_ONMESSAGE", JSON.parse(data.data));
  }

  get getGameState(): null | any {
    return this.$store.getters.getGameState;
    // return {};
  }

  get isReady(): boolean {
    return this.getGameState?.client?.gamestate?.map?.game_time > 0;
    // return true;
  }
}
</script>

<style>
html {
  margin: 0;
}

body {
  margin: 0;
  //background-image: url("https://steamuserimages-a.akamaihd.net/ugc/960839868475033891/1848D6E1B49A292AD85951561A9877F9484957D8/?imw=1024&imh=576&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true");
  //background-size: cover;
}
</style>
