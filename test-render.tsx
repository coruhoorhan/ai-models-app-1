import React from 'react';
import { renderToString } from 'react-dom/server';
import { LandingPage } from './src/pages/LandingPage';
import { PricingPage } from './src/pages/PricingPage';
import { MemoryRouter } from 'react-router-dom';

try {
  renderToString(<MemoryRouter><LandingPage /></MemoryRouter>);
  console.log("LandingPage rendered successfully");
} catch (e) {
  console.error("LandingPage Error:", e);
}

try {
  renderToString(<MemoryRouter><PricingPage /></MemoryRouter>);
  console.log("PricingPage rendered successfully");
} catch (e) {
  console.error("PricingPage Error:", e);
}
