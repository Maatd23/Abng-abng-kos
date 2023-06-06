import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
export const useKosanStore = defineStore('kosan', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    kosans: [],
    fasilitas: [],
    FacilityId: [],
    totalPage: '',
    page: 1,
    kosan: null,
    idpembayaran: null,
    price: null,
    idTransaction: '',
    loader: false
  }),

  actions: {
    async handleLogin(dataInput) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/auth/login`,
          method: 'post',
          data: dataInput
        })
        localStorage.access_token = data.access_token
        localStorage.email = data.email
        localStorage.role = data.role
        this.router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: `welcome back ${data.email}`
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
      } finally {
        this.loader = false
      }
    },

    async handleRegisterOwner(dataInput) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/auth/registers/owner`,
          method: 'post',
          data: dataInput
        })
        this.router.push('/login')
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: `Your email has been saved`
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
      } finally {
        this.loader = false
      }
    },
    async handleRegister(dataInput) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/auth/registers/costumer`,
          method: 'post',
          data: dataInput
        })
        this.router.push('/login')
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: `Your email has been saved`
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
      } finally {
        this.loader = false
      }
    },
    async fecthKosan() {
      try {
        const { data } = await axios({
          url: `${this.baseUrl}/kosan`,
          method: 'get',
          params: {
            facility: this.FacilityId,
            page: this.page
          }
        })
        this.kosans = data.data
        this.totalPage = data.totalPage
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    },
    async fetchFasilitas() {
      try {
        const { data } = await axios({
          url: `${this.baseUrl}/facility`,
          method: 'get'
        })
        this.fasilitas = data
      } catch (err) {
        console.log(err)
      }
    },
    async oneKosan(id) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/kosan/${id}`,
          method: 'get'
        })
        this.kosan = data
      } catch (err) {
        console.log(err)
      } finally {
        this.loader = false
      }
    },
    async addKosan(dataInput, facility) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/kosan`,
          method: 'post',
          data: dataInput,
          headers: { access_token: localStorage.access_token },
          params: {
            FacilityId: facility
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'success',
          text: `Your kosan has been saved`
        })
        this.router.push('/')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
        this.router.push('/login')
      } finally {
        this.loader = false
      }
    },
    async addTransaksi(id) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/transiction`,
          method: 'post',
          headers: { access_token: localStorage.access_token },
          data: { KosanId: id }
        })
        this.idTransaction = data.id
      } catch (err) {
        this.router.push('/login')
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
      } finally {
        this.loader = false
      }
    },
    async bayar() {
      try {
        this.loader = true
        const { data } = await axios({
          url: this.baseUrl + '/generet-token',
          method: 'post',
          headers: { access_token: localStorage.access_token },
          data: { price: this.price }
        })
        const cb = this.changeStatus
        window.snap.pay(data.token, {
          onSuccess: function (result) {
            /* You may add your own implementation here */
            cb()
          }
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
      } finally {
        this.loader = false
      }
    },
    async changeStatus() {
      try {
        this.loader = true
        console.log(this.idTransaction)
        const data = await axios({
          url: this.baseUrl + '/transiction/' + this.idTransaction,
          method: 'patch',
          headers: { access_token: localStorage.access_token }
        })
        this.router.push('/')
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
        this.router.push('/login')
      } finally {
        this.loader = false
      }
    },
    async GoogleLogin(dataInput) {
      try {
        this.loader = true
        const { data } = await axios({
          url: `${this.baseUrl}/auth/google-sign-in`,
          method: 'post',
          headers: { google_token: dataInput.credential }
        })
        localStorage.access_token = data.access_token
        localStorage.email = data.email
        this.router.push('/')
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })

        Toast.fire({
          icon: 'success',
          title: 'Signed in successfully'
        })
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: `${err.response.request.statusText}`,
          text: `${err.response.data.message}`
        })
      } finally {
        this.loader = false
      }
    }
  }
})
