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
      <div class="mockup-frame mockup-frame--acme">
        <div class="mockup-browser-header" style="background:#000d1c; border-bottom:1px solid rgba(212,168,67,0.25);">
          <div class="mockup-dots">
            <span class="mockup-dot mockup-dot--red"></span>
            <span class="mockup-dot mockup-dot--yellow"></span>
            <span class="mockup-dot mockup-dot--green"></span>
          </div>
          <div class="mockup-url-bar" style="background:rgba(0,30,60,0.8); border:1px solid rgba(212,168,67,0.3); color:#d4a843;">
            🔒 https://acmehub.com.br/dashboard
          </div>
        </div>

        <div class="acme-nav-header">
          <div class="acme-logo">
            <span class="acme-logo-badge">AH</span>
            <span style="color:#ffffff;">ACME<span style="color:#d4a843;">HUB</span></span>
            <span style="font-size:0.75rem; color:#8ba0be; font-weight:400;">CEFET-MG</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <span class="acme-status-pill acme-status-pill--approved" style="background:rgba(63,185,80,0.15); border:1px solid #3fb950; color:#3fb950;">
              🟢 Playwright SIGAA Worker Online
            </span>
            <span style="background:rgba(0,88,168,0.4); color:#f4f8fc; font-size:0.8rem; font-weight:600; padding:0.35rem 0.85rem; border-radius:50px; border:1px solid rgba(212,168,67,0.3);">
              🎓 Kairo Henrique (Engenharia de Computação)
            </span>
          </div>
        </div>

        <div class="mockup-tabs" style="background:rgba(0,20,40,0.9); border-bottom:1px solid rgba(212,168,67,0.25);">
          <button class="mockup-tab mockup-tab--active" data-tab="acme-dash">Dashboard F28</button>
          <button class="mockup-tab" data-tab="acme-sim">Calculadora 3-Etapas CEFET</button>
          <button class="mockup-tab" data-tab="acme-integralizao">Integralização CHT</button>
          <button class="mockup-tab" data-tab="acme-grid">Simulador de Matrícula</button>
          <button class="mockup-tab" data-tab="acme-live" style="color:#d4a843; font-weight:700;">🌐 Site Oficial (acmehub.com.br)</button>
        </div>

        <!-- ABA 1: DASHBOARD F28 -->
        <div class="mockup-tab-content mockup-tab-content--active" id="acme-dash">
          <div style="display:flex; align-items:center; justify-space-between; flex-wrap:wrap; gap:1rem; margin-bottom:1.25rem;">
            <div>
              <h4 style="color:#ffffff; margin:0; font-size:1.15rem; font-family:var(--font-display);">Visão Geral Acadêmica</h4>
              <p style="color:#94a3b4; font-size:0.82rem; margin:0.2rem 0 0 0;">Campus Divinópolis · Matrícula 2024100XXX · 6º Período</p>
            </div>
            <div style="display:flex; gap:0.5rem;">
              <span class="acme-status-pill" style="background:rgba(212,168,67,0.15); color:#d4a843; border:1px solid rgba(212,168,67,0.4);">
                💳 Saldo RU: R$ 14,50 (4 refeições)
              </span>
              <button class="btn-acme-gold" id="btn-sync-sigaa">
                🔄 Sincronizar SIGAA
              </button>
            </div>
          </div>

          <div id="sync-status-box" style="display:none; margin-bottom:1.25rem; background:rgba(0, 30, 60, 0.95); border:1px solid #d4a843; padding:0.85rem; border-radius:8px;">
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:#f4f8fc; margin-bottom:0.4rem;">
              <span id="sync-label" style="font-family:monospace;">[Playwright] Conectando ao servidor SIGAA do CEFET-MG...</span>
              <span id="sync-percent" style="font-weight:700; color:#d4a843;">0%</span>
            </div>
            <div class="progress-bar-container" style="background:rgba(0,16,32,0.8); border:1px solid rgba(212,168,67,0.2);">
              <div class="progress-bar-fill" id="sync-progress" style="background:linear-gradient(90deg, #0058a8, #d4a843);"></div>
            </div>
          </div>

          <div class="mock-card-grid">
            <div class="acme-card">
              <div class="mock-card__title" style="color:#8ba0be;">Rendimento Global (IRA)</div>
              <div class="mock-card__val" style="color:#d4a843; font-size:1.8rem; font-family:var(--font-display); font-weight:800;">89.4 <span style="font-size:0.8rem; color:#3fb950;">/ 100</span></div>
              <span class="acme-status-pill" style="background:rgba(63,185,80,0.15); color:#3fb950; font-size:0.75rem;">Top 5% da Turma</span>
            </div>
            <div class="acme-card">
              <div class="mock-card__title" style="color:#8ba0be;">Progresso CHT (Créditos)</div>
              <div class="mock-card__val" style="color:#2088d4; font-size:1.8rem; font-family:var(--font-display); font-weight:800;">66.7%</div>
              <span style="font-size:0.75rem; color:#c2cdd8;">180 de 270 Horas-aula</span>
            </div>
            <div class="acme-card">
              <div class="mock-card__title" style="color:#8ba0be;">Taxa de Faltas Globais</div>
              <div class="mock-card__val" style="color:#3fb950; font-size:1.8rem; font-family:var(--font-display); font-weight:800;">3.8%</div>
              <span class="acme-status-pill" style="background:rgba(63,185,80,0.15); color:#3fb950; font-size:0.75rem;">Frequência 96.2%</span>
            </div>
          </div>

          <div style="margin-top:1.25rem; background:rgba(0,30,60,0.6); border:1px solid rgba(212,168,67,0.2); border-radius:10px; padding:0.85rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
            <div>
              <span style="font-size:0.75rem; color:#d4a843; text-transform:uppercase; font-weight:700;">Próxima Aula · Hoje às 19:00</span>
              <h5 style="color:#fff; margin:0.1rem 0 0 0;">Engenharia de Software (Sala 302 · Bloco C)</h5>
            </div>
            <span class="acme-status-pill" style="background:rgba(32,136,212,0.2); color:#2088d4;">2h de Duração</span>
          </div>

          <h5 style="color:#ffffff; margin-top:1.5rem; margin-bottom:0.75rem; font-size:1rem; font-family:var(--font-display);">Boletim de Notas Sincronizado</h5>
          
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
                  <td><strong>Engenharia de Software</strong> <br><small style="color:#8ba0be;">CEFET001 · Prof. Alexandre</small></td>
                  <td>28.0</td>
                  <td>27.5</td>
                  <td>36.0</td>
                  <td><strong style="color:#3fb950;">91.5</strong></td>
                  <td>2h</td>
                  <td><span class="acme-status-pill" style="background:rgba(63,185,80,0.15); color:#3fb950;">🟢 Aprovado</span></td>
                </tr>
                <tr>
                  <td><strong>Sistemas Operacionais II</strong> <br><small style="color:#8ba0be;">CEFET002 · Prof. Roberto</small></td>
                  <td>26.0</td>
                  <td>25.5</td>
                  <td style="color:#8ba0be;">--</td>
                  <td><strong style="color:#2088d4;">85.8</strong></td>
                  <td>4h</td>
                  <td><span class="acme-status-pill" style="background:rgba(32,136,212,0.15); color:#2088d4;">🔵 Em Andamento</span></td>
                </tr>
                <tr>
                  <td><strong>Banco de Dados I</strong> <br><small style="color:#8ba0be;">CEFET003 · Profa. Carla</small></td>
                  <td>24.5</td>
                  <td>26.0</td>
                  <td style="color:#8ba0be;">--</td>
                  <td><strong style="color:#2088d4;">84.2</strong></td>
                  <td>0h</td>
                  <td><span class="acme-status-pill" style="background:rgba(32,136,212,0.15); color:#2088d4;">🔵 Em Andamento</span></td>
                </tr>
                <tr>
                  <td><strong>Redes de Computadores I</strong> <br><small style="color:#8ba0be;">CEFET004 · Prof. Marcos</small></td>
                  <td>29.0</td>
                  <td>28.5</td>
                  <td>38.0</td>
                  <td><strong style="color:#3fb950;">95.5</strong></td>
                  <td>1h</td>
                  <td><span class="acme-status-pill" style="background:rgba(63,185,80,0.15); color:#3fb950;">🟢 Aprovado</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ABA 2: CALCULADORA CEFET-MG -->
        <div class="mockup-tab-content" id="acme-sim">
          <h4 style="color:#ffffff; margin-bottom:0.4rem; font-family:var(--font-display);">Calculadora Oficial de Notas (Regra 3-Etapas CEFET-MG)</h4>
          <p style="color:#94a3b4; font-size:0.85rem; margin-bottom:1.25rem;">
            No CEFET-MG, a distribuição de pontos é dividida em 3 etapas: <strong>Etapa 1 (30p)</strong>, <strong>Etapa 2 (30p)</strong> e <strong>Etapa 3 (40p)</strong>.
            A nota mínima global para aprovação direta é <strong>60.0 pontos</strong>.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:1.25rem;">
            <div class="acme-card">
              <label style="font-size:0.8rem; color:#c2cdd8; font-weight:600;">Nota obtida na Etapa 1 (máx 30 pts):</label>
              <input type="number" id="sim-n1" class="mock-input" value="22" max="30" min="0" style="background:rgba(0,16,32,0.8); color:#fff; border-color:rgba(212,168,67,0.3);">

              <label style="font-size:0.8rem; color:#c2cdd8; font-weight:600; margin-top:0.75rem; display:block;">Nota obtida na Etapa 2 (máx 30 pts):</label>
              <input type="number" id="sim-n2" class="mock-input" value="24" max="30" min="0" style="background:rgba(0,16,32,0.8); color:#fff; border-color:rgba(212,168,67,0.3);">

              <button class="btn-acme-gold" id="btn-calcular-nota" style="width:100%; margin-top:1rem;">
                🎯 Simular Nota Mínima para Etapa 3
              </button>
            </div>

            <div id="sim-result" style="background:rgba(212,168,67,0.12); border:1px solid #d4a843; padding:1.25rem; border-radius:10px; color:#fff; display:flex; flex-direction:column; justify-content:center; text-align:center;">
              <span style="font-size:0.8rem; color:#d4a843; text-transform:uppercase; font-weight:700;">Resultado da Simulação</span>
              <div style="font-size:2.2rem; font-weight:800; color:#ffffff; font-family:var(--font-display); margin:0.4rem 0;">14.0 pts</div>
              <p style="font-size:0.85rem; color:#c2cdd8; margin:0;">Você já possui 46.0 pts. Precisa de apenas <strong>14.0 pontos</strong> dos 40.0 da Etapa 3 para ser aprovado!</p>
            </div>
          </div>
        </div>

        <!-- ABA 3: INTEGRALIZAÇÃO CHT -->
        <div class="mockup-tab-content" id="acme-integralizao">
          <h4 style="color:#ffffff; margin-bottom:0.4rem; font-family:var(--font-display);">Integralização Curricular CHT</h4>
          <p style="color:#94a3b4; font-size:0.85rem; margin-bottom:1.25rem;">
            Acompanhamento de Carga Horária Total (CHT) dividida por categorias do PPC do CEFET-MG.
          </p>

          <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap:1.25rem;">
            <div class="acme-card">
              <h5 style="color:#d4a843; margin-top:0; font-size:0.95rem;">Disciplinas Obrigatórias</h5>
              <div style="font-size:1.6rem; font-weight:700; color:#fff; font-family:var(--font-display); margin:0.3rem 0;">2.100h / 2.400h</div>
              <div class="progress-bar-container" style="background:rgba(0,16,32,0.8); margin-top:0.5rem; height:8px;">
                <div class="progress-bar-fill" style="width:87.5%; background:#2088d4;"></div>
              </div>
              <span style="font-size:0.75rem; color:#94a3b4; display:block; margin-top:0.5rem;">Falta concluir: 300h (5 disciplinas)</span>
            </div>

            <div class="acme-card">
              <h5 style="color:#d4a843; margin-top:0; font-size:0.95rem;">Disciplinas Optativas</h5>
              <div style="font-size:1.6rem; font-weight:700; color:#fff; font-family:var(--font-display); margin:0.3rem 0;">180h / 240h</div>
              <div class="progress-bar-container" style="background:rgba(0,16,32,0.8); margin-top:0.5rem; height:8px;">
                <div class="progress-bar-fill" style="width:75%; background:#d4a843;"></div>
              </div>
              <span style="font-size:0.75rem; color:#94a3b4; display:block; margin-top:0.5rem;">Falta concluir: 60h (1 optativa)</span>
            </div>

            <div class="acme-card">
              <h5 style="color:#d4a843; margin-top:0; font-size:0.95rem;">Atividades Complementares</h5>
              <div style="font-size:1.6rem; font-weight:700; color:#fff; font-family:var(--font-display); margin:0.3rem 0;">120h / 120h</div>
              <div class="progress-bar-container" style="background:rgba(0,16,32,0.8); margin-top:0.5rem; height:8px;">
                <div class="progress-bar-fill" style="width:100%; background:#3fb950;"></div>
              </div>
              <span style="font-size:0.75rem; color:#3fb950; display:block; margin-top:0.5rem;">✓ 100% Concluído (Horas validadas)</span>
            </div>
          </div>
        </div>

        <!-- ABA 4: SIMULADOR DE MATRÍCULA -->
        <div class="mockup-tab-content" id="acme-grid">
          <h4 style="color:#ffffff; margin-bottom:0.4rem; font-family:var(--font-display);">Simulador de Grade Horária & Matrícula</h4>
          <p style="color:#94a3b4; font-size:0.85rem; margin-bottom:1rem;">
            Monte a sua grade semestral testando turmas ofertadas com verificação de choques de horário.
          </p>

          <div class="acme-card" style="overflow-x:auto;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
              <span style="font-size:0.8rem; color:#3fb950; font-weight:700;">🟢 Nenhum conflito de horário detectado</span>
              <span style="font-size:0.8rem; color:#d4a843; font-weight:600;">22 Horas-aula selecionadas</span>
            </div>
            <table class="acme-table" style="font-size:0.8rem; text-align:center;">
              <thead>
                <tr>
                  <th>Horário</th>
                  <th>Segunda</th>
                  <th>Terça</th>
                  <th>Quarta</th>
                  <th>Quinta</th>
                  <th>Sexta</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>19:00 - 20:40</td>
                  <td style="background:rgba(32,136,212,0.25); border:1px solid #2088d4;">Eng. Software</td>
                  <td style="background:rgba(212,168,67,0.25); border:1px solid #d4a843;">Sistemas Operacionais II</td>
                  <td style="background:rgba(32,136,212,0.25); border:1px solid #2088d4;">Eng. Software</td>
                  <td style="background:rgba(212,168,67,0.25); border:1px solid #d4a843;">Sistemas Operacionais II</td>
                  <td style="background:rgba(63,185,80,0.25); border:1px solid #3fb950;">Redes I</td>
                </tr>
                <tr>
                  <td>20:50 - 22:30</td>
                  <td style="background:rgba(168,85,247,0.25); border:1px solid #a855f7;">Banco de Dados I</td>
                  <td>--</td>
                  <td style="background:rgba(168,85,247,0.25); border:1px solid #a855f7;">Banco de Dados I</td>
                  <td>--</td>
                  <td style="background:rgba(63,185,80,0.25); border:1px solid #3fb950;">Redes I</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ABA 5: SITE OFICIAL EMBED -->
        <div class="mockup-tab-content" id="acme-live">
          <div style="background:rgba(0,20,40,0.9); border:1px solid rgba(212,168,67,0.3); border-radius:8px; padding:0.75rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <span style="color:#d4a843; font-size:0.85rem; font-weight:600;">⚡ Você está visualizando o site real acmehub.com.br</span>
            <a href="https://acmehub.com.br" target="_blank" rel="noopener noreferrer" class="btn-acme-gold" style="text-decoration:none; padding:0.35rem 0.85rem;">
              Abrir em Nova Aba ↗
            </a>
          </div>
          <iframe src="https://acmehub.com.br" style="width:100%; height:480px; border:1px solid rgba(212,168,67,0.3); border-radius:8px; background:#001428;" title="ACME HUB Site Real"></iframe>
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
          "[Playwright] Conectando ao servidor SIGAA do CEFET-MG...",
          "[Playwright] Autenticando credenciais com sessão criptografada...",
          "[Playwright] Extraindo notas das 3 Etapas e registro de faltas...",
          "[Playwright] Recalculando IRA e matriz de integralização PPC...",
          "✅ Sincronização em tempo real do SIGAA realizada com sucesso!"
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

    /* Interação da Calculadora 3-Etapas CEFET-MG */
    const btnCalc = document.getElementById("btn-calcular-nota");
    const simN1 = document.getElementById("sim-n1");
    const simN2 = document.getElementById("sim-n2");
    const simResult = document.getElementById("sim-result");

    if (btnCalc) {
      btnCalc.addEventListener("click", function () {
        const n1 = parseFloat(simN1.value) || 0;
        const n2 = parseFloat(simN2.value) || 0;
        const acumulado = n1 + n2;
        const falta = 60 - acumulado;

        if (falta <= 0) {
          simResult.innerHTML = `
            <span style="font-size:0.8rem; color:#3fb950; text-transform:uppercase; font-weight:700;">Status: Aprovado Direto!</span>
            <div style="font-size:2.2rem; font-weight:800; color:#3fb950; font-family:var(--font-display); margin:0.4rem 0;">${acumulado.toFixed(1)} pts</div>
            <p style="font-size:0.85rem; color:#c2cdd8; margin:0;">🎉 Parabéns! Você já acumula ${acumulado.toFixed(1)} pts (superou o mínimo de 60.0 pts)!</p>
          `;
          simResult.style.borderColor = "#3fb950";
          simResult.style.background = "rgba(63, 185, 80, 0.15)";
        } else if (falta > 40) {
          simResult.innerHTML = `
            <span style="font-size:0.8rem; color:#f85149; text-transform:uppercase; font-weight:700;">Status: Necessita Exame Final</span>
            <div style="font-size:2.2rem; font-weight:800; color:#f85149; font-family:var(--font-display); margin:0.4rem 0;">${acumulado.toFixed(1)} pts</div>
            <p style="font-size:0.85rem; color:#c2cdd8; margin:0;">Faltam ${falta.toFixed(1)} pts (a Etapa 3 distribui no máximo 40.0 pts).</p>
          `;
          simResult.style.borderColor = "#f85149";
          simResult.style.background = "rgba(248, 81, 73, 0.15)";
        } else {
          simResult.innerHTML = `
            <span style="font-size:0.8rem; color:#d4a843; text-transform:uppercase; font-weight:700;">Simulação para Etapa 3</span>
            <div style="font-size:2.2rem; font-weight:800; color:#ffffff; font-family:var(--font-display); margin:0.4rem 0;">${falta.toFixed(1)} pts</div>
            <p style="font-size:0.85rem; color:#c2cdd8; margin:0;">Você possui ${acumulado.toFixed(1)} pts nas duas primeiras etapas. Precisa de <strong>${falta.toFixed(1)} pts</strong> dos 40.0 da Etapa 3!</p>
          `;
          simResult.style.borderColor = "#d4a843";
          simResult.style.background = "rgba(212, 168, 67, 0.15)";
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

        <!-- Seletor de Tema & Paletas Coolors -->
        <div class="easytrip-palette-bar">
          <span style="font-size:0.65rem; color:#a8a29e; font-weight:600;">Tema / Coolors:</span>
          <button class="palette-chip palette-chip--active" data-bg="#12100E" data-card="#1C1917" data-text="#FAFAF9" data-accent="#E11D48">🌙 Cozy Dark</button>
          <button class="palette-chip" data-bg="#FAFAF9" data-card="#FFFFFF" data-text="#12100E" data-accent="#E11D48">☀️ Sand Light</button>
          <button class="palette-chip" data-bg="#0B0718" data-card="#170F33" data-text="#FAFAF9" data-accent="#8B5CF6">🟣 Cyber Violet</button>
          <button class="palette-chip" data-bg="#03111E" data-card="#082138" data-text="#FAFAF9" data-accent="#0284C7">🌊 Ocean Blue</button>
        </div>

        <div style="padding:0.5rem 1rem; background:rgba(0,0,0,0.3); display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:#a8a29e;">
          <span>09:41</span>
          <span style="font-weight:700; color:#e11d48;">Easy Trip · React Native App</span>
          <span>🔋 100%</span>
        </div>

        <div class="mockup-tabs" style="background:rgba(0,0,0,0.5);">
          <button class="mockup-tab mockup-tab--active" data-tab="trip-wizard">Roteiros com IA</button>
          <button class="mockup-tab" data-tab="trip-radar">Radar da Noite</button>
          <button class="mockup-tab" data-tab="trip-split">Rateio de Gastos</button>
        </div>

        <!-- ABA 1: ROTEIROS COM IA -->
        <div class="mockup-tab-content mockup-tab-content--active" id="trip-wizard">
          <div style="background:linear-gradient(135deg, rgba(225,29,72,0.25), rgba(251,146,60,0.2)); padding:0.85rem; border-radius:12px; border:1px solid rgba(225,29,72,0.4); margin-bottom:1rem;">
            <span style="font-size:0.7rem; color:#e11d48; font-weight:700; text-transform:uppercase;">Roteiro em Grupo · Sync Supabase</span>
            <h4 style="color:#ffffff; margin:0.2rem 0; font-size:1.1rem; font-family:var(--font-display);">Rio de Janeiro 🌴</h4>
            <p style="font-size:0.75rem; color:#cbd5e1; margin:0;">5 Dias · 4 Viajantes (Kairo, Lucas, Ana, Marina)</p>
          </div>

          <label style="font-size:0.75rem; color:#cbd5e1; font-weight:600;">Selecione o Destino:</label>
          <select id="trip-dest" class="mock-input" style="background:rgba(255,255,255,0.08); color:#fff; border-color:rgba(225,29,72,0.3);">
            <option value="Rio de Janeiro (RJ)">Rio de Janeiro (RJ)</option>
            <option value="Florianópolis (SC)">Florianópolis (SC)</option>
            <option value="Ouro Preto (MG)">Ouro Preto (MG)</option>
          </select>

          <label style="font-size:0.75rem; color:#cbd5e1; font-weight:600; margin-top:0.5rem; display:block;">Estilo da Viagem:</label>
          <select id="trip-vibe" class="mock-input" style="background:rgba(255,255,255,0.08); color:#fff; border-color:rgba(225,29,72,0.3);">
            <option value="Bares, Shows & Vida Noturna">Bares, Shows & Vida Noturna</option>
            <option value="Praias, Trilhas & Ecoturismo">Praias, Trilhas & Ecoturismo</option>
            <option value="Gastronomia & Centro Histórico">Gastronomia & Centro Histórico</option>
          </select>

          <button class="mock-btn" id="btn-generate-trip" style="width:100%; margin-top:0.85rem; margin-bottom:1rem; background:linear-gradient(135deg, #e11d48, #fb923c); color:#fff; font-weight:700; border:none;">
            ✨ Gerar Roteiro com IA (OpenAI)
          </button>

          <div id="trip-itinerary-output">
            <div class="easytrip-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span class="mock-badge" style="background:rgba(225,29,72,0.25); color:#f43f5e; border-color:#e11d48;">Dia 1 · 09:30</span>
                <span style="font-size:0.7rem; color:#fb923c;">Google Places ⭐ 4.9</span>
              </div>
              <h6 style="color:#fff; margin:0; font-size:0.9rem;">Caminhada & Coco Gelado em Ipanema</h6>
              <p style="font-size:0.75rem; color:#a8a29e; margin:0.2rem 0 0 0;">Posto 9 · Curadoria de locais em alta sugeridos pela IA.</p>
            </div>

            <div class="easytrip-card">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
                <span class="mock-badge" style="background:rgba(251,146,60,0.25); color:#fb923c; border-color:#f97316;">Dia 1 · 20:00</span>
                <span style="font-size:0.7rem; color:#fcd34d;">🔥 Radar da Noite</span>
              </div>
              <h6 style="color:#fff; margin:0; font-size:0.9rem;">Bar & Samba na Lapa (Circo Voador)</h6>
              <p style="font-size:0.75rem; color:#a8a29e; margin:0.2rem 0 0 0;">Música ao vivo, 4 convidados sincronizados em tempo real.</p>
            </div>
          </div>
        </div>

        <!-- ABA 2: RADAR DA NOITE -->
        <div class="mockup-tab-content" id="trip-radar">
          <div style="background:linear-gradient(135deg, rgba(225,29,72,0.3), rgba(124,58,237,0.3)); padding:0.85rem; border-radius:10px; border:1px solid rgba(225,29,72,0.4); margin-bottom:0.85rem; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <span style="font-size:0.7rem; color:#fb923c; font-weight:600; text-transform:uppercase;">Radar da Noite</span>
              <h5 style="color:#fff; margin:0; font-size:1.1rem; font-family:var(--font-display);">🌙 24°C · Céu Limpo</h5>
            </div>
            <span class="mock-badge" style="background:rgba(225,29,72,0.2); color:#f43f5e; border-color:#e11d48;">Google Places API</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:0.6rem;">
            <div class="easytrip-card">
              <div class="easytrip-place-img" style="background:linear-gradient(135deg, #e11d48, #9333ea);">
                🍹 Bar & Brewpub da Lapa
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:0.4rem; font-size:0.78rem;">
                <span style="color:#a8a29e;">350m de distância · R$ R$</span>
                <span style="color:#fcd34d; font-weight:700;">⭐ 4.8 (850+)</span>
              </div>
            </div>

            <div class="easytrip-card">
              <div class="easytrip-place-img" style="background:linear-gradient(135deg, #f97316, #db2777);">
                🎵 Show ao Vivo no Circo Voador
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:0.4rem; font-size:0.78rem;">
                <span style="color:#a8a29e;">1.2 km de distância · R$$$</span>
                <span style="color:#fcd34d; font-weight:700;">⭐ 4.9 (2.1k)</span>
              </div>
            </div>
          </div>
        </div>

        <!-- ABA 3: RATEIO DE GASTOS -->
        <div class="mockup-tab-content" id="trip-split">
          <h5 style="color:#fff; margin-bottom:0.3rem; font-family:var(--font-display);">Calculadora de Rateio de Despesas</h5>
          <p style="color:#a8a29e; font-size:0.78rem; margin-bottom:0.85rem;">
            Divida o AirBnb, combustível e jantares entre o grupo com cálculo automático em tempo real.
          </p>

          <label style="font-size:0.75rem; color:#cbd5e1;">Valor Total da Despesa (R$):</label>
          <input type="number" id="split-total" class="mock-input" value="360" min="0" style="background:rgba(255,255,255,0.08); color:#fff; border-color:rgba(225,29,72,0.3);">

          <label style="font-size:0.75rem; color:#cbd5e1; margin-top:0.5rem; display:block;">Número de Integrantes do Grupo:</label>
          <input type="number" id="split-people" class="mock-input" value="4" min="1" style="background:rgba(255,255,255,0.08); color:#fff; border-color:rgba(225,29,72,0.3);">

          <button class="mock-btn" id="btn-calc-split" style="width:100%; margin-top:0.85rem; margin-bottom:0.85rem; background:linear-gradient(135deg, #10b981, #059669); color:#fff; border:none; font-weight:700;">
            💸 Calcular Divisão de Gastos
          </button>

          <div id="split-result" style="background:rgba(16,185,129,0.15); border:1px solid #10b981; padding:0.85rem; border-radius:8px; color:#fff; font-size:0.85rem; text-align:center; font-weight:600;">
            Cada integrante paga: <strong>R$ 90.00</strong>
          </div>
        </div>

        <div class="easytrip-bottom-nav">
          <div class="easytrip-nav-item easytrip-nav-item--active">
            <span>🗺️</span>
            <span>Roteiros</span>
          </div>
          <div class="easytrip-nav-item">
            <span>🍸</span>
            <span>Radar</span>
          </div>
          <div class="easytrip-nav-item">
            <span>💰</span>
            <span>Rateio</span>
          </div>
        </div>
      </div>
    `;

    bindTabSwitching();

    /* Troca Dinâmica de Paletas & Temas */
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
          btnGen.textContent = "✨ Gerar Roteiro com IA (OpenAI)";
          tripOutput.innerHTML = `
            <div class="easytrip-card" style="border-color:#10b981; background:rgba(16,185,129,0.12);">
              <span class="mock-badge" style="background:rgba(16,185,129,0.25); color:#34d399; border-color:#10b981;">Roteiro Gerado pela IA!</span>
              <h6 style="color:#fff; margin:0.4rem 0 0.1rem 0; font-size:0.95rem;">Destino: ${dest}</h6>
              <p style="font-size:0.75rem; color:#c2cdd8; margin:0;">Vibe: ${vibe} · Sincronizado com Supabase cloud e Google Places API em tempo real.</p>
            </div>
          `;
        }, 500);
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
        splitResult.innerHTML = "Cada integrante paga: <strong style='color:#34d399;'>R$ " + perPerson.toFixed(2) + "</strong>";
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
