import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import data from '../assets/doctors.json'
import { useFiltersStore } from './useFiltersStore'

export const useDirectoryStore = defineStore('directory', () => {
  // Raw data
  const facilities = ref(data)

  // Filters
  const filters = useFiltersStore()

  // Derived: facilities filtered by global filters
  const filteredFacilities = computed(() => {
    const q = (filters.search || '').toLowerCase()
    return facilities.value
      .map(f => ({
        ...f,
        resources: (f.resources || []).filter(d => {
          const name = (d.name || '').toLowerCase()
          const matchesSearch = !q || name.includes(q)
          const matchesOnline = !filters.onlineOnly || d.canOnlineAppointment
          const matchesNight = !filters.nightOnly || d.isInCall
          const matchesBranch = !filters.branch || d.departmentName === filters.branch
          const matchesCity = !filters.city || (f.city && f.city.toLowerCase() === filters.city.toLowerCase())
          const matchesLanguage =
            !filters.language ||
            (Array.isArray(d.languages) && d.languages.includes(filters.language)) ||
            (typeof d.language === 'string' && d.language.toLowerCase() === filters.language.toLowerCase())
            const matchesPayment =
         filters.paymentMethods.size === 0 ||
        [...filters.paymentMethods].some(m =>
             (Array.isArray(d.paymentOptions) && d.paymentOptions.includes(m)) ||
         (Array.isArray(f.paymentOptions) && f.paymentOptions.includes(m)) ||
         (typeof d.payment === 'string' && d.payment.toLowerCase().includes(String(m).toLowerCase()))
  )
          return matchesSearch && matchesOnline && matchesNight && matchesBranch && matchesCity  &&  matchesLanguage &&  matchesPayment 
        })
      }))
      .filter(f => f.resources.length > 0 && (
        filters.selectedFacilities.size === 0 || filters.selectedFacilities.has(f.facilityId)
      ))
  })

  // Flat list with facility meta attached
  const filteredDoctors = computed(() =>
    filteredFacilities.value.flatMap(f =>
      (f.resources || []).map(r => ({ ...r, facilityId: f.facilityId, facilityName: f.facilityName }))
    )
  )

  // Sorting (default: by name asc)
  const sortKey = ref('name')           // 'name' | 'departmentName' | etc.
  const sortDir = ref('asc')            // 'asc' | 'desc'
  const collator = new Intl.Collator('tr', { sensitivity: 'base' })
  const sortedFacilities = computed(() =>
    filteredFacilities.value.map(f => ({
      ...f,
      resources: [...(f.resources || [])].sort((a,b) => {
        const dir = sortDir.value === 'asc' ? 1 : -1
        return collator.compare(String(a[sortKey.value]||''), String(b[sortKey.value]||'')) * dir
      })
    }))
  )

  const sortedDoctors = computed(() => {
    const dir = sortDir.value === 'asc' ? 1 : -1
    return [...filteredDoctors.value].sort((a,b) =>
      collator.compare(String(a[sortKey.value]||''), String(b[sortKey.value]||'')) * dir
    )
  })

  function setSort(key, dir = 'asc') {
    sortKey.value = key
    sortDir.value = dir === 'desc' ? 'desc' : 'asc'
  }

  // Pagination (applies to flat doctor list)
  const page = ref(1)
  const pageSize = ref(24)
  const totalDoctors = computed(() => sortedDoctors.value.length)
  const totalPages = computed(() => Math.max(1, Math.ceil(totalDoctors.value / pageSize.value)))
  const pagedDoctors = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return sortedDoctors.value.slice(start, start + pageSize.value)
  })
  function setPage(p) { page.value = Math.min(Math.max(1, p), totalPages.value) }
  function nextPage() { setPage(page.value + 1) }
  function prevPage() { setPage(page.value - 1) }
  function setPageSize(n) { pageSize.value = Math.max(1, Number(n)||24); setPage(1) }

  // Keep page in range when filters change
  watch(() => totalPages.value, () => { if (page.value > totalPages.value) page.value = totalPages.value })

  // Branches & Cities
  const branches = computed(() => {
    const s = new Set(filteredDoctors.value.map(d => d.departmentName).filter(Boolean))
    return Array.from(s)
  })
  const cities = computed(() => ['Ankara', 'İstanbul', 'İzmir', 'Bursa'])

  return {
    facilities,
    // filters-derived
    filteredFacilities,
    filteredDoctors,
    // sorting
    sortKey, sortDir, setSort,
    sortedFacilities, sortedDoctors,
    // pagination
    page, pageSize, totalDoctors, totalPages, pagedDoctors, setPage, nextPage, prevPage, setPageSize,
    // metadata
    branches, cities,
  }
})