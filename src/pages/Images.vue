<template>
  <ChoiceSubCategory mode="images" />
</template>

<script>
import ChoiceSubCategory from "../components/ChoiceSubCategory.vue";

export default {
  name: "Images",
  components: {
    ChoiceSubCategory
  },
  methods: {
    onRejected(rejectedEntries) {
      // Notify plugin needs to be installed
      // https://quasar.dev/quasar-plugins/notify#Installation
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      });
    }
  }
};
</script>
