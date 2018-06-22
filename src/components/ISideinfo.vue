<template>
    <v-navigation-drawer
      permanent
      right
      app
      hide-overlay
      dark
    >
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-content>
            <img src="../../public/boxnet_logo.png" height="25px">
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-for="info in infos" :key="info.id">
          <v-list-tile-avatar>
            <v-icon>{{ info.icon }}</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>{{ info.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ info.value }}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  props: ['infos']
}
</script>

<style>

</style>
