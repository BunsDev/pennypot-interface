
// import axios from 'axios';


export const shortenAddress = (address: string, startLength: number = 5, endLength: number = 5): string => {
    if (address.length < startLength + endLength + 2) {
        return address; // Return the original address if it's too short
    }
    return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
};


// export const fetchCryptoPriceInUSD = async (symbol: string, apiKey: string): Promise<number> => {
//   try {
//     const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD`, {
//       headers: {
//         authorization: `Apikey ${apiKey}`
//       }
//     });
//     return response.data.USD;
//   } catch (error) {
//     console.error('Error fetching crypto price:', error);
//     throw error;
//   }
// };


function generateAvatarColors(uniqueString: string, gridDimension = 5) {
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'];
    const hash = simpleHash(uniqueString);
    const grid = [];

    for (let y = 0; y < gridDimension; y++) {
        const row = [];
        for (let x = 0; x < gridDimension; x++) {
            const colorIndex = (hash[x + y * gridDimension] % colors.length);
            row.push(colors[colorIndex]);
        }
        grid.push(row);
    }

    return grid;
}

function simpleHash(input: string) {
    const chars = input.split('');
    const hash = chars.map((char, idx) => char.charCodeAt(0) + idx);
    return hash;
}

export function renderAvatar(uniqueString: string) {
    const grid = generateAvatarColors(uniqueString);
    const canvas = document.createElement('canvas');
    const ctx: any = canvas.getContext('2d');
    const size = 100; // Size of the avatar
    const cellSize = size / grid.length;

    canvas.width = size;
    canvas.height = size;

    grid.forEach((row, y) => {
        row.forEach((color, x) => {
            ctx.fillStyle = color;
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        });
    });

    return canvas.toDataURL();
}