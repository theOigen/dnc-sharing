<template>
  <mapa :markerName="marker" :markerLat="lat" :markerLng="lng"></mapa>
</template>

<script>
import Mapa from "./showing/Map";
export default {
  data() {
    return {
      marker: "провулок Електриків, 15, Київ, Украина, 02000",
      lat: 50.4809026,
      lng: 30.51126929999998
    };
  },
  components: {
    Mapa
  },
};
</script>