document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector("i");
    const root = document.documentElement; // <html>

    // Apply saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        root.classList.add("dark-mode");
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
    }

    toggleBtn.addEventListener("click", () => {
        const isDark = root.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (icon) {
            icon.classList.toggle("fa-sun", isDark);
            icon.classList.toggle("fa-moon", !isDark);
        }
    });
});
