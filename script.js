document.addEventListener("DOMContentLoaded", () => {
  const langBtns = document.querySelectorAll(".lang-btn");
  
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all
      langBtns.forEach(b => b.classList.remove("active"));
      // Add active to clicked
      btn.classList.add("active");
      
      // Update body class to toggle display of span elements
      const lang = btn.getAttribute("data-lang");
      document.body.className = `lang-${lang}`;
    });
  });
});
