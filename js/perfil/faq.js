document.addEventListener('DOMContentLoaded', () => {

  const items = document.querySelectorAll('.faq-item');

  const btnVolver = document.querySelector('.btn-volver');

  if (btnVolver) {
    btnVolver.addEventListener('click', () => {
      window.history.back();
    });
  }

  items.forEach(item => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    button.addEventListener('click', () => {

      const isOpen = item.classList.contains('active');

      // Cerrar todos
      items.forEach(i => {
        if (i !== item) cerrar(i);
      });

      // Toggle actual
      if (isOpen) {
        cerrar(item);
      } else {
        abrir(item);
      }
    });

    function abrir(item) {
      const answer = item.querySelector('.faq-answer');
      item.classList.add('active');

      // Medimos altura real
      const height = answer.scrollHeight;
      answer.style.height = height + 'px';
    }

    function cerrar(item) {
      const answer = item.querySelector('.faq-answer');
      item.classList.remove('active');
      answer.style.height = '0px';
    }
  });

});
