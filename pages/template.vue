<template>
  <div>
    <v-row>
      <v-col cols="12" md="2">
        <v-card class="pa-2">Column</v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card class="pa-2">Column</v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-2">Column</v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="2">
        <v-text-field
          name="field"
          label="Поле"
          required
          value="Я - текстовое поле"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field"
          label="Поле с подсказкой"
          hint="Текст подсказки"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field"
          label="Поле"
          required
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field-disabled"
          label="Не активное поле"
          required
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="2">
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
      <v-col cols="12" md="auto">
        <v-btn
          type="submit"
          color="primary"
        >
          Кнопка
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn
          type="submit"
          color="primary"
          loading
        >
          Кнопка
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
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
      <v-col cols="12" md="auto">
        <v-btn
          icon
          color="primary"
          large
        >
          <v-icon large>mdi-send</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn
          icon
          color="primary"
          large
          loading
        >
          <v-icon large>mdi-send</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
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
      <v-col cols="12" md="auto">
        <v-tabs>
          <v-tab v-ripple="{ class: 'primary--text' }">Item One</v-tab>
          <v-tab v-ripple="{ class: 'primary--text' }">Item Two</v-tab>
          <v-tab v-ripple="{ class: 'primary--text' }">Item Three</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4">
        <textarea-emoji></textarea-emoji>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'nuxt-property-decorator';
  // import {SVG} from '@svgdotjs/svg.js'

  import TextareaEmoji from '~/components/TextareaEmoji.vue';
  import Animation from '~/components/Animation.vue';

  @Component({
    components: {
      TextareaEmoji,
      Animation,
    }
  })
  export default class Template extends Vue {

    mounted(): void {
      // if (!this.$isServer) {
      //   const draw = SVG().addTo('#drawing').attr({fill: '#A26192'})
      //   draw.group().path('M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z')
      // }
    }
  }

</script>

<style scoped>

</style>
