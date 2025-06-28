
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

  document.addEventListener('DOMContentLoaded', () => {
    // --- Validación del Formulario de Contacto ---
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe por defecto
        event.stopPropagation(); // Detiene la propagación del evento para Bootstrap

        let isValid = true;

        // Limpiar validaciones previas de Bootstrap
        nameInput.classList.remove('is-invalid', 'is-valid');
        emailInput.classList.remove('is-invalid', 'is-valid');
        messageInput.classList.remove('is-invalid', 'is-valid');

        // Validación del nombre
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('is-invalid');
            document.getElementById('nameError').textContent = 'El nombre es obligatorio.';
            isValid = false;
        } else {
            nameInput.classList.add('is-valid');
        }

        // Validación del correo electrónico
        if (emailInput.value.trim() === '') {
            emailInput.classList.add('is-invalid');
            document.getElementById('emailError').textContent = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailInput.classList.add('is-invalid');
            document.getElementById('emailError').textContent = 'Por favor, introduce un correo electrónico válido.';
            isValid = false;
        } else {
            emailInput.classList.add('is-valid');
        }

        // Validación del mensaje
        if (messageInput.value.trim() === '') {
            messageInput.classList.add('is-invalid');
            document.getElementById('messageError').textContent = 'El mensaje es obligatorio.';
            isValid = false;
        } else {
            messageInput.classList.add('is-valid');
        }

        if (isValid) {
            alert('Formulario enviado con éxito. ¡Gracias por tu mensaje!');
            contactForm.reset(); // Limpia el formulario
            // Quitar clases de validación después de enviar
            nameInput.classList.remove('is-valid');
            emailInput.classList.remove('is-valid');
            messageInput.classList.remove('is-valid');
            // Aquí podrías añadir el código para enviar los datos a un servidor
        } else {
            // Bootstrap ya muestra los mensajes de error automáticamente con 'is-invalid'
            // alert('Por favor, corrige los errores en el formulario.'); // Ya no es necesario este alert con Bootstrap
        }
    });

    // --- Modal del Test de Seguridad ---
    const securityTestModalEl = document.getElementById('securityTestModal');
    const submitQuizButton = document.getElementById('submitQuiz');
    const quizFeedback = document.getElementById('quizFeedback');
    const securityQuizForm = document.getElementById('securityQuizForm');

    const correctAnswers = {
        q1: 'c',
        q2: 'c',
        q3: 'b'
    };

    // Evento que se dispara cuando el modal se muestra completamente
    securityTestModalEl.addEventListener('shown.bs.modal', () => {
        quizFeedback.textContent = ''; // Limpiar feedback anterior
        quizFeedback.className = 'mt-3 text-center fw-bold'; // Resetear clases de feedback
        // Limpiar selecciones de radio buttons y validaciones de Bootstrap
        document.querySelectorAll('#securityQuizForm input[type="radio"]').forEach(radio => {
            radio.checked = false;
            radio.classList.remove('is-invalid'); // Limpiar validación
        });
        document.querySelectorAll('.invalid-feedback[class^="quiz-feedback-q"]').forEach(feedback => {
            feedback.style.display = 'none'; // Ocultar mensajes de error
        });
    });

    submitQuizButton.addEventListener('click', () => {
        let score = 0;
        let allAnswered = true;

        // Limpiar validaciones previas de las preguntas
        document.querySelectorAll('#securityQuizForm input[type="radio"]').forEach(radio => {
            radio.classList.remove('is-invalid');
        });
        document.querySelectorAll('.invalid-feedback[class^="quiz-feedback-q"]').forEach(feedback => {
            feedback.style.display = 'none';
        });


        for (const questionId in correctAnswers) {
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            if (selectedOption) {
                if (selectedOption.value === correctAnswers[questionId]) {
                    score++;
                }
            } else {
                allAnswered = false;
                // Mostrar feedback de que la pregunta no fue respondida
                document.querySelector(`.quiz-feedback-${questionId}`).style.display = 'block';
                document.querySelectorAll(`input[name="${questionId}"]`).forEach(radio => {
                    radio.classList.add('is-invalid');
                });
            }
        }

        if (!allAnswered) {
            quizFeedback.textContent = 'Por favor, responde todas las preguntas antes de enviar.';
            quizFeedback.classList.remove('text-success');
            quizFeedback.classList.add('text-danger');
            return;
        }

        if (score === Object.keys(correctAnswers).length) {
            quizFeedback.textContent = `¡Excelente! Has respondido correctamente a ${score} de ${Object.keys(correctAnswers).length} preguntas. ¡Tienes un buen conocimiento de seguridad!`;
            quizFeedback.classList.remove('text-danger');
            quizFeedback.classList.add('text-success');
        } else {
            quizFeedback.textContent = `Has respondido correctamente a ${score} de ${Object.keys(correctAnswers).length} preguntas. ¡Sigue aprendiendo sobre seguridad informática!`;
            quizFeedback.classList.remove('text-success');
            quizFeedback.classList.add('text-danger');
        }
    });
});

