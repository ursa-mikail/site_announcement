document.getElementById('fileInput').addEventListener('change', readFile);

function readFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        parseContent(content);
    };

    reader.readAsText(file);
}

function parseContent(content) {
    const lines = content.split('\n');
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = '';  // Clear any existing content

    lines.forEach((line, index) => {
        if (line.trim() !== '') {
            const [url, description] = line.split('][').map(item => item.replace(/[\[\]]/g, ''));
            const listItem = document.createElement('li');
            const linkElement = document.createElement('a');
            linkElement.href = url;
            linkElement.textContent = description;
            linkElement.target = '_blank';
            listItem.appendChild(linkElement);
            linksContainer.appendChild(listItem);
        }
    });
}

function copyToClipboard() {
    const linksContainer = document.getElementById('linksContainer');
    const range = document.createRange();
    range.selectNode(linksContainer);
    window.getSelection().removeAllRanges();  // Clear existing selections
    window.getSelection().addRange(range);

    try {
        const successful = document.execCommand('copy');
        alert(successful ? 'Copied to clipboard!' : 'Unable to copy');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }

    window.getSelection().removeAllRanges();  // Deselect
}

function generateLinks() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file first.');
        return;
    }

    readFile({ target: { files: fileInput.files } });
}
