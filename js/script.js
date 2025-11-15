document.getElementById("calc-btn").addEventListener("click", function () {
  const peso = parseFloat(document.getElementById("peso").value);
  const idade = parseInt(document.getElementById("idade").value);
  const atividade = document.getElementById("atividade").value;
  const clima = document.getElementById("clima").value;
  const gestante = document.getElementById("gestante").value;

  if (!peso) {
    alert("Por favor, preencha o peso.");
    return;
  }

  // --- Base da fórmula ---
  let aguaMl = peso * 35; // 35 mL por kg

  // --- Ajuste por idade ---
  if (!isNaN(idade)) {
    if (idade >= 60) {
      aguaMl *= 0.9; // idosos costumam ter menor necessidade total
    } else if (idade < 12) {
      aguaMl *= 1.1; // crianças precisam proporcionalmente mais
    }
  }

  // --- Atividade física ---
  switch (atividade) {
    case "leve":
      aguaMl += 300;
      break;
    case "moderado":
      aguaMl += 700;
      break;
    case "intenso":
      aguaMl += 1200;
      break;
  }

  // --- Clima ---
  if (clima === "quente") {
    aguaMl += 500;
  } else if (clima === "muito-quente") {
    aguaMl += 1000;
  }

  // --- Gestante / Lactante ---
  if (gestante === "sim") {
    aguaMl += 600; // ajuste padrão recomendado
  }

  // --- Conversões ---
  const litros = aguaMl / 1000;
  const copos = aguaMl / 250; // copos de 250 mL

  // --- Exibir resultado ---
  const result = document.getElementById("calc-result");
  result.innerHTML = `
    <p><strong>Recomendação estimada diária:</strong></p>
    <p><strong>${litros.toFixed(2)} litros</strong> de água por dia.</p>
    <p>Isso equivale a aproximadamente <strong>${copos.toFixed(1)} copos</strong> de 250 mL.</p>
    <p class="note">*Esta é uma estimativa geral. Necessidades individuais podem variar.</p>
  `;
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});
