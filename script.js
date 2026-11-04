// =========================================================
// PORTFÓLIO - Bruna Valtrick (B.V txt)
// Tudo aqui roda em todas as páginas. Se um elemento não existir
// na página atual, o código simplesmente ignora (por isso os "if").
// =========================================================

// >>> TROQUE PELO SEU E-MAIL REAL <<<
const EMAIL_CONTATO = "seuemail@exemplo.com";

// ---------------------------------------------------------
// 1. Menu do celular (botão hambúrguer)
// ---------------------------------------------------------
const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("#menu");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", () => {
    // "toggle" liga/desliga a classe "open"
    const aberto = menu.classList.toggle("open");
    botaoMenu.setAttribute("aria-expanded", aberto);
  });

  // Fecha o menu ao clicar em algum link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      botaoMenu.setAttribute("aria-expanded", "false");
    });
  });
}

// ---------------------------------------------------------
// 2. Sombra no cabeçalho quando a página rola
// ---------------------------------------------------------
const cabecalho = document.querySelector(".site-header");

if (cabecalho) {
  window.addEventListener("scroll", () => {
    cabecalho.classList.toggle("scrolled", window.scrollY > 10);
  });
}

// ---------------------------------------------------------
// 3. Elementos que aparecem suavemente ao rolar a página
// ---------------------------------------------------------
const elementos = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target); // anima só uma vez
        }
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach((el) => observador.observe(el));
} else {
  // Navegador muito antigo: mostra tudo de uma vez
  elementos.forEach((el) => el.classList.add("visible"));
}

// ---------------------------------------------------------
// 4. Ano atual no rodapé (atualiza sozinho todo ano)
// ---------------------------------------------------------
const ano = document.querySelector("#ano");
if (ano) {
  ano.textContent = new Date().getFullYear();
}

// ---------------------------------------------------------
// 5. Formulário de contato
// Como o site não tem servidor, o formulário valida os campos
// e abre o programa de e-mail do visitante já preenchido.
// ---------------------------------------------------------
const formulario = document.querySelector("#form-contato");

if (formulario) {
  const feedback = document.querySelector("#form-feedback");

  // Mostra/esconde o erro de um campo
  function validarCampo(campo) {
    const valor = campo.value.trim();
    let valido = valor !== "";

    if (campo.type === "email" && valido) {
      valido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    }

    campo.closest(".field").classList.toggle("invalid", !valido);
    return valido;
  }

  const campos = formulario.querySelectorAll("input, textarea");

  // Valida enquanto a pessoa digita (depois do primeiro erro)
  campos.forEach((campo) => {
    campo.addEventListener("blur", () => validarCampo(campo));
    campo.addEventListener("input", () => {
      if (campo.closest(".field").classList.contains("invalid")) {
        validarCampo(campo);
      }
    });
  });

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault(); // impede a página de recarregar

    // Valida todos os campos
    let tudoCerto = true;
    campos.forEach((campo) => {
      if (!validarCampo(campo)) tudoCerto = false;
    });
    if (!tudoCerto) return;

    const nome = formulario.nome.value.trim();
    const email = formulario.email.value.trim();
    const assunto = formulario.assunto.value.trim();
    const mensagem = formulario.mensagem.value.trim();

    const corpo = `Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`;
    const link =
      `mailto:${EMAIL_CONTATO}` +
      `?subject=${encodeURIComponent(assunto)}` +
      `&body=${encodeURIComponent(corpo)}`;

    window.location.href = link;

    feedback.textContent =
      "Abrimos o seu programa de e-mail com a mensagem pronta. É só enviar! 💌";
    feedback.classList.add("show");
    formulario.reset();
  });
}
