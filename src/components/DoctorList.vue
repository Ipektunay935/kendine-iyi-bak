<!-- src/components/DoctorList.vue -->
<template>
  <section class="doctor-list">
    <div
      v-for="facility in facilities"
      :key="facility.facilityId"
      class="facility-section"
    >
      <!-- Hastane Başlığı -->
      <div class="facility-header">
        <img
          :src="`/logos/${facility.facilityId}.png`"
          alt="logo"
          class="facility-logo"
        />
        <h2 class="facility-name">{{ facility.facilityName }}</h2>
      </div>

      <!-- Doktor Satırları -->
      <div class="doctor-rows">
        <div
          v-for="doc in facility.resources"
          :key="doc.id"
          class="doctor-row"
        >
          <!-- Sol: Avatar + İsim/Branş -->
          <div class="doctor-info">
            <img
              :src="doc.imageUrl || 'https://via.placeholder.com/40'"
              alt="profil"
              class="avatar"
            />
            <div class="info-text">
              <div class="name">{{ doc.name }}</div>
              <div class="dept">{{ doc.departmentName }}</div>
            </div>
          </div>

          <!-- Orta: Facetime Durumu -->
          <div
            class="doctor-online"
            :class="{ available: doc.canOnlineAppointment, unavailable: !doc.canOnlineAppointment }"
          >
            <i class="icon-video"></i>
            <span>
              {{ doc.canOnlineAppointment ? 'Görüntülü Görüşme' : 'Müsait Değil' }}
            </span>
          </div>

          <!-- Sağ: Butonlar -->
          <div class="doctor-actions">
            <button class="btn-cv">Özgeçmiş</button>
            <button class="btn-appt">Randevu Al</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Doctor {
  id: string
  name: string
  departmentName: string
  canOnlineAppointment: boolean
  imageUrl?: string
}
interface Facility {
  facilityId: string
  facilityName: string
  resources: Doctor[]
}

const props = defineProps<{
  facilities: Facility[]
}>()
</script>

<style scoped>
.doctor-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Hastane kutusu */
.facility-section {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
}

/* Hastane başlığı */
.facility-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.facility-logo {
  width: 32px;
  height: 32px;
  margin-right: 0.75rem;
  object-fit: contain;
}

.facility-name {
  font-size: 0.85rem; 
  font-weight: 300;   
  color: rgba(51, 51, 51, 0.6); 
}


/* Doktor satır konteyneri */
.doctor-rows {
  display: flex;
  flex-direction: column;
}

/* Doktor satırı */
.doctor-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-top: 1px solid #f0f0f0;
}
.doctor-row:first-child {
  border-top: none;
}

/* Sol: Avatar ve bilgi */
.doctor-info {
  display: flex;
  align-items: center;
  flex: 1;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.75rem;
}
.info-text .name {
  font-size: 0.95rem;
  font-weight: 500;
  color: #222;
}
.info-text .dept {
  font-size: 0.85rem;
  color: #666;
}

/* Orta: Facetime indikatörü */
.doctor-online {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  margin: 0 1rem;
  white-space: nowrap;
}
.doctor-online i {
  margin-right: 0.4rem;
}
.doctor-online.available {
  color: #00b894;
}
.doctor-online.unavailable {
  color: #d63031;
}

/* Sağ: Butonlar */
.doctor-actions {
  display: flex;
  gap: 0.5rem;
}
.btn-cv,
.btn-appt {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #fff;
  cursor: pointer;
}
.btn-cv {
  background: #74b9ff;
}
.btn-appt {
  background: #a29bfe;
}
.btn-cv:hover {
  background: #4aa1ff;
}
.btn-appt:hover {
  background: #8f82fc;
}

.cards, .facility-section{ overflow: visible; }
.facility-cards{ display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:14px; }
.doctor-card img{ max-width:100%; height:auto; }
@media (max-width: 576px){ .facility-cards{ grid-template-columns: repeat(2, minmax(0, 1fr)); gap:10px; } }
</style>