<template>
  <div
    style="
      display: grid;
      grid-template-rows: min-content 1fr min-content 3.8vh;
      width: 100%;
      height: 100vh;
    "
  >
    <div style="display: flex; width: 100%; flex-direction: row;">
      <!--      ; background-color: rgba(255,0,0,0.5)-->
      <div style="width: 28.6%;" />
      <div style="width: 16%;">
        <RadiantRoot
          :radiant-hero="radiantHero"
          :radiant-items="radiantItems"
        />
      </div>
      <!--      ; background-color: rgba(0,128,0, 0.5)-->
      <div style="width: 10.8%;" />
      <div style="width: 16%;">
        <DireRoot :dire-hero="direHero" :dire-items="direItems" />
      </div>
      <!--      ; background-color: rgba(0,0,255, 0.5)-->
      <div style="width: 28.6%;" />
    </div>
    <div />
    <!-- map.roshan_state !== 'respawn_base' && -->
    <!--      v-if="-->
    <!--      map &&-->
    <!--      map.roshan_state !== 'respawn_base' &&-->
    <!--      map.roshan_state_end_seconds <= 600 &&-->
    <!--      map.roshan_state_end_seconds !== 0-->
    <!--      "-->
    <div
      v-if="getCurrentUser.user"
      :style="
        'display:grid; grid-template-columns: ' +
        spellSize +
        'vw 10vw auto; align-content: center;'
      "
    >
      <!--       style="background-color: rgba(255,0,0,0.5)"-->
      <div />
      <Inventory
        v-bind:current-user="getCurrentUser"
        v-bind:items="getGameState.client.gamestate.items"
      />
      <!--       style="background-color: rgba(0,0,255,0.5)" -->
      <div />
      <!--        <div>-->
      <!--          <h1>-->
      <!--            4:51-->
      <!--          </h1>-->
      <!--        </div>-->
    </div>
    <!--     style="background-color: rgba(25,25,65,0.8)" -->
    <div />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import RadiantRoot from "@/components/RadiantRoot.vue";
import DireRoot from "@/components/DireRoot.vue";
import Inventory from "@/components/Inventory.vue";
import { getUser, spellCount, spellSize } from "@/helper/CurrentUser.ts";

@Component({
  name: "GameRoot",
  components: { Inventory, DireRoot, RadiantRoot },
})
export default class GameRoot extends Vue {
  @Prop() getGameState: any | undefined;

  get getCurrentUser() {
    if (
      this.getGameState &&
      this.getGameState.client &&
      this.getGameState.client.gamestate
    )
      return getUser(this.getGameState.client.gamestate);
    else return { user: false };
  }

  get spellCount(): number {
    if (
      this.getGameState &&
      this.getGameState.client &&
      this.getGameState.client.gamestate
    )
      return spellCount(this.getGameState.client.gamestate);
    else return 0;
  }

  get spellSize() {
    if (
      this.getGameState &&
      this.getGameState.client &&
      this.getGameState.client.gamestate
    )
      return spellSize(this.spellCount);
    else return 0;
  }

  get radiantHero(): any[] {
    return (
      this.getGameState?.client?.gamestate?.hero?.team2 || [{}, {}, {}, {}, {}]
    );
  }
  get direHero(): any[] {
    return (
      this.getGameState?.client?.gamestate?.hero?.team3 || [{}, {}, {}, {}, {}]
    );
  }
  get radiantItems(): any[] {
    return (
      this.getGameState?.client?.gamestate?.items?.team2 || [{}, {}, {}, {}, {}]
    );
  }
  get direItems(): any[] {
    return (
      this.getGameState?.client?.gamestate?.items?.team3 || [{}, {}, {}, {}, {}]
    );
  }
  get map(): any {
    return this.getGameState?.client?.gamestate?.map || [{}, {}, {}, {}, {}];
  }
}
</script>

<style scoped></style>
