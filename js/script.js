document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".calendar-grid");
  const popup = document.getElementById("popup");
  const countdownEl = document.getElementById("countdown");
  const closePopup = document.getElementById("close-popup");
  let countdownInterval;

  const oggi = new Date();
  const anno = 2025;
  const mese = 11; // dicembre (0 = gennaio → 11 = dicembre)

  /* ============================================================
     📦 CREA LE CASELLE (1 → 24) — NIENTE GIORNO 25
  ============================================================ */
  for (let i = 1; i <= 24; i++) {
    const dataGiorno = new Date(anno, mese, i);
    const aperto = oggi >= dataGiorno;

    const box = document.createElement("div");
    box.classList.add("day-box");

    // Immagine interna
    const img = document.createElement("img");
    img.src = `immagini/giorni/${i}.png`;
    img.alt = `Giorno ${i}`;
    img.classList.add("day-image");

    box.appendChild(img);

    /* === CLICK CASELLA === */
    box.addEventListener("click", () => {
      clearInterval(countdownInterval);

      if (aperto) {
        window.location.href = `giornate/${i}.html`;
      } else {
        mostraPopup(dataGiorno);
      }
    });

    grid.appendChild(box);
  }


  /* ============================================================
     ⏳ MOSTRA POPUP COUNTDOWN
  ============================================================ */
  function mostraPopup(targetDate) {
    popup.classList.remove("hidden");
    aggiornaCountdown(targetDate);

    countdownInterval = setInterval(() => {
      aggiornaCountdown(targetDate);
    }, 1000);
  }


  /* ============================================================
     ⏳ AGGIORNA IL COUNTDOWN OGNI SECONDO
  ============================================================ */
  function aggiornaCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      countdownEl.textContent = "È arrivato il momento! 🎁";
      clearInterval(countdownInterval);
      return;
    }

    const giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
    const ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minuti = Math.floor((diff / (1000 * 60)) % 60);
    const secondi = Math.floor((diff / 1000) % 60);

    countdownEl.textContent =
      `${giorni} g : ${String(ore).padStart(2, "0")} h : ` +
      `${String(minuti).padStart(2, "0")} m : ${String(secondi).padStart(2, "0")} s`;
  }


  /* ============================================================
     ❌ CHIUDI POPUP
  ============================================================ */
  closePopup.addEventListener("click", () => {
    popup.classList.add("hidden");
    clearInterval(countdownInterval);
  });
});


