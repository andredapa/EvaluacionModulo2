/*modal amenazas*/
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


/*formulario*/
$(document).ready(function() {

    const contactForm = $('#contactForm');
    const nameInput = $('#name');
    const emailInput = $('#email');
    const messageInput = $('#message');


    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };


    contactForm.on('submit', function(event) {
        event.preventDefault(); 
        event.stopPropagation(); 

        let isValid = true; 


        nameInput.removeClass('is-invalid is-valid');
        emailInput.removeClass('is-invalid is-valid');
        messageInput.removeClass('is-invalid is-valid');


        if (nameInput.val().trim() === '') { 
            nameInput.addClass('is-invalid');
            $('#nameError').text('El nombre es obligatorio.'); 
            isValid = false;
        } else {
            nameInput.addClass('is-valid'); 
        }


        if (emailInput.val().trim() === '') {
            emailInput.addClass('is-invalid');
            $('#emailError').text('El correo electrónico es obligatorio.');
            isValid = false;
        } else if (!validateEmail(emailInput.val())) {
            emailInput.addClass('is-invalid');
            $('#emailError').text('Por favor, introduce un correo electrónico válido.');
            isValid = false;
        } else {
            emailInput.addClass('is-valid');
        }

        // Validación del campo de mensaje.
        if (messageInput.val().trim() === '') {
            messageInput.addClass('is-invalid');
            $('#messageError').text('El mensaje es obligatorio.');
            isValid = false;
        } else {
            messageInput.addClass('is-valid');
        }

        if (isValid) {
            alert('Formulario enviado con éxito. ¡Gracias por tu mensaje!');
            contactForm.get(0).reset();
            nameInput.removeClass('is-valid');
            emailInput.removeClass('is-valid');
            messageInput.removeClass('is-valid');
        }
    });
/*cuestionario*/
    const securityTestModalEl = document.getElementById('securityTestModal');
    const submitQuizButton = document.getElementById('submitQuiz');
    const quizFeedback = document.getElementById('quizFeedback');
    const securityQuizForm = document.getElementById('securityQuizForm');

    const correctAnswers = {
        q1: 'c',
        q2: 'c',
        q3: 'b'
    };

    securityTestModalEl.addEventListener('shown.bs.modal', () => {
        quizFeedback.textContent = '';
        quizFeedback.className = 'mt-3 text-center fw-bold'; 
        document.querySelectorAll('#securityQuizForm input[type="radio"]').forEach(radio => {
            radio.checked = false;
            radio.classList.remove('is-invalid');
        });
        document.querySelectorAll('.invalid-feedback[class^="quiz-feedback-q"]').forEach(feedback => {
            feedback.style.display = 'none';
        });
    });

    submitQuizButton.addEventListener('click', () => {
        let score = 0;
        let allAnswered = true;

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

    const myCarouselElement = document.querySelector('#myCarousel');
    const carousel = new bootstrap.Carousel(myCarouselElement, {
        interval: 700,
        touch: false
    });
});
