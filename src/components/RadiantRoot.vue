<template>
  <div
    style="width: 100%; display: grid; grid-template-columns: repeat(5, 1fr); align-content: center; justify-content: center"
  >
    <div v-for="(player, key) in radiantArr" class="fill" :key="key">
      <person :hero="player" :items="radiantItemsArr[key]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Person from "@/components/Person.vue";

@Component({
  name: "RadiantRoot",
  components: { Person }
})
export default class RadiantRoot extends Vue {
  @Prop() radiantHero: any | undefined;
  @Prop() radiantItems: any | undefined;

  get radiantArr(): any[] {
    return Object.values(this.radiantHero);
  }

  get radiantItemsArr(): any[] {
    return Object.values(this.radiantItems);
  }
}
</script>

<style scoped>
.fill {
  width: 100%;
  height: 100%;
}
</style>
