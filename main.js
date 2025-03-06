const { app, Tray, Menu, nativeImage } = require('electron');
const axios = require('axios');
const path = require('path');

let tray = null;
let lastPrice = null;
let priceCheckInterval = null;

// Function to fetch Bitcoin price from CoinGecko API
async function fetchBitcoinPrice() {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    const currentPrice = response.data.bitcoin.usd;
    console.log('Bitcoin price fetched:', currentPrice);
    
    // Check for significant price change (±5%)
    if (lastPrice) {
      const priceChange = ((currentPrice - lastPrice) / lastPrice) * 100;
      if (Math.abs(priceChange) >= 5) {
        console.log('Significant price change detected:', priceChange.toFixed(2) + '%');
        tray.displayBalloon({
          title: 'Bitcoin Price Alert',
          content: `Bitcoin price has changed by ${priceChange.toFixed(2)}%\nCurrent price: $${currentPrice.toLocaleString()}`
        });
      }
    }
    
    lastPrice = currentPrice;
    console.log('Updating tray with price:', currentPrice);
    updateTrayTitle(currentPrice);
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error.message);
    tray.setToolTip('BTC: Error fetching price');
  }
}

// Function to update the tray title with current price
function updateTrayTitle(price) {
  const priceText = `BTC: $${price.toLocaleString()}`;
  // On Windows, we'll update the tooltip and show a balloon notification for initial price
  tray.setToolTip(priceText);
  if (!lastPrice) {
    tray.displayBalloon({
      title: 'Bitcoin Price',
      content: priceText
    });
  }
}

// Create the context menu for the tray
function createContextMenu() {
  return Menu.buildFromTemplate([
    {
      label: 'Refresh Price',
      click: () => fetchBitcoinPrice()
    },
    {
      type: 'separator'
    },
    {
      label: 'Exit',
      click: () => app.quit()
    }
  ]);
}

// Initialize the application
app.whenReady().then(() => {
  // Create tray icon
  const icon = nativeImage.createFromPath(path.join(__dirname, 'bitcoin.png'));
  tray = new Tray(icon);
  
  // Set up context menu
  tray.setContextMenu(createContextMenu());
  
  // Initial price fetch
  fetchBitcoinPrice();
  
  // Set up interval for price updates (every 60 seconds)
  priceCheckInterval = setInterval(fetchBitcoinPrice, 60000);
});

// Cleanup on app quit
app.on('window-all-closed', () => {
  if (priceCheckInterval) {
    clearInterval(priceCheckInterval);
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});