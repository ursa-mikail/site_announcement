const configDisplay = document.getElementById('configDisplay');
const protocolSection = document.getElementById('protocolSection');
const cipherSection = document.getElementById('cipherSection');
const hashSection = document.getElementById('hashSection');
const keyExchangeSection = document.getElementById('keyExchangeSection');

function loadConfig() {
    fetch('config_a54.txt')
        .then(response => response.text())
        .then(data => {
            const sections = data.split('[');
            const config = {};
            
            sections.forEach(section => {
                if (section.trim() !== '') {
                    const lines = section.split('\n');
                    const sectionName = lines[0].replace(']', '').trim();
                    config[sectionName] = {};
                    
                    lines.slice(1).forEach(line => {
                        if (line.includes('=')) {
                            const [key, value] = line.split('=');
                            config[sectionName][key.trim()] = value.trim() === 'true';
                        }
                    });
                }
            });
            
            createCheckboxes(config);
        });
}

function createCheckboxes(config) {
    Object.keys(config).forEach(section => {
        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section';
        
        const title = document.createElement('h3');
        title.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        sectionDiv.appendChild(title);
        
        Object.keys(config[section]).forEach(option => {
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = option;
            checkbox.checked = config[section][option];
            
            const label = document.createElement('label');
            label.htmlFor = option;
            label.textContent = option.replace(/_/g, ' ');
            
            const div = document.createElement('div');
            div.appendChild(checkbox);
            div.appendChild(label);
            
            checkbox.addEventListener('change', () => {
                displaySelection(section, option, checkbox.checked);
            });
            
            sectionDiv.appendChild(div);
        });
        
        document.getElementById(`${section}Section`).appendChild(sectionDiv);
    });
}

function displaySelection(section, option, checked) {
    const status = checked ? 'enabled' : 'disabled';
    const message = `${option.replace(/_/g, ' ')} has been ${status} in ${section}`;
    
    const p = document.createElement('p');
    p.textContent = message;
    configDisplay.appendChild(p);
    
    // Scroll to the latest selection
    configDisplay.scrollTop = configDisplay.scrollHeight;
}

// Load the configuration when the page loads
window.addEventListener('load', loadConfig);