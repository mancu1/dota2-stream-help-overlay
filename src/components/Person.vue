<template
  ><div
    style="display:flex; flex-direction: column; align-content: center; justify-content: center"
    class="fill border-d"
  >
    <div
      style="align-content: center; justify-content: center"
      v-if="hero.smoked"
    >
      <img width="75%" src="../images/Smoke_of_Deceit_icon.png" />
    </div>
    <div
      style="align-content: center; justify-content: center"
      v-if="isScepter"
    >
      <img width="75%" src="../images/Aghanim's_Scepter_icon.png" />
    </div>
    <div
      style="align-content: center; justify-content: center; text-shadow: 1px 1px 2px aliceblue; font-family: monospace"
      v-if="isAegis"
    >
      <div
        width="30px"
        :style="
          `background-image: url(${require('../images/Aegis_of_the_Immortal_icon.png')});background-size: contain;
background-repeat: no-repeat;`
        "
      >
        <h3>
          {{ Math.floor(Aegis.time / 60) + ":" + Math.round(Aegis.time % 60) }}
        </h3>
      </div>
    </div>
    <div style="align-content: center; justify-content: center" v-if="isGem">
      <img width="75%" src="../images/Gem_of_True_Sight_icon.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "Person"
})
export default class Person extends Vue {
  @Prop() hero: any | undefined;
  @Prop() items!: any;

  aegisTime = 0;

  get isScepter(): boolean {
    if (this.items)
      return Object.values(this.items).reduce((isScepter: boolean, el: any) => {
        if (el.name == "item_ultimate_scepter") isScepter = true;
        return isScepter;
      }, false);
    else return false;
  }
  get isGem(): boolean {
    if (this.items)
      return Object.values(this.items).reduce((isGem: boolean, el: any) => {
        if (el.name == "item_gem") isGem = true;
        return isGem;
      }, false);
    else return false;
  }

  get Aegis(): any {
    if (this.items)
      return Object.values(this.items).reduce((Aegis: any, el: any) => {
        if (el.name == "item_aegis") Aegis = el;
        return Aegis;
      }, null);
    else return null;
  }

  get isAegis(): boolean {
    if (this.items)
      return Object.values(this.items).reduce((isAegis: boolean, el: any) => {
        if (el.name == "item_aegis") {
          isAegis = true;
          this.aegisTime = el.time;
        } else {
          this.aegisTime = 0;
        }
        return isAegis;
      }, false);
    else return false;
  }
}
</script>

<style scoped></style>
