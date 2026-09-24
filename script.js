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

        <div class="acme-header-bar" style="margin: 1rem 1.5rem 0 1.5rem;">
          <div class="acme-logo-brand">
            <span style="background:linear-gradient(135deg, #06b6d4, #3b82f6); color:#fff; width:30px; height:30px; border-radius:8px; display:inline-flex; align-items:center; justify-content:center; font-size:0.9rem;">AH</span>
            <span>ACME HUB</span>
            <span style="font-size:0.75rem; color:#94a3b8; font-weight:400; font-family:sans-serif;">| CEFET-MG Academic Planner</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span class="acme-status-pill acme-status-pill--approved">
              🟢 SIGAA Worker Ativo (Playwright)
            </span>
            <span style="background:#1e293b; color:#f8fafc; font-size:0.8rem; font-weight:600; padding:0.3rem 0.75rem; border-radius:50px; border:1px solid rgba(148,163,184,0.2);">
              Kairo Henrique (6º Período)
            </span>
          </div>
        </div>

        <div class="mockup-tabs">
          <button class="mockup-tab mockup-tab--active" data-tab="acme-dash">Dashboard & Boletim SIGAA</button>
          <button class="mockup-tab" data-tab="acme-sim">Simulador de Notas (CEFET)</button>
          <button class="mockup-tab" data-tab="acme-grid">Grade Horária & PPC</button>
        </div>

        <div class="mockup-tab-content mockup-tab-content--active" id="acme-dash">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
            <div>
              <h4 style="color:#f8fafc; margin:0; font-size:1.1rem;">Visão Geral Acadêmica</h4>
              <p style="color:#94a3b8; font-size:0.82rem; margin:0.2rem 0 0 0;">Engenharia de Computação · Campus Divinópolis</p>
            </div>
            <button class="mock-btn" id="btn-sync-sigaa" style="background:linear-gradient(135deg, #0284c7, #2563eb);">
              🔄 Sincronizar SIGAA em Tempo Real
            </button>
          </div>

          <div id="sync-status-box" style="display:none; margin-bottom:1.25rem; background:rgba(15, 23, 42, 0.9); border:1px solid #38bdf8; padding:0.85rem; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:#cbd5e1; margin-bottom:0.4rem;">
              <span id="sync-label" style="font-family:monospace;">[LOG] Iniciando Playwright Headless Worker...</span>
              <span id="sync-percent" style="font-weight:700; color:#38bdf8;">0%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" id="sync-progress"></div>
            </div>
          </div>

          <div class="mock-card-grid">
            <div class="mock-card" style="background:#1e293b; border-color:rgba(56, 189, 248, 0.3);">
              <div class="mock-card__title" style="color:#94a3b8;">Rendimento Global (IRA)</div>
              <div class="mock-card__val" style="color:#38bdf8; font-size:1.6rem;">89.4 <span style="font-size:0.8rem; color:#34d399;">/ 100</span></div>
              <span class="acme-status-pill acme-status-pill--approved">Desempenho Excelente</span>
            </div>
            <div class="mock-card" style="background:#1e293b; border-color:rgba(168, 85, 247, 0.3);">
              <div class="mock-card__title" style="color:#94a3b8;">Integralização do Curso</div>
              <div class="mock-card__val" style="color:#c084fc; font-size:1.6rem;">65.0%</div>
              <span style="font-size:0.75rem; color:#cbd5e1;">180 de 270 Créditos</span>
            </div>
            <div class="mock-card" style="background:#1e293b; border-color:rgba(16, 185, 129, 0.3);">
              <div class="mock-card__title" style="color:#94a3b8;">Faltas Globais</div>
              <div class="mock-card__val" style="color:#34d399; font-size:1.6rem;">3.8%</div>
              <span class="acme-status-pill acme-status-pill--approved">Frequência 96.2%</span>
            </div>
          </div>

          <h5 style="color:#f8fafc; margin-top:1.5rem; margin-bottom:0.75rem; font-size:0.95rem;">Boletim Sincronizado do Semestre (2026/2)</h5>
          
          <div style="overflow-x:auto;">
            <table class="acme-table">
              <thead>
                <tr>
                  <th>Disciplina</th>
                  <th>Etapa 1 (30p)</th>
                  <th>Etapa 2 (30p)</th>
                  <th>Etapa 3 (40p)</th>
                  <th>Média Final</th>
                  <th>Faltas</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Engenharia de Software</strong> <br><small style="color:#94a3b8;">CEFET001 · Prof. Alexandre</small></td>
                  <td>28.0</td>
                  <td>27.5</td>
                  <td>36.0</td>
                  <td><strong style="color:#34d399;">91.5</strong></td>
                  <td>2h</td>
                  <td><span class="acme-status-pill acme-status-pill--approved">🟢 Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Sistemas Operacionais II</strong> <br><small style="color:#94a3b8;">CEFET002 · Prof. Roberto</small></td>
                  <td>26.0</td>
                  <td>25.5</td>
                  <td style="color:#94a3b8;">--</td>
                  <td><strong style="color:#38bdf8;">85.8</strong></td>
                  <td>4h</td>
                  <td><span class="acme-status-pill acme-status-pill--progress">🔵 Em Andamento</span></td>
                </tr>
                <tr>
                  <td><strong>Banco de Dados I</strong> <br><small style="color:#94a3b8;">CEFET003 · Profa. Carla</small></td>
                  <td>24.5</td>
                  <td>26.0</td>
                  <td style="color:#94a3b8;">--</td>
                  <td><strong style="color:#38bdf8;">84.2</strong></td>
                  <td>0h</td>
                  <td><span class="acme-status-pill acme-status-pill--progress">🔵 Em Andamento</span></td>
                </tr>
                <tr>
                  <td><strong>Redes de Computadores I</strong> <br><small style="color:#94a3b8;">CEFET004 · Prof. Marcos</small></td>
                  <td>29.0</td>
                  <td>28.5</td>
                  <td>38.0</td>
                  <td><strong style="color:#34d399;">95.5</strong></td>
                  <td>1h</td>
                  <td><span class="acme-status-pill acme-status-pill--approved">🟢 Aprovado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="mockup-tab-content" id="acme-sim">
          <h4 style="color:#f8fafc; margin-bottom:0.4rem;">Simulador Oficial de Notas (Regra CEFET-MG)</h4>
          <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:1.25rem;">
            No CEFET-MG a média mínima para aprovação é <strong>60.0 pontos</strong> distribuídos em 3 etapas (Etapa 1: 30p, Etapa 2: 30p, Etapa 3: 40p).
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
            <div style="background:#1e293b; padding:1.25rem; border-radius:10px; border:1px solid rgba(148, 163, 184, 0.2);">
              <label style="font-size:0.8rem; color:#cbd5e1; font-weight:600;">Nota Obtida na Etapa 1 (máx 30 pts):</label>
              <input type="number" id="sim-n1" class="mock-input" value="22" max="30" min="0" style="background:#0f172a;">

              <label style="font-size:0.8rem; color:#cbd5e1; font-weight:600;">Nota Obtida na Etapa 2 (máx 30 pts):</label>
              <input type="number" id="sim-n2" class="mock-input" value="24" max="30" min="0" style="background:#0f172a;">

              <button class="mock-btn" id="btn-calcular-nota" style="width:100%; margin-top:0.5rem; background:linear-gradient(135deg, #0284c7, #0891b2);">
                🎯 Simular Mínimo na Etapa 3
              </button>
            </div>

            <div id="sim-result" style="background:rgba(212,168,67,0.12); border:1px solid #f59e0b; padding:1.25rem; border-radius:10px; color:#fff; display:flex; flex-direction:column; justify-content:center; text-align:center;">
              <span style="font-size:0.8rem; color:#fcd34d; text-transform:uppercase; font-weight:700;">Resultado da Simulação</span>
              <div style="font-size:1.8rem; font-weight:800; color:#fff; margin:0.4rem 0;">14.0 pts</div>
              <p style="font-size:0.85rem; color:#cbd5e1; margin:0;">Você precisa de apenas <strong>14.0 pontos</strong> dos 40.0 da Etapa 3 para ser aprovado!</p>
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="acme-grid">
          <h4 style="color:#f8fafc; margin-bottom:0.4rem;">Grade Horária & Pré-requisitos PPC</h4>
          <p style="color:#94a3b8; font-size:0.85rem; margin-bottom:1rem;">
            Matriz curricular de Engenharia de Computação sincronizada com o SIGAA.
          </p>

          <div style="background:#1e293b; padding:1rem; border-radius:8px; border:1px solid rgba(148,163,184,0.2);">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; color:#fff; margin-bottom:0.5rem;">
              <span>Integralização dos Créditos:</span>
              <span style="font-weight:700; color:#38bdf8;">180 / 270 Horas-aula</span>
            </div>
            <div class="progress-bar-container" style="height:12px;">
              <div class="progress-bar-fill" style="width:65%;"></div>
            </div>
            <p style="font-size:0.8rem; color:#34d399; margin-top:0.75rem;">
              ✓ Liberação confirmada para: Compiladores, Sistemas Distribuídos e TCC I.
            </p>
          </div>
        </div>
      </div>
    `;

    bindTabSwitching();

    /* Interação de Sync em tempo real */
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
        const logs = [
          "[LOG] Conectando ao SIGAA CEFET-MG via Playwright Headless Worker...",
          "[LOG] Autenticando credenciais do usuário...",
          "[LOG] Baixando turmas ativas e cálculo de frequência...",
          "[LOG] Processando médias e integralização PPC...",
          "✅ Sincronização em tempo real concluída com sucesso!"
        ];
        const interval = setInterval(function () {
          width += 25;
          if (width <= 100) {
            syncProgress.style.width = width + "%";
            syncPercent.textContent = width + "%";
            const logIdx = Math.min(Math.floor((width / 100) * (logs.length - 1)), logs.length - 2);
            syncLabel.textContent = logs[logIdx];
          } else {
            clearInterval(interval);
            syncLabel.textContent = logs[logs.length - 1];
            btnSync.disabled = false;
            btnSync.style.opacity = "1";
          }
        }, 350);
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
          simResult.innerHTML = `
            <span style="font-size:0.8rem; color:#34d399; text-transform:uppercase; font-weight:700;">Status: Aprovado</span>
            <div style="font-size:1.8rem; font-weight:800; color:#34d399; margin:0.4rem 0;">${atual.toFixed(1)} pts</div>
            <p style="font-size:0.85rem; color:#cbd5e1; margin:0;">🎉 Parabéns! Você já atingiu a média mínima de 60.0 pontos!</p>
          `;
          simResult.style.borderColor = "#10b981";
          simResult.style.background = "rgba(16, 185, 129, 0.12)";
        } else if (falta > 40) {
          simResult.innerHTML = `
            <span style="font-size:0.8rem; color:#ef4444; text-transform:uppercase; font-weight:700;">Atenção: Risco Acadêmico</span>
            <div style="font-size:1.8rem; font-weight:800; color:#ef4444; margin:0.4rem 0;">${atual.toFixed(1)} pts</div>
            <p style="font-size:0.85rem; color:#cbd5e1; margin:0;">Precisaria de ${falta.toFixed(1)} pts (a Etapa 3 vale no máximo 40.0 pts).</p>
          `;
          simResult.style.borderColor = "#ef4444";
          simResult.style.background = "rgba(239, 68, 68, 0.12)";
        } else {
          simResult.innerHTML = `
            <span style="font-size:0.8rem; color:#fcd34d; text-transform:uppercase; font-weight:700;">Simulação da Etapa 3</span>
            <div style="font-size:1.8rem; font-weight:800; color:#fff; margin:0.4rem 0;">${falta.toFixed(1)} pts</div>
            <p style="font-size:0.85rem; color:#cbd5e1; margin:0;">Você possui ${atual.toFixed(1)} pts acumulados. Precisa de <strong>${falta.toFixed(1)} pts</strong> na Etapa 3!</p>
          `;
          simResult.style.borderColor = "#f59e0b";
          simResult.style.background = "rgba(212, 168, 67, 0.12)";
        }
      });
    }
  }

  /* ========== TEMPLATES E INTERAÇÕES DO EASY TRIP ========== */
  function renderEasyTripMockup() {
    modalBody.innerHTML = `
      <div class="smartphone-frame" id="easytrip-phone">
        <div class="smartphone-notch">
          <div class="smartphone-camera"></div>
        </div>

        <!-- Seletor Interativo de Paletas Coolors -->
        <div class="easytrip-palette-bar">
          <span style="font-size:0.65rem; color:#94a3b8; font-weight:600;">Paletas Coolors:</span>
          <button class="palette-chip palette-chip--active" data-bg="#0b0718" data-accent="#8b5cf6">🟣 Cyber Violet</button>
          <button class="palette-chip" data-bg="#1a0c02" data-accent="#ea580c">🔥 Sunset Neon</button>
          <button class="palette-chip" data-bg="#02140d" data-accent="#059669">🌲 Emerald Trip</button>
          <button class="palette-chip" data-bg="#03111e" data-accent="#0284c7">🌊 Ocean Deep</button>
        </div>

        <div style="padding:0.6rem 1rem; background:rgba(0,0,0,0.4); display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#94a3b8;">
          <span>09:41</span>
          <span style="font-weight:700; color:#fff;">Easy Trip · iOS & Android</span>
          <span>🔋 100%</span>
        </div>

        <div class="mockup-tabs" style="background:rgba(0,0,0,0.6);">
          <button class="mockup-tab mockup-tab--active" data-tab="trip-wizard">Roteiros com IA</button>
          <button class="mockup-tab" data-tab="trip-radar">Radar da Noite</button>
          <button class="mockup-tab" data-tab="trip-split">Rateio de Gastos</button>
        </div>

        <div class="mockup-tab-content mockup-tab-content--active" id="trip-wizard">
          <div style="background:linear-gradient(135deg, rgba(139,92,246,0.2), rgba(236,72,153,0.15)); padding:0.85rem; border-radius:12px; border:1px solid rgba(139,92,246,0.3); margin-bottom:1rem;">
            <span style="font-size:0.7rem; color:#a855f7; font-weight:700; text-transform:uppercase;">Viagem de Grupo</span>
            <h4 style="color:#fff; margin:0.2rem 0; font-size:1.05rem;">Rio de Janeiro 🌴</h4>
            <p style="font-size:0.75rem; color:#cbd5e1; margin:0;">5 Dias · 4 Viajantes (Kairo, Lucas, Ana, Marina)</p>
          </div>

          <label style="font-size:0.75rem; color:#cbd5e1; font-weight:600;">Destino da Viagem:</label>
          <select id="trip-dest" class="mock-input" style="background:rgba(255,255,255,0.06);">
            <option value="Rio de Janeiro (RJ)">Rio de Janeiro (RJ)</option>
            <option value="Florianópolis (SC)">Florianópolis (SC)</option>
            <option value="Ouro Preto (MG)">Ouro Preto (MG)</option>
          </select>

          <label style="font-size:0.75rem; color:#cbd5e1; font-weight:600;">Estilo do Grupo:</label>
          <select id="trip-vibe" class="mock-input" style="background:rgba(255,255,255,0.06);">
            <option value="Bares, Shows & Vida Noturna">Bares, Shows & Vida Noturna</option>
            <option value="Praias, Trilhas & Ecoturismo">Praias, Trilhas & Ecoturismo</option>
            <option value="Gastronomia & Centro Histórico">Gastronomia & Centro Histórico</option>
          </select>

          <button class="mock-btn" id="btn-generate-trip" style="width:100%; margin-bottom:1rem; background:linear-gradient(135deg, #8b5cf6, #ec4899);">
            ✨ Gerar Roteiro com Inteligência Artificial
          </button>

          <div id="trip-itinerary-output">
            <div class="easytrip-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span class="mock-badge" style="background:rgba(139,92,246,0.25); color:#c084fc; border-color:#a855f7;">Dia 1 · 09:30</span>
                <span style="font-size:0.7rem; color:#94a3b8;">Google Places ⭐ 4.9</span>
              </div>
              <h6 style="color:#fff; margin:0; font-size:0.9rem;">Caminhada & Coco Gelado em Ipanema</h6>
              <p style="font-size:0.75rem; color:#cbd5e1; margin:0.2rem 0 0 0;">Posto 9 · Curadoria IA de locais em alta na manhã.</p>
            </div>

            <div class="easytrip-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span class="mock-badge" style="background:rgba(236,72,153,0.25); color:#f472b6; border-color:#ec4899;">Dia 1 · 20:00</span>
                <span style="font-size:0.7rem; color:#fcd34d;">🔥 Radar da Noite</span>
              </div>
              <h6 style="color:#fff; margin:0; font-size:0.9rem;">Bar & Samba na Lapa (Circo Voador)</h6>
              <p style="font-size:0.75rem; color:#cbd5e1; margin:0.2rem 0 0 0;">Música ao vivo, grupo de 4 convidados sincronizados.</p>
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="trip-radar">
          <div style="background:linear-gradient(135deg, #4c1d95, #1e1b4b); padding:0.85rem; border-radius:10px; border:1px solid rgba(139,92,246,0.4); margin-bottom:0.85rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.7rem; color:#c084fc; font-weight:600; text-transform:uppercase;">Radar da Noite</span>
              <h5 style="color:#fff; margin:0; font-size:1.1rem;">🌙 24°C · Céu Limpo</h5>
            </div>
            <span class="mock-badge" style="background:rgba(56,189,248,0.2); color:#38bdf8;">Google Places API</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            <div class="easytrip-card">
              <div class="easytrip-place-img" style="background:linear-gradient(135deg, #60a5fa, #1d4ed8);">
                🍹 Bar & Brewpub da Lapa
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:0.4rem; font-size:0.78rem;">
                <span style="color:#cbd5e1;">350m de distância · R$ R$</span>
                <span style="color:#fcd34d; font-weight:700;">⭐ 4.8 (850+)</span>
              </div>
            </div>

            <div class="easytrip-card">
              <div class="easytrip-place-img" style="background:linear-gradient(135deg, #c084fc, #9333ea);">
                🎵 Show ao Vivo no Circo Voador
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:0.4rem; font-size:0.78rem;">
                <span style="color:#cbd5e1;">1.2 km de distância · R$$$</span>
                <span style="color:#fcd34d; font-weight:700;">⭐ 4.9 (2.1k)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="mockup-tab-content" id="trip-split">
          <h5 style="color:#fff; margin-bottom:0.3rem;">Calculadora de Rateio de Despesas</h5>
          <p style="color:#94a3b8; font-size:0.78rem; margin-bottom:0.85rem;">
            Divida o AirBnb, combustível e jantares entre o grupo com 1 clique.
          </p>

          <label style="font-size:0.75rem; color:#cbd5e1;">Valor Total da Conta (R$):</label>
          <input type="number" id="split-total" class="mock-input" value="360" min="0" style="background:rgba(255,255,255,0.06);">

          <label style="font-size:0.75rem; color:#cbd5e1;">Número de Amigos:</label>
          <input type="number" id="split-people" class="mock-input" value="4" min="1" style="background:rgba(255,255,255,0.06);">

          <button class="mock-btn" id="btn-calc-split" style="width:100%; margin-bottom:0.85rem; background:linear-gradient(135deg, #10b981, #059669);">
            💸 Calcular Divisão de Gastos
          </button>

          <div id="split-result" style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:0.85rem; border-radius:8px; color:#fff; font-size:0.85rem; text-align:center; font-weight:600;">
            Cada pessoa paga: <strong>R$ 90.00</strong>
          </div>
        </div>

        <div class="easytrip-bottom-nav">
          <div class="easytrip-nav-item easytrip-nav-item--active">
            <span>📍</span>
            <span>Roteiros</span>
          </div>
          <div class="easytrip-nav-item">
            <span>🌙</span>
            <span>Radar</span>
          </div>
          <div class="easytrip-nav-item">
            <span>💸</span>
            <span>Gastos</span>
          </div>
        </div>
      </div>
    `;

    bindTabSwitching();

    /* Troca Dinâmica de Paletas Coolors */
    const paletteChips = modalBody.querySelectorAll(".palette-chip");
    const phoneFrame = modalBody.querySelector("#easytrip-phone");

    paletteChips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        paletteChips.forEach(function (c) { c.classList.remove("palette-chip--active"); });
        chip.classList.add("palette-chip--active");

        const bg = chip.getAttribute("data-bg");
        if (phoneFrame) {
          phoneFrame.style.background = bg;
        }
      });
    });

    /* Interação do Gerador com IA */
    const btnGen = document.getElementById("btn-generate-trip");
    const tripDest = document.getElementById("trip-dest");
    const tripVibe = document.getElementById("trip-vibe");
    const tripOutput = document.getElementById("trip-itinerary-output");

    if (btnGen) {
      btnGen.addEventListener("click", function () {
        const dest = tripDest.value;
        const vibe = tripVibe.value;
        btnGen.textContent = "⚡ Consultando IA (OpenAI)...";
        setTimeout(function () {
          btnGen.textContent = "✨ Gerar Roteiro com Inteligência Artificial";
          tripOutput.innerHTML = `
            <div class="easytrip-card" style="border-color:#10b981; background:rgba(16,185,129,0.1);">
              <span class="mock-badge" style="background:rgba(16,185,129,0.25); color:#34d399;">Roteiro Gerado com Sucesso!</span>
              <h6 style="color:#fff; margin:0.4rem 0 0.1rem 0;">Destino: ${dest}</h6>
              <p style="font-size:0.75rem; color:#cbd5e1; margin:0;">Estilo: ${vibe} · Roteiro inteligente em 3 dias com sincronização Supabase e mapas em tempo real.</p>
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
        splitResult.innerHTML = "Cada pessoa paga: <strong style='color:#34d399;'>R$ " + perPerson.toFixed(2) + "</strong>";
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
