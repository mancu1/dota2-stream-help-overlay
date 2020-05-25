<template>
  <div
    style="width: 100%; display: grid; grid-template-columns: repeat(5, 1fr);"
  >
    <div v-for="(player, key) in direArr" class="fill" :key="key">
      <person :hero="player" :items="direItemsArr[key]" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Person from "@/components/Person.vue";

@Component({
  name: "DireRoot",
  components: { Person }
})
export default class DireRoot extends Vue {
  @Prop() direHero: any | undefined;
  @Prop() direItems: any | undefined;

  get direArr(): any[] {
    return Object.values(this.direHero);
  }
  get direItemsArr(): any[] {
    return Object.values(this.direItems);
  }
}
</script>

<style scoped>
.fill {
  width: 100%;
  height: 100%;
}
</style>
