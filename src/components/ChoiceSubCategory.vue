<template>
  <div class="q-pa-md">
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
          <q-tab-panel name="artisanat">
            <div class="text-h6 q-mb-lg">Artisanat</div>

            <q-select
              standout="bg-teal text-white"
              class="q-mb-lg"
              v-model="subcat.artisanat"
              :options="options.artisanat"
              label="Choisir une sous catégorie"
            />

            <template v-if="mode === 'images'">
              <q-uploader
                v-if="subcat.artisanat !== ''"
                class="q-mb-lg"
                url="http://localhost:4444/upload"
                label="Ajouter des images"
                multiple
                accept=".jpg, image/*"
                @rejected="onRejected"
              />

              <div
                v-if="subcat.artisanat !== ''"
                class="q-gutter-md row items-start"
              >
                <q-img
                  v-for="img in gallery"
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

          <q-tab-panel name="industrie">
            <div class="text-h6 q-mb-lg">Industrie</div>
            <q-select
              standout="bg-teal text-white"
              class="q-mb-lg"
              v-model="subcat.industrie"
              :options="options.industrie"
              label="Choisir une sous catégorie"
            />

            <template v-if="mode === 'images'">
              <q-uploader
                v-if="subcat.industrie !== ''"
                class="q-mb-lg"
                url="http://localhost:4444/upload"
                label="Ajouter des images"
                multiple
                accept=".jpg, image/*"
                @rejected="onRejected"
              />

              <div
                v-if="subcat.industrie !== ''"
                class="q-gutter-md row items-start"
              >
                <q-img
                  v-for="img in gallery"
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

          <q-tab-panel name="creation">
            <div class="text-h6 q-mb-lg">Création</div>
            <q-select
              standout="bg-teal text-white"
              class="q-mb-lg"
              v-model="subcat.creation"
              :options="options.creation"
              label="Choisir une sous catégorie"
            />

            <template v-if="mode === 'images'">
              <q-uploader
                v-if="subcat.creation !== ''"
                class="q-mb-lg"
                url="http://localhost:4444/upload"
                label="Ajouter des images"
                multiple
                accept=".jpg, image/*"
                @rejected="onRejected"
              />

              <div
                v-if="subcat.creation !== ''"
                class="q-gutter-md row items-start"
              >
                <q-img
                  v-for="img in gallery"
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

          <q-tab-panel name="ateliers">
            <div class="text-h6 q-mb-lg">Les Ateliers</div>
            <q-select
              standout="bg-teal text-white"
              class="q-mb-lg"
              v-model="subcat.ateliers"
              :options="options.ateliers"
              label="Choisir une sous catégorie"
            />

            <template v-if="mode === 'images'">
              <q-uploader
                v-if="subcat.ateliers !== ''"
                class="q-mb-lg"
                url="http://localhost:4444/upload"
                label="Ajouter des images"
                multiple
                accept=".jpg, image/*"
                @rejected="onRejected"
              />

              <div
                v-if="subcat.ateliers !== ''"
                class="q-gutter-md row items-start"
              >
                <q-img
                  v-for="img in gallery"
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
      tab: "artisanat",
      gallery: [],
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

<style scoped></style>
