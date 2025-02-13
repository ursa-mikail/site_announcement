document.addEventListener("DOMContentLoaded", function () {
    function fetchConfig() {
        fetch("config_a54.txt")
            .then(response => response.text())
            .then(parseConfig)
            .catch(error => console.error("Error loading config.txt:", error));
    }

    function parseConfig(text) {
        const config = {};
        let currentCategory = "";

        text.split("\n").forEach(line => {
            line = line.trim();
            if (line.startsWith("[") && line.endsWith("]")) {
                currentCategory = line.slice(1, -1);
                config[currentCategory] = [];
            } else if (line && currentCategory) {
                let [key, value] = line.split("=");
                key = key.replace(/_/g, " ");
                const checked = value.trim() === "true";
                config[currentCategory].push({ key, checked });
            }
        });

        populateCheckboxes(config);
    }

    function populateCheckboxes(config) {
        Object.keys(config).forEach(category => {
            const container = document.getElementById(category);
            if (!container) return;

            config[category].forEach(option => {
                const label = document.createElement("label");
                const checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = category;
                checkbox.value = option.key;
                checkbox.id = option.key.replace(/\s+/g, "_");
                checkbox.checked = option.checked;

                label.appendChild(checkbox);
                label.appendChild(document.createTextNode(" " + option.key));
                container.appendChild(label);
                container.appendChild(document.createElement("br"));
            });
        });
    }

    function updateDisplay(event) {
        event.preventDefault();
        let output = "";
        document.querySelectorAll("input[type='checkbox']:checked").forEach(checkbox => {
            output += checkbox.value + "\n";
        });
        document.getElementById("output").textContent = output;
    }

    fetchConfig();
    document.getElementById("configForm").addEventListener("submit", updateDisplay);
});
