<template
  ><div
    style="
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: center;
    "
  >
    <div style="height: 6vh;">
      <div
        style="align-content: center; justify-content: center;"
        v-if="hero.smoked"
      >
        <!--        -->
        <!--        <img width="100%" src="../images/dota_icons/smoke.png" />-->
        <video id="smokeV" width="100%" autoplay loop muted>
          <source src="/smoke.webm" type="video/webm" />
        </video>
      </div>
      <div v-else style="height: 3.8vh;"></div>

      <div
        v-if="isAegis && Aegis.time <= 300"
        style="
          margin-top: -3vh;
          font-size: 20px;
          font-weight: bolder;
          font-family: 'Comic Sans MS', sans-serif;
          color: #d46b25;
          text-shadow: 0 0 6px black;
        "
      >
        {{ Math.floor(Aegis.time / 60) + ":" + Math.round(Aegis.time % 60) }}

        <!--              <video controls ref="videoAegis" width="100%" autoplay loop muted>-->
        <!--                <source :src="require('@/video/aegis-time.webm')" type="video/webm" />-->
        <!--              </video>-->
      </div>
      <!--      <div style="align-content: center; justify-content: center;" v-else>-->
      <!--        <img width="100%" src="../images/dota_icons/smoke.png" />-->
      <!--      </div>-->
    </div>
    <div
      style="
        align-content: center;
        justify-content: center;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        margin: 0 5px;
      "
    >
      <div
        v-if="isScepter"
        style="align-content: center; justify-content: center;"
      >
        <img width="90%" src="../images/dota_icons/aghanim.png" />
      </div>
      <div
        v-if="isAegis"
        style="align-content: center; justify-content: center;"
      >
        <img width="90%" src="../images/dota_icons/aegis.png" />
      </div>
      <div v-if="isGem" style="align-content: center; justify-content: center;">
        <!--      -->
        <img width="90%" src="../images/dota_icons/gem.png" />
      </div>
      <!--        <h2>-->
      <!--          &lt;!&ndash;          {{ Math.floor(Aegis.time / 60) + ":" + Math.round(Aegis.time % 60) }}&ndash;&gt;-->
      <!--          4:51-->
      <!--        </h2>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "Person",
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

<style scoped>
video {
  width: 100%;
  height: 3.8vh;
  object-fit: cover;
}
#smokeV {
  transform: rotate(180deg);
}
</style>
