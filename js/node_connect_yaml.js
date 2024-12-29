const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let nodes = [];
let connections = [];
let isDragging = false;
let startNode = null;

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    nodes.push({ x, y });
    draw();
});

canvas.addEventListener('mousedown', (event) => {
    const { x, y } = getMousePosition(event);
    startNode = getNodeAtPosition(x, y);
    if (startNode) {
        isDragging = true;
    }
});

canvas.addEventListener('mouseup', (event) => {
    if (isDragging && startNode) {
        const { x, y } = getMousePosition(event);
        const endNode = getNodeAtPosition(x, y);
        if (endNode && endNode !== startNode) {
            connections.push({ start: startNode, end: endNode });
            generateYAML();
        }
        isDragging = false;
        startNode = null;
        draw();
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (isDragging && startNode) {
        draw();
        const { x, y } = getMousePosition(event);
        ctx.beginPath();
        ctx.moveTo(startNode.x, startNode.y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
});

function getMousePosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function getNodeAtPosition(x, y) {
    return nodes.find(node => Math.hypot(node.x - x, node.y - y) < 10);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 5, 0, Math.PI * 2);
        ctx.fill();
    });
    connections.forEach(connection => {
        ctx.beginPath();
        ctx.moveTo(connection.start.x, connection.start.y);
        ctx.lineTo(connection.end.x, connection.end.y);
        ctx.stroke();
    });
}

function generateYAML() {
    let yaml = 'connections:\n';
    connections.forEach((connection, index) => {
        yaml += `  - start: { x: ${connection.start.x}, y: ${connection.start.y} }\n`;
        yaml += `    end: { x: ${connection.end.x}, y: ${connection.end.y} }\n`;
    });
    document.getElementById('yaml-output').innerText = yaml;
}
