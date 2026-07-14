<template>
  
  <Navbar />

  <!--  Subbar: dropdowns + search, right under the navbar -->
<div class="subbar">
  <div class="search-group">
    <select v-model="branch">
      <option value="">Branş Seçin</option>
      <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
    </select>

    <select v-model="city">
      <option value="">Şehir Seçin</option>
      <option v-for="c in cities" :key="c" :value="c">{{ c }}</option>
    </select>

    <button class="btn-search">
      <img src="/search.png" alt="Search" class="search-icon" />
    </button>
  </div>
</div>

  <!--  Breadcrumb + Görünüm / Sırala controls -->
<div class="breadcrumb-row">
  <!-- Mobile Filter Button -->
  <button class="btn-filter" @click="showFilters = true">
      <img src="/list2.png" alt="Filter" class="button-icon" />

    Filtreler
  </button>
  <div class="breadcrumb filters-status">
  {{ branch || 'Branş Seçilmedi' }} · {{ city || 'Şehir Seçilmedi' }}
</div>
  <div class="breadcrumb-controls">
    <button class="ctrl-btn view-btn">  
      <img src="/list.png" alt="List Icon" class="button-icon" />
      Görünüm <i class="icon-filter"></i>
    </button>
    <button class="ctrl-btn sort-btn">
      <img src="/list2.png" alt="Sort Icon" class="button-icon" />
      Sırala <i class="icon-sort"></i>
    </button>
  </div>
</div>


  <!--  Main content: Sidebar + Doctor sections -->
  <div class="layout">
    <aside class="sidebar-wrapper">
      <SideBar
    
      />
    </aside>
    <main class="content">
       <!-- hiç bir şey eşleşmezse kaybolmak yerine.. -->
    <div v-if="filteredFacilities.length === 0" class="no-results">
      Seçilen kriterlere uygun doktor bulunamadı.
    </div>

     <section
        v-for="facility in filteredFacilities"
        :key="facility.facilityId"
        class="facility-section"
      >
        <div class="facility-header">
          <img src="/medipol.png" alt="Medipol Logo" class="facility-logo" />
          <h2 class="facility-name">{{ facility.facilityName }}</h2>
        </div>
    <div class="doctors-list">
  <div
    class="card-wrap"
    v-for="doc in facility.resources"
    :key="doc.id"
  >
    <DoctorCard :doctor="doc" class="doctor-card" /> 
    
  </div>
</div>

      </section>
    </main>
  </div>

  <!-- Mobile Filters Modal -->
  <div class="modal-backdrop" v-if="showFilters" @click.self="showFilters=false">
    <div class="modal-panel">
      <div class="modal-header">
        <h3>Filtreler</h3>
        <button class="modal-close" @click="showFilters=false">✕</button>
      </div>
      <div class="modal-body">
        <SideBar />
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const showFilters = ref(false)

import { storeToRefs } from 'pinia'


import Navbar from './components/Navbar.vue'
import SideBar from './components/SideBar.vue'
import DoctorCard from './components/DoctorCard.vue'

import { useDirectoryStore } from './stores/useDirectoryStore'
import { useFiltersStore } from './stores/useFiltersStore'

// Stores
const directory = useDirectoryStore()
const filtersStore = useFiltersStore()

// Directory'den okunanlar (liste ve meta)
const {
  branches,
  cities,
  facilities,
  filteredFacilities,   // gruplu görünüm için
} = storeToRefs(directory)

// Filtre store'dan doğrudan kullanacağın alanlar

const {
  branch,
  city,
  search,
  onlineOnly,
  nightOnly,
  selectedFacilities,
  language,
  paymentMethods,
} = storeToRefs(filtersStore)
</script>



<style>
/* 0) Reset body & make room for navbar */
body, #app {
  margin: 0;
  background: #fff;
  padding-top: 50px;
  padding-left: 70px;
  padding-right: 70px;
  padding-bottom: 70px; 
  background: #fff;
}
@media (max-width: 1200px) {
  body, #app {
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px; 
  }
}

.subbar {
  display: flex;
  justify-content: center;     
  padding: 0.75rem 1rem;
  background: #fff;
  border-bottom: 1px solid #ececec;

}
.subbar select {
  padding: 0.4rem 0.8rem;
  border: 1px solid #444;
  border-radius: 4px;
  background: #ffffff;
  color: #000000;
}
.search-group {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;         
  background: #fff;
}
.search-group select {
  appearance: none;
  -webkit-appearance: none;
  padding: 0.5rem 1rem;
  border: none;
  background: #fff;
  font-size: 0.95rem;
  color: #333;
}
.search-group select + select {
  border-left: 1px solid #ccc;
}
.search-group select + .btn-search,
.search-group select + select + .btn-search {
  border-left: 1px solid #ccc;
}
.search-group .btn-search {
  background: #6c5ce7;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.search-group .search-icon {
  width: 1.2rem;
  height: 1.2rem;
}
.btn-search {
  background: #6c5ce7;
  border: none;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
.search-icon {
  width: 20px; 
  height: 20px;
  object-fit: cover;

}


/* 2) Breadcrumb + controls */
.breadcrumb-row {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #ececec;
}
.breadcrumb {
  font-size: 1.1rem;
  color: #3d184e;
}
.breadcrumb-controls .ctrl-btn {
  margin-left: 0.75rem;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
}
.view-btn {
  background: #e3e6e9;
}
.sort-btn {
  background: #e6e6eb;
}
.button-icon {
  width: 16px; 
  height: 16px;
  margin-right: 8px; 
  vertical-align: middle; 
}

/* 3) Main layout */
.layout {
  display: flex;
  align-items: flex-start;   
  gap: 1rem;
  padding: 1rem;
  background: #fff;
}
.sidebar-wrapper {
  flex: 0 0 auto;
}
.content {
  flex: 1;
  min-height: 300px;          
  background: #fff;
}

/* 4) Facility sections */
.sidebar *{ box-sizing: border-box; }
.facility-list{ display:grid; gap:6px; max-height:220px; overflow:auto; padding-right:4px; }
.facility-item{ display:flex; gap:8px; align-items:center; }

.facility-section {
  margin-bottom: 2rem;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
}
.facility-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}
.facility-logo {
  width: 128px;
  height: 20px;
  margin-right: 0.75rem;
}
.facility-name {
  font-size: 1.1rem;
  color: #333;
}

/* 5) Doctors list vertical */
.doctors-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/*  responsive enhancements*/

/* subbbar wrap on small screens */
@media (max-width: 992px) {
  .subbar .search-group {
    flex-wrap: wrap;
    gap: 8px;
  }
  .subbar select {
    flex: 1 1 160px;
    min-width: 140px;
  }
}

/* pagelayout stack sidebar on small screens */
@media (max-width: 992px) {
  .page {
    display: block;
  }
  .sidebar {
    position: static;
    width: auto;
    max-width: 100%;
    margin-bottom: 14px;
  }
  .content {
    width: 100%;
  }
}

/* cards tighter min width on phones */
@media (max-width: 576px) {
  .cards {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 10px;
  }
}

/* typography gets smaller on small screen */
@media (max-width: 576px) {
  .facility-title {
    font-size: 1rem;
  }
  .doctor-card__name {
    font-size: 1rem;
  }
}

/* nsure navbar/subbar stickiness doesn't overlap content */
@media (max-width: 768px) {
  body, #app {
    padding-top: 56px;
  }
}


/* === Mobile Filter Modal & Controls === */
.btn-filter{ display:none; align-items:center; gap:8px; padding:8px 12px; border:1px solid #e5e7eb; border-radius:10px; background:#fff; box-shadow:0 1px 2px rgba(0,0,0,.05); font-weight:600; }
.modal-backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.45); display:flex; align-items:flex-end; justify-content:center; z-index:1000; }
.modal-panel{ width:100%; max-height:85vh; background:#fff; border-top-left-radius:16px; border-top-right-radius:16px; box-shadow:0 -8px 30px rgba(0,0,0,.2); overflow:auto; }
.modal-header{ display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid #eee; }
.modal-body{ padding:12px 16px; }
.modal-close{ background:#f3f4f6; border:none; border-radius:8px; padding:6px 10px; cursor:pointer; }
.cards, .doctor-grid, .content{ min-width:0; }
img{ max-width:100%; height:auto; }
@media (max-width: 992px){ .sidebar-wrapper{ display:none; } .breadcrumb-controls{ display:none; } .btn-filter{ display:inline-flex; } .layout{ grid-template-columns: 1fr !important; } body, #app{ padding-left:16px; padding-right:16px; padding-bottom:24px; } .subbar{ overflow-x:auto; } }
@media (max-width: 576px){ .cards{ grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; } }
 /* MOBİL FİX */
@media (max-width: 768px) {
  /* ———Yatay taşmayı tamamen kes (zoom-out ihtiyacını giderir) ——— */
  html, body, #app { max-width: 100%; overflow-x: hidden; }

  /* ———SEARCH BARaynı satır + tam ortalama + küçük ——— */
  .subbar { padding: 6px 12px; }
  .subbar .search-group {
    display: grid !important;
    grid-template-columns: 1fr 1fr auto !important; 
    align-items: center !important;
    justify-items: center;
    width: 100%;
    max-width: 360px;      
    margin: 0 auto;      
    gap: 8px;
  }
  .subbar select {
    width: 100%;
    height: 36px !important;
    line-height: 36px !important;
    font-size: 13px !important;
    padding: 0 10px !important;
    border: none !important; /* gruptaki border’ı dış çerçeve veriyor */
  }
  .subbar .btn-search {
    height: 36px !important;
    padding: 0 10px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-left: 1px solid #ccc !important; 
  }
  .subbar .search-icon { width: 18px; height: 18px; display: block; }

  /* ——— “Filtreler” butonu solda, status yazısı ortada/küçük ——— */
  .breadcrumb-row { flex-direction: column; align-items: stretch; gap: 6px; }
  .btn-filter { align-self: flex-start; }
  .filters-status { text-align: center; font-size: 12px; color: #6b7280; }

  
  .card-wrap { border: none !important; padding: 0 !important; background: transparent !important; }

  /* DoctorCard’ın kökü tek çerçeve buradan veriliyor */
  :deep(.doctor-card),
  .doctors-list > * {               
    border: 1px solid #eee !important;
    border-radius: 16px !important;
    background: #fff !important;
    padding: 12px !important;
    box-sizing: border-box;
    overflow: hidden !important;    /* taşmaları kes */
    width: 100%;
  }

  /* ——— Görsel daire ve doğru boy ——— */
  :deep(.doctor-card img:first-of-type),
  .doctors-list > * img:first-of-type {
    width: 56px !important;
    height: 56px !important;
    object-fit: cover !important;
    border-radius: 50% !important;
    flex: 0 0 auto;
  }

  /* ——— İç düzen: metinler görünür,btn’ler taşma——— */
  /* adı sola, aksiyonları sağa */
  :deep(.doctor-card),
  .doctors-list > * {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
  }
  :deep(.doctor-card > *),
  .doctors-list > * > * { min-width: 0; }

  /* 2 satıra kadar izin ver */
  :deep(.doctor-card .name),
  :deep(.doctor-card h3),
  .doctors-list > * h3 {
    font-weight: 700;
    color: #111;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;         /* 2 satırda kes */
    -webkit-box-orient: vertical;
  }
  /* Alt metinler tek satır ellipsis */
  :deep(.doctor-card .meta),
  :deep(.doctor-card p),
  .doctors-list > * p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Aksiyon/rozet grupları sağda, dar alanda sarma yap */
  :deep(.doctor-card .actions),
  :deep(.doctor-card .right),
  :deep(.doctor-card .cta),
  :deep(.doctor-card .row),
  .doctors-list > * [class*="actions"],
  .doctors-list > * [class*="cta"],
  .doctors-list > * [class*="btn-group"] {
    margin-left: auto;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 8px !important;
    flex-wrap: wrap !important;     /* taşma yerine alt satıra iner */
    min-width: 0 !important;
    position: static !important;    
    float: none !important;
  }
  :deep(.doctor-card button),
  :deep(.doctor-card .badge),
  .doctors-list > * button { flex: 0 0 auto; }

  /* Kötü aktarılan “absolute rozet”leri içeri almak için emniyet kemeri */
  .doctors-list [class*="badge"],
  .doctors-list [class*="Randevu"],
  .doctors-list [class*="Özgeçmiş"],
  .doctors-list [class*="ozgec"],
  .doctors-list [class*="randevu"] {
    position: static !important;
  }

  /* Liste aralığı */
  .doctors-list { display: flex; flex-direction: column; gap: 12px; }
}




</style>