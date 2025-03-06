# Token Tray - Bitcoin Price Tracker

A lightweight system tray application that provides real-time Bitcoin price tracking using the CoinGecko API. Stay updated with Bitcoin prices without leaving your desktop!

## Features

- 🔄 Real-time Bitcoin price updates every 60 seconds
- 🔔 Price change notifications (alerts when price changes by ±5%)
- 💻 System tray integration for minimal desktop footprint
- 🖱️ Quick access menu for price refresh and application control
- 📊 Clear price display in system tray tooltip

## Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the application:
   ```bash
   npm start
   ```

2. The Bitcoin icon will appear in your system tray
3. Hover over the icon to see the current Bitcoin price
4. Right-click the icon to:
   - Manually refresh the price
   - Exit the application

## Technical Details

- Built with Electron.js
- Uses CoinGecko API for reliable price data
- Automatic price updates every minute
- System notifications for significant price changes

## Dependencies

- electron: ^27.1.2
- axios: ^1.6.2

## License

MIT License