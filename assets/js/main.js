// 1. Добавлены обработчики на кнопки 'ADD TO CART', реализовано делегирование.
// 2. Реализован счетчик добавления в корзину товаров.
// 3. Реализована 2 секундная блокировка всех кнопок между нажатиями.
// 4. Получена цена из родительской ноды, распарсинная с помощью регулярки.
// 5. Цена выводится в кнопку вместо основного текста на время блокировки, затем восстанавливается исходное сообщение.
// 6. Реализован счет всех товаров, добавленных в корзину, учтена ошибка JS при работе с дробной частью.



const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

const btnClickHandler = (e) => {
  const target = e.target;

  if(target && target.matches('button.item-actions__cart')){

    cartCounterLabel.innerHTML = `${++cartCounter}`;
    if(cartCounter === 1) cartCounterLabel.style.display = "block";

    const mockData = +target
    .parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+)\s\D+(\d+).*$/u, '$1.$2');

    cartPrice = Math.round((cartPrice * 100) + (mockData * 100)) / 100;
    const restoreHTML = target.innerHTML;

    target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;
    target.disabled = true;
    contentContainer.removeEventListener('click', btnClickHandler);

    setTimeout(() => {
      target.innerHTML = restoreHTML;
      target.disabled = false;
      contentContainer.addEventListener('click', btnClickHandler);

    }, 2000)
  }
}

contentContainer.addEventListener('click', btnClickHandler);





















