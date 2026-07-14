<template>
  <div class="sidebar">
    <h3 class="sidebar__title">Filtreler</h3>

  <div class="sidebar__search">
  <input
    v-model="search"
    type="text"
    placeholder="Doktor Adı ile Ara"
    class="sidebar__search-input"
  />
  <img src="/search2.png" alt="" class="sidebar__search-icon" />
</div>

<div class="toggles">
  <label class="toggle-row">
    <span>Online Görüşmeye Uygun Olanları Göster</span>
    <input type="checkbox" v-model="onlineOnly" class="toggle" />
  </label>

  <label class="toggle-row">
    <span>Gece Nöbetçi Olanları Göster</span>
    <input type="checkbox" v-model="nightOnly" class="toggle" />
  </label>
</div>


    <h4 class="sidebar__section-title">Hastaneler</h4>
    <div class="facility-list" v-if="facilities && facilities.length">
      <label v-for="f in facilities" :key="f.facilityId" class="facility-item">
        <input
          type="checkbox"
          :checked="selectedFacilities.has(f.facilityId)"
          @change="onFacilityChange(f.facilityId, $event)"
        />
        {{ f.facilityName }} ({{ (f.resources && f.resources.length) || 0 }})
      </label>
    </div>
    <p v-else class="muted">Hastane bulunamadı.</p>

    <h4 class="sidebar__section-title">Dil Seç</h4>
    <select v-model="language">
      <option value="">Tümü</option>
      <option value="TR">Türkçe</option>
      <option value="EN">İngilizce</option>
    </select>

    <h4 class="sidebar__section-title">Ödeme Yönetimi</h4>
    <label><input type="checkbox" :checked="paymentMethods.has('SGK')" @change="onPaymentChange('SGK')" /> SGK</label>
    <label><input type="checkbox" :checked="paymentMethods.has('Özel')" @change="onPaymentChange('Özel')" /> Özel</label>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDirectoryStore } from '../stores/useDirectoryStore'   
import { useFiltersStore } from '../stores/useFiltersStore'       

const directory = useDirectoryStore()
const filters = useFiltersStore()

const { facilities } = storeToRefs(directory)
const {
  search, onlineOnly, nightOnly, selectedFacilities,
  language, paymentMethods, branch, city
} = storeToRefs(filters)

function onFacilityChange(id, e) {
  filters.setFacility(id, e.target.checked)
}
function onPaymentChange(method) {
  filters.togglePayment(method)
}
</script>

<style scoped>
/* Kapsayıcı kart */
.sidebar{
  width: 280px;
  position: sticky;
  top: 112px;                 
  align-self: start;
  background: #fff;
  border: 1px solid #ececf3;
  border-radius: 16px;        /* daha yumuşak köşe */
  box-shadow: 0 1px 2px rgba(17,24,39,.04);
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 0;                     
  text-align: left;
   color-scheme: light; 
}
.sidebar, .sidebar *:where(:not(svg, path)) {
  color: #1f2937;                /* slate-800 */
}

/* Başlıklar */
.sidebar__title{
  color: #6c5ce7;
  font-weight: 700;
  font-size: 18px;
  margin: 4px 2px 10px;
}
.sidebar__section-title{
  color: #6c5ce7;
  font-weight: 700;
  font-size: 16px;
  margin: 10px 2px 8px;
}

/* --- Bölüm çizgileri --- */
.sidebar__search{
  position: relative;
  padding: 10px 2px 14px;
  border-bottom: 1px solid #ececf3;
}
.toggles{ padding: 12px 2px; border-bottom: 1px solid #ececf3; }
.facility-block{ padding: 12px 2px; border-bottom: 1px solid #ececf3; } 
.select-block{ padding: 12px 2px; border-bottom: 1px solid #ececf3; }  
.payment-block{ padding: 12px 2px; }                                   

/* Arama */
.search-input{
  width: 100%;
  padding: 10px 36px 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
}
.sidebar__search-icon{
  position: absolute;
  right: 12px;
  top: 0;
  bottom: 0;
  margin: auto 0;               /* dikey merkez */
  width: 18px;
  height: 18px;
  opacity: .6;
  pointer-events: none;         /* tıklamayı engellemesin */
}
.sidebar__search-input{
  width: 100%;
  padding: 10px 40px 10px 12px;  /* sağa ikon için boşluk */
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  outline: none;
}
.search-input,
.sidebar__search-input,
select {
  background: #fff !important;
  color: #1f2937 !important;
  border-color: #e5e7eb;
}
.search-input::placeholder,
.sidebar__search-input::placeholder {
  color: #9ca3af;                /* slate-400 */
}
.sidebar__search-input::placeholder{ color:#a0a7b4; }
.search-input::placeholder{ color:#a0a7b4; }
.search-icon{
  position: absolute;
  right: 12px; top: 50%; transform: translateY(-50%);
  width: 18px; height: 18px; opacity: .6;
}

/* Toggle bloğu */
.toggles{
  padding: 12px 2px;
  border-bottom: 1px solid #ececf3;
  display: grid;
  gap: 8px;
}

/* Metin solda, switch sağda */
.toggle-row{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.toggle-row span{
  flex: 1;
  text-align: left;
  line-height: 1.35;
  font-size: 14px;
  color: #1f2937; /* görünür metin */
}


.toggle{
  -webkit-appearance: none;
  appearance: none;
  width: 44px;
  height: 24px;
  border-radius: 999px;
  position: relative;
  cursor: pointer;
  outline: none;
  background: #f3f4f6;                 
  border: 1px solid #e5e7eb;           
  box-shadow: inset 0 1px 2px rgba(5, 7, 11, 0.06); 

  transition: background-color .2s ease, border-color .2s ease;
}
.toggle::after{
  content: "";
  position: absolute;
  top: 2px;
  left: 0px;
  width: 18px;
  height: 19px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(17,24,39,.12), 0 0 0 1px rgba(17,24,39,.06);
  transition: transform .2s ease;
}


.toggle:checked{
  background: #8e7cf0;             
  border-color: #7f6be7;
  box-shadow: inset 0 1px 2px rgba(17,24,39,.06), inset 0 0 0 1px rgba(127,107,231,.18);
}


.toggle:checked::after{ transform: translateX(20px); }


.toggle:focus-visible{
  outline: none;
  box-shadow: 0 0 0 3px rgba(142,124,240,.25);
}


/* Hastaneler listesi */
.facility-list{
  display: grid;
  gap: 10px;
  max-height: 260px;              /* görseldeki uzunluğa yakın */
  overflow: auto;
  padding-right: 6px;
}
.facility-item{
  display: flex;
  align-items: flex-start;
  gap: 10px;
  line-height: 1.35;
  font-size: 14px;
}
.facility-item input[type="checkbox"]{ margin-top: 2px; }
.facility-item,
.facility-item label,
.facility-block label {
  color: #1f2937;                /* metin görünür kalsın */
}
.facility-item input[type="checkbox"],
.payment-block input[type="checkbox"] {
  accent-color: #6c5ce7;         /* mor tik */
  background: #fff;
  border: 1px solid #d1d5db;
}

/* Scrollbar daha ince */
.facility-list::-webkit-scrollbar{ width: 6px; }
.facility-list::-webkit-scrollbar-thumb{
  background: #e5e7eb; border-radius: 999px;
}
.facility-list::-webkit-scrollbar-track{
  background: transparent;
}

/* Dil & Ödeme alanları */
select{
  width:100%;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: #fff;
  color:#111827;
}
.payment-block label{
  display:flex; align-items:center; gap:10px;
  font-size:14px;
  padding:6px 0;
    color: #1f2937;
}

:host, .sidebar{ overflow: visible; }
@media (max-width: 992px){
  .sidebar{
    width: 100% !important;
    max-width: 100% !important;
    box-shadow: none;
    padding: 8px 0;
  }
}



/* sidebar visibility & color fixes on mobile  */
.sidebar { color-scheme: light; }
.sidebar, .sidebar *:where(:not(svg, path)) { color: #1f2937; }
.sidebar input, .sidebar select { background: #fff !important; color: #1f2937 !important; }
.sidebar .facility-item input[type="checkbox"],
.sidebar .payment-block input[type="checkbox"] {
  accent-color: #6c5ce7;
}
</style>


