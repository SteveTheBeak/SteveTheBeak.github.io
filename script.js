document.addEventListener("DOMContentLoaded", () => {
    //Theme toggle code
    const toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    const icon = toggleBtn.querySelector("i");
    const root = document.documentElement; // <html>

    const updateThemeTitle = (isDark) => {
        toggleBtn.title = isDark ? "Switch to light mode" : "Switch to dark mode";
    };

    //Apply saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        root.classList.add("dark-mode");
        if (icon) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
        }
        updateThemeTitle(true);
    }
    else {
        updateThemeTitle(false);
    }

    toggleBtn.addEventListener("click", () => {
        const isDark = root.classList.toggle("dark-mode");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (icon) {
            icon.classList.toggle("fa-sun", isDark);
            icon.classList.toggle("fa-moon", !isDark);
        }
        updateThemeTitle(isDark);
    });

    //Box expanding code
    document.querySelectorAll(".box").forEach(clickedBox => {
        clickedBox.addEventListener("click", () => {
            const isActive = clickedBox.classList.contains("active");
            const container = clickedBox.closest(".container");

            //Reset boxes
            document.querySelectorAll(".box").forEach(box => {
                box.classList.remove("active", "shrink");

                const video = box.querySelector("video");
                if (video) {
                    video.pause();
                    video.currentTime = 0;
                }
            });

            if (!isActive) {
                clickedBox.classList.add("active");

                if (window.innerWidth > 850) {
                    container.querySelectorAll(".box").forEach(box => {
                        if (box !== clickedBox) {
                            box.classList.add("shrink");
                        }
                    });
                }

                const videos = clickedBox.querySelectorAll("video");
                videos.forEach(video => {
                    video.currentTime = 0;
                    video.play();
                });
            }
        });
    });

    //Stop box from closing when clicking on a video frame or hover words
    document.querySelectorAll(".box video, .hover-word.small").forEach(video => {
        video.addEventListener("click", event => {
            event.stopPropagation();
        });
    });

    //Show text on tap for touch screen devices
    document.querySelectorAll('.hover-word.small').forEach(word => {
        word.addEventListener('click', function(e) {
            // Prevent double tooltips
            let existing = word.querySelector('.touch-tooltip');
            if (existing) {
                existing.remove();
                return;
            }
            // Create tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'touch-tooltip';
            tooltip.textContent = word.getAttribute('title');
            word.appendChild(tooltip);

            // Remove tooltip after 5 seconds or on next tap
            setTimeout(() => {
                tooltip.remove();
            }, 5000);
        });
    });
});
