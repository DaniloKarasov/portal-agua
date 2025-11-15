
(function () {
    const correctAnswers = [
        'B', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'B', 'A',
        'B', 'B', 'B', 'C', 'C', 'B', 'B', 'B', 'B', 'B',
        'B', 'B', 'C', 'C', 'C', 'C', 'B', 'C', 'B', 'B'
    ];

    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');
    const showAnswersBtn = document.getElementById('showAnswersBtn');
    const resultBox = document.getElementById('result');
    const form = document.getElementById('quizForm');

    function getAnswers() {
        const answers = [];
        for (let i = 1; i <= 30; i++) {
            const val = form['q' + i].value;
            answers.push(val || '');
        }
        return answers;
    }

    function countUnanswered(answers) {
        return answers.filter(a => !a).length;
    }

    function highlightResults(userAnswers) {
        // Remove previous highlights
        for (let i = 1; i <= 30; i++) {
            const field = document.getElementById('q' + i);
            field.classList.remove('correct', 'incorrect');
            // highlight chosen and correct later
        }
        // Apply new highlights
        for (let i = 1; i <= 30; i++) {
            const field = document.getElementById('q' + i);
            const choice = userAnswers[i - 1];
            if (!choice) continue;
            if (choice === correctAnswers[i - 1]) {
                field.classList.add('correct');
            } else {
                field.classList.add('incorrect');
            }
        }
    }

    function showResult(userAnswers) {
        let score = 0;
        const incorrectList = [];
        for (let i = 0; i < 30; i++) {
            const u = userAnswers[i];
            if (u && u === correctAnswers[i]) score++;
            else incorrectList.push(i + 1);
        }
        const percent = Math.round((score / 30) * 100);
        resultBox.hidden = false;
        resultBox.innerHTML = `
          <p><strong>Você acertou ${score} de 30 perguntas (${percent}%).</strong></p>
          <p class="small-note">Perguntas erradas: ${incorrectList.length ? incorrectList.join(', ') : 'Nenhuma — ótimo!'}.</p>
          <div class="answer-key">
            <p>Deseja ver o gabarito completo? Clique em "Mostrar gabarito".</p>
          </div>
        `;
    }

    submitBtn.addEventListener('click', function () {
        const userAnswers = getAnswers();
        const unanswered = countUnanswered(userAnswers);
        if (unanswered > 0) {
            const confirmSubmit = confirm(`Você deixou ${unanswered} pergunta(s) sem resposta. Deseja enviar mesmo assim?`);
            if (!confirmSubmit) return;
        }
        highlightResults(userAnswers);
        showResult(userAnswers);
        // Scroll to result
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    resetBtn.addEventListener('click', function () {
        // clear highlights and result
        for (let i = 1; i <= 30; i++) {
            const field = document.getElementById('q' + i);
            field.classList.remove('correct', 'incorrect');
        }
        resultBox.hidden = true;
        resultBox.innerHTML = '';
    });

    showAnswersBtn.addEventListener('click', function () {
        // Show full gabarito below results
        let html = '<h4>Gabarito (respostas corretas)</h4><ol>';
        for (let i = 0; i < 30; i++) {
            html += `<li>Pergunta ${i + 1}: <strong>${correctAnswers[i]}</strong></li>`;
        }
        html += '</ol>';
        resultBox.hidden = false;
        resultBox.innerHTML = html;
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // Allow keyboard submit with Enter when focus on submit button
    submitBtn.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') submitBtn.click();
    });
})();
