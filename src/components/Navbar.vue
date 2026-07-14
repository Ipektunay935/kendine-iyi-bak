<template>
  <header class="navbar">
    <div class="navbar__logo">
      <img src="/kib.png" alt="Kendine İyi Bak Logo" class="navbar__logo-img" />
    </div>

    <!-- Hamburger (mobil) -->
    <button class="navbar__burger" @click="isOpen = !isOpen" aria-label="Menüyü Aç/Kapat">☰</button>

    <!-- Menü -->
    <nav class="navbar__menu" :class="{ open: isOpen }">
      <a href="#">Anasayfa</a>
      <a href="#">Özellikler</a>
      <a href="#">Sağlıklı Yaşam</a>
      <a href="#">Hakkımızda</a>
      <a href="#">Bize Ulaşın</a>
    </nav>

    <!-- Sağ aksiyonlar (masaüstünde) -->
    <div class="navbar__actions">
      <button class="btn register">Kayıt Ol</button>
      <button class="btn login">Giriş Yap</button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #6c5ce7;
  color: white;
  padding: 0.75rem 1.5rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
.navbar__logo-img{ width:200px; height:40px; object-fit:contain; }

/* Varsayılan: masaüstü görünümü */
.navbar__burger{ display:none; }
.navbar__menu{ display:flex; gap:16px;text-align: center; }
.navbar__menu a{ color:#fff; text-decoration:none; font-weight:600; }
.navbar__actions .btn{
  margin-left:8px; border:none; border-radius:10px; padding:8px 12px; cursor:pointer;
}
.register{ background:#fff; color:#6c5ce7; }
.login{ background:#a29bfe; color:#fff; }

/* Mobil */
@media (max-width: 992px){
  .navbar{ position:fixed; }
  .navbar__burger{
    display:inline-block;
    margin-left:auto;
    background:#fff; color:#6c5ce7;
    border:1px solid #e5e7eb; padding:6px 10px; border-radius:10px; font-size:18px;
  }
  .navbar__menu{
    display:none;
    
    position:absolute; top:56px; left:0; right:0;
    background:#fff; border-top:1px solid #eee; padding:10px 16px;
    flex-direction:column; gap:10px;
  }
  .navbar__menu a{ color:#374151; }
  .navbar__menu.open{ display:flex; }
  .navbar__actions{ display:none; }
}
</style>
