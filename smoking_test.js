const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://only-stars.agency/'); 
  await page.waitForTimeout(6000);

  // Проверка открытия страницы (title не пустая)
  const pageTitle = await page.title();
  if (pageTitle) {
    console.log('Тест 1: Страница успешно открыта.');
  } else {
    console.error('Тест 1: Ошибка - Страница не была открыта.');
  }

  // Проверка текста в заголовке н3 (что именно та страница )
  const expectedText = 'What specifically do we give you ?'; 
  const h1Element = await page.$('h3');
  if (h1Element) {
    const textH1 = await h1Element.innerText();
    if (textH1.includes(expectedText)) {
      console.log(`Тест 2: Текст "${expectedText}" найден в заголовке H3.`);
    } else {
      console.error(`Тест 2: Ошибка - Текст "${expectedText}" отсутствует в заголовке H3.`);
    }
  } else {
    console.error('Тест 2: Ошибка - Не найден элемент H3.');
  }

  // Проверка кнопки 'Get Started Now'
  const button = await page.getByText('Get Started Now'); 
  if (button) {
    console.log('Тест 3: Кнопка найдена.');
    const isButtonVisible = await button.isVisible();
    if (isButtonVisible) {
      console.log('Тест 4: Кнопка видима.');
      const isButtonEnabled = await button.isEnabled();
      if (isButtonEnabled) {
        console.log('Тест 5: Кнопка кликабельна.');
        await button.click();
        console.log('Тест 6: Нажатие на кнопку выполнено.');
        // Проверка перехода на нужную страницу после нажатия кнопки
        await page.waitForTimeout(30000);
        //await page.waitForNavigation(); поставила вейт
        const currentURL = page.url();
        if (currentURL === 'https://only-stars.agency/contact/') { 
          console.log('Тест 7: Успешный переход на нужную страницу.');
        } else {
          console.error('Тест 7: Ошибка - Не произошел переход на нужную страницу.');
        }
      } else {
        console.error('Тест 5: Ошибка - Кнопка не кликабельна.');
      }
    } else {
      console.error('Тест 4: Ошибка - Кнопка не видима.');
    }
  } else {
    console.error('Тест 3: Ошибка - Кнопка не найдена.');
  }
/*
//Проверка отработки формы обратной связи (негатив). пока оптимизируют 
const yourNameInput = await page.waitForSelector('input[name="your-name"]', { timeout: 60000 });
  await yourNameInput.fill('qweqwe');
  await page.waitForTimeout(6000);
  const yourEmailInput = await page.waitForSelector('input[name="your-email"]', { timeout: 60000 });
  await yourEmailInput.fill('qweqwer');
  await page.waitForTimeout(6000);
  const yourMessageInput = await page.waitForSelector('input[name="your-message"]', { timeout: 60000 });
  await yourMessageInput.fill('asdfg dfgfd fgfdfg');
  await page.waitForTimeout(6000);

await page.click('button[name="submit"]'); 
await page.waitForSelector('.error-message'); //валид меседж ждем
const errorMessage = await page.textContent('div[class="wpcf7-response-output"]'); //извлекаем текст из элемента

// Ожидаемый текст сообщения об ошибке для сравнения
const expectedErrorMessage = 'One or more fields have an error. Please check and try again.';

// Проверяем, совпадает ли текст сообщения об ошибке с ожидаемым
if (errorMessage === expectedErrorMessage) {
  console.log('Тест прошел успешно: текст сообщения об ошибке совпадает с ожидаемым.');
} else {
  console.error('Тест не пройден: текст сообщения об ошибке не совпадает с ожидаемым.');
}
*/

// проверка работы 2й узловой, 2 элемента из списка
  // Клик на вторую вкладку
  const twoTab = await page.waitForSelector('li[id="menu-header_2-1841"]', { timeout: 6000 });
  if (twoTab) {
    await twoTab.click();
  } else {
    console.error('Элемент не найден или не кликабелен');
  }
  // Клик на второй элемент списка
  await page.click('li[id="menu-header_2-1848"]');
  // Ожидание перехода на новую страницу после клика
  const newPage = await context.waitForEvent('page');
  // Получение текста на открытой странице
  const pageText = await newPage.textContent('.H1');
  // Проверка наличия текста
  if (pageText && pageText.includes('Basic steps to follow when starting OnlyFans for a guy')) {
    console.log('Тест 8: Текст найден на открытой странице. Переход на 2ю вкладку состоялся.');
  } else {
    console.error('Тест 8: Текст не найден на открытой странице. Переход на 2ю вкладку не состоялся.');
  }

await browser.close();
})();