(() => {
  const siteRoot = "/math-physics-library/";

  function currentMode() {
    const path = window.location.pathname;
    const relative = path.startsWith(siteRoot) ? path.slice(siteRoot.length) : path.replace(/^\//, "");

    if (relative.startsWith("mathematics/") || relative.startsWith("books/")) {
      return "math";
    }

    if (relative.startsWith("physics/") || relative.startsWith("courses/")) {
      return "physics";
    }

    return "home";
  }

  function createLink(label, mode, href) {
    const link = document.createElement("a");
    link.className = `library-switcher__link library-switcher__link--${mode}`;
    link.href = href;
    link.textContent = label;
    link.dataset.mode = mode;
    return link;
  }

  function applyLibraryMode() {
    const mode = currentMode();
    document.documentElement.dataset.library = mode;

    const header = document.querySelector(".md-header__inner");
    if (!header) {
      return;
    }

    let switcher = header.querySelector(".library-switcher");
    if (!switcher) {
      switcher = document.createElement("nav");
      switcher.className = "library-switcher";
      switcher.setAttribute("aria-label", "Choose library");
      switcher.append(
        createLink("Mathematics", "math", `${siteRoot}mathematics/`),
        createLink("Physics", "physics", `${siteRoot}physics/`)
      );

      const title = header.querySelector(".md-header__title");
      if (title) {
        title.insertAdjacentElement("afterend", switcher);
      } else {
        header.prepend(switcher);
      }
    }

    switcher.querySelectorAll("a").forEach((link) => {
      if (link.dataset.mode === mode) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", applyLibraryMode);

  if (typeof document$ !== "undefined") {
    document$.subscribe(applyLibraryMode);
  }
})();

