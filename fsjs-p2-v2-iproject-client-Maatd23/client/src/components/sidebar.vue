<template>
  <div id="containerSidebar" class="z-2">
    <div class="navbar-menu relative z-2">
      <nav
        id="sidebar"
        class="fixed top-30 left-0 bottom-0 flex w-3/4 -translate-x-full flex-col overflow-y-auto bg-gray-100 pt-6 pb-6 sm:max-w-xs lg:w-70 mih-h-full"
      >
        <div class="px-4 pb-6">
          <h3 class="mb-2 text-xs font-medium uppercase">Filter</h3>
          <ul class="mb-4">
            <li
              v-for="facility in fasilitas"
              :key="facility.id"
              class="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                :id="`filter-${facility.id}`"
                class="form-checkbox text-gray-500"
                v-model="selectedFilters"
                :value="facility.id"
              />
              <label :for="`filter-${facility.id}`">{{ facility.name }}</label>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="mx-auto lg:ml-80"></div>
  </div>
  <!-- Sidebar end -->
</template>

<script>
import { mapActions, mapWritableState } from 'pinia'
import { useKosanStore } from '../stores/kosan'
export default {
  props: ['fasilitas'],
  data() {
    return {
      selectedFilters: []
    }
  },
  watch: {
    selectedFilters: function (newFilters, oldFilters) {
      console.log(newFilters)
      this.FacilityId = newFilters
      this.fecthKosan()
    }
  },
  computed: {
    ...mapWritableState(useKosanStore, ['FacilityId'])
  },
  methods: {
    ...mapActions(useKosanStore, ['fetchFasilitas', 'fecthKosan'])
  },
  created() {}
}
</script>

<style>
ul.breadcrumb li + li::before {
  content: '\276F';
  padding-left: 8px;
  padding-right: 4px;
  color: inherit;
}

ul.breadcrumb li span {
  opacity: 60%;
}

#sidebar {
  -webkit-transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);
  transition: all 300ms cubic-bezier(0, 0.77, 0.58, 1);
}

#sidebar.show {
  transform: translateX(0);
}

.main-content {
  margin-left: 34px;
  transition: transform 300ms cubic-bezier(0, 0.77, 0.58, 1);
}

.main-content.translate {
  display: grid;
  margin-right: 150px;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  transform: translateX(18%);
}
</style>
