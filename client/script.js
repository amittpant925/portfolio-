const projectsContainer = document.querySelector(".project-container");

async function loadProjects() {
    try {
        const response = await fetch("http://localhost:5000/api/projects");
        const projects = await response.json();

        projectsContainer.innerHTML = "";

        projects.forEach(project => {
            const card = document.createElement("div");
            card.className = "project-card";

            card.innerHTML = `
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>

                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span>${tech}</span>`).join("")}
                    </div>

                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank">GitHub</a>` : ""}
                        ${project.live ? `<a href="${project.live}" target="_blank">Live Demo</a>` : ""}
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

contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    try {
        const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
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