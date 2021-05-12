Vue.component('error-block', {
  props: ['error'],
  template: `
    <div class="error-block">
      <h1>Ошибка. Не удаётся выполнить запрос к серверу.</h1>
    </div>
  `
})