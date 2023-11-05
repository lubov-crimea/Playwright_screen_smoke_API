const { chromium } = require('playwright');
const resemble = require('resemblejs');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://only-stars.agency/'); // Замените на URL вашего тестируемого веб-сайта
  await page.waitForTimeout(6000);

  // Создание скриншота с датой и временем в имени файла для текущего результата
  const currentDate = new Date().toISOString().replace(/[-T:]/g, '_').split('.')[0];
  const actualImagePath = `actual_screenshot_${currentDate}.png`;
  await page.screenshot({ path: actualImagePath });

  // Ожидаемый скриншот
  const expectedImagePath = 'expected_screenshot.png';

  if (!fs.existsSync(expectedImagePath)) {
    // Если ожидаемый скриншот отсутствует, создаем его
    console.log('Ожидаемый скриншот отсутствует. Создание нового скриншота.');
    fs.copyFileSync(actualImagePath, expectedImagePath);
  }

  // Закрытие браузера
  await browser.close();

  // Сравнение скриншотов
  resemble(expectedImagePath)
    .compareTo(actualImagePath)
    .onComplete((comparison) => {
      console.log('Сравнение завершено');
      console.log('Различия:', comparison.misMatchPercentage);
    });
})();
