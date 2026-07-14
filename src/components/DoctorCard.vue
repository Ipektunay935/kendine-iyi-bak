<template>
  <div class="doctor-card">
    <!-- Avatar -->
    <img
      :src="doctor.imageUrl || '/placeholder.png'"
      alt="profil"
      class="doctor-card__img"
    />

    <!-- İsim + Branş -->
    <div class="doctor-card__info">
      <h3 class="doctor-card__name">{{ doctor.name }}</h3>
      <p class="doctor-card__dept">{{ doctor.departmentName }}</p>
    </div>

    <!-- Görüntülü Görüşme bilgisi -->
    <div
      class="doctor-card__online"
      :class="{ available: doctor.canOnlineAppointment, unavailable: !doctor.canOnlineAppointment }"
    >
      <div class="video-call-container">
        <img
          v-if="doctor.canOnlineAppointment"
          src="/video-call.png"
          alt="Video Call"
          class="video-call-icon"
        />
        <span>
          {{ doctor.canOnlineAppointment ? 'Görüntülü Görüşme' : '' }}
        </span>
      </div>
    </div>

    <!-- Butonlar -->
    <div class="doctor-card__actions">
      <button class="btn-cv">Özgeçmiş</button>
      <button class="btn-appt">Randevu Al</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Doctor {
  id: string
  name: string
  departmentName: string
  canOnlineAppointment: boolean
  imageUrl?: string
}
defineProps<{ doctor: Doctor }>()
</script>

<style scoped>
/* ------- Desktop/Web (mevcut görünüm) ------- */
.doctor-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  gap: 1rem;
  color: #333;
}
.doctor-card__img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}
.doctor-card__info { flex: 1; text-align: left; }
.doctor-card__name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #333;
}
.doctor-card__dept {
  margin: 0.25rem 0 0;
  font-size: 0.85rem;
  color: #666;
}
.doctor-card__online {
  flex: 0 0 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  text-align: center;
  gap: 0.25rem;
  color: #333;
}
.video-call-container { display: flex; align-items: center; }
.video-call-container span { white-space: nowrap; }
.video-call-icon { width: 30px; height: 30px; margin-right: 8px; }

.doctor-card__online.available i { color: #00b894; }
.doctor-card__online.unavailable i { color: #000; }
.doctor-card__online i { font-size: 1.2rem; }

.doctor-card__actions { display: flex; gap: 0.5rem; }
.btn-cv, .btn-appt {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-cv { background: #74b9ff; }
.btn-appt { background: #a29bfe; }
.btn-cv:hover { background: #4aa1ff; }
.btn-appt:hover { background: #a29bfe; }

/* ------- Mobil (≤768px) — sadece kart düzeni ------- */
@media (max-width: 768px) {

  .doctor-card {
    display: grid !important;
    grid-template-columns: 56px 1fr !important;  /* avatar  içerik */
    grid-template-rows: auto auto auto;         
    gap: 8px 12px !important;
    align-items: start !important;

 
    padding: 12px !important;
    border: 1px solid #eee !important;
    border-radius: 16px !important;
    background: #fff !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    width: 100% !important;
  }

  /* Avatar solda, sabit */
  .doctor-card__img {
    grid-column: 1;
    grid-row: 1 / span 2;
    width: 56px !important;
    height: 56px !important;
    object-fit: cover !important;
    border-radius: 50% !important;
    flex: 0 0 auto;
  }

  /* İsim + Branş sağda */
  .doctor-card__info {
    grid-column: 2;
    grid-row: 1;
    min-width: 0; 
  }
  .doctor-card__name {
    margin: 0;
    font-weight: 700;
    color: #111;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;          
    -webkit-box-orient: vertical;
  }
  .doctor-card__dept {
    margin: 2px 0 0;
    color: #6b7280;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* “Görüntülü Görüşme” metniikonla hizalı */
  .doctor-card__online {
    grid-column: 2;
    grid-row: 2;
    justify-self: start;
    align-self: center;

    flex: initial !important;
    display: block !important;
  }
  .video-call-container {
    display: inline-flex !important;
    align-items: center !important;
    gap: 6px;
    max-width: 100%;
  }
  .video-call-container span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Butonlar alta */
  .doctor-card__actions {
    grid-column: 1 / -1;
    grid-row: 3;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 8px !important;
    flex-wrap: wrap !important;
    margin-top: 4px;
    position: static !important;  
  }
  .doctor-card__actions > * { flex: 0 0 auto; max-width: 100%; }
}
</style>
