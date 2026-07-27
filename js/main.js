document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================================
       1. GESTION DU MENU HAMBURGER
       ========================================================================== */
    const hamburger = document.getElementById("hamburger");
    // Correction : l'ID HTML exact est "nav-menu" (avec un tiret)
    const navMenu = document.getElementById("nav-menu"); 
    const hamburgerIcon = document.getElementById("hamburger-icon");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            // Utilisation de la classe 'open' pour correspondre à ton CSS
            const ouvert = navMenu.classList.toggle("open");

            hamburger.setAttribute("aria-expanded", ouvert);

            if (hamburgerIcon) {
                if (ouvert) {
                    hamburgerIcon.classList.remove("fa-bars");
                    hamburgerIcon.classList.add("fa-times");
                } else {
                    hamburgerIcon.classList.remove("fa-times");
                    hamburgerIcon.classList.add("fa-bars");
                }
            }
        });
    }

    /* ==========================================================================
       2. GESTION DU DARK MODE (Thème clair / sombre)
       ========================================================================== */
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    // Récupère le thème stocké OU met "dark" par défaut si c'est la 1ère visite
    const currentTheme = localStorage.getItem("theme") || "dark";

    // Application initiale du thème et de l'icône correspondante
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = document.documentElement.getAttribute("data-theme");
            const nouveau = current === "dark" ? "light" : "dark";

            // Applique le nouveau thème sur <html>
            document.documentElement.setAttribute("data-theme", nouveau);
            
            // Sauvegarde le choix utilisateur
            localStorage.setItem("theme", nouveau);

            // Mettre à jour visuellement l'icône (Lune/Soleil)
            updateThemeIcon(nouveau);
        });
    }

    // Fonction pour permuter l'icône entre Lune et Soleil
    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === "dark") {
                themeIcon.classList.remove("fa-sun");
                themeIcon.classList.add("fa-moon");
            } else {
                themeIcon.classList.remove("fa-moon");
                themeIcon.classList.add("fa-sun");
            }
        }
    }

    /* ==========================================================================
       3. EFFET HEADER AU SCROLL
       ========================================================================== */
    const header = document.getElementById("header");

    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 80) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }
    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        // 1. Détection du scroll pour afficher ou masquer le bouton
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });

        // 2. Clic sur le bouton pour remonter en douceur
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});