<template>
  <ChoiceSubCategory mode="contenu" />
</template>

<script>
import ChoiceSubCategory from "../components/ChoiceSubCategory.vue";

export default {
  name: "Contenu",
  components: {
    ChoiceSubCategory
  },
  data() {
    return {
      tab: "artisanat"
    };
  }
};
</script>
