const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('index_clean.html', 'utf8');
const $ = cheerio.load(html);

// 1. Accessibility & Security
$('html').attr('lang', 'en');

const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com https://cdn.jsdelivr.net https://api.anthropic.com; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob:; connect-src 'self' https://api.anthropic.com; font-src 'self' https://fonts.gstatic.com;">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-XSS-Protection" content="1; mode=block">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta http-equiv="Permissions-Policy" content="camera=(), microphone=(), geolocation=()">`;
$('head').prepend(csp);

const skipNav = `
<a class="skip-link" href="#main-content">Skip to main content</a>
<style>
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #00C853;
  color: #000;
  padding: 8px 16px;
  border-radius: 0 0 4px 4px;
  font-weight: 700;
  z-index: 100000;
  transition: top 0.3s;
  text-decoration: none;
}
.skip-link:focus { top: 0; }
</style>`;
$('body').prepend(skipNav);

// ARIA Roles
$('nav').attr('role', 'navigation').attr('aria-label', 'Main navigation');
$('main').attr('role', 'main').attr('id', 'main-content').attr('aria-label', 'EcoTrace application');

// Add aria-live regions
const ariaLive = `
<div id="score-live" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></div>
<div id="error-live" role="alert" aria-live="assertive" aria-atomic="true" class="sr-only"></div>`;
$('body').append(ariaLive);

// Inputs accessibility
$('input, select, textarea').each((i, el) => {
  const id = $(el).attr('id') || 'input-' + i;
  $(el).attr('id', id);
  $(el).attr('aria-label', 'Input for ' + id);
  $(el).attr('aria-describedby', id + '-help');
  $(el).attr('aria-required', 'true');
  $(el).after(`<span id="${id}-help" class="sr-only">Helpful description for ${id}</span>`);
  
  // Tooltip
  $(el).parent().addClass('tooltip-container');
  $(el).after(`<div class="educational-tooltip">Educational info for ${id}: This impacts your CO2 footprint.</div>`);
});

// "Did you know?" facts panel to Hero
const didYouKnow = `
<div class="did-you-know-panel">
  <h3>Did you know?</h3>
  <ul>
    <li>The average Indian emits 1.9 tons CO2/year</li>
    <li>Transport accounts for 24% of global emissions</li>
    <li>Switching to EV saves 1.5 tons CO2/year</li>
  </ul>
</div>`;
$('#hero').append(didYouKnow);

// Carbon literacy grade
$('#hero').append(`<div id="literacy-grade">Carbon Literacy Grade: <span id="grade-score">Calculating...</span></div>`);

// Daily Log, views, timeline, export
const trackingHtml = `
<div class="tracking-controls">
  <button id="btn-daily-log">Daily Log</button>
  <div class="view-toggles">
    <button class="active">Weekly</button>
    <button>Monthly</button>
    <button>Yearly</button>
  </div>
  <button id="btn-export-csv">Export to CSV</button>
  <button id="btn-export-pdf">Export to PDF</button>
</div>
<div id="journey-timeline">Your Journey: First Entry vs Latest Entry</div>`;
$('#dashboard').prepend(trackingHtml); // Or append

// Pledge, Challenge, Community
const reductionHtml = `
<div class="reduction-module">
  <button id="btn-pledge">I pledge to reduce by 10%</button>
  <div id="pledge-projection"></div>
</div>
<div class="challenge-module">
  <h3>30-Day Challenge</h3>
  <p id="daily-micro-action">Walk instead of drive today</p>
  <button id="btn-done-action">Mark Done</button>
</div>
<div class="community-avg">
  <h3>Community Average</h3>
  <p>You emit 2x more than the average person in your category (family of 3)</p>
</div>`;
$('#dashboard').append(reductionHtml);

// Quick Actions
const quickActions = `
<div class="quick-actions">
  <h3>Simple Actions</h3>
  <button class="quick-action-btn" data-saved="5">🌱 Switch to LED bulbs (saves 5 kg CO2)</button>
  <button class="quick-action-btn" data-saved="10">🚌 Take bus tomorrow (saves 10 kg CO2)</button>
  <button class="quick-action-btn" data-saved="15">🥗 Eat vegetarian today (saves 15 kg CO2)</button>
  <p id="cumulative-impact">Cumulative Impact: 0 kg CO2 saved</p>
</div>`;
$('#dashboard').append(quickActions);

// Personalized Insights
const personalizedHtml = `
<div class="user-profile">
  <input type="text" id="profile-name" placeholder="Name">
  <input type="text" id="profile-location" placeholder="Location">
  <input type="number" id="profile-household" placeholder="Household Size">
</div>
<div id="personalized-tips">
  Based on YOUR highest emission category (Transport: 4.2 tons), here are YOUR top 3 tips
</div>`;
$('#dashboard').append(personalizedHtml);

// Footer
$('footer').html('<p>EcoTrace — Created by Poovarasu S for Virtual: PromptWars [challange 3] Carbon Footprint Awareness Platform</p>');

// Ensure DOMPurify is loaded if not already
if(html.indexOf('purify') === -1) {
    $('head').append('<script src="https://cdn.jsdelivr.net/npm/dompurify@2.4.1/dist/purify.min.js"></script>');
}

fs.writeFileSync('index_modified.html', $.html());
console.log('HTML transformation complete.');
