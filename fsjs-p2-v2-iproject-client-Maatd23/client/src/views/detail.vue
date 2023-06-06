<template>
  <body>
    <div class="bg-gray-100 border shadow-xl rounded-lg overflow-hidden">
      <div class="container mx-auto py-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2">
              <img
                :src="kosan.imgUrl"
                alt="Kosan Image"
                class="w-full h-auto rounded-t-lg md:rounded-l-lg"
              />
            </div>
            <div class="md:w-1/2 px-4 py-6">
              <h2 class="text-3xl font-bold mb-4">{{ kosan.name }}</h2>
              <p class="text-lg text-gray-800 mb-4">{{ kosan.address }}</p>
              <div class="flex items-center mb-4">
                <svg
                  class="w-5 h-5 text-yellow-500 fill-current mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2L15.09 8.51L22 9.27L17 13.77L18.18 20L12 17.74L5.82 20L7 13.77L2 9.27L8.91 8.51L12 2M12 4.9L9.65 6.36L9 4.14L7.21 2.5L9.69 2.27L12 0L14.31 2.27L16.79 2.5L15 4.14L14.35 6.36L12 4.9M12 11.45L8.4 13.39L9.13 10.23L6.76 8.04L9.92 7.73L12 4.85L14.08 7.73L17.24 8.04L14.87 10.23L15.6 13.39L12 11.45Z"
                  />
                </svg>
                <p class="text-lg text-gray-700">{{ kosan.rooms }} Bedrooms</p>
              </div>
              <p class="text-lg text-gray-700 mb-4">Price: {{ formatCurency }}</p>
              <a
                v-if="!button"
                @click.prevent="transaksi(kosan.id)"
                href="#"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Sewa
              </a>
              <div v-if="button" class="mt-6 border bg-white p-6 shadow-md">
                <div class="mb-2 flex justify-between">
                  <p class="text-gray-700">Subtotal</p>
                  <p class="text-gray-700">{{formatCurency}}</p>
                </div>
                <hr class="my-4" />
                <div class="flex justify-between">
                  <p class="text-lg font-bold">Total</p>
                  <div class="">
                    <p class="mb-1 text-lg font-bold">{{tax}}</p>
                    <p class="text-sm text-gray-700">including TAX 2%</p>
                  </div>
                </div>
                <button
                @click.prevent="payman"
                  class="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                >
                  Check out
                </button>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-200 mt-8 ml-3">
            <h3 class="text-xl font-bold my-4">Description</h3>
            <p class="text-gray-700">
              Bebas Biaya Admin Kamu tidak akan dikenakan biaya admin saat melakukan pembayaran di
              Mamikos.
              <br />
              Pro Service Ditangani secara profesional oleh tim Mamikos. Selama kamu ngekos di sini,
              <br />
              ada tim dari Mamikos yang akan merespon saran dan komplainmu. Dikelola
              <br />
              Mamikos, Terjamin Nyaman Kos ini operasionalnya dikelola dan distandardisasi oleh
              Mamikos.
            </p>
          </div>
          <div class="border-t border-gray-200 mt-8 ml-3">
            <h3 class="text-xl font-bold my-4">Facilities</h3>
            <ul class="list-disc list-inside text-gray-700">
              <li v-for="facility in kosan.Facilities" :key="facility.id">{{ facility.name }}</li>
            </ul>
          </div>
          <div class="border-t border-gray-200 mt-8 ml-3">
            <h3 class="text-xl font-bold my-4">Location</h3>
            <div class="h-64">
              <l-map ref="map" v-model:zoom="zoom" :center="[kosan.longitude, kosan.latitude]">
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>
                <l-marker :lat-lng="[kosan.longitude, kosan.latitude]">
                  <l-icon :icon-url="homeIconUrl" :icon-size="[32, 32]"></l-icon>
                  <div class="headline">{{ kosan.name }}</div>
                </l-marker>
              </l-map>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker, LIcon } from '@vue-leaflet/vue-leaflet'

import { mapActions, mapState, mapWritableState } from 'pinia'
import { useKosanStore } from '../stores/kosan'
export default {
  data() {
    return {
      zoom: 15,
      homeIconUrl: 'https://openclipart.org/image/2400px/svg_to_png/217511/1429747035.png',
      button: false
    }
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  computed: {
    ...mapWritableState(useKosanStore, ['kosan', 'idpembayaran', 'price']),
    formatCurency() {
      return this.kosan.price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    tax(){
      let rupiah = (this.kosan.price * 0.02) + this.kosan.price
      return rupiah.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    }
  },
  methods: {
    ...mapActions(useKosanStore, ['oneKosan', 'addTransaksi', 'bayar']),
    transaksi(id){
      console.log('masuk')
      this.addTransaksi(id)
      this.button = !this.button
    },
    payman(id){
      this.idpembayaran = id
      this.price = this.kosan.price
      this.bayar()
      this.$router.push('/')
      
    }
  },
  created() {
    this.oneKosan(this.$route.params.id)
  }
}
</script>

<style></style>
