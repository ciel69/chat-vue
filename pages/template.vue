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
      <v-col md="5" cols="12">
        <ListMessage :items="items" />
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
import {v4 as uuidv4} from 'uuid';

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

  items: any[] = [
    {
      uid: uuidv4(),
      text: 'Какой-то текст',
      user: {
        firstName: 'User 1'
      },
      date: '11.12.19 11:23'
    },
    {
      uid: uuidv4(),
      text: 'Бертолетова соль монотонно возбуждает газообразный комплексный фторид церия. Континуальность художественного процесса, в том числе, аккумулирует полисахарид. Воображение стационарно имитирует атом, именно об этом комплексе движущих сил писал З.Фрейд в теории сублимации. Атом, по определению, неизменяем.',
      user: {
        firstName: 'User 1'
      },
      date: '11.12.19 11:23'
    },
    {
      uid: uuidv4(),
      text: 'Смысл жизни принимает во внимание онтологический гравитационный парадокс. Конфликт может быть получен из опыта.',
      user: {
        firstName: 'User 2'
      },
      date: '11.12.19 11:23'
    },
    {
      uid: uuidv4(),
      text: 'Знак, как принято считать, создает дуализм, учитывая опасность, которую представляли собой писания Дюринга для не окрепшего еще немецкого рабочего движения.',
      user: {
        firstName: 'User 2'
      },
      date: '11.12.19 11:23'
    },
    {
      uid: uuidv4(),
      text: 'Экситон притягивает вращательный лазер.',
      user: {
        firstName: 'User 3'
      },
      date: '11.12.19 11:23'
    },
    {
      uid: uuidv4(),
      text: 'Сознание многопланово отчуждает институциональный психоанализ.',
      user: {
        firstName: 'User 4'
      },
      date: '11.12.19 11:23'
    }
  ];

  created(): void {
    const length = 1000;

    for (let i = 0; i < length; i++) {
      this.items.push({
        uid: `unique_${i}`,
        text: Math.random() + ' text'
      });
    }
  }

  handleSend(message: string): void {
    // eslint-disable-next-line no-console
    console.log('handleSend', message);
  }

}

</script>

<style scoped>

</style>
