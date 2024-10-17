<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">Miya.</div>
      <ul class="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#resume">Resume</a></li>
        <li><a href="#work">Work</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <button class="hire-btn">Hire Me</button>
    </nav>
  </header>
</template>

<script setup>
// No logic needed for the header
</script>

<style scoped>
.header {
  background-color: #1b1b1b;
  padding: 20px;
  width: 100%;
  position: fixed; /* Makes the header stick to the top */
  top: 0;
  z-index: 1000;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.logo {
  font-size: 24px;
  color: #00ff66;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  padding: 0;
}

.nav-links li {
  margin: 0 20px; /* Space between links */
}

.nav-links a {
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover {
  color: #00ff66;
}

.hire-btn {
  background-color: #00ff66;
  border: none;
  padding: 10px 20px;
  border-radius: 20px; /* Rounded corners */
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
}

.hire-btn:hover {
  background-color: #00cc55;
}
</style>
