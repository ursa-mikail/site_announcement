var dir_images = '../images/';
const url = "https://github.com/ursa-mikail/sql_csv_yaml_json_porting/tree/main/sample_data/data/"
const site1 = url + 'data.yaml';
const site2 = url + 'data.db';
const site3 = url + 'data.json';
const site4 = url + 'data.csv';

function redirectToSite(site) {
    window.location.href = site;
}

function change_it(what_file) {
    var file_extension = ".png";
    document.photo.src = what_file + file_extension;
}

function default_img() {
    document.photo.src = dir_images + "d.png";
}

document.addEventListener('mousemove', (event) => {
    const clock = document.getElementById('clock');
    clock.style.left = event.pageX + 10 + 'px'; // Offset by 10px to avoid direct overlap
    clock.style.top = event.pageY + 10 + 'px'; // Offset by 10px to avoid direct overlap
});

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const day = now.toLocaleString('default', { weekday: 'long' });
    const month = now.toLocaleString('default', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();
    clock.innerHTML = `${day} ${date} ${month} ${year} ${hours}:${minutes}:${seconds}`;
}

setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately


        document.addEventListener('DOMContentLoaded', () => {
            const selectElement = document.getElementById('content-select');
            selectElement.addEventListener('change', (event) => {
                const file = event.target.value;
                loadContent(file);
            });
            loadContent(selectElement.value);  // Load default content
        });

        function loadContent(file) {
            document.getElementById('content-iframe').src = `./announcement/${file}.html`;
        }



