<template>
    <q-layout view="hHh lpr fFf">
  
      <q-page-container>
        <router-view />
      </q-page-container>
  
      <q-footer reveal elevated class="bg-blue-8 text-white">
        <q-toolbar>
          <q-toolbar-title>
            <div>Pandu Sarma 223510113</div>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
  
    </q-layout>
  </template>
<script setup>
</script>
  
<style>
  .q-toolbar {
    padding: 0 75px !important;
  }
  .q-tab {
    padding: 0 20px !important;
    min-height: 75px !important;
  }
</style>