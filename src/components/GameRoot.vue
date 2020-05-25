<template>
  <div
    style="display:grid; grid-template-rows: min-content 1fr min-content; width: 100%; height: 95vh;"
  >
    <div
      style="display: flex; width: 100%; flex-direction: row; margin-top: 5.3vh"
    >
      <div style="width: 27.7%; background-color: rgba(0,0,0,0);" />
      <div style="width: 16.8%">
        <RadiantRoot
          :radiant-hero="radiantHero"
          :radiant-items="radiantItems"
        />
      </div>
      <div style="width: 10.8%; background-color: rgba(0,0,0,0);" />
      <div style="width: 16.8%">
        <DireRoot :dire-hero="direHero" :dire-items="direItems" />
      </div>
      <div style="width: 27.7%; background-color: rgba(0,0,0,0);" />
    </div>
    <div></div>
    <div
      style="display:flex; flex-direction: row; text-shadow: 1px 1px 2px aliceblue; font-family: monospace; font-size: 24px"
    >
      <!-- map.roshan_state !== 'respawn_base' && -->
      <div
        style="display:flex; flex-direction: row; align-content: center"
        v-if="
          map &&
            map.roshan_state !== 'respawn_base' &&
            map.roshan_state_end_seconds <= 600 &&
            map.roshan_state_end_seconds !== 0
        "
      >
        <div
          style=" margin-left: 16vw;    align-self: center;
    align-items: center;
    align-content: center;"
        >
          <img height="60px" src="../images/Roshan_icon.png" alt="roshan" />
        </div>
        <div>
          <h1>
            {{
              Math.floor(map.roshan_state_end_seconds / 60) +
                ":" +
                Math.round(map.roshan_state_end_seconds % 60)
            }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import RadiantRoot from "@/components/RadiantRoot.vue";
import DireRoot from "@/components/DireRoot.vue";

@Component({
  name: "GameRoot",
  components: { DireRoot, RadiantRoot }
})
export default class GameRoot extends Vue {
  @Prop() getGameState: any | undefined;

  get radiantHero(): any[] {
    return this.getGameState?.client?.gamestate?.hero?.team2;
  }
  get direHero(): any[] {
    return this.getGameState?.client?.gamestate?.hero?.team3;
  }
  get radiantItems(): any[] {
    return this.getGameState?.client?.gamestate?.items?.team2;
  }
  get direItems(): any[] {
    return this.getGameState?.client?.gamestate?.items?.team3;
  }
  get map(): any {
    return this.getGameState?.client?.gamestate?.map;
  }
}
</script>

<style scoped></style>
