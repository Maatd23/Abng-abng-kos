<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="flex justify-center min-h-screen">
      <div
        class="hidden bg-cover lg:block lg:w-2/5"
        style="
          background-image: url('https://merahputih.com/media/94/f1/8e/94f18ee03e8aa82e6ffae47e91907c6c.jpg');
        "
      ></div>

      <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
        <div class="w-full">
          <h1
            class="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white"
          >
            Lets add your bording house.
          </h1>

          <p class="mt-4 text-gray-500 dark:text-gray-400">
            Let’s get you all set up so you can verify your personal account and begin make a money.
          </p>

          <form @submit.prevent="handleSubmit">
            <div class="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                <input
                  v-model="dataInput.name"
                  type="text"
                  placeholder="Kosan Abang"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Rooms</label>
                <input
                  v-model="dataInput.rooms"
                  type="number"
                  placeholder="1 / 2"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Price</label>
                <input
                  v-model="dataInput.price"
                  type="number"
                  placeholder="5000000"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">Region</label>
                <input
                  v-model="dataInput.region"
                  type="text"
                  placeholder="Bandung"
                  class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div>
              <label class="block mb-2 mt-4 text-sm text-gray-600 dark:text-gray-200"
                >address</label
              >
              <input
                v-model="dataInput.address"
                type="text"
                placeholder="Bandung"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div>
              <label class="block mb-2 mt-4 text-sm text-gray-600 dark:text-gray-200"
                >img Url</label
              >
              <input
                v-model="dataInput.imgUrl"
                type="text"
                placeholder="Bandung"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div class="grid grid-cols-1 gap-6 mt-8">
              <div>
                <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >Facilities</label
                >
                <div class="flex flex-wrap items-center">
                  <label
                    v-for="(facility, index) in fasilitas"
                    :key="index"
                    class="inline-flex items-center mr-4 mb-2"
                  >
                    <input
                      v-model="facilityId"
                      :value="facility.id"
                      type="checkbox"
                      class="form-checkbox h-5 w-5 text-blue-500"
                    />
                    <span class="ml-2 text-gray-700 dark:text-gray-300">{{ facility.name }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="h-64 mt-3">
              <l-map :zoom="zoom" :center="[latitude, longitude]">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-marker
                  :draggable="true"
                  :lat-lng="markerLatLng"
                  @dragend="updateMarkerPosition"
                ></l-marker>
                <label for="latitude">Latitude:</label>
                <input type="text" :id="'latitude'" v-model="latitude" required />
                <br />
                <label for="longitude">Longitude:</label>
                <input type="text" :id="'longitude'" v-model="longitude" required />
              </l-map>
            </div>
            <div></div>

            <button
              class="mt-3 flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              <span>Sign Up </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet'
import { mapActions, mapState, mapWritableState } from 'pinia'
import { useKosanStore } from '../stores/kosan'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  data() {
    return {
      zoom: 15,
      dataInput: {
        name: '',
        address: '',
        rooms: '',
        region: '',
        price: '',
        imgUrl: '',
        latitude: '',
        longitude: ''
      },
      facilityId: [],
      latitude: -6.2088,
      longitude: 106.8456,
      markerLatLng: {
        lat: -6.2088,
        lng: 106.8456
      }
    }
  },
  computed:{
    ...mapState(useKosanStore, ['fasilitas'])
  },
  methods: {
    ...mapActions(useKosanStore, ['addKosan', 'fetchFasilitas']),
    updateMarkerPosition(event) {
      const marker = event.target
      const position = marker.getLatLng()
      this.latitude = position.lat
      this.longitude = position.lng
    },
    handleSubmit() {
      this.addKosan(this.dataInput, this.facilityId)
    }
  },
  watch: {
    latitude(newVal) {
      this.markerLatLng.lat = newVal
    },
    longitude(newVal) {
      console.log('New longitude:', newVal)
    }
  },
  created(){
    this.fetchFasilitas()
  }
}
</script>

<style></style>
