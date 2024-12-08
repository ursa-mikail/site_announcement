let playlist = [];

document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const content = e.target.result;
        try {
            if (file.name.endsWith('.json')) {
                const uploadedPlaylist = JSON.parse(content);
                if (Array.isArray(uploadedPlaylist)) {
                    playlist = uploadedPlaylist;
                } else {
                    alert('Invalid JSON file format. Please upload a valid JSON file.');
                }
            } else if (file.name.endsWith('.txt')) {
                const lines = content.split('\n').filter(line => line.trim() !== '');
                playlist = lines.map(line => {
                    const matches = line.match(/^\[(.+?)\]\[(.*?)\]$/);
                    if (matches) {
                        return { url: matches[1].trim(), description: matches[2].trim() || matches[1].trim() };
                    } else {
                        return { url: line.trim(), description: line.trim() };
                    }
                });
            } else {
                alert('Unsupported file format. Please upload a .txt or .json file.');
            }
            renderPlaylist();
        } catch (error) {
            alert('Error reading file: ' + error.message);
        }
    };

    reader.readAsText(file);
}

function renderPlaylist() {
    const playlistDiv = document.getElementById('playlist');
    playlistDiv.innerHTML = '';
    playlist.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';

        const leftDiv = document.createElement('div');
        leftDiv.innerHTML = `<strong>${item.description}</strong>`;
        const midDiv = document.createElement('div');
        midDiv.innerHTML = `<a href="${item.url}" target="_blank">${item.url}</a>`;
        const rightDiv = document.createElement('div');
        rightDiv.className = 'controls';
        rightDiv.innerHTML = `
            <button onclick="promote(${index})">Up</button>
            <button onclick="demote(${index})">Down</button>
            <button onclick="remove(${index})">Remove</button>
        `;

        itemDiv.appendChild(leftDiv);
        itemDiv.appendChild(midDiv);
        itemDiv.appendChild(rightDiv);
        playlistDiv.appendChild(itemDiv);
    });
}

function promote(index) {
    if (index > 0) {
        [playlist[index], playlist[index - 1]] = [playlist[index - 1], playlist[index]];
        renderPlaylist();
    }
}

function demote(index) {
    if (index < playlist.length - 1) {
        [playlist[index], playlist[index + 1]] = [playlist[index + 1], playlist[index]];
        renderPlaylist();
    }
}

function remove(index) {
    playlist.splice(index, 1);
    renderPlaylist();
}

function downloadList() {
    const date = new Date();
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, '_');
    const formattedTime = date.toTimeString().slice(0, 5).replace(/:/g, '');
    const filename = `updated_playlist_${formattedDate}_${formattedTime}.txt`;

    const formattedPlaylist = playlist.map(item => `[${item.url}][${item.description}]`).join('\n');
    const blob = new Blob([formattedPlaylist], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', () => {
    renderPlaylist();
});
