/* ============================================================
   📌 CARICA NOME UTENTE
============================================================ */

let utente = localStorage.getItem("utente");

if (!utente) {
    // se il popup esiste lo apriamo, altrimenti fallback prompt
    const popup = document.getElementById("name-popup");

    if (popup) {
        popup.classList.remove("hidden");

        document.getElementById("btn-salva-nome").onclick = function () {
            const nomeInserito = document.getElementById("input-nome").value.trim();
            if (nomeInserito !== "") {
                localStorage.setItem("utente", nomeInserito);
                popup.classList.add("hidden");
                location.reload();
            }
        };
    } else {
        // fallback sicurezza
        utente = prompt("🎄 Inserisci il tuo nome:") || "Ospite";
        localStorage.setItem("utente", utente);
    }
}


/* ============================================================
   ✏️ CAMBIA NOME
============================================================ */

function cambiaNome() {
    const nuovo = prompt("Inserisci un nuovo nome:");
    if (nuovo && nuovo.trim() !== "") {
        localStorage.setItem("utente", nuovo.trim());
        location.reload();
    }
}


/* ============================================================
   📅 GENERA CASELLE 1-24 + POSIZIONAMENTO SPECIALE DEL 25
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".calendar-grid");
  const popup = document.getElementById("popup");
  const popupText = document.getElementById("popup-text");
  const closePopup = document.getElementById("close-popup");
  let countdownInterval;

  const oggi = new Date();
  const anno = oggi.getFullYear();
  const mese = 11; // Dicembre (0-based)

  // 👉 CREA SOLO I GIORNI 1–24
  for (let i = 1; i <= 24; i++) {
    const dataGiorno = new Date(anno, mese, i);
    const aperto = oggi >= dataGiorno;

    const box = document.createElement("div");
    box.classList.add("day-box");  // nessuna classe speciale per il 25

    const img = document.createElement("img");
    img.src = `immagini/giorni/${i}.png`;
    img.alt = "";        // ⛔ niente testo visibile
    img.classList.add("day-image");
    box.appendChild(img);

    // CLICK
    box.addEventListener("click", () => {
      clearInterval(countdownInterval);

      if (aperto) {
        window.location.href = `giorni/${i}.html`;
      } else {
        popup.classList.remove("hidden");
        aggiornaCountdown(dataGiorno);
        countdownInterval = setInterval(() => aggiornaCountdown(dataGiorno), 1000);
      }
    });

    grid.appendChild(box);
  }

  function aggiornaCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      popupText.innerHTML = "🎁 È arrivato il momento!";
      clearInterval(countdownInterval);
      return;
    }

    const giorni = Math.floor(diff / 86400000);
    const ore = Math.floor((diff / 3600000) % 24);
    const minuti = Math.floor((diff / 60000) % 60);
    const secondi = Math.floor((diff / 1000) % 60);

    popupText.innerHTML = `
      ⏳ Non ancora disponibile<br><br>
      <strong style="color:#b71c1c; font-size:1.4em;">
        ${giorni} g : ${String(ore).padStart(2,'0')} h : ${String(minuti).padStart(2,'0')} m : ${String(secondi).padStart(2,'0')} s
      </strong><br><br>
      per l’apertura di questo giorno 🎁
    `;
  }

  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(countdownInterval);
  });
});

/* ============================================================
   ⏳ CLICK + POPUP CONTO ALLA ROVESCIA
============================================================ */

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");
const countdownEl = document.getElementById("countdown");

let timerInterval;

function gestisciClick(giorno) {
    const oggi = new Date();
    const apertura = dataApertura(giorno);

    if (oggi >= apertura) {
        window.location.href = `giornate/${giorno}.html`;
    } else {
        mostraPopup(apertura);
    }
}

function mostraPopup(apertura) {
    popup.classList.remove("hidden");

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        const now = new Date();
        const diff = apertura - now;

        if (diff <= 0) {
            countdownEl.textContent = "Apertura disponibile!";
            clearInterval(timerInterval);
            return;
        }

        let giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
        let ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
        let minuti = Math.floor((diff / (1000 * 60)) % 60);
        let secondi = Math.floor((diff / 1000) % 60);

        countdownEl.textContent =
            `${giorni} g : ${ore} h : ${minuti} m : ${secondi} s`;
    }, 1000);
}

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(timerInterval);
});

