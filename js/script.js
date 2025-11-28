/* ============================================================
   📌 GESTIONE NOME UTENTE
============================================================ */

let utente = localStorage.getItem("utente");

if (!utente) {
    utente = prompt("🎄 Benvenuto! Inserisci il tuo nome:");
    if (!utente || utente.trim() === "") utente = "Ospite";
    localStorage.setItem("utente", utente);
}

// Funzione bottone ENTRA
function entra() {
    window.location.href = "calendario.html";
}

// Funzione CAMBIA NOME
function cambiaNome() {
    let nuovoNome = prompt("Inserisci il nuovo nome:");
    if (nuovoNome && nuovoNome.trim() !== "") {
        localStorage.setItem("utente", nuovoNome.trim());
        alert("Nome aggiornato!");
        location.reload();
    }
}



/* ============================================================
   📅 GENERA AUTOMATICAMENTE LE 24 CASELLE + BLOCCO GIORNI FUTURI
============================================================ */

const grid = document.getElementById("calendar-grid");

// Funzione che restituisce la data di apertura di un giorno
function dataApertura(giorno) {
    return new Date(`2025-12-${String(giorno).padStart(2, '0')}T00:00:00`);
}

// Crea le 24 caselle
for (let i = 1; i <= 24; i++) {
    const box = document.createElement("div");
    box.className = "day-box";

    box.innerHTML = `
        <img src="immagini/giorni/${i}.png" class="day-img" alt="Giorno ${i}">
        <span class="day-number">${i}</span>
    `;

    box.addEventListener("click", () => gestisciClick(i));
    grid.appendChild(box);
}



/* ============================================================
   ⏳ GESTIONE CLICK + POPUP CONTO ALLA ROVESCIA
============================================================ */

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("close-popup");
const countdownEl = document.getElementById("countdown");

let timerInterval;

function gestisciClick(giorno) {
    const oggi = new Date();
    const apertura = dataApertura(giorno);

    // Se il giorno è già sbloccato → apri pagina
    if (oggi >= apertura) {
        window.location.href = `giornate/${giorno}.html`;
    } 
    
    // Altrimenti → mostra popup con countdown
    else {
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

// Chiudi popup
closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(timerInterval);
});
