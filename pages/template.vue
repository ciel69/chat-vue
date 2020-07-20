<template>
  <div>
    <v-row>
      <v-col cols="12" md="2">
        <v-card class="pa-2">
          Column
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card class="pa-2">
          Column
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-2">
          Column
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="2">
        <v-text-field
          name="field"
          label="Поле"
          required
          value="Я - текстовое поле"
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field"
          label="Поле с подсказкой"
          hint="Текст подсказки"
          required
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field"
          label="Поле"
          required
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field-disabled"
          label="Не активное поле"
          required
          disabled
        />
      </v-col>
      <v-col cols="12" md="2">
        <v-text-field
          name="field-disabled"
          label="Поле"
          value="Я - текстовое поле"
          required
          error
          :rules="['Текст ошибки']"
        />
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
          <v-icon large>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn
          icon
          color="primary"
          large
          loading
        >
          <v-icon large>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="12" md="auto">
        <v-btn
          icon
          color="primary"
          large
          disabled
        >
          <v-icon large>
            mdi-send
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="auto">
        <v-tabs>
          <v-tab v-ripple="{ class: 'primary--text' }">
            Item One
          </v-tab>
          <v-tab v-ripple="{ class: 'primary--text' }">
            Item Two
          </v-tab>
          <v-tab v-ripple="{ class: 'primary--text' }">
            Item Three
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-row>
      <v-col md="12" cols="12">
        <v-label>Virtual scroll</v-label>
      </v-col>
      <v-col md="3" cols="12">
        <ListMessage />
      </v-col>
    </v-row>

    <v-row>
      <v-col md="4">
        <textarea-emoji
          @send="handleSend"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12" cols="12">
        <v-label>Mobile</v-label>
      </v-col>
      <v-col md="4" class="pb0">
        <textarea-emoji
          :is-mobile="true"
          @send="handleSend"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';

import TextareaEmoji from '~/components/TextareaEmoji/TextareaEmoji.vue';
import Animation from '~/components/Animation.vue';
import ListMessage from '~/components/ListMessage.vue';

@Component({
  components: {
    TextareaEmoji,
    ListMessage,
    Animation
  }
})
export default class Template extends Vue {

  handleSend(message: string): void {
    // eslint-disable-next-line no-console
    console.log('handleSend', message);
  }

}

</script>

<style scoped>

</style>
