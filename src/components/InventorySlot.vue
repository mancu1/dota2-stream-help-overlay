<template>
  <div
    style="
      height: 4.5vh;
      font-size: 20px;
      margin: 0;
      padding: 0;
      color: #d46b25;
      text-shadow: 0 0 6px black;
      font-weight: bolder;
      font-family: 'Comic Sans MS', sans-serif;
    "
  >
    <div
      v-if="isAegis.isAegis"
      style="
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(55, 55, 55, 0.3);
      "
    >
      <!--        v-if="hero.smoked"-->
      <!--        <img width="100%" src="../images/dota_icons/smoke.png" />-->
      <div>
        {{
          Math.floor(isAegis.time / 60) + ":" + Math.round(isAegis.time % 60)
        }}
      </div>
      <!--      <video controls ref="videoAegis" width="100%" autoplay loop muted>-->
      <!--        <source :src="require('@/video/aegis-time.webm')" type="video/webm" />-->
      <!--      </video>-->
    </div>
    <!--    <div v-else>1</div>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
  name: "InventorySlot",
})
export default class InventorySlot extends Vue {
  @Prop({ required: true }) item!: any;

  mounted() {
    if (this.$refs.videoAegis)
      (this.$refs.videoAegis as HTMLVideoElement).currentTime = this.isAegis
        .isAegis
        ? 310 - Math.floor(this.isAegis.time)
        : 0;
  }

  get isAegis(): { time: number; isAegis: true } | { isAegis: false } {
    if (this.item && this.item.name == "item_aegis")
      return { time: Math.floor(this.item.time), isAegis: true };
    else return { isAegis: false };
  }
}
</script>

<style scoped>
video {
  width: 100%;
  height: 4.5vh;
}
</style>
