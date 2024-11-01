var dir_images = './images/';

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
