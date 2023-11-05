//npm install axios
const { chromium } = require('playwright');
const axios = require('axios');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    const response = await axios.get('https://only-stars.agency/');

    if (response.status === 200) {
      console.log( 'Тест 1: GET запрос выполнен успешно. Код состояния: 200');
    } else {
      console.error('Тест 1: Ошибка: Получен код состояния отличный от 200');
    }
  } catch (error) {
    console.error('Тест 1: Произошла ошибка при выполнении GET запроса:', error.message);
  }

  await browser.close();

  //тест 2. негатив. при введении несущ страницы, ответ 404

async function test404Error() {
  try {
    const response = await axios.get('https://only-stars.agency/nonexistent-page');
    if (response.status === 404) {
      console.log('Тест 2: Получена ожидаемая ошибка 404 (страница не найдена).');
    } else {
      console.error('Тест 2: Ошибка: Получен код состояния отличный от 404:', response.status);
    }
  } catch (error) {
    if (error.response && error.response.status !== 404) {
      console.error('Тест 2: Произошла ошибка при выполнении GET запроса:', error.message);
    } else {
      console.log('Тест 2: Получена ожидаемая ошибка 404 (страница не найдена).');
    }
  }
}

test404Error();

})();
