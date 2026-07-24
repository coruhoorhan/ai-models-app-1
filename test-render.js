import React from 'react';
import { renderToString } from 'react-dom/server';
import { LandingPage } from './src/pages/LandingPage.js';
import { PricingPage } from './src/pages/PricingPage.js';

try {
  renderToString(React.createElement(LandingPage));
  console.log("LandingPage rendered successfully");
} catch (e) {
  console.error("LandingPage Error:", e);
}

try {
  renderToString(React.createElement(PricingPage));
  console.log("PricingPage rendered successfully");
} catch (e) {
  console.error("PricingPage Error:", e);
}
