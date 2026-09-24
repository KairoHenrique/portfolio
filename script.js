(function () {
  "use strict";

  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav__link");
  const revealElements = document.querySelectorAll(".reveal");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }

    updateActiveNavLink();
  }

  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("nav__link--active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("nav__link--active");
          }
        });
      }
    });
  }

  function toggleMenu() {
    const isOpen = navMenu.classList.toggle("nav__menu--open");
    navToggle.classList.toggle("nav__toggle--open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  }

  function closeMenu() {
    navMenu.classList.remove("nav__menu--open");
    navToggle.classList.remove("nav__toggle--open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle) {
    navToggle.addEventListener("click", toggleMenu);
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -60px 0px",
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal--visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ========== MODAL & MOCKUPS INTERATIVOS ========== */
  const modal = document.getElementById("mockup-modal");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalClose = document.getElementById("modal-close");
  const modalTitle = document.getElementById("modal-title");
  const modalBadge = document.getElementById("modal-badge");
  const modalBody = document.getElementById("modal-body");
  const mockupButtons = document.querySelectorAll("[data-mockup]");

  function openModal(type) {
    if (!modal || !modalBody) return;

    if (type === "acmehub") {
      modalBadge.textContent = "Web App Demo · SaaS";
      modalTitle.textContent = "ACME HUB — Planejador Acadêmico CEFET-MG";
      renderAcmeHubMockup();
    } else if (type === "easytrip") {
      modalBadge.textContent = "Mobile App Demo · iOS/Android";
      modalTitle.textContent = "Easy Trip — App de Viagens & Rolês com IA";
      renderEasyTripMockup();
    }

    modal.classList.add("modal--open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("modal--open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  mockupButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const type = btn.getAttribute("data-mockup");
      openModal(type);
    });
  });

  if (modalOverlay) modalOverlay.addEventListener("click", closeModal);
  if (modalClose) modalClose.addEventListener("click", closeModal);

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal && modal.classList.contains("modal--open")) {
      closeModal();
    }
  });

  /* ========== TEMPLATES E INTERAÇÕES DO ACME HUB ========== */
  function renderAcmeHubMockup() {
    modalBody.innerHTML = `
      <div class="mockup-frame">
        <div class="mockup-browser-header">
          <div class="mockup-dots">
            <span class="mockup-dot mockup-dot--red"></span>
            <span class="mockup-dot mockup-dot--yellow"></span>
            <span class="mockup-dot mockup-dot--green"></span>
          </div>
          <div class="mockup-url-bar">
            🔒 https://acmehub.com.br/dashboard
          </div>
        </div>

        <div class="mockup-tabs">
          <button class="mockup-tab mockup-tab--active" data-tab="acme-dash">Dashboard & Sync SIGAA</button>
          <button class="mockup-tab" data-tab="acme-sim">Simulador de Notas</button>
          <button class="mockup-tab" data-tab="acme-ppc">Mapa do PPC & Créditos</button>
        </div>

        <div class="mockup-tab-content mockup-tab-content--active" id="acme-dash">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
            <div>
              <h4 style="color:#fff; margin:0;">Estudante: Kairo Henrique F. Martins</h4>
              <p style="color:var(--text-secondary); font-size:0.85rem; margin:0;">Engenharia de Computação · 6º Período (CEFET-MG)</p>
            </div>
            <button class="mock-btn" id="btn-sync-sigaa">🔄 Sincronizar SIGAA (Worker Playwright)</button>
          </div>

          <div id="sync-status-box" style="display:none; margin-bottom:1rem; background:rgba(74, 159, 212, 0.1); border:1px solid var(--border); padding:0.75rem; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-secondary); margin-bottom:0.3rem;">
              <span id="sync-label">Executando Playwright Headless Browser...</span>
              <span id="sync-percent">0%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" id="sync-progress"></div>
            </div>
          </div>

          <div class="mock-card-grid">
            <div class="mock-card">
              <div class="mock-card__title">Rendimento Global (IRA)</div>
              <div class="mock-card__val">89.4</div>
              <span class="mock-badge">Acima da Média</span>
            </div>
            <div class="mock-card">
              <div class="mock-card__title">Integralização PPC</div>
              <div class="mock-card__val">65%</div>
              <span class="mock-badge">180 / 270 Créditos</span>
            </div>
            <div class="mock-card">
              <div class="mock-card__title">Disciplinas Ativas</div>
              <div class="mock-card__val">5</div>
              <span class="mock-badge">Semestre 2026/2</span>
            </div>
          </div>

          <h5 style="color:#fff; margin-top:1.5rem; margin-bottom:0.75rem;">Disciplinas Sincronizadas</h5>
          <div style="display:flex; flex-direction:column; gap:0.5rem;" id="courses-list">
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); padding:0.75rem; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
              <span>Engenharia de Software (CEFET001)</span>
              <span style="font-weight:700; color:#10b981;">Nota: 94.0</span>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); padding:0.75rem; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
              <span>Sistemas Operacionais II (CEFET002)</span>
              <span style="font-weight:700; color:#10b981;">Nota: 91.5</span>
            </div>
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); padding:0.75rem; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
              <span>Banco de Dados I (CEFET003)</span>
              <span style="font-weight:700; color:#10b981;">Nota: 88.0</span>
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="acme-sim">
          <h4 style="color:#fff; margin-bottom:0.5rem;">Simulador de Notas e Aprovação</h4>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">
            Insira suas notas das duas primeiras etapas para calcular o mínimo necessário na Etapa 3 (vale 40 pontos) para passar com 60 pontos.
          </p>

          <div style="max-width:400px; background:rgba(255,255,255,0.03); padding:1.25rem; border-radius:8px; border:1px solid var(--border);">
            <label style="font-size:0.8rem; color:var(--text-secondary);">Nota Etapa 1 (máx 30 pts):</label>
            <input type="number" id="sim-n1" class="mock-input" value="22" max="30" min="0">

            <label style="font-size:0.8rem; color:var(--text-secondary);">Nota Etapa 2 (máx 30 pts):</label>
            <input type="number" id="sim-n2" class="mock-input" value="24" max="30" min="0">

            <button class="mock-btn" id="btn-calcular-nota" style="width:100%; margin-top:0.5rem;">Calcular Nota Necessária</button>

            <div id="sim-result" style="margin-top:1rem; padding:0.75rem; background:rgba(212,168,67,0.15); border:1px solid var(--cruzeiro-gold); border-radius:6px; color:#fff; font-size:0.9rem; text-align:center; font-weight:600;">
              Você precisa de 14.0 pontos na Etapa 3 para ser aprovado!
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="acme-ppc">
          <h4 style="color:#fff; margin-bottom:0.5rem;">Mapa de Integralização do PPC (Eng. Computação)</h4>
          <p style="color:var(--text-secondary); font-size:0.85rem; margin-bottom:1rem;">
            Acompanhe a sua evolução na matriz curricular e pré-requisitos.
          </p>
          <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:8px; border:1px solid var(--border);">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#fff; margin-bottom:0.5rem;">
              <span>Progresso Total do Curso:</span>
              <span style="font-weight:700; color:var(--cruzeiro-celeste);">65% Concluído</span>
            </div>
            <div class="progress-bar-container" style="height:12px;">
              <div class="progress-bar-fill" style="width:65%;"></div>
            </div>
            <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.75rem;">
              ✓ Pré-requisitos atendidos para TCC I, Compiladores e Redes de Computadores II.
            </p>
          </div>
        </div>
      </div>
    `;

    bindTabSwitching();

    /* Interação de Sync */
    const btnSync = document.getElementById("btn-sync-sigaa");
    const syncBox = document.getElementById("sync-status-box");
    const syncProgress = document.getElementById("sync-progress");
    const syncPercent = document.getElementById("sync-percent");
    const syncLabel = document.getElementById("sync-label");

    if (btnSync) {
      btnSync.addEventListener("click", function () {
        syncBox.style.display = "block";
        btnSync.disabled = true;
        btnSync.style.opacity = "0.5";
        let width = 0;
        const interval = setInterval(function () {
          width += 20;
          if (width <= 100) {
            syncProgress.style.width = width + "%";
            syncPercent.textContent = width + "%";
            if (width === 40) syncLabel.textContent = "Efetuando Login seguro via Playwright Worker...";
            if (width === 80) syncLabel.textContent = "Extraindo boletim e horários do SIGAA...";
          } else {
            clearInterval(interval);
            syncLabel.textContent = "✅ Sincronização concluída com sucesso!";
            btnSync.disabled = false;
            btnSync.style.opacity = "1";
          }
        }, 300);
      });
    }

    /* Interação do Simulador de Notas */
    const btnCalc = document.getElementById("btn-calcular-nota");
    const simN1 = document.getElementById("sim-n1");
    const simN2 = document.getElementById("sim-n2");
    const simResult = document.getElementById("sim-result");

    if (btnCalc) {
      btnCalc.addEventListener("click", function () {
        const n1 = parseFloat(simN1.value) || 0;
        const n2 = parseFloat(simN2.value) || 0;
        const atual = n1 + n2;
        const falta = 60 - atual;

        if (falta <= 0) {
          simResult.innerHTML = "🎉 Você já possui " + atual + " pontos e já está <strong>APROVADO</strong>!";
          simResult.style.borderColor = "#10b981";
        } else if (falta > 40) {
          simResult.innerHTML = "⚠️ Você acumulou " + atual + " pts. Precisaria de " + falta.toFixed(1) + " pts (Etapa 3 vale máx 40 pts).";
          simResult.style.borderColor = "#ef4444";
        } else {
          simResult.innerHTML = "🎯 Você possui " + atual + " pts. Precisa de <strong>" + falta.toFixed(1) + " pts</strong> na Etapa 3 para passar!";
          simResult.style.borderColor = "var(--cruzeiro-gold)";
        }
      });
    }
  }

  /* ========== TEMPLATES E INTERAÇÕES DO EASY TRIP ========== */
  function renderEasyTripMockup() {
    modalBody.innerHTML = `
      <div class="smartphone-frame">
        <div class="smartphone-notch"></div>
        
        <div style="padding:0.75rem 1rem; background:#0e1e33; border-bottom:1px solid var(--border); display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-secondary);">
          <span>09:41</span>
          <span>Easy Trip Mobile App · iOS & Android</span>
          <span>🔋 100%</span>
        </div>

        <div class="mockup-tabs" style="background:#0b1828;">
          <button class="mockup-tab mockup-tab--active" data-tab="trip-wizard">Roteiros com IA</button>
          <button class="mockup-tab" data-tab="trip-radar">Radar da Noite</button>
          <button class="mockup-tab" data-tab="trip-split">Rateio de Gastos</button>
        </div>

        <div class="mockup-tab-content mockup-tab-content--active" id="trip-wizard">
          <h5 style="color:#fff; margin-bottom:0.4rem;">Planejador de Viagem com IA</h5>
          <p style="color:var(--text-secondary); font-size:0.8rem; margin-bottom:0.75rem;">
            Escolha o destino e o estilo da viagem para gerar o roteiro automático via OpenAI.
          </p>

          <label style="font-size:0.75rem; color:var(--text-secondary);">Destino:</label>
          <select id="trip-dest" class="mock-input" style="background:#132438;">
            <option value="Rio de Janeiro">Rio de Janeiro (RJ)</option>
            <option value="Florianópolis">Florianópolis (SC)</option>
            <option value="Ouro Preto">Ouro Preto (MG)</option>
          </select>

          <label style="font-size:0.75rem; color:var(--text-secondary);">Estilo da Viagem:</label>
          <select id="trip-vibe" class="mock-input" style="background:#132438;">
            <option value="Bares & Vida Noturna">Bares & Vida Noturna</option>
            <option value="Praias & Ecoturismo">Praias & Ecoturismo</option>
            <option value="Gastronomia & Cultura">Gastronomia & Cultura</option>
          </select>

          <button class="mock-btn" id="btn-generate-trip" style="width:100%; margin-bottom:1rem;">✨ Gerar Roteiro com IA</button>

          <div id="trip-itinerary-output">
            <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border); padding:0.75rem; border-radius:6px; margin-bottom:0.5rem;">
              <span class="mock-badge" style="background:rgba(74,159,212,0.2); color:var(--cruzeiro-celeste); border-color:var(--cruzeiro-celeste);">Dia 1 · Manhã</span>
              <h6 style="color:#fff; margin:0.3rem 0 0.1rem 0;">Passeio pela Orla & Mirante</h6>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">Caminhada e fotos com curadoria de locais em alta no Google Places.</p>
            </div>
            <div style="background:rgba(255,255,255,0.04); border:1px solid var(--border); padding:0.75rem; border-radius:6px;">
              <span class="mock-badge" style="background:rgba(212,168,67,0.2); color:var(--cruzeiro-gold); border-color:var(--cruzeiro-gold);">Dia 1 · Noite</span>
              <h6 style="color:#fff; margin:0.3rem 0 0.1rem 0;">Radar da Noite (Circuito de Bares)</h6>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">Música ao vivo, clima favorável e sugestão de transporte em grupo.</p>
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="trip-radar">
          <div style="background:linear-gradient(135deg, #1e3a8a, #0b1828); padding:0.75rem; border-radius:8px; border:1px solid var(--border); margin-bottom:0.75rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.75rem; color:var(--cruzeiro-celeste-light);">Radar da Noite</span>
              <h5 style="color:#fff; margin:0;">🌙 24°C · Céu Limpo</h5>
            </div>
            <span class="mock-badge">API Google Places</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.5rem;">
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); padding:0.6rem 0.75rem; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#fff; font-weight:600;">
                <span>Bar & Brewpub da Lapa</span>
                <span style="color:var(--cruzeiro-gold);">⭐ 4.8</span>
              </div>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin:0.2rem 0 0 0;">Música ao vivo · 350m de você · R$ R$</p>
            </div>

            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border); padding:0.6rem 0.75rem; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:#fff; font-weight:600;">
                <span>Festival de Verão / Show</span>
                <span style="color:var(--cruzeiro-gold);">⭐ 4.9</span>
              </div>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin:0.2rem 0 0 0;">Ingressos disponíveis · 1.2 km · Curadoria IA</p>
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="trip-split">
          <h5 style="color:#fff; margin-bottom:0.4rem;">Calculadora de Rateio de Despesas</h5>
          <p style="color:var(--text-secondary); font-size:0.8rem; margin-bottom:0.75rem;">
            Divida hospedagem, gasolina ou jantar entre o grupo de viagem com transparência.
          </p>

          <label style="font-size:0.75rem; color:var(--text-secondary);">Valor Total da Conta (R$):</label>
          <input type="number" id="split-total" class="mock-input" value="360" min="0">

          <label style="font-size:0.75rem; color:var(--text-secondary);">Número de Amigos:</label>
          <input type="number" id="split-people" class="mock-input" value="4" min="1">

          <button class="mock-btn" id="btn-calc-split" style="width:100%; margin-bottom:0.75rem;">Calcular Rateio</button>

          <div id="split-result" style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:0.75rem; border-radius:6px; color:#fff; font-size:0.85rem; text-align:center; font-weight:600;">
            Cada pessoa paga: R$ 90.00
          </div>
        </div>
      </div>
    `;

    bindTabSwitching();

    /* Interação do Gerador com IA */
    const btnGen = document.getElementById("btn-generate-trip");
    const tripDest = document.getElementById("trip-dest");
    const tripVibe = document.getElementById("trip-vibe");
    const tripOutput = document.getElementById("trip-itinerary-output");

    if (btnGen) {
      btnGen.addEventListener("click", function () {
        const dest = tripDest.value;
        const vibe = tripVibe.value;
        btnGen.textContent = "⚡ Processando com OpenAI...";
        setTimeout(function () {
          btnGen.textContent = "✨ Gerar Roteiro com IA";
          tripOutput.innerHTML = `
            <div style="background:rgba(74,159,212,0.1); border:1px solid var(--cruzeiro-celeste); padding:0.75rem; border-radius:6px; margin-bottom:0.5rem;">
              <span class="mock-badge" style="background:rgba(16,185,129,0.2); color:#10b981;">Roteiro Gerado com Sucesso!</span>
              <h6 style="color:#fff; margin:0.4rem 0 0.1rem 0;">Destino: ${dest}</h6>
              <p style="font-size:0.75rem; color:var(--text-secondary); margin:0;">Estilo: ${vibe} · 3 Dias de Roteiro Inteligente sincronizado na nuvem (Supabase).</p>
            </div>
          `;
        }, 600);
      });
    }

    /* Interação do Rateio */
    const btnSplit = document.getElementById("btn-calc-split");
    const splitTotal = document.getElementById("split-total");
    const splitPeople = document.getElementById("split-people");
    const splitResult = document.getElementById("split-result");

    if (btnSplit) {
      btnSplit.addEventListener("click", function () {
        const total = parseFloat(splitTotal.value) || 0;
        const people = parseInt(splitPeople.value) || 1;
        const perPerson = total / (people > 0 ? people : 1);
        splitResult.innerHTML = "Cada pessoa paga: <strong>R$ " + perPerson.toFixed(2) + "</strong>";
      });
    }
  }

  /* Troca de abas dentro dos mockups */
  function bindTabSwitching() {
    const tabs = modalBody.querySelectorAll(".mockup-tab");
    const contents = modalBody.querySelectorAll(".mockup-tab-content");

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        const targetId = tab.getAttribute("data-tab");

        tabs.forEach(function (t) { t.classList.remove("mockup-tab--active"); });
        contents.forEach(function (c) { c.classList.remove("mockup-tab-content--active"); });

        tab.classList.add("mockup-tab--active");
        const targetContent = modalBody.querySelector("#" + targetId);
        if (targetContent) {
          targetContent.classList.add("mockup-tab-content--active");
        }
      });
    });
  }
})();
