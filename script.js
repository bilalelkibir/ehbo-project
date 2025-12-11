document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // Spot het gevaar (Blok 1)
  // ===============================

  const spotItems = document.querySelectorAll(".spot-item");
  const spotOutput = document.getElementById("spot-output");

  if (spotItems.length > 0) {
    spotItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.dataset.explainer || "Dit is hier veilig.";
        const isSafe = text.includes("veilig");

        btn.classList.remove("correct", "wrong");

        if (isSafe) {
          btn.classList.add("wrong");
        } else {
          btn.classList.add("correct");
        }

        if (spotOutput) {
          spotOutput.textContent = text;
        }
      });
    });
  }


  // ===============================
  // Volgorde (Blok 1)
  // ===============================

  const orderList = document.getElementById("order-list");
  const orderFeedback = document.getElementById("order-feedback");
  const checkOrderBtn = document.getElementById("check-order");

  if (orderList && checkOrderBtn && orderFeedback) {
    let dragged;

    const items = orderList.querySelectorAll("li");

    items.forEach((li) => {
      li.draggable = true;

      li.addEventListener("dragstart", () => {
        dragged = li;
        li.style.opacity = "0.5";
      });

      li.addEventListener("dragend", () => {
        li.style.opacity = "1";
      });

      li.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      li.addEventListener("drop", (e) => {
        e.preventDefault();
        if (dragged && dragged !== li) {
          const nodes = Array.from(orderList.children);
          const draggedIndex = nodes.indexOf(dragged);
          const droppedIndex = nodes.indexOf(li);

          if (draggedIndex < droppedIndex) {
            orderList.insertBefore(dragged, li.nextSibling);
          } else {
            orderList.insertBefore(dragged, li);
          }
        }
      });
    });

    checkOrderBtn.addEventListener("click", () => {
      const items = Array.from(orderList.children);
      let correctCount = 0;

      items.forEach((li, index) => {
        const expected = Number(li.dataset.correct);

        li.classList.remove("bg-green-200", "bg-red-200");

        if (expected === index + 1) {
          correctCount++;
          li.classList.add("bg-green-200");
        } else {
          li.classList.add("bg-red-200");
        }
      });

      if (correctCount === items.length) {
        orderFeedback.textContent =
          "✅ Top! Je hebt de stappen in de juiste volgorde gezet.";
        orderFeedback.className = "text-green-600 text-sm mt-1";
      } else {
        orderFeedback.textContent =
          "❌ Niet helemaal goed. Kijk nog eens rustig naar de volgorde.";
        orderFeedback.className = "text-red-600 text-sm mt-1";
      }
    });
  }

// ===============================
// Quizvragen (Blok 1)
// ===============================
const quizItems = document.querySelectorAll(".quiz-item");

quizItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    const correct = btn.dataset.correct === "true";
    const parent = btn.closest("article");
    const feedback = parent.querySelector(".quiz-feedback");

    parent.querySelectorAll(".quiz-item").forEach((b) => {
      b.classList.remove("correct", "wrong");
    });

    if (correct) {
      btn.classList.add("correct");
      feedback.textContent = "✅ Goed gedaan! Dit is het juiste antwoord.";
      feedback.className = "quiz-feedback text-green-600 text-xs";
    } else {
      btn.classList.add("wrong");
      feedback.textContent = "❌ Dit is niet juist. Probeer nog eens.";
      feedback.className = "quiz-feedback text-red-600 text-xs";
    }
  });
});

  // ===============================
  // Flip-cards (Blok 3)
  // ===============================

  function attachFlipEvents() {
    const flipCards = document.querySelectorAll(".flip-card-inner");
    flipCards.forEach((card) => {
      card.onclick = () => card.classList.toggle("is-flipped");
    });
  }

  function resetFlips() {
    document.querySelectorAll(".flip-card-inner").forEach((card) => {
      card.classList.remove("is-flipped");
    });
  }

  let lastSet = [];

  function showRandomCards() {
    const allCards = document.querySelectorAll(".flip-card");
    const newWordsBtn = document.getElementById("newWordsBtn");

    if (allCards.length === 0 || !newWordsBtn) return;

    resetFlips();

    // alles verbergen
    allCards.forEach(card => card.style.display = "none");

    let shuffled;
    let newSet;

    do {
      shuffled = Array.from(allCards).sort(() => Math.random() - 0.5);
      newSet = shuffled
        .slice(0, 4)
        .map(card => card.querySelector(".flip-card-front").innerText.trim());

    } while (JSON.stringify(newSet) === JSON.stringify(lastSet));

    lastSet = newSet;

    shuffled.slice(0, 4).forEach(card => {
      card.style.display = "block";
    });

    attachFlipEvents();
  }

  if (document.querySelector(".flip-card")) {
    const newWordsBtn = document.getElementById("newWordsBtn");
    if (newWordsBtn) newWordsBtn.addEventListener("click", showRandomCards);

    attachFlipEvents();
    showRandomCards();
  }


  // ===============================
  // EHBO koffer (Blok 3)
  // ===============================

  function attachKitEvents() {
    const kitItems = document.querySelectorAll(".kit-item");
    if (kitItems.length === 0) return;

    kitItems.forEach((btn) => {
      btn.addEventListener("click", () => {
        const correct = btn.dataset.correct === "true";

        btn.classList.remove("correct", "wrong");

        if (correct) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
        }
      });
    });
  }

  function shuffleKitItems() {
    const container = document.querySelector(".ehbo-kit-container");
    if (!container) return;

    const items = Array.from(container.children);
    const shuffled = items.sort(() => Math.random() - 0.5);
    shuffled.forEach(item => container.appendChild(item));
  }

  if (document.querySelector(".ehbo-kit-container")) {
    attachKitEvents();
    shuffleKitItems();
  }

});

// ===============================
// Mobiel menu
// ===============================

const mobileBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}


