import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFiltersStore = defineStore('filters', () => {
  // Store arrays for DevTools/persistence friendliness
  const selectedFacilitiesArr = ref([])   // ['facilityId', ...]
  const paymentMethodsArr = ref([])       // ['SGK','Özel', ...]

  // Expose Sets to the app (API stays nice: .has())
  const selectedFacilities = computed(() => new Set(selectedFacilitiesArr.value))
  const paymentMethods = computed(() => new Set(paymentMethodsArr.value))

  const search = ref('')
  const onlineOnly = ref(false)
  const nightOnly = ref(false)
  const branch = ref('')
  const city = ref('')
  const language = ref('')

  function setSearch(v) { search.value = v }
  function setOnline(v) { onlineOnly.value = !!v }
  function setNight(v) { nightOnly.value = !!v }
  function setBranch(v) { branch.value = v || '' }
  function setCity(v) { city.value = v || '' }
  function setLanguage(v) { language.value = v || '' }

  function setFacility(id, checked) {
    if (checked) {
      if (!selectedFacilities.value.has(id)) selectedFacilitiesArr.value = [...selectedFacilitiesArr.value, id]
    } else {
      selectedFacilitiesArr.value = selectedFacilitiesArr.value.filter(x => x !== id)
    }
  }
  function toggleFacility(id) {
    setFacility(id, !selectedFacilities.value.has(id))
  }
  function clearFacilities(){ selectedFacilitiesArr.value = [] }

  function togglePayment(method){
    if (paymentMethods.value.has(method)) {
      paymentMethodsArr.value = paymentMethodsArr.value.filter(x => x !== method)
    } else {
      paymentMethodsArr.value = [...paymentMethodsArr.value, method]
    }
  }

  function reset(){
    search.value = ''
    onlineOnly.value = false
    nightOnly.value = false
    selectedFacilitiesArr.value = []
    branch.value = ''
    city.value = ''
    language.value = ''
    paymentMethodsArr.value = []
  }

  // For persistence or debugging (arrays, not Sets)
  const asPlain = computed(() => ({
    search: search.value,
    onlineOnly: onlineOnly.value,
    nightOnly: nightOnly.value,
    selectedFacilities: [...selectedFacilitiesArr.value],
    branch: branch.value,
    city: city.value,
    language: language.value,
    paymentMethods: [...paymentMethodsArr.value]
  }))

  return {
    // state
    search, onlineOnly, nightOnly, selectedFacilities, branch, city, language, paymentMethods,
    // underlying arrays (optional export if needed elsewhere)
    selectedFacilitiesArr, paymentMethodsArr,
    // actions
    setSearch, setOnline, setNight, setBranch, setCity, setLanguage,
    setFacility, toggleFacility, clearFacilities, togglePayment, reset,
    // helpers
    asPlain
  }
})
