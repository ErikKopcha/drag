class DragAndDrop {
  constructor(containerId, itemsClass) {
    this.container = document.getElementById(containerId);
    this.items = document.querySelectorAll(itemsClass);

    this.init();
  }

  init() {
    // draggable = true, щоб можна було переміщати елементи 
    for (const task of this.items) {
      task.draggable = true;
    }

    // початок
    this.container.addEventListener('dragstart', (evt) => {
      evt.target.classList.add('selected');
    });

    // кінець
    this.container.addEventListener('dragend', (evt) => {
      evt.target.classList.remove('selected');
    });

    this.container.addEventListener('dragover', (evt) => {
      // дозволяємо зброс елементів в область
      evt.preventDefault();

      // знаходимо елемент, який переміщуємо
      const activeElement = this.container.querySelector('.selected');

      // знаходимо елемент, над яким курсор при переміщенні
      const currentElement = evt.target;

      // перевіряємо, що спрацювало, якщо:
      // 1. елемент не на тому елементі, який ми переміщаємо
      // 2. іменно на елементах в області дропа
      const isMoveable = activeElement !== currentElement && currentElement.classList.contains('main__item');

      // якщо ні, то виходимо
      if (!isMoveable) {
        return;
      }

      // evt.clientY — ввертикальна координата курсора в моменті події,
      const nextElement = getNextElement(evt.clientY, currentElement);

      // перевіряємо чи потрібно міняти місцями елементи
      if (
        nextElement &&
        activeElement === nextElement.previousElementSibling ||
        activeElement === nextElement
      ) {
        // якщо ні, тоді виходимо
        return;
      }

      //ємо activeElement перед nextElement
      this.container.insertBefore(activeElement, nextElement);
    });

    const getNextElement = (cursorPosition, currentElement) => {
      // отримуємо об*єкт з розмірами і координатами
      const currentElementCoord = currentElement.getBoundingClientRect();
      // знаходимо вертикальну координату теперішнього елемента
      const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

      // якщо курсор вище центра елемента, то вставляємо
      // інакше - наступний елемент
      const nextElement = (cursorPosition < currentElementCenter) ?
          currentElement :
          currentElement.nextElementSibling;

      return nextElement;
    };
  }
}