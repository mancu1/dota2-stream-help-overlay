<template>
  <div
    style="
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    "
  >
    <InventorySlot
      :item="Object.values(items[currentUser.team][currentUser.player])[i - 1]"
      v-for="i in 6"
      :key="i"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import InventorySlot from "@/components/InventorySlot.vue";

@Component({
  name: "Inventory",
  components: { InventorySlot },
})
export default class Inventory extends Vue {
  @Prop({ required: true }) currentUser!: {
    user: boolean;
    team: string;
    player: string;
  };
  @Prop({ required: true }) items!: any;
}
</script>

<style scoped></style>
