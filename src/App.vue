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
  components: { GameRoot }
})
export default class App extends Vue {
  mounted() {
    this.$socket.onopen = () => this.$store.commit("SOCKET_ONOPEN");
    this.$socket.onerror = () => this.$store.commit("SOCKET_ONERROR");
    this.$socket.onclose = () => this.$store.commit("SOCKET_ONCLOSE");
    this.$socket.onmessage = data =>
      this.$store.commit("SOCKET_ONMESSAGE", JSON.parse(data.data));
  }

  get getGameState(): null | any {
    return this.$store.getters.getGameState;
  }

  get isReady(): boolean {
    return this.getGameState?.client?.gamestate?.map?.game_time > 0;
  }
}
</script>

<style></style>
