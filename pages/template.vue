<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-card class="pa-2">Column</v-card>
      </v-col>
      <v-col cols="2">
        <v-card class="pa-2">Column</v-card>
      </v-col>
      <v-col>
        <v-card class="pa-2">Column</v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="2">
        <v-text-field
          name="field"
          label="Поле"
          required
          value="Я - текстовое поле"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          name="field"
          label="Поле с подсказкой"
          hint="Текст подсказки"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          name="field"
          label="Поле"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          name="field-disabled"
          label="Не активное поле"
          required
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          name="field-disabled"
          label="Поле"
          value="Я - текстовое поле"
          required
          error
          :rules="['Текст ошибки']"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="auto">
        <v-btn
          type="submit"
          color="primary"
        >
          Кнопка
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn
          type="submit"
          color="primary"
          loading
        >
          Кнопка
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn
          type="submit"
          color="primary"
          disabled
        >
          Кнопка
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="auto">
          <v-btn
            icon
            color="primary"
            large
          >
            <v-icon large>mdi-send</v-icon>
          </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn
          icon
          color="primary"
          large
          loading
        >
          <v-icon large>mdi-send</v-icon>
        </v-btn>
      </v-col>
      <v-col md="auto">
        <v-btn
          icon
          color="primary"
          large
          disabled
        >
          <v-icon large>mdi-send</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="auto">
        <v-tabs>
          <v-tab v-ripple="{ class: 'primary--text' }">Item One</v-tab>
          <v-tab v-ripple="{ class: 'primary--text' }">Item Two</v-tab>
          <v-tab v-ripple="{ class: 'primary--text' }">Item Three</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator'

  @Component
  export default class Template extends Vue {

  }

</script>

<style scoped>

</style>
