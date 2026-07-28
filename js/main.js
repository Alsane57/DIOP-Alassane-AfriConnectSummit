document.addEventListener("DOMContentLoaded", () => {

    const hamburger = document.getElementById("hamburger");
    // Correction : l'ID HTML exact est "nav-menu" (avec un tiret)
    const navMenu = document.getElementById("nav-Menu"); 
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

    //    2. GESTION DU DARK MODE (Thème clair / sombre)
  
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
    //  ALGORITHME DU COMPTE À REBOURS (SECTION HERO)
    const dateEvenement = new Date("Dec 25, 2026 09:00:00").getTime();

    const actualiserCompteARebours = setInterval(() => {
        const maintenant = new Date().getTime();
        const distance = dateEvenement - maintenant;

        // Calcul du temps pour les jours, heures, minutes et secondes 
        const jours = Math.floor(distance / (1000 * 60 * 60 * 24));
        const heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondes = Math.floor((distance % (1000 * 60)) / 1000);

        // Injection dans le HTML via les IDs fournis dans votre structure
        document.getElementById("days").innerText = jours + " J";
        document.getElementById("hours").innerText = heures + " H";
        document.getElementById("minutes").innerText = minutes + " M";
        document.getElementById("seconds").innerText = secondes + " S";

        // Arrêt du compte à rebours une fois la date atteinte
        if (distance < 0) {
            clearInterval(actualiserCompteARebours);
            document.querySelector(".countdown-container").innerHTML = "L'événement a commencé !";
        }
    }, 1000);

    // COMPTEURS ANIMÉS (SECTION CHIFFRES CLÉS)
    const statistiques = document.querySelectorAll('.counter');
    
    const optionsObservateur = {
        threshold: 0.5 // L'animation se lance quand 50% de l'élément est visible [5]
    };

    const observateurStats = new IntersectionObserver((entrees, observateur) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                const element = entree.target;
                // Extraction du nombre (ex: "1200" depuis "+1200")
                const cible = parseInt(element.innerText.replace(/\D/g, ''));
                lancerAnimationCompteur(element, 0, cible, 2000);
                observateur.unobserve(element); // On arrête d'observer après l'animation [5]
            }
        });
    }, optionsObservateur);

    function lancerAnimationCompteur(obj, debut, fin, duree) {
        let debutTemps = null;
        const etape = (timestamp) => {
            if (!debutTemps) debutTemps = timestamp;
            const progres = Math.min((timestamp - debutTemps) / duree, 1);
            obj.innerHTML = "+" + Math.floor(progres * (fin - debut) + debut);
            if (progres < 1) {
                window.requestAnimationFrame(etape);
            }
        };
        window.requestAnimationFrame(etape);
    }

    statistiques.forEach(stat => observateurStats.observe(stat));


    // ==========================================================================
    // 3. ANIMATIONS D'APPARITION AU SCROLL (FADE-IN)
    // ==========================================================================
    // On cible toutes les sections pour les faire apparaître progressivement [6]
    const sections = document.querySelectorAll('section');

    const observateurSections = new IntersectionObserver((entrees) => {
        entrees.forEach(entree => {
            if (entree.isIntersecting) {
                entree.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('reveal'); // Ajout d'une classe de base pour le CSS
        observateurSections.observe(section);
    });


    // ANNÉE AUTOMATIQUE DANS LE FOOTER
    const anneeElement = document.getElementById('current-year');
    if (anneeElement) {
        anneeElement.textContent = new Date().getFullYear(); // Récupère l'année en cours [2]
    }

    // --- GESTION DES ONGLETS ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetDay = btn.getAttribute('data-day');

            // Retirer l'état actif partout
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            // Activer l'élément cliqué
            btn.classList.add('active');
            document.getElementById(targetDay).classList.add('active');
        });
    });

    // --- ANIMATIONS AU SCROLL (IntersectionObserver) [4, 16, 17] ---
    const observerOptions = { threshold: 0.2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Ajoute la classe d'animation
                observer.unobserve(entry.target); // Anime une seule fois
            }
        });
    }, observerOptions);

    // Cible les cartes thématiques et le contenu du planning
    const animatedElements = document.querySelectorAll('.thema-card, .tabs-content');
    animatedElements.forEach(el => observer.observe(el));

    // --- FILTRAGE DYNAMIQUE ---
    const filterButtons = document.querySelectorAll('.btn-filter');
    const speakerCards = document.querySelectorAll('.speaker-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Gérer l'état actif des boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            speakerCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block'; // Ou 'flex' selon votre CSS
                    card.classList.add('fade-in'); // Animation optionnelle
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });



    // --- VALIDATION DE FORMULAIRE ---
    const contactForm = document.getElementById('contactForm');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Empêcher l'envoi réel [11]
                let isValid = true;

                // Sélecteurs des champs
                const name = document.getElementById('fullname');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');
                const message = document.getElementById('message');

                // 1. Validation Nom Complet (Requis)
                if (name.value.trim() === "") {
                    showError(name, "Le nom est obligatoire");
                    isValid = false;
                } else {
                    showSuccess(name);
                }

                // 2. Validation Email (Regex) [10]
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.value)) {
                    showError(email, "Format d'email invalide");
                    isValid = false;
                } else {
                    showSuccess(email);
                }

                // 3. Validation Téléphone (min 8 chiffres) [10]
                if (phone.value.length < 8) {
                    showError(phone, "Minimum 8 chiffres requis");
                    isValid = false;
                } else {
                    showSuccess(phone);
                }

                // 4. Validation Message (min 20 caractères) [9]
                if (message.value.length < 20) {
                    showError(message, "Le message doit faire au moins 20 caractères");
                    isValid = false;
                } else {
                    showSuccess(message);
                }

                // Action finale si tout est valide
                if (isValid) {
                    alert("Succès ! Votre inscription a été enregistrée."); // Message stylisé recommandé
                    contactForm.reset(); // Réinitialisation obligatoire [10]
                    resetVisuals();
                }
            });
        }

        // Fonctions utilitaires pour le retour visuel
        function showError(input, msg) {
            input.style.borderColor = "var(--bg-dander)"; // Rouge [10]
            const errorSpan = input.nextElementSibling;
            if (errorSpan) errorSpan.innerText = msg;
        }

        function showSuccess(input) {
            input.style.borderColor = "var(--success-color)"; // Vert [10]
            const errorSpan = input.nextElementSibling;
            if (errorSpan) errorSpan.innerText = "";
        }

});