const properties = [
  {
    id: "cypress",
    name: "The Cypress House",
    location: "Charleston, South Carolina",
    category: "Residential",
    image: "coast",
    badge: "Now open",
    min: 5000,
    price: 100,
    tokenLabel: "Ownership units",
    target: 1250000,
    raised: 875000,
    targetDistribution: "5.2%",
    term: "5–7 years",
    description: "A restored 1920s residence in the heart of Charleston's historic district.",
    detail: "A thoughtfully restored, eight-residence property within walking distance of Charleston's historic district. The asset plan focuses on preserving architectural character while bringing the homes into long-term residential use.",
    risk: "Real-estate investments are illiquid and subject to market, occupancy, and property-specific risks. Target distributions are estimates, not guarantees."
  },
  {
    id: "willow",
    name: "Willow & Stone",
    location: "Portland, Oregon",
    category: "Multifamily",
    image: "city",
    badge: "Nearly allocated",
    min: 10000,
    price: 100,
    tokenLabel: "Ownership units",
    target: 980000,
    raised: 814000,
    targetDistribution: "4.8%",
    term: "4–6 years",
    description: "A collection of twelve light-filled homes in Portland's eastside neighborhoods.",
    detail: "An intimate twelve-home residential community with shared gardens and walkable access to local neighborhood amenities. The asset plan pairs careful maintenance with a long-term, resident-first operating strategy.",
    risk: "The offering is subject to final allocation and its governing documents. Past performance and target distributions are not reliable indicators of future results."
  },
  {
    id: "juniper",
    name: "Juniper Row",
    location: "Austin, Texas",
    category: "Residential",
    image: "desert",
    badge: "Coming soon",
    min: 5000,
    price: 100,
    tokenLabel: "Ownership units",
    target: 1500000,
    raised: 0,
    targetDistribution: "In review",
    term: "Coming soon",
    description: "A modern collection of courtyard homes, currently in final review.",
    detail: "A planned residential community with shaded courtyards and shared outdoor space. The property is undergoing due diligence and offering review; subscription is not currently available.",
    risk: "This property is not open for investment. Any future offering would be subject to approved terms, disclosures, and eligibility requirements."
  }
];

const initialHoldings = [
  { propertyId: "cypress", units: 420, invested: 42000, value: 46200, distribution: 1197, image: "coast" },
  { propertyId: "willow", units: 310, invested: 31000, value: 33750, distribution: 930, image: "city" },
  { propertyId: "juniper", units: 280, invested: 28000, value: 29100, distribution: 840, image: "house" }
];

const state = {
  page: "home",
  holdings: initialHoldings.map((holding) => ({ ...holding })),
  activities: [
    { type: "distribution", title: "Distribution received", description: "The Cypress House · Q3 2026 distribution", amount: "+$428.40", date: "Oct 15, 2026", status: "Completed" },
    { type: "subscription", title: "Subscription confirmed", description: "Willow & Stone · 110 ownership units", amount: "$11,000.00", date: "Sep 28, 2026", status: "Completed" },
    { type: "distribution", title: "Distribution received", description: "Willow & Stone · Q3 2026 distribution", amount: "+$327.15", date: "Sep 15, 2026", status: "Completed" },
    { type: "wallet", title: "Wallet verified", description: "Personal wallet · Ethereum network", amount: "Verified", date: "Aug 22, 2026", status: "Completed" }
  ],
  subscriptions: [],
  transfers: [],
  documentTab: "all",
  activityTab: "all",
  operationsTab: "compliance",
  search: "",
  category: "all"
};

const root = document.querySelector("#view-root");
const dialog = document.querySelector("#app-dialog");
const dialogContent = document.querySelector("#dialog-content");
const pageLabels = {
  home: "Home",
  overview: "Overview",
  opportunities: "Explore properties",
  portfolio: "My portfolio",
  activity: "Activity",
  documents: "Documents",
  wallet: "Wallet & transfers",
  operations: "Operations"
};

function money(value, decimals = 0) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
}

function units(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function propertyById(id) {
  return properties.find((property) => property.id === id);
}

function propertyLink(property, className = "text-button") {
  return `<button class="${className}" data-action="property-detail" data-id="${property.id}">${property.name}</button>`;
}

function pageHeading(title, subtitle, actions = "") {
  return `<div class="page-heading"><div><p class="eyebrow">MORROW INVESTOR PORTAL</p><h1>${title}</h1><p class="page-subtitle">${subtitle}</p></div>${actions ? `<div class="heading-actions">${actions}</div>` : ""}</div>`;
}

function metricCard(label, value, detail, note = "i") {
  return `<article class="metric-card"><div class="metric-label">${label}<span class="metric-info" title="${note}" aria-label="${note}">i</span></div><div class="metric-value">${value}</div><div class="metric-detail">${detail}</div></article>`;
}

function activityIcon(type) {
  const icons = { distribution: "↙", subscription: "＋", transfer: "↗", wallet: "◈", compliance: "✓", document: "▤" };
  return icons[type] || "·";
}

function statusTag(status) {
  const pendingStatuses = ["Pending review", "Payment required", "Processing", "Needs review", "Needs approval", "Awaiting payment", "Ready for review", "In progress", "Due diligence"];
  const style = pendingStatuses.includes(status)
    ? "tag-warm"
    : status === "Completed" || status === "Approved" ? "" : "tag-neutral";
  return `<span class="tag ${style}"><span class="tag-dot"></span>${status}</span>`;
}

function propertyCard(property) {
  const progress = property.target ? Math.min(100, Math.round(property.raised / property.target * 100)) : 0;
  const availability = property.id === "juniper" ? "Not yet open" : `${money(property.target - property.raised)} remaining`;
  return `<article class="property-card">
    <div class="property-image property-image--${property.image}">
      <span class="property-badge"><span class="tag-dot"></span>${property.badge}</span>
      <span class="property-image-label">PROPERTY • ${property.category.toUpperCase()}</span>
    </div>
    <div class="property-body">
      <p class="property-location">${property.location}</p>
      <h3 class="property-title">${property.name}</h3>
      <p class="property-description">${property.description}</p>
      <div class="property-stats">
        <div class="property-stat"><small>Target annual distribution</small><strong>${property.targetDistribution}</strong></div>
        <div class="property-stat"><small>Investment horizon</small><strong>${property.term}</strong></div>
        <div class="property-stat"><small>Minimum investment</small><strong>${money(property.min)}</strong></div>
        <div class="property-stat"><small>Offering progress</small><strong>${property.id === "juniper" ? "In review" : `${progress}% allocated`}</strong></div>
      </div>
      <div class="property-card-footer"><small>${availability}</small><button class="button button-small ${property.id === "juniper" ? "button-secondary" : ""}" data-action="${property.id === "juniper" ? "property-detail" : "invest"}" data-id="${property.id}">${property.id === "juniper" ? "View details" : "Explore offering"} <span aria-hidden="true">→</span></button></div>
    </div>
  </article>`;
}

function renderHome() {
  const featured = properties.filter((property) => property.id !== "juniper");
  return `<section class="page">
    <div class="home-hero">
      <div class="home-copy">
        <p class="eyebrow">REAL ESTATE, CONSIDERED</p>
        <h1>Good places.<br /><em>Thoughtfully owned.</em></h1>
        <p>Discover property opportunities with a clearer view of the details, the documents, and the people behind every investment.</p>
        <div class="hero-actions"><button class="button" data-page="opportunities">Explore properties <span aria-hidden="true">→</span></button><button class="button button-light" data-page="overview">Visit your portfolio</button></div>
      </div>
      <div class="hero-art" role="img" aria-label="Illustration of a thoughtfully designed residential property">
        <span class="hero-orb"></span><span class="hero-tree"></span><span class="hero-building"></span>
      </div>
    </div>
    <div class="home-strip">
      <div class="home-strip-item"><span class="strip-icon" aria-hidden="true">⌖</span><span><strong>Real assets, clearly presented</strong><small>Property details and offering terms together.</small></span></div>
      <div class="home-strip-item"><span class="strip-icon" aria-hidden="true">✓</span><span><strong>Eligibility comes first</strong><small>Every offering has its own access requirements.</small></span></div>
      <div class="home-strip-item"><span class="strip-icon" aria-hidden="true">▤</span><span><strong>Your records, in one place</strong><small>Track holdings, activity, and key documents.</small></span></div>
    </div>
    <div class="home-grid">
      <section>
        <div class="section-heading"><div><p class="eyebrow">A MORE CONSIDERED APPROACH</p><h2>Start with the details.</h2><p>Explore current opportunities, then decide if one fits.</p></div><button class="text-button" data-page="opportunities">View all opportunities →</button></div>
        <div class="home-featured-list">${featured.map((property) => `<article class="home-featured-card panel"><div class="home-featured-image property-image--${property.image}" aria-hidden="true"></div><div class="home-featured-copy"><small>${property.location}</small><strong>${property.name}</strong><span>From ${money(property.min)} · ${property.badge}</span></div><button class="text-button" aria-label="View ${property.name}" data-action="property-detail" data-id="${property.id}">→</button></article>`).join("")}</div>
        <p class="disclosure-note"><strong>Before you invest.</strong> Private real-estate investments are speculative, illiquid, and not suitable for every investor. Target distributions and property valuations are estimates, not guarantees. Review all offering documents and risks before making an investment decision.</p>
      </section>
      <aside class="panel">
        <div class="panel-header"><div><h2 class="panel-title">A clear path, at every step</h2><p class="panel-subtitle">A guided experience built around you.</p></div></div>
        <div class="panel-body"><div class="home-process">
          <div class="process-item"><span class="process-number">1</span><div><strong>Get verified</strong><p>Complete identity and eligibility review before participating.</p></div></div>
          <div class="process-item"><span class="process-number">2</span><div><strong>Explore an offering</strong><p>Review the property, investment terms, and legal documents.</p></div></div>
          <div class="process-item"><span class="process-number">3</span><div><strong>Track your investment</strong><p>Follow subscription status, ownership records, and distributions.</p></div></div>
        </div></div>
      </aside>
    </div>
    <div class="home-cta"><div><h2>Everything in its right place.</h2><p>Your portfolio and investor documents are ready when you are.</p></div><button class="button" data-page="overview">Go to your overview <span aria-hidden="true">→</span></button></div>
  </section>`;
}

function holdingRow(holding) {
  const property = propertyById(holding.propertyId);
  return `<div class="holding-row">
    <div class="holding-property"><span class="mini-image mini-image--${holding.image}" aria-hidden="true"></span><span><strong>${property.name}</strong><small>${property.location}</small></span></div>
    <div class="holding-amount"><strong>${units(holding.units)} units</strong><small>Ownership units</small></div>
    <div class="holding-value"><strong>${money(holding.value)}</strong><small>Current estimate</small></div>
  </div>`;
}

function activityItem(item, full = false) {
  return `<div class="${full ? "activity-full-item" : "activity-item"}">
    <span class="activity-icon" aria-hidden="true">${activityIcon(item.type)}</span>
    <span class="${full ? "" : "activity-copy"}"><strong>${item.title}</strong><small>${item.description}</small></span>
    ${full ? `<span class="activity-meta"><strong>${item.amount}</strong><small>${item.date} · ${item.status}</small></span>` : `<span class="activity-date">${item.date.split(",")[0]}</span>`}
  </div>`;
}

function renderOverview() {
  const invested = state.holdings.reduce((sum, holding) => sum + holding.invested, 0);
  const value = state.holdings.reduce((sum, holding) => sum + holding.value, 0);
  const distributions = state.holdings.reduce((sum, holding) => sum + holding.distribution, 0);
  const pending = state.subscriptions.length;
  return `<section class="page">
    <div class="welcome-banner"><div><p class="eyebrow">YOUR INVESTMENT OVERVIEW</p><h1>Good afternoon, Alex.</h1><p>A clear view of your properties, account, and what's next.</p></div><span class="welcome-mark" aria-hidden="true">m.</span></div>
    <div class="metrics-grid">
      ${metricCard("Estimated portfolio value", money(value), "Across 3 property investments", "An estimate only; private assets may be difficult to value or sell.")}
      ${metricCard("Total invested", money(invested), "Original subscription amounts")}
      ${metricCard("Distributions received", money(distributions), "Paid to date · illustrative account data")}
      ${metricCard("In progress", `${pending}`, pending ? "Subscription awaiting next steps" : "No pending subscriptions")}
    </div>
    <div class="dashboard-grid">
      <section>
        <div class="section-heading"><div><h2>Your properties</h2><p>Ownership and estimated value at a glance.</p></div><button class="text-button" data-page="portfolio">View portfolio →</button></div>
        <article class="panel"><div class="panel-header"><div><h3 class="panel-title">Property holdings</h3><p class="panel-subtitle">Indicative values, subject to change.</p></div><span class="tag">${state.holdings.length} assets</span></div><div class="panel-body">${state.holdings.map(holdingRow).join("")}</div></article>
        <div class="section-heading"><div><h2>Recent activity</h2><p>Payments, distributions, and account updates.</p></div><button class="text-button" data-page="activity">View all activity →</button></div>
        <article class="panel"><div class="panel-body activity-list">${state.activities.slice(0, 3).map((item) => activityItem(item)).join("")}</div></article>
      </section>
      <aside>
        <div class="section-heading"><div><h2>Your account</h2><p>Required account checks.</p></div></div>
        <article class="panel"><div class="panel-header"><div><h3 class="panel-title">Verification status</h3><p class="panel-subtitle">Last reviewed Oct 20, 2026</p></div><span class="tag"><span class="tag-dot"></span>In good standing</span></div><div class="panel-body"><div class="compliance-list">
          <div class="compliance-row"><span>Identity verification</span><span class="compliance-state">Approved</span></div>
          <div class="compliance-row"><span>Investor eligibility</span><span class="compliance-state">Approved</span></div>
          <div class="compliance-row"><span>Verified wallet</span><span class="compliance-state">Linked</span></div>
          <div class="compliance-row"><span>Tax documentation</span><span class="compliance-state">On file</span></div>
        </div><button class="text-button" data-action="compliance-info">View account details →</button></div></article>
        <div class="section-heading"><div><h2>Next distribution</h2><p>Indicative schedule, subject to approval.</p></div></div>
        <article class="panel"><div class="panel-body"><div class="distribution-highlight"><span class="distribution-calendar" aria-hidden="true">▦</span><span><strong>Q4 2026 · The Cypress House</strong><small>Estimated payment window: Jan 15–31, 2027</small></span></div><p class="form-hint" style="margin-top:11px">Dates are indicative. Distributions are not guaranteed and may be changed or paused in accordance with offering terms.</p><button class="text-button" data-page="activity">See distribution history →</button></div></article>
      </aside>
    </div>
    <div class="section-heading"><div><h2>Room to grow thoughtfully</h2><p>See whether a current opportunity fits your goals.</p></div><button class="button button-secondary button-small" data-page="opportunities">Browse properties <span aria-hidden="true">→</span></button></div>
  </section>`;
}

function renderOpportunities() {
  const list = properties.filter((property) => {
    const query = state.search.trim().toLowerCase();
    const matchesText = !query || `${property.name} ${property.location} ${property.category}`.toLowerCase().includes(query);
    const matchesCategory = state.category === "all" || property.category.toLowerCase() === state.category;
    return matchesText && matchesCategory;
  });
  return `<section class="page">
    ${pageHeading("Explore properties", "A closer look at each property, offering, and set of terms.", `<button class="button button-secondary" data-action="compliance-info">View my eligibility</button>`)}
    <div class="notice-bar"><span class="notice-icon" aria-hidden="true">ⓘ</span><span><strong>Eligibility applies.</strong> Each investment is available only to eligible investors. Offerings may be limited by jurisdiction, suitability requirements, and allocation.</span></div>
    <div class="market-toolbar"><label class="search-field"><input id="property-search" type="search" placeholder="Search properties or locations" value="${escapeHtml(state.search)}" aria-label="Search properties or locations" /></label>
      <select id="category-filter" class="filter-select" aria-label="Filter by property type"><option value="all" ${state.category === "all" ? "selected" : ""}>All property types</option><option value="residential" ${state.category === "residential" ? "selected" : ""}>Residential</option><option value="multifamily" ${state.category === "multifamily" ? "selected" : ""}>Multifamily</option></select>
      <span class="market-note">Illustrative opportunities · details subject to offering documents</span>
    </div>
    <div class="property-grid">${list.length ? list.map(propertyCard).join("") : `<div class="empty-state" style="grid-column:1/-1"><strong>No properties found</strong>Try a different search or property type.</div>`}</div>
    <p class="disclosure-note"><strong>Important:</strong> Target annual distributions, projected timelines, and estimated property values are illustrative only, are not guaranteed, and should not be relied on as a promise of future performance. Investing in private real estate is speculative, illiquid, and involves risk, including possible loss of principal. Review the full offering documents before investing.</p>
  </section>`;
}

function renderPortfolio() {
  const totalInvested = state.holdings.reduce((sum, holding) => sum + holding.invested, 0);
  const totalValue = state.holdings.reduce((sum, holding) => sum + holding.value, 0);
  const totalDistributions = state.holdings.reduce((sum, holding) => sum + holding.distribution, 0);
  const change = totalValue - totalInvested;
  return `<section class="page">
    ${pageHeading("My portfolio", "Your property interests, portfolio estimates, and distribution history.", `<button class="button button-secondary" data-action="download-statement">Download statement ↓</button><button class="button" data-page="opportunities">Explore properties <span aria-hidden="true">→</span></button>`)}
    <div class="notice-bar"><span class="notice-icon" aria-hidden="true">ⓘ</span><span>Values shown are illustrative estimates, not offers to buy or sell. Token balances and final ownership are subject to official records and reconciliation.</span></div>
    <div class="portfolio-summary"><div class="portfolio-value-card"><small>Estimated portfolio value</small><strong>${money(totalValue)}</strong><span>Based on illustrative account data</span></div>
      <div class="portfolio-small-stat"><small>Total invested</small><strong>${money(totalInvested)}</strong><span>Original subscription amounts</span></div>
      <div class="portfolio-small-stat"><small>Change in estimate</small><strong class="${change >= 0 ? "positive" : ""}">${change >= 0 ? "+" : ""}${money(change)}</strong><span>Not a realized return</span></div>
      <div class="portfolio-small-stat"><small>Distributions received</small><strong>${money(totalDistributions)}</strong><span>Illustrative, paid to date</span></div>
    </div>
    <div class="portfolio-lower">
      <article class="panel"><div class="panel-header"><div><h2 class="panel-title">Your holdings</h2><p class="panel-subtitle">Investment interests and estimated values.</p></div><span class="tag">${state.holdings.length} active</span></div>
      <div class="table-wrap"><table class="data-table"><thead><tr><th>Property</th><th>Ownership units</th><th>Invested</th><th>Est. value</th><th>Allocation</th></tr></thead><tbody>${state.holdings.map((holding) => {
        const property = propertyById(holding.propertyId);
        const allocation = totalValue ? holding.value / totalValue * 100 : 0;
        return `<tr><td><span class="table-property"><span class="mini-image mini-image--${holding.image}" aria-hidden="true"></span><span><strong>${property.name}</strong><small class="muted" style="display:block;margin-top:3px;font-size:8px">${property.location}</small></span></span></td><td>${units(holding.units)}</td><td>${money(holding.invested)}</td><td><strong>${money(holding.value)}</strong></td><td><span class="portfolio-bar"><span style="width:${allocation.toFixed(0)}%"></span></span></td></tr>`;
      }).join("")}</tbody></table></div><div style="padding:0 18px 16px"><p class="form-hint">Pending subscriptions are not included in portfolio holdings until payment, issuance, and reconciliation are complete.</p></div></article>
      <aside>
        <article class="panel chart-card"><div class="chart-header"><div><p class="eyebrow">PORTFOLIO ESTIMATE</p><p class="chart-total">${money(totalValue)}</p></div><span class="tag tag-neutral">Illustrative</span></div>
          <svg class="chart-svg" viewBox="0 0 400 90" preserveAspectRatio="none" role="img" aria-label="Illustrative portfolio value trend">
            <defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#7d9a7b" stop-opacity=".17"/><stop offset="1" stop-color="#7d9a7b" stop-opacity="0"/></linearGradient></defs>
            <path class="chart-gridline" d="M0 20H400M0 50H400M0 80H400"/><path class="chart-area" d="M0 73 C32 67 42 70 66 57 S105 61 128 48 S168 52 194 41 S228 50 253 33 S296 38 320 24 S361 35 400 13 V90 H0 Z"/><path class="chart-line" d="M0 73 C32 67 42 70 66 57 S105 61 128 48 S168 52 194 41 S228 50 253 33 S296 38 320 24 S361 35 400 13"/>
          </svg><div class="chart-labels"><span>Oct ’25</span><span>Jan ’26</span><span>Apr ’26</span><span>Jul ’26</span><span>Oct ’26</span></div><p class="form-hint" style="margin:9px 0 0">Illustrative display; not a verified historical performance record.</p>
        </article>
        <article class="panel" style="margin-top:14px"><div class="panel-header"><div><h2 class="panel-title">Distributions</h2><p class="panel-subtitle">Payment history across your portfolio.</p></div></div><div class="panel-body"><div class="compliance-list">${state.holdings.map((holding) => { const property = propertyById(holding.propertyId); return `<div class="compliance-row"><span>${property.name}</span><strong>${money(holding.distribution)}</strong></div>`; }).join("")}</div><button class="text-button" data-page="activity">See all distributions →</button></div></article>
      </aside>
    </div>
  </section>`;
}

function renderActivity() {
  const visible = state.activities.filter((item) => state.activityTab === "all" || item.type === state.activityTab);
  return `<section class="page">
    ${pageHeading("Activity", "A record of your subscriptions, distributions, and account updates.", `<button class="button button-secondary" data-action="download-activity">Export activity ↓</button>`)}
    <div class="panel activity-panel"><div class="panel-header"><div><h2 class="panel-title">Account activity</h2><p class="panel-subtitle">Statuses reflect the latest available platform information.</p></div>
      <div class="filter-tabs" role="group" aria-label="Filter activity"><button class="filter-tab ${state.activityTab === "all" ? "active" : ""}" data-activity-filter="all">All activity</button><button class="filter-tab ${state.activityTab === "subscription" ? "active" : ""}" data-activity-filter="subscription">Investments</button><button class="filter-tab ${state.activityTab === "distribution" ? "active" : ""}" data-activity-filter="distribution">Distributions</button><button class="filter-tab ${state.activityTab === "transfer" ? "active" : ""}" data-activity-filter="transfer">Transfers</button></div>
    </div><div class="activity-date-heading">RECENT</div>${visible.length ? visible.map((item) => activityItem(item, true)).join("") : `<div class="empty-state" style="margin:12px 18px 18px"><strong>No activity in this category yet</strong>Your account activity will appear here.</div>`}</div>
    <p class="disclosure-note">A displayed status is informational and does not replace settlement confirmation. Payment, token, and distribution statuses are updated only when the relevant provider or official platform records confirm the result.</p>
  </section>`;
}

const documents = [
  { name: "Cypress House — Offering memorandum", property: "The Cypress House", type: "Offering", version: "Version 4 · Oct 10, 2026", date: "Oct 10, 2026" },
  { name: "Cypress House — Subscription agreement", property: "The Cypress House", type: "Agreement", version: "Version 2 · Oct 10, 2026", date: "Oct 10, 2026" },
  { name: "Willow & Stone — Property overview", property: "Willow & Stone", type: "Property", version: "Version 1 · Sep 12, 2026", date: "Sep 12, 2026" },
  { name: "Q3 2026 — Distribution statement", property: "Your portfolio", type: "Statement", version: "Issued Oct 20, 2026", date: "Oct 20, 2026" },
  { name: "Investor privacy notice", property: "Account documents", type: "Account", version: "Effective Jan 01, 2026", date: "Jan 01, 2026" },
  { name: "Risk disclosures and investor acknowledgment", property: "Account documents", type: "Disclosure", version: "Acknowledged Oct 10, 2026", date: "Oct 10, 2026" }
];

function renderDocuments() {
  const filters = ["all", "offering", "agreement", "property", "statement", "account", "disclosure"];
  const visible = documents.filter((document) => state.documentTab === "all" || document.type.toLowerCase() === state.documentTab);
  return `<section class="page">
    ${pageHeading("Your documents", "Offering materials, account records, and signed acknowledgments.", `<button class="button button-secondary" data-action="download-all-documents">Download document list ↓</button>`)}
    <div class="notice-bar"><span class="notice-icon" aria-hidden="true">ⓘ</span><span>Documents are provided for review and recordkeeping. Offering-specific legal documents govern if their terms differ from a screen summary.</span></div>
    <div class="filter-tabs" role="group" aria-label="Filter documents">${filters.map((filter) => `<button class="filter-tab ${state.documentTab === filter ? "active" : ""}" data-document-filter="${filter}">${filter === "all" ? "All documents" : filter[0].toUpperCase() + filter.slice(1)}</button>`).join("")}</div>
    <p class="document-section-label">Available to you · ${visible.length} documents</p>
    <div class="document-grid">${visible.map((document, index) => `<article class="document-card panel"><span class="document-icon" aria-hidden="true">${document.type === "Statement" ? "▧" : "▤"}</span><span class="document-copy"><strong>${document.name}</strong><small>${document.version} · ${document.property}</small><span class="document-private">Private to your account</span></span><button class="text-button" data-action="document-detail" data-index="${documents.indexOf(document)}" aria-label="View ${document.name}">View →</button></article>`).join("")}</div>
    <div class="section-heading"><div><h2>Looking for something?</h2><p>Request support for account-specific or tax documents.</p></div><button class="button button-secondary button-small" data-action="document-request">Request a document</button></div>
  </section>`;
}

function renderWallet() {
  const wallet = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
  return `<section class="page">
    ${pageHeading("Wallet & transfers", "Manage your verified wallet and request permitted transfers.", `<button class="button button-secondary" data-action="wallet-change">Manage wallet</button>`)}
    <div class="notice-bar"><span class="notice-icon" aria-hidden="true">ⓘ</span><span><strong>No seed phrases or private keys.</strong> Morrow will never ask you to disclose a recovery phrase. Wallet changes and transfers require additional identity and eligibility checks.</span></div>
    <div class="wallet-layout">
      <div>
        <article class="wallet-hero"><p class="eyebrow">VERIFIED INVESTOR WALLET</p><h2>Your investment wallet</h2><p>This wallet is linked to your verified investor profile. Transfers are subject to offering terms, eligibility checks, and compliance approval.</p><span class="tag tag-neutral">Verified · Personal wallet</span>
          <div class="wallet-address"><span><small>NETWORK</small><br /><strong>Ethereum · Demo network</strong></span><span style="text-align:right"><small>VERIFIED ADDRESS</small><br /><code>${wallet.slice(0, 8)}...${wallet.slice(-6)}</code><button class="text-button" data-action="show-wallet-address" style="display:block;margin:5px 0 0 auto;color:#d9e3d8">Show full address</button></span></div>
        </article>
        <div class="section-heading"><div><h2>Transfer requests</h2><p>Each request is reviewed before any transfer is submitted.</p></div><button class="button button-small" data-action="transfer">Request a transfer</button></div>
        <article class="panel"><div class="panel-header"><h3 class="panel-title">Recent requests</h3></div><div class="panel-body">${state.transfers.length ? state.transfers.map((transfer) => `<div class="wallet-event"><span class="activity-icon" aria-hidden="true">↗</span><span><strong>${transfer.property} · ${units(transfer.amount)} units</strong><small>Destination ${transfer.destination.slice(0, 8)}...${transfer.destination.slice(-6)} · ${transfer.date}</small></span>${statusTag(transfer.status)}</div>`).join("") : `<div class="empty-state"><strong>No transfer requests yet</strong>Your transfer requests and review status will appear here.</div>`}</div></article>
      </div>
      <aside>
        <article class="panel"><div class="panel-header"><div><h2 class="panel-title">Before a transfer</h2><p class="panel-subtitle">A few checks help keep your interests safe.</p></div></div><div class="panel-body"><div class="wallet-safety">
          <div class="safety-row"><span class="safety-check">✓</span><span><strong>Recipient eligibility</strong><p>Recipient wallets must meet current offering and jurisdiction rules.</p></span></div>
          <div class="safety-row"><span class="safety-check">✓</span><span><strong>Offering restrictions</strong><p>Some offerings have holding periods or additional transfer limits.</p></span></div>
          <div class="safety-row"><span class="safety-check">✓</span><span><strong>Human review</strong><p>A submitted request is not approved or settled until each review is complete.</p></span></div>
          <div class="safety-row"><span class="safety-check">✓</span><span><strong>Final settlement</strong><p>Holdings update only after final transaction confirmation and reconciliation.</p></span></div>
        </div><p class="transfer-note">A wallet address is sensitive. Verify the complete address and network independently before making a request. Transfers may be irreversible once approved and settled.</p><button class="text-button" data-action="transfer">Start a transfer request →</button></div></article>
        <article class="panel" style="margin-top:14px"><div class="panel-header"><div><h2 class="panel-title">Wallet security</h2><p class="panel-subtitle">Practical reminders for protecting your account.</p></div></div><div class="panel-body"><div class="compliance-list"><div class="compliance-row"><span>Identity checks</span><span class="compliance-state">Current</span></div><div class="compliance-row"><span>Two-factor authentication</span><span class="compliance-state">Enabled</span></div><div class="compliance-row"><span>Last wallet review</span><span>Aug 22, 2026</span></div></div></div></article>
      </aside>
    </div>
  </section>`;
}

const operatorQueues = {
  compliance: [
    { id: "CMP-2841", title: "Investor eligibility review", person: "Jordan Lee · Individual investor", detail: "Documents received · Jurisdiction: US", status: "Needs review", time: "2 hours ago" },
    { id: "CMP-2836", title: "Updated identity document", person: "Taylor Reed · Individual investor", detail: "Document expires soon · Reverification required", status: "Needs review", time: "Yesterday" },
    { id: "CMP-2829", title: "Eligibility rule revalidation", person: "Morgan Chen · Individual investor", detail: "Rule version updated · Existing holdings unaffected", status: "In progress", time: "Oct 27, 2026" }
  ],
  subscriptions: [
    { id: "SUB-9082", title: "Cypress House subscription", person: "Investor · Offering version 4", detail: "$25,000 reserved · Payment confirmation pending", status: "Awaiting payment", time: "1 hour ago" },
    { id: "SUB-9075", title: "Willow & Stone subscription", person: "Investor · Offering version 2", detail: "$10,000 received · Reconciliation in progress", status: "Payment received", time: "4 hours ago" },
    { id: "SUB-9061", title: "Cypress House subscription", person: "Investor · Offering version 4", detail: "Payment reconciled · Issuance not yet requested", status: "Ready for review", time: "Yesterday" }
  ],
  distributions: [
    { id: "DST-1042", title: "Cypress House · Q3 distribution", person: "Record date · Sep 30, 2026", detail: "Snapshot finalized · Calculation version 2.1", status: "Needs approval", time: "Oct 28, 2026" },
    { id: "DST-1038", title: "Willow & Stone · Q3 distribution", person: "Record date · Sep 30, 2026", detail: "Payment batch reconciled · Statements available", status: "Completed", time: "Oct 21, 2026" }
  ],
  properties: [
    { id: "AST-1007", title: "Juniper Row · Property review", person: "Sponsor · Austin, Texas", detail: "Due diligence in progress · Offering terms not yet approved", status: "Due diligence", time: "Oct 29, 2026" },
    { id: "AST-0996", title: "Willow & Stone · Offering", person: "Sponsor · Portland, Oregon", detail: "Offering live · 83% of available allocation reserved", status: "Open", time: "Sep 12, 2026" },
    { id: "AST-0981", title: "Cypress House · Offering", person: "Sponsor · Charleston, South Carolina", detail: "Version 4 approved · Offering live", status: "Open", time: "Aug 18, 2026" }
  ]
};

function renderOperations() {
  const labels = { compliance: "Compliance queue", subscriptions: "Subscriptions", distributions: "Distributions", properties: "Properties" };
  const queue = operatorQueues[state.operationsTab];
  return `<section class="page">
    ${pageHeading("Operations", "A role-scoped workspace for compliance, finance, and sponsor teams.", `<span class="tag tag-neutral">Operator demo</span>`)}
    <div class="notice-bar"><span class="notice-icon" aria-hidden="true">ⓘ</span><span>This is a demonstration workspace with sample records. In a live platform, every action is authorized by server-side role, resource, and dual-control policies and recorded in an audit trail.</span></div>
    <div class="ops-kpis"><article class="ops-kpi"><small>Compliance cases</small><strong>12</strong><span>3 require review today</span></article><article class="ops-kpi"><small>Payments to reconcile</small><strong>04</strong><span>Across 2 active offerings</span></article><article class="ops-kpi"><small>Pending distributions</small><strong>02</strong><span>Approval and exception queue</span></article><article class="ops-kpi"><small>Open offerings</small><strong>02</strong><span>Current investor allocation</span></article></div>
    <article class="panel">
      <div class="ops-tabs" role="group" aria-label="Operations queues">${Object.keys(labels).map((key) => `<button class="ops-tab ${state.operationsTab === key ? "active" : ""}" aria-pressed="${state.operationsTab === key}" data-ops-tab="${key}">${labels[key]}</button>`).join("")}</div>
      <div class="panel-header"><div><h2 class="panel-title">${labels[state.operationsTab]}</h2><p class="panel-subtitle">Review assigned records and follow their status.</p></div><button class="button button-secondary button-small" data-action="operations-export">Export queue ↓</button></div>
      <div>${queue.map((item) => `<div class="ops-detail"><div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px"><div><span class="eyebrow">${item.id} · ${item.time}</span><strong>${item.title}</strong><p>${item.person}<br />${item.detail}</p></div>${statusTag(item.status)}</div><div class="ops-detail-footer"><span class="form-hint">Action requires appropriate role and recorded rationale.</span><span class="ops-actions"><button class="button button-secondary button-small" data-action="queue-details" data-id="${item.id}" data-title="${escapeAttribute(item.title)}">View case</button>${item.status.includes("review") || item.status.includes("approval") || item.status === "Due diligence" ? `<button class="button button-small" data-action="queue-review" data-id="${item.id}" data-title="${escapeAttribute(item.title)}">Review</button>` : ""}</span></div></div>`).join("")}</div>
    </article>
    <p class="ops-note">High-risk financial and asset actions use separation of duties: preparation, approval, and execution are distinct steps. An operator screen never overrides legal restrictions or on-chain safeguards.</p>
  </section>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function render() {
  const renderers = {
    home: renderHome,
    overview: renderOverview,
    opportunities: renderOpportunities,
    portfolio: renderPortfolio,
    activity: renderActivity,
    documents: renderDocuments,
    wallet: renderWallet,
    operations: renderOperations
  };
  root.innerHTML = renderers[state.page]();
  document.querySelector("#page-label").textContent = pageLabels[state.page];
  document.querySelectorAll(".nav-link").forEach((link) => {
    const isActive = link.dataset.page === state.page;
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll(".brand").forEach((link) => {
    if (state.page === "home") link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  const search = document.querySelector("#property-search");
  if (search) search.addEventListener("input", (event) => {
    state.search = event.target.value;
    const selection = event.target.selectionStart;
    render();
    const next = document.querySelector("#property-search");
    next.focus();
    next.setSelectionRange(selection, selection);
  });
  const categoryFilter = document.querySelector("#category-filter");
  if (categoryFilter) categoryFilter.addEventListener("change", (event) => {
    state.category = event.target.value;
    render();
  });
}

function navigate(page) {
  if (!pageLabels[page]) return;
  state.page = page;
  render();
  document.querySelector("#main-content").focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(title, message) {
  const region = document.querySelector("#toast-region");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<strong>${escapeHtml(title)}</strong>${escapeHtml(message)}`;
  region.append(toast);
  window.setTimeout(() => toast.remove(), 4300);
}

function showDialog(title, subtitle, body) {
  dialogContent.innerHTML = `<div class="dialog-head"><div><h2 id="dialog-title">${title}</h2><p>${subtitle}</p></div><button class="dialog-close" data-action="close-dialog" aria-label="Close dialog">×</button></div><div class="dialog-body">${body}</div>`;
  if (!dialog.open) dialog.showModal();
  const firstInput = dialog.querySelector("input, select, textarea, button");
  if (firstInput) firstInput.focus();
}

function showInfo(title, subtitle, content) {
  showDialog(title, subtitle, `<div class="detail-copy">${content}</div><div class="dialog-actions"><button class="button" data-action="close-dialog">Done</button></div>`);
}

function propertyDetails(id) {
  const property = propertyById(id);
  if (!property) return;
  const available = property.id !== "juniper";
  showDialog(property.name, `${property.location} · ${property.category}`, `<div class="detail-hero property-image--${property.image}"></div>
    <div class="detail-stats"><div class="detail-stat"><small>Minimum investment</small><strong>${money(property.min)}</strong></div><div class="detail-stat"><small>Target distribution</small><strong>${property.targetDistribution}</strong></div><div class="detail-stat"><small>Investment horizon</small><strong>${property.term}</strong></div></div>
    <div class="detail-copy"><p>${property.detail}</p><h3>Offering status</h3><p>${property.id === "juniper" ? "This opportunity is still under due diligence and is not open for subscriptions." : `${property.badge}. Review the current offering materials, risks, fees, and eligibility criteria before deciding whether to invest.`}</p><h3>Important risk information</h3><p>${property.risk}</p></div>
    <div class="dialog-actions"><button class="button button-secondary" data-action="close-dialog">Close</button>${available ? `<button class="button" data-action="invest" data-id="${property.id}">Review offering</button>` : ""}</div>`);
}

function invest(id) {
  const property = propertyById(id);
  if (!property || property.id === "juniper") return;
  showDialog("Start a subscription", `${property.name} · Offering version 4`, `<div class="stepper" aria-label="Investment steps"><span class="stepper-step active"><span class="stepper-number">1</span>Details</span><span class="stepper-line"></span><span class="stepper-step"><span class="stepper-number">2</span>Review</span><span class="stepper-line"></span><span class="stepper-step"><span class="stepper-number">3</span>Status</span></div>
    <form id="investment-form" data-id="${property.id}">
      <div class="form-field"><label for="investment-amount">Investment amount (USD)</label><input id="investment-amount" name="amount" type="number" min="${property.min}" step="100" value="${property.min}" required inputmode="decimal" /><span class="form-hint">Minimum ${money(property.min)} · Subject to available allocation and eligibility.</span></div>
      <div class="order-summary"><div class="order-summary-row"><span>Ownership units</span><strong id="units-preview">${units(property.min / property.price)}</strong></div><div class="order-summary-row"><span>Offering price per unit</span><strong>${money(property.price, 2)}</strong></div><div class="order-summary-row"><span>Platform fee</span><strong>See offering documents</strong></div></div>
      <label class="check-field"><input name="acknowledge" type="checkbox" required /><span>I understand this is a private, illiquid investment and I will review the current offering documents and risk disclosures before proceeding.</span></label>
      <p class="order-warning">Demo only: no payment will be collected, no allocation is guaranteed, and no token will be issued. Subscription eligibility and availability must be confirmed by the live platform.</p>
      <div class="dialog-actions"><button type="button" class="button button-secondary" data-action="close-dialog">Cancel</button><button type="submit" class="button">Review subscription →</button></div>
    </form>`);
  const input = dialog.querySelector("#investment-amount");
  input.addEventListener("input", () => {
    const amount = Math.max(0, Number(input.value) || 0);
    dialog.querySelector("#units-preview").textContent = units(Math.floor(amount / property.price));
  });
}

function reviewInvestment(form) {
  const id = form.dataset.id;
  const property = propertyById(id);
  const amount = Number(new FormData(form).get("amount"));
  const checkbox = form.querySelector('[name="acknowledge"]');
  if (!property || !Number.isFinite(amount) || amount < property.min || amount % 100 !== 0 || !checkbox.checked) {
    form.reportValidity();
    if (amount % 100 !== 0 && amount >= property.min) showToast("Check your amount", "Choose an amount in $100 increments.");
    return;
  }
  const tokenQuantity = Math.floor(amount / property.price);
  showDialog("Review your subscription", `${property.name} · Please check these details carefully`, `<div class="stepper" aria-label="Investment steps"><span class="stepper-step done"><span class="stepper-number">✓</span>Details</span><span class="stepper-line"></span><span class="stepper-step active"><span class="stepper-number">2</span>Review</span><span class="stepper-line"></span><span class="stepper-step"><span class="stepper-number">3</span>Status</span></div>
    <div class="order-summary"><div class="order-summary-row"><span>Property</span><strong>${property.name}</strong></div><div class="order-summary-row"><span>Investment amount</span><strong>${money(amount, 2)}</strong></div><div class="order-summary-row"><span>Ownership units</span><strong>${units(tokenQuantity)}</strong></div><div class="order-summary-row"><span>Offering version</span><strong>Version 4</strong></div><div class="order-summary-row"><span>Payment method</span><strong>Selected after eligibility review</strong></div><div class="order-summary-row order-total"><span>Amount shown</span><strong>${money(amount, 2)}</strong></div></div>
    <p class="order-warning">${property.risk} A summary on this screen does not replace the offering memorandum or subscription agreement.</p>
    <div class="dialog-actions"><button class="button button-secondary" data-action="invest" data-id="${id}">Back</button><button class="button" data-action="confirm-investment" data-id="${id}" data-amount="${amount}">Confirm demo request</button></div>`);
}

function confirmInvestment(id, rawAmount) {
  const property = propertyById(id);
  const amount = Number(rawAmount);
  if (!property || !Number.isFinite(amount) || amount < property.min) return;
  const subscriptionId = `SUB-${Math.floor(10000 + Math.random() * 89999)}`;
  const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date());
  state.subscriptions.push({ id: subscriptionId, propertyId: property.id, amount, status: "Payment required" });
  state.activities.unshift({ type: "subscription", title: "Subscription request created", description: `${property.name} · ${units(amount / property.price)} ownership units · ${subscriptionId}`, amount: money(amount), date, status: "Payment required" });
  showDialog("Request received", "Your demo subscription has been recorded.", `<div class="success-panel"><span class="success-mark" aria-hidden="true">✓</span><h3>Next step: eligibility review</h3><p>Your demo request <strong>${subscriptionId}</strong> is shown as awaiting review. No payment has been made, and no property allocation or ownership units have been issued.</p></div><div class="dialog-actions"><button class="button button-secondary" data-action="close-dialog">Close</button><button class="button" data-action="go-activity">View activity</button></div>`);
}

function transferDialog() {
  const options = state.holdings.map((holding) => {
    const property = propertyById(holding.propertyId);
    return `<option value="${property.id}">${property.name} · ${units(holding.units)} units available</option>`;
  }).join("");
  showDialog("Request a transfer", "A transfer request is not approved or settled until all checks are complete.", `<form id="transfer-form">
    <div class="form-field"><label for="transfer-property">Property interest</label><select id="transfer-property" name="property" required>${options}</select></div>
    <div class="form-field"><label for="transfer-amount">Number of units</label><input id="transfer-amount" name="amount" type="number" min="1" step="1" placeholder="Enter whole units" required /><span class="form-hint">Available units are checked again before any live transfer.</span></div>
    <div class="form-field"><label for="transfer-destination">Recipient wallet address</label><input id="transfer-destination" name="destination" type="text" autocomplete="off" placeholder="0x…" minlength="42" maxlength="42" pattern="0x[a-fA-F0-9]{40}" required /><span class="form-hint">Use the complete address on the approved network. Never share a seed phrase or private key.</span></div>
    <label class="check-field"><input name="confirm-address" type="checkbox" required /><span>I have independently verified the full destination address and understand the transfer will require eligibility and compliance review.</span></label>
    <p class="order-warning">Demo request only. No blockchain transaction will be created or submitted.</p>
    <div class="dialog-actions"><button type="button" class="button button-secondary" data-action="close-dialog">Cancel</button><button type="submit" class="button">Submit for review →</button></div>
  </form>`);
}

function submitTransfer(form) {
  const data = new FormData(form);
  const property = propertyById(data.get("property"));
  const amount = Number(data.get("amount"));
  const address = String(data.get("destination")).trim();
  const holding = state.holdings.find((item) => item.propertyId === data.get("property"));
  if (!property || !holding || !Number.isInteger(amount) || amount < 1 || amount > holding.units || !/^0x[a-fA-F0-9]{40}$/.test(address)) {
    form.reportValidity();
    if (amount > (holding?.units ?? 0)) showToast("Not enough units", "A request cannot exceed the units currently shown in your portfolio.");
    return;
  }
  const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date());
  state.transfers.unshift({ property: property.name, amount, destination: address, date, status: "Pending review" });
  state.activities.unshift({ type: "transfer", title: "Transfer request submitted", description: `${property.name} · ${units(amount)} units · Pending compliance review`, amount: `${units(amount)} units`, date, status: "Pending review" });
  showDialog("Request submitted", "Your demo transfer request is now visible in your account.", `<div class="success-panel"><span class="success-mark" aria-hidden="true">✓</span><h3>Pending compliance review</h3><p>The recipient's eligibility, offering restrictions, and wallet status must be reviewed before a transfer can be authorized. <strong>No transaction has been sent.</strong></p></div><div class="order-summary" style="margin-top:13px"><div class="order-summary-row"><span>Property</span><strong>${property.name}</strong></div><div class="order-summary-row"><span>Units requested</span><strong>${units(amount)}</strong></div><div class="order-summary-row"><span>Destination</span><strong>${address}</strong></div></div><div class="dialog-actions"><button class="button button-secondary" data-action="close-dialog">Close</button><button class="button" data-action="go-wallet">View wallet</button></div>`);
}

function walletChangeDialog() {
  showDialog("Manage your wallet", "Wallet changes are sensitive actions and need additional review.", `<div class="order-summary"><div class="order-summary-row"><span>Current wallet</span><strong>Verified · Ethereum demo network</strong></div><div class="order-summary-row"><span>Account status</span><strong>Identity and eligibility approved</strong></div></div>
    <div class="detail-copy"><h3>Need to update your wallet?</h3><p>For your protection, wallet replacement requires reauthentication, step-up verification, ownership confirmation, and a compliance review. A new wallet is not active until these checks are complete.</p><h3>Protect your recovery phrase</h3><p>Never share a seed phrase or private key with anyone, including Morrow support.</p></div>
    <div class="dialog-actions"><button class="button button-secondary" data-action="close-dialog">Close</button><button class="button" data-action="wallet-request">Request a wallet change</button></div>`);
}

function walletRequestDialog() {
  showDialog("Request wallet change", "This demo will not bind, sign, or submit a wallet.", `<form id="wallet-form"><div class="form-field"><label for="new-wallet">New wallet address</label><input id="new-wallet" name="address" type="text" minlength="42" maxlength="42" pattern="0x[a-fA-F0-9]{40}" autocomplete="off" placeholder="0x…" required /><span class="form-hint">Enter a public address only. Never enter private keys or recovery phrases.</span></div><div class="form-field"><label for="wallet-reason">Reason for change</label><select name="reason" id="wallet-reason" required><option value="">Select a reason</option><option>Replacing a wallet</option><option>Security concern</option><option>Other</option></select></div><p class="order-warning">A wallet change request will be reviewed and is not effective until verified and approved. No wallet signature will be requested in this demo.</p><div class="dialog-actions"><button type="button" class="button button-secondary" data-action="close-dialog">Cancel</button><button class="button" type="submit">Request review</button></div></form>`);
}

function documentDialog(index) {
  const document = documents[index];
  if (!document) return;
  showDialog(document.name, `${document.property} · ${document.type}`, `<div class="detail-copy"><p>This document is available in the demonstration interface for review only. The live platform provides access-controlled files and verified document versions for your account.</p><h3>Document details</h3><p>${document.version}<br />Category: ${document.type}<br />Access: Private to your investor account</p><p class="order-warning">This demo does not contain a legal agreement or substitute for official offering documents. Always review the complete, current documents supplied by the issuer.</p></div><div class="dialog-actions"><button class="button button-secondary" data-action="close-dialog">Close</button><button class="button" data-action="download-document" data-index="${index}">Download demo receipt ↓</button></div>`);
}

function downloadText(filename, content) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function csvEscape(value) {
  return `"${String(value).replace(/"/g, '""')}"`;
}

function downloadStatement() {
  const rows = [["Property", "Units", "Amount invested (USD)", "Estimated value (USD)", "Distributions received (USD)"]];
  for (const holding of state.holdings) {
    rows.push([propertyById(holding.propertyId).name, holding.units, holding.invested.toFixed(2), holding.value.toFixed(2), holding.distribution.toFixed(2)]);
  }
  downloadText("morrow-portfolio-statement-demo.csv", rows.map((row) => row.map(csvEscape).join(",")).join("\n"));
  showToast("Statement downloaded", "Your illustrative portfolio data was exported as a CSV demo statement.");
}

function downloadActivity() {
  const rows = [["Date", "Activity", "Description", "Amount", "Status"]];
  for (const item of state.activities) rows.push([item.date, item.title, item.description, item.amount, item.status]);
  downloadText("morrow-activity-demo.csv", rows.map((row) => row.map(csvEscape).join(",")).join("\n"));
  showToast("Activity exported", "Your illustrative account activity was exported as a CSV.");
}

function handleAction(action, target) {
  const { id } = target.dataset;
  if (action === "close-dialog") dialog.close();
  if (action === "property-detail") propertyDetails(id);
  if (action === "invest") invest(id);
  if (action === "confirm-investment") confirmInvestment(id, target.dataset.amount);
  if (action === "compliance-info") showInfo("Account verification", "Your investment readiness checks", `<p>Your demonstration account shows identity verification, investor eligibility, wallet verification, and tax documentation as approved or on file.</p><h3>Live platform requirements</h3><p>Eligibility is specific to each offering and jurisdiction. A compliance hold blocks affected transactions until resolved. Statuses may expire and can require reverification.</p><p>Example account information only; this screen does not perform identity, sanctions, or eligibility checks.</p>`);
  if (action === "transfer") transferDialog();
  if (action === "wallet-change") walletChangeDialog();
  if (action === "wallet-request") walletRequestDialog();
  if (action === "document-detail") documentDialog(Number(target.dataset.index));
  if (action === "download-document") {
    const document = documents[Number(target.dataset.index)];
    if (document) {
      downloadText("morrow-document-demo-receipt.txt", `Morrow demo document receipt\n\nDocument: ${document.name}\nProperty: ${document.property}\nVersion: ${document.version}\n\nDEMO ONLY. This receipt is not a legal document or an offering agreement.\n`);
      showToast("Demo receipt downloaded", "This receipt does not contain or replace official offering documents.");
    }
  }
  if (action === "download-statement") downloadStatement();
  if (action === "download-activity") downloadActivity();
  if (action === "download-all-documents") {
    const rows = [["Document", "Property", "Type", "Version", "Date"], ...documents.map((item) => [item.name, item.property, item.type, item.version, item.date])];
    downloadText("morrow-document-index-demo.csv", rows.map((row) => row.map(csvEscape).join(",")).join("\n"));
    showToast("Document list downloaded", "Your illustrative document index was exported as a CSV.");
  }
  if (action === "document-request") showDialog("Request a document", "Tell us what you need, and the support team can help.", `<form id="document-request-form"><div class="form-field"><label for="document-kind">Document type</label><select name="type" id="document-kind" required><option value="">Choose a document</option><option>Tax statement</option><option>Distribution statement</option><option>Offering document</option><option>Account verification</option><option>Other</option></select></div><div class="form-field"><label for="document-message">Additional details</label><textarea name="details" id="document-message" maxlength="300" placeholder="Property, time period, or other helpful context"></textarea></div><div class="dialog-actions"><button type="button" class="button button-secondary" data-action="close-dialog">Cancel</button><button class="button" type="submit">Submit request</button></div></form>`);
  if (action === "show-wallet-address") showInfo("Verified wallet address", "Ethereum · Demo environment", `<p>Always verify the full address and network independently before initiating any transfer. The address shown here is illustrative sample data and is not connected to a live wallet.</p><p><code style="overflow-wrap:anywhere">${escapeHtml("0x71C7656EC7ab88b098defB751B7401B5f6d8976F")}</code></p>`);
  if (action === "notifications") showInfo("You're all caught up", "Account notifications", `<p>No new notifications. Important account, offering, and transaction updates will appear here.</p><p>Notifications are informational only; account permissions and eligibility are verified independently.</p>`);
  if (action === "profile") showInfo("Alex Morgan", "Personal investor account · Demo", `<div class="compliance-list"><div class="compliance-row"><span>Account status</span><span class="compliance-state">Approved</span></div><div class="compliance-row"><span>Two-factor authentication</span><span class="compliance-state">Enabled</span></div><div class="compliance-row"><span>Session security</span><span class="compliance-state">Active</span></div></div><p>Account, session, and security settings are demonstration content and are not connected to an identity provider.</p>`);
  if (action === "disclaimer") showInfo("Important investment disclosures", "Please review before making an investment decision", `<p>All content in this website is illustrative demonstration content and is not an offer to sell or a solicitation to buy any security, token, or real-estate interest.</p><p>Investing in private real estate and digital asset interests involves significant risk, including illiquidity, loss of principal, valuation uncertainty, changes in legal or tax treatment, and technology or custody risk. An investor may lose some or all of their investment.</p><p>Target distributions, estimated valuations, sample property data, and illustrative returns are not guaranteed, are not forecasts of actual performance, and should not be relied on as a promise. Actual terms are contained only in the definitive offering documents.</p><p>Tokenization does not confer direct title to real property and does not replace the governing legal agreements. Offerings, transfers, and investor eligibility are subject to applicable law and jurisdiction-specific review. This platform is not legal, tax, investment, or financial advice.</p>`);
  if (action === "go-activity") { dialog.close(); navigate("activity"); }
  if (action === "go-wallet") { dialog.close(); navigate("wallet"); }
  if (action === "download-statement") downloadStatement();
  if (action === "operations-export") {
    const rows = [["ID", "Title", "Person", "Details", "Status", "Updated"], ...operatorQueues[state.operationsTab].map((item) => [item.id, item.title, item.person, item.detail, item.status, item.time])];
    downloadText(`morrow-${state.operationsTab}-demo-queue.csv`, rows.map((row) => row.map(csvEscape).join(",")).join("\n"));
    showToast("Queue exported", "Illustrative operations records were exported as a CSV.");
  }
  if (action === "queue-details") {
    const item = operatorQueues[state.operationsTab].find((record) => record.id === id);
    if (item) showInfo(item.title, `${item.id} · Sample operations record`, `<p>${escapeHtml(item.person)}</p><p>${escapeHtml(item.detail)}</p><p>Current status: <strong>${escapeHtml(item.status)}</strong></p><p>This demonstration record contains no real investor information. Production case details are permission-scoped, access-logged, and limited to the authorized operator.</p>`);
  }
  if (action === "queue-review") {
    const item = operatorQueues[state.operationsTab].find((record) => record.id === id);
    if (item) showDialog("Record a review", `${item.id} · ${item.title}`, `<form id="queue-review-form" data-id="${escapeAttribute(id)}"><div class="form-field"><label for="review-outcome">Review outcome</label><select id="review-outcome" name="outcome" required><option value="">Select an outcome</option><option>More information required</option><option>Escalate for officer approval</option><option>Mark reviewed — no decision</option></select></div><div class="form-field"><label for="review-reason">Reason for this action</label><textarea id="review-reason" name="reason" maxlength="300" required placeholder="Record the business reason for this review"></textarea></div><p class="order-warning">This is a demo. Production decisions are permission-controlled, require authorized review, and are recorded to an audit trail. This demo cannot approve eligibility, release funds, or change investor status.</p><div class="dialog-actions"><button type="button" class="button button-secondary" data-action="close-dialog">Cancel</button><button class="button" type="submit">Record demo review</button></div></form>`);
  }
}

document.addEventListener("click", (event) => {
  const pageButton = event.target.closest("[data-page]");
  if (pageButton) {
    event.preventDefault();
    navigate(pageButton.dataset.page);
    return;
  }
  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    event.preventDefault();
    handleAction(actionTarget.dataset.action, actionTarget);
    return;
  }
  const docFilter = event.target.closest("[data-document-filter]");
  if (docFilter) {
    state.documentTab = docFilter.dataset.documentFilter;
    render();
    return;
  }
  const activityFilter = event.target.closest("[data-activity-filter]");
  if (activityFilter) {
    state.activityTab = activityFilter.dataset.activityFilter;
    render();
    return;
  }
  const opsTab = event.target.closest("[data-ops-tab]");
  if (opsTab) {
    state.operationsTab = opsTab.dataset.opsTab;
    render();
  }
});

document.addEventListener("submit", (event) => {
  if (event.target.id === "investment-form") {
    event.preventDefault();
    reviewInvestment(event.target);
  }
  if (event.target.id === "transfer-form") {
    event.preventDefault();
    submitTransfer(event.target);
  }
  if (event.target.id === "wallet-form") {
    event.preventDefault();
    const data = new FormData(event.target);
    const address = String(data.get("address")).trim();
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      event.target.reportValidity();
      return;
    }
    showDialog("Wallet change request recorded", "Demo request · Pending manual verification", `<div class="success-panel"><span class="success-mark" aria-hidden="true">✓</span><h3>No wallet was linked</h3><p>Your sample request is awaiting an identity and ownership review. The address has not been verified, associated with your profile, or authorized for transfers.</p></div><div class="dialog-actions"><button class="button" data-action="close-dialog">Done</button></div>`);
    showToast("Request recorded", "The demo did not verify or change your wallet.");
  }
  if (event.target.id === "document-request-form") {
    event.preventDefault();
    const type = new FormData(event.target).get("type");
    showDialog("Request recorded", "Document support · Demo only", `<div class="success-panel"><span class="success-mark" aria-hidden="true">✓</span><h3>We'll help you find it</h3><p>Your sample request for a ${escapeHtml(type)} is shown as received. This demo does not send a request to a support team.</p></div><div class="dialog-actions"><button class="button" data-action="close-dialog">Done</button></div>`);
  }
  if (event.target.id === "queue-review-form") {
    event.preventDefault();
    const outcome = new FormData(event.target).get("outcome");
    showDialog("Demo review recorded", "No compliance, payment, or offering status has changed.", `<div class="success-panel"><span class="success-mark" aria-hidden="true">✓</span><h3>Review note recorded</h3><p>Your sample outcome, <strong>${escapeHtml(outcome)}</strong>, has not been sent to an audit log or applied to a real case.</p></div><div class="dialog-actions"><button class="button" data-action="close-dialog">Done</button></div>`);
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

dialog.addEventListener("close", () => {
  dialogContent.replaceChildren();
});

render();
