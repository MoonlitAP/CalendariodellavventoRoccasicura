/* ============================================================
   📌 GESTIONE NOME UTENTE (CON POPUP BELLO)
============================================================ */

// ELEMENTI POPUP
const popupNome = document.getElementById("name-popup");
const inputNome = document.getElementById("input-nome");
const btnSalvaNome = document.getElementById("btn-salva-nome");

// Controllo nome salvato
let utente = localStorage.getItem("utente");

// Se non esiste → apri popup
if (!utente) {
    popupNome.classList.remove("hidden");
}

// Salva nome dal popup
btnSalvaNome.addEventListener("click", () => {
    let nome = inputNome.value.trim();
    if (nome === "") nome = "Ospite";

    localStorage.setItem("utente", nome);
    popupNome.classList.add("hidden");
    location.reload();
});

// Cambia nome (apre di nuovo il popup)
function cambiaNome() {
    popupNome.classList.remove("hidden");
    inputNome.value = "";
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

    if (oggi >= apertura) {
        window.location.href = `giornate/${giorno}.html`;
    } 
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

closeBtn.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(timerInterval);
});
