<template>
  <div
    class="relative overflow-hidden"
    style="background-color: rgb(240, 249, 253)"
  >
    <main class="mt-16 sm:mt-24">
      <div class="mx-auto max-w-7xl">
        <div class="relative mb-8">
          <h2
            class="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Adreswijziging
          </h2>
          <p class="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
            Een adreswijzing kan op verschillende manieren, aan het loket, via
            telefoon of online. We onderzoeken de twee laatste opties in deze
            missie.
          </p>
        </div>

        <div class="lg:grid lg:grid-cols-12 lg:gap-8">
          <div
            class="px-4 sm:px-6 md:max-w-2xl md:mx-auto lg:col-span-4 lg:text-left lg:flex lg:items-start"
          >
            <div v-if="allCards">
              <ul>
                <li
                  v-for="(t, key) in topics"
                  :key="`topic-${key}`"
                  class="shadow p-5 m-5 rounded bg-white"
                >
                  <h3 class="text-lg mb-2 leading-6 font-medium text-gray-800">
                    {{ t.title }}
                  </h3>
                  <p class="mt-2 max-w-4xl text-sm text-gray-400">
                    {{ t.descr }}
                  </p>
                  <ul class="divide-y divide-gray-200">
                    <li v-for="(c, key) in t.cards" :key="`card-${key}`">
                      <button
                        @click="setActiveCard(c - 1)"
                        class="block hover:bg-gray-50 w-full"
                      >
                        <div class="flex py-4">
                          <card-small
                            :active-card="allCards[c - 1]"
                            class="flex-grow"
                          ></card-small>

                          <div>
                            <!-- Heroicon name: solid/chevron-right -->
                            <svg
                              class="h-5 w-5 text-gray-400"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </button>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-16 sm:mt-24 lg:mt-0 lg:col-span-8">
            <div
              class="bg-white w-full sm:overflow-hidden shadow p-5 m-5 rounded bg-white"
            >
              <card :active-card="activeCard" :phases="phases"></card>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
// @ is an alias to /src
import card from '@/components/projects/card.vue';
import cardSmall from '@/components/projects/card-small.vue';
import axios from 'axios';

const gsheet_url =
  'https://spreadsheets.google.com/feeds/list/1hmVDMigpP_4vemHCFR4RKFdJVp30FCLqXa-_xLEzi1M/10/public/values?alt=json';

export default {
  name: 'Project',
  async asyncData({ $content, params, error }) {
    let post;
    try {
      
      post = await $content("projects", params.project).fetch();
    } catch (e) {
      error({ message: "Project not found" });
    }
    

    return { post };
  },
  data: function () {
    return {
      allCards: [],
      activeCard: {},
      phases: [
        {
          title: 'Zoeken  naar informatie',
          descr:
            'De gebruiker zoekt via een zoekmachine of de webpagina van Stad Gent naar informatie over adreswijziging.',
        },
        {
          title: 'Pagina "Adreswijziging"  ',
          descr:
            'De subpagina op stad.gent rond adreswijziging. Hier staat heel wat info rond adreswijzigingen, welke stappen de burgers moeten ondernemen, wat ze nodig hebben en welke uitzonderingen er hiervoor bestaan.',
        },
        {
          title: 'Identificatie',
          descr:
            'De gebruiker identificeert zich, dit kan op verschillende manieren.',
        },
        {
          title: 'Invullen gegevens',
          descr:
            'De gebruiker vult zijn/haar/hun gegevens in (bv. Naam, adres, datum van verhuis...).',
        },
        {
          title: 'Samenvatting',
          descr:
            'De gebruiker krijgt een samenvatting van alle gegevens die hij/zij/die heeft ingevuld. Hij/zij/die moet deze nu bevestigen.',
        },
        {
          title: 'Bevestiging',
          descr:
            'De gebruiker krijgt een bevestiging van de ingevulde gegevens.',
        },
        {
          title: 'E-mail',
          descr:
            'De gebruiker ontvangt de samenvatting en bevestiging per e-mail.',
        },
      ],
      topics: [
        {
          title: 'Copy',
          descr:
            'Tekst aanpassen of toevoegen om duidelijker te maken wat er gedaan moet worden.',
          cards: [17, 22, 23, 27, 31, 33],
        },
        {
          title: 'Gebruiksvriendelijkheid',
          descr:
            'Geen duidelijke fout of issue, maar kan beter gedesignde worden.',
          cards: [1, 3, 4, 13, 18, 21, 25, 26, 28],
        },
        {
          title: 'Screenreader',
          descr: 'Problemen bij het gebruik van een screenreader',
          cards: [2, 5, 6, 10, 11, 12],
        },
        {
          title: 'Flow',
          descr: 'Aanpassingen aan de algemene flow of journey',
          cards: [9],
        },
        {
          title: 'Foutmeldingen',
          descr: 'Problemen met het weergeven wanneer dingen fout gaan.',
          cards: [29, 30],
        },
      ],
    };
  },
  components: {
    card,
    cardSmall,
  },
  methods: {
    ...mapActions({
      getSheet: 'sheets/getSheet'
    }),
    setActiveCard(id) {
      this.activeCard = this.allCards[id];
    },
  },
  mounted() {
    this.getSheet()
    // axios.get(this.post.sheet).then((response) => {
    //   // Get Phases
    //   console.log(response)
    //   this.allCards = response.data.feed.entry;
    // });
  },
};
</script>
