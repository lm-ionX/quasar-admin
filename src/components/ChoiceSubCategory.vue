<template>
  <div class="q-pa-md">
    <h3 v-if="mode === 'images'">Ajout, Suppression d'images</h3>
    <h3 v-else>Ajout, Suppression de contenu</h3>
    <div class="q-gutter-y-md">
      <q-card>
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="artisanat" label="Artisanat" />
          <q-tab name="industrie" label="Industrie" />
          <q-tab name="creation" label="Création" />
          <q-tab name="ateliers" label="Les Ateliers" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel :name="tab">
            <div class="text-h6 q-mb-lg">{{ title[tab] }}</div>

            <q-select
              standout="bg-teal text-white"
              class="q-mb-lg"
              v-model="subcat[tab]"
              :options="options[tab]"
              label="Choisir une sous catégorie"
            />

            <template v-if="mode === 'images'">
              <q-uploader
                v-if="subcat[tab] !== ''"
                class="q-mb-lg"
                :factory="uploadImages"
                label="Ajouter des images"
                multiple
                accept=".jpg, image/*"
                ref="uploader"
                @rejected="onRejected"
              />

              <div
                v-if="subcat[tab] !== ''"
                class="q-gutter-md row items-start"
              >
                <q-btn label="Voir la galerie" @click="loadImages()" />

                <q-img
                  v-for="img in images"
                  :key="img"
                  transition="fade"
                  :src="img"
                  style="width: 150px"
                  ratio="1"
                  spinner-color="white"
                  class="rounded-borders"
                />
              </div>
            </template>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </div>
</template>

<script>
import firebaseServices from "../services/firebase";

export default {
  name: "ChoiceSubCategory",
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      images: [],
      tab: "artisanat",
      gallery: [],
      title: {
        artisanat: "Artisanat",
        industrie: "Industrie",
        creation: "Créations",
        ateliers: "Ateliers"
      },
      subcat: {
        artisanat: "",
        industrie: "",
        creation: "",
        ateliers: ""
      },
      options: {
        artisanat: [
          "Gravure",
          "Email Grand Feu",
          "Peinture miniature",
          "Bijouterie - Joaillerie",
          "Anglage",
          "Sertissage",
          "Damasquinage",
          "Tampographie"
        ],
        industrie: ["Matières", "Equipements", "R&D", "Composants"],
        creation: ["Recherches", "Choix techniques", "Mise au net", "A à Z"],
        ateliers: [
          "Christophe Blandenier",
          "Entreprise formatrice",
          "Certifications",
          "Valeurs"
        ]
      }
    };
  },
  methods: {
    onRejected(rejectedEntries) {
      this.$q.notify({
        type: "negative",
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      });
    },
    loadImages() {
      const subcat = this.subcat[this.tab].toLowerCase();
      const { getImages } = firebaseServices;
      getImages(this.tab, subcat).then(result => (this.images = result));
      console.log(this.images);
    },
    uploadImages(files) {
      const subcat = this.subcat[this.tab].toLowerCase();
      const { saveImages } = firebaseServices;
      const success = saveImages(this.tab, subcat, files);
      const uploader = this.$refs.uploader;

      if (success) {
        this.$q.notify({
          type: "positive",
          message: `Vos images ont bien été enregistrées !`
        });
        uploader.removeQueuedFiles();
      } else {
        this.$q.notify({
          type: "negative",
          message: `Une erreur est survenue pendant l'enregistrement !`
        });
      }
    }
  }
};
</script>

<style scoped></style>
