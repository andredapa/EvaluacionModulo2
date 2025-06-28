
document.querySelectorAll('.open-modal').forEach(img => {
    img.addEventListener('click', function () {
      // Obtener los datos personalizados de la imagen
        const title = this.getAttribute('data-title');
        const text = this.getAttribute('data-text');
        const imgSrc = this.getAttribute('data-img');

      // Insertar datos en el modal
        document.getElementById('imageModalLabel').textContent = title;
        document.getElementById('modalText').textContent = text;
        document.getElementById('modalImage').src = imgSrc;

      // Mostrar el modal
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show();
    });
  });

