

        document.addEventListener('DOMContentLoaded', () => {
            const cursorFollower = document.querySelector('.cursor-follower');

            function getRandomColor() {
                const letters = '0123456789ABCDEF';
                let color = '#';
                for (let i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                return color;
            }

            document.addEventListener('mousemove', (e) => {
                const followerSize = 20; // Size of the cursor follower (width and height in pixels)
                const offsetX = followerSize / 2;
                const offsetY = followerSize / 2;
                
                cursorFollower.style.transform = `translate(${e.clientX - offsetX}px, ${e.clientY - offsetY}px)`;
                cursorFollower.style.backgroundColor = getRandomColor();
            });
        }); 

document.addEventListener('DOMContentLoaded', () => {
    const ichingForm = document.getElementById('iching-form');
    const resultDiv = document.getElementById('result');

    ichingForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = document.getElementById('query').value;
        const hexagram = divine();
        displayResult(query, hexagram);
    });

    const trigrams = ['111', '011', '101', '001', '110', '010', '100', '000'];
    const hexagramBinary = [
        ['111111', '111011', '111101', '111001', '111110', '111010', '111100', '111000'],
        ['011111', '011011', '011101', '011001', '011110', '011010', '011100', '011000'],
        ['101111', '101011', '101101', '101001', '101110', '101010', '101100', '101000'],
        ['001111', '001011', '001101', '001001', '001110', '001010', '001100', '001000'],
        ['110111', '110011', '110101', '110001', '110110', '110010', '110100', '110000'],
        ['010111', '010011', '010101', '010001', '010110', '010010', '010100', '010000'],
        ['100111', '100011', '100101', '100001', '100110', '100010', '100100', '100000'],
        ['000111', '000011', '000101', '000001', '000110', '000010', '000100', '000000']
    ];
    const indexHexagram = [
        [1, 43, 14, 34, 9, 5, 26, 11],
        [10, 58, 38, 54, 61, 60, 41, 19],
        [13, 49, 30, 55, 37, 63, 22, 36],
        [25, 17, 21, 51, 42, 3, 27, 24],
        [44, 28, 50, 32, 57, 48, 18, 46],
        [6, 47, 64, 40, 59, 29, 4, 7],
        [33, 31, 56, 62, 53, 39, 52, 15],
        [12, 45, 35, 16, 20, 8, 23, 2],
    ];

    function flipCoin() {
        return Math.random() < 0.5 ? 'heads' : 'tails';
    }

    function drawLines(outcome) {
        return outcome === 'heads' ? 3 : 2;
    }

    function interpretLineFromScore(total) {
        if (total === 6 || total === 8) {
            return 'yin';
        } else {
            return 'yang';
        }
    }

    function getHexagramNumber(yinYangBinary) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (yinYangBinary === hexagramBinary[i][j]) {
                    return indexHexagram[i][j];
                }
            }
        }
        return null;
    }

    function deriveHexagramBinaryAndDrawHexagram(yinYang) {
        const yinYangReversed = yinYang.reverse();
        let yinYangBinary = '';
        for (let i = 0; i < 6; i++) {
            if (yinYangReversed[i] === 'yin') {
                yinYangBinary += '0';
            } else {
                yinYangBinary += '1';
            }
        }
        return yinYangBinary;
    }

    function divine() {
        const yinYang = [];
        for (let i = 0; i < 6; i++) {
            const outcomes = [flipCoin(), flipCoin(), flipCoin()];
            const lines = outcomes.map(drawLines);
            const score = lines.reduce((a, b) => a + b, 0);
            const resultantLine = interpretLineFromScore(score);
            yinYang.push(resultantLine);
        }
        const yinYangBinary = deriveHexagramBinaryAndDrawHexagram(yinYang);
        const hexagramNumber = getHexagramNumber(yinYangBinary);
        return { hexagramNumber, yinYangBinary };
    }

    function displayResult(query, hexagram) {
        resultDiv.innerHTML = `
            <h2>Question: ${query}</h2>
            <p>Hexagram Number: ${hexagram.hexagramNumber}</p>
            <p>Binary: ${hexagram.yinYangBinary}</p>
            <p>Interpretation: <a href="https://aiching.app/iching/hexagram-${hexagram.hexagramNumber}/" target="_blank">Hexagram ${hexagram.hexagramNumber} Interpretation</a></p>
        `;
    }
});
