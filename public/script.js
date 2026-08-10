const projectsContainer = document.querySelector(".project-container");

async function loadProjects() {
    try {
        const response = await fetch("/api/projects");
        if (!response.ok) return;

        const projects = await response.json();
        if (!Array.isArray(projects) || projects.length === 0) return;

        projectsContainer.innerHTML = "";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            const techStack = Array.isArray(project.techStack)
                ? project.techStack.map(tech => `<span>${tech}</span>`).join("")
                : "";

            card.innerHTML = `
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>

                    <div class="tech-stack">
                        ${techStack}
                    </div>

                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ""}
                        ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ""}
                    </div>
                </div>
            `;

            projectsContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load projects:", error);
    }
}

loadProjects();

const contactForm = document.querySelector("#contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector("textarea").value;

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, message })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Message sent successfully!");
                contactForm.reset();
            } else {
                alert(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Contact form error:", error);
            alert("Unable to send message.");
        }
    });
}