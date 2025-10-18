/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  ("use strict");

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);

  /**
   * Dynamic Portfolio Details Loader
   */
  document.addEventListener("DOMContentLoaded", () => {
    // Only run this code on the portfolio details page
    if (!document.body.classList.contains("portfolio-details-page")) return;

    const params = new URLSearchParams(window.location.search);
    const projectId = params.get("id");

    // If no project ID found, redirect to home or portfolio section
    if (!projectId) {
      window.location.href = "index.html#portfolio";
      return;
    }

    const projects = {
      peoplespay: {
        title: "PeoplesPay Admin Dashboard",
        category: "Fintech Platform",
        client: "Bsystems Limited (PeoplesPay)",
        url: "https://peoplespay.com.gh/",
        code: "https://peoplespay.com.gh/",
        description: `
          The PeoplesPay Admin Dashboard is a secure fintech web application that enables
          seamless transaction processing for millions of users daily. Built with React, Next.js,
          and Tailwind CSS, it provides an intuitive interface for merchant management and reporting.
        `,
        images: ["assets/img/portfolio/PeoplesPay.png"],
      },
      audiophile: {
        title: "Audiophile Store",
        category: "E-commerce",
        client: "Personal Project",
        url: "https://azubi-project-ecommerce.vercel.app/",
        code: "https://azubi-project-ecommerce.vercel.app/",
        description: `
          A responsive e-commerce platform for high-end audio products with cart management,
          checkout flow, and clean product UI.
        `,
        images: [
          "assets/img/portfolio/audiophile1.png",
          "assets/img/portfolio/audiophile2.png",
          "assets/img/portfolio/audiophile3.png",
          "assets/img/portfolio/audiophile4.png",
        ],
      },
      azushop: {
        title: "Azushop",
        category: "E-commerce",
        client: "Personal Project",
        url: "https://azubi-tmp-project-2.vercel.app/",
        code: "https://github.com/Abigail-Addo/Azubi-TMP-Project-2.git",
        description: `
          A responsive e-commerce platform for high-end electronics with cart management,
          checkout flow, and clean product UI.
        `,
        images: [
          "assets/img/portfolio/azushop1.png",
          "assets/img/portfolio/azushop2.png",
          "assets/img/portfolio/azushop3.png",
          "assets/img/portfolio/azushop4.png",
        ],
      },
      learnhub: {
        title: "LearnHub",
        category: "E-learning",
        client: "Personal Project",
        url: "https://plp-e-learning-platform.vercel.app/",
        code: "https://github.com/Abigail-Addo/PLP-E-Learning-Platform.git",
        description: `
    An interactive online learning platform that offers courses and progress tracking.
    Built with a responsive design and a user-friendly interface to enhance the learning experience.
  `,
        images: [
          "assets/img/portfolio/learnhub1.png",
          "assets/img/portfolio/learnhub2.png",
          "assets/img/portfolio/learnhub3.png",
          "assets/img/portfolio/learnhub4.png",
        ],
      },
      braghana: {
        title: "Bra Ghana",
        category: "UI Design",
        client: "Personal Project",
        url: "https://www.figma.com/proto/UhScj2yOxDDQBU3ydP3q1M/Untitled?node-id=105-4&t=35Ug2jfNmzTXVT58-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=105%3A2&show-proto-sidebar=1",
        code: "https://www.figma.com/design/UhScj2yOxDDQBU3ydP3q1M/Untitled?node-id=0-1&p=f&t=jDoufp6EfZWiQHKF-0",
        description: `
    Developed a scalable design system in Figma to maintain consistent UI components across 5+ screens. 
    Focused on creating a cohesive visual language, improving usability, and streamlining the design-to-development workflow.
  `,
        images: [
          "assets/img/portfolio/braghana1.png",
          "assets/img/portfolio/braghana2.png",
          "assets/img/portfolio/braghana3.png",
        ],
      },
      hc: {
        title: "Hallelujah Challenge",
        category: "UI Design",
        client: "Personal Project",
        url: "https://www.figma.com/proto/CuAxGeKAT9cVSS2eyCwi7G/Untitled?node-id=2-2&t=LPG5oSjhT8O2mbPJ-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A19&show-proto-sidebar=1",
        code: "https://www.figma.com/design/CuAxGeKAT9cVSS2eyCwi7G/Untitled?node-id=2-2&t=LPG5oSjhT8O2mbPJ-0",
        description: `
    Designed an engaging and modern UI concept for the Hallelujah Challenge platform,
    focusing on community interaction, event accessibility, and a seamless worship experience.
    Created in Figma with a consistent design system and smooth user flow across multiple screens.
  `,
        images: [
          "assets/img/portfolio/hc1.png",
          "assets/img/portfolio/hc2.png",
          "assets/img/portfolio/hc3.png",
          "assets/img/portfolio/hc4.png",
        ],
      },
    };

    const project = projects[projectId];
    if (!project) {
      window.location.href = "index.html#portfolio";
      return;
    }

    // Populate project info
    document.querySelector(".portfolio-info ul").innerHTML = `
      <li><strong>Category</strong>: ${project.category}</li>
      <li><strong>Client</strong>: ${project.client}</li>
      <li><strong>Project URL</strong>: <a href="${project.url}" target="_blank">${project.url}</a></li>
      <li><strong>Github</strong>: <a href="${project.code}" target="_blank">${project.code}</a></li>
    `;

    document.querySelector(".portfolio-description h2").textContent =
      project.title;
    document.querySelector(".portfolio-description p").textContent =
      project.description;

    // Replace images
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    swiperWrapper.innerHTML = project.images
      .map((img) => `<div class="swiper-slide"><img src="${img}" alt=""></div>`)
      .join("");

    // Re-init Swiper after updating slides
    if (typeof Swiper !== "undefined") {
      new Swiper(".portfolio-details-slider", {
        loop: true,
        speed: 600,
        autoplay: { delay: 5000 },
        slidesPerView: "auto",
        pagination: {
          el: ".swiper-pagination",
          type: "bullets",
          clickable: true,
        },
      });
    }
  });

  /**
   * Set current year in footer
   */
  document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.querySelector("#footer .copyright span");
    if (yearSpan) {
      yearSpan.textContent = `Copyright ${new Date().getFullYear()}`;
    }
  });
})();
