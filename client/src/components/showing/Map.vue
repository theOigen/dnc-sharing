<template>
  <div v-if="markerName !== 'Не определена'">
    <GmapMap
      style="width: 600px; height: 300px;"
      :zoom="13"
      :center="{lat: markerLat, lng: markerLng}"
    >
      <GmapMarker v-for="(marker, index) in markers" :key="index" :position="marker.position"/>
    </GmapMap>
  </div>
  <div v-else>Локация еще не пределена</div>
</template>

<script>
export default {
  props: {
    markerLat: {
      type: Number,
      default: 0
    },
    markerLng: {
      type: Number,
      default: 0
    },
    markerName: {
      type: String,
      default: "Не определена"
    }
  },
  data() {
    return {
      markers: []
    };
  },
  mounted() {
    if (this.markerName !== "Не определена") {
      this.markers.push({
        position: {
          lat: this.markerLat,
          lng: this.markerLng
        }
      });
    }
  }
};
</script>