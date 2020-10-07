import Vue from 'vue';

Vue.filter('isEmpty', function(item) {
  if (!item) return true;
  return !Object.keys(item).length;
});
