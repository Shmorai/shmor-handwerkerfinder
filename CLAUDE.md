# HandwerkerFinder (handwerkerfinder.shmor.ai)

A Shmor marketplace (shared rules in `../../CLAUDE.md`): its own brand, design and SEO. **The network's first German-language site, for the German market.** It helps homeowners and tenants anywhere in Germany find a Handwerker (Sanitär, Elektriker, Dachdecker, Maler…) and compare free quotes, then refers them to quote platforms for a lead commission. Modelled on ProFinders (`../shmor-profinders/`) and built on the same layout family as the French site DevisArtisans (`../shmor-devisartisans/`). Trades and service names come from **MyHammer** (my-hammer.de, Instapro group, the same group as Travaux.com), the main referral target. Repo: `Shmorai/shmor-handwerkerfinder` (private until launch). Status: **building**, no referral links yet.

## Language
- **Everything is in German**, including meta, breadcrumbs ("Startseite"), FAQs, 404 and search. `shmor-site.json` → `seo.locale: "de"` switches the site kit's German word pack (kit `tools/build.js` → `WORDS.de`, added 2026-10-15; any word can be overridden with `seo.strings`). `ogLocale: "de_DE"`, `<html lang="de">`.
- Write formal German ("Sie"), German quotation marks („…“), German terms (Handwerksrolle, Handwerkskarte, Kostenvoranschlag, Gewährleistung, Abnahme, § 35a EStG). Slugs are ASCII (ae/oe/ue/ss: `waermepumpe`, `entruempelung`, `thueringen`). The US/UK/EU wording rule in `../../CLAUDE.md` does not apply.
- `main` has `hyphens: auto` so long compounds (Betriebshaftpflichtversicherung) wrap on phones. Keep it.

## Where things are
| What | Where |
|---|---|
| Card on shmor.ai, search keywords, **referral links**, offers, SEO defaults | `shmor-site.json` |
| Pages (1 JSON file = 1 Google landing page) | `content/` (`home.json` = homepage) |
| Design: header, logo, footer (footer lists are **hand-written**) | `templates/layout.html` |
| Design: styles | `assets/site.css` (kit defaults at the top; **HandwerkerFinder theme** block at the bottom) |
| Photo cards block (`"type": "cards"`) | `tools/blocks.js` (copied from DevisArtisans, German default CTA) |
| Generated output (don't edit by hand) | `index.html`, `*/index.html`, `sitemap.xml`, `robots.txt`, `404.html`, `search/`, `search-index.json` |

## Pages (74)
- Home · `gewerke` hub · `regionen` hub · `ratgeber` hub · `blog` index · `so-funktionierts`.
- **31 Gewerke** `gewerke/<slug>` (MyHammer's most common categories): sanitaer, elektriker, dachdecker, maler, heizung, waermepumpe, klimaanlage, fliesenleger, bodenleger, tischler, trockenbau, maurer, bauunternehmen, badsanierung, kuechenbau, fenster-tueren, rollladen, garten-landschaftsbau, baumpflege, pflasterarbeiten, zaunbau, umzug, entruempelung, gebaeudereinigung, montageservice, solar, schornsteinfeger, kaminofen, energieberater, fassade, rohrreinigung. Each has: what the trade does, when you need one, questions before hiring (Handwerksrolle line when it is an Anlage A trade), price factors (+ § 35a tip), Profi-Tipps, Vorschriften, 3 FAQs.
- **Leistungen**: 56 MyHammer service names (from my-hammer.de/services) as icon cards in 9 categories on the `gewerke` hub; 12 popular ones as photo cards on the homepage. Each links to its Gewerk page.
- **16 Bundesländer** `regionen/<slug>`: cities (Berlin/Hamburg: Bezirke), the responsible Handwerkskammern (all 53), the Landesbauordnung, the Nachbarrechtsgesetz (Bremen, Hamburg and Mecklenburg-Vorpommern have none), local building styles, natural risks (radon, Hochwasser, Sturmflut, Bergschäden, Erdbeben) and one region-specific FAQ.
- **8 Ratgeber** `ratgeber/<slug>`: handwerker-pruefen, angebot-verstehen, kostenvoranschlag-festpreis, gewaehrleistung, foerderung, steuerbonus-handwerkerleistungen, schwarzarbeit-risiken, notdienst-abzocke. Each ends with "Quellen und offizielle Links" (gesetze-im-internet.de etc.).
- **Blog**: 10 posts `blog/<slug>` dated 2026-10-15 (launch), with sources. Homepage shows the 6 latest; RSS at `/blog/feed.xml`.
- **3 legal pages**: `impressum`, `datenschutz`, `cookies` (see below).
- Top menu: Gewerke, Bundesländer, Ratgeber, Blog, So funktioniert’s + "Angebote anfordern" pill (in `layout.html`, links to /gewerke/ until a referral link exists).

## Legal pages (German law)
- `impressum` (§ 5 DDG, § 18 Abs. 2 MStV, hosting, Verbraucherstreitbeilegung, image credits), `datenschutz` (DSGVO Art. 13: Verantwortlicher, GitHub Pages logs, Google Fonts, Unsplash, partner links, rights), `cookies` (site sets **no** cookies or storage → no banner; § 25 TDDDG).
- **Placeholders** are `<mark class="todo">[Bitte ergänzen: …]</mark>`: company name, legal form and representatives, address, Registereintrag, USt-IdNr., phone, the person responsible under § 18 MStV, and the EU representative (Art. 27 DSGVO, needed if the company is outside the EU). Fill them **only with details the user gives**; master `../../shmor-ai/assets/js/config.js` → `SITE.company` is still unfilled. **An incomplete Impressum is an Abmahnung risk in Germany: fill it before launch.**
- What the privacy/cookie pages say must stay true: no cookies, no localStorage, no analytics, no forms. If that changes, update both pages and add a TDDDG-compliant consent banner first.

## Facts and sources (keep content genuine)
Checked 2026-10-15: § 35a EStG (20 % of labour, max 1.200 € Handwerker / 4.000 € haushaltsnah; invoice + bank transfer); § 35c EStG (20 % over 3 years, max 40.000 €); §§ 632, 632a, 634, 634a (2/5 Jahre), 635, 640, 649, 650i ff., 650m BGB; § 451e HGB (620 €/m³); § 17 BMG (2 Wochen); § 39 Abs. 5 BNatSchG (1.3.–30.9.); § 19 NAV (Wallbox anmelden, > 12 kVA Zustimmung); § 13 NAV / AVBWasserV Installateurverzeichnis; § 12 Abs. 3 UStG (0 % PV ≤ 30 kWp); Balkonkraftwerk 800 W + MaStR, privileged since Oct 2024 (§ 554 BGB, § 20 WEG); GEG Anlage 7 (Fenster Uw 1,3; > 10 % Außenwand); 1. BImSchV (Frist Ende 2024); Pflegekasse § 40 Abs. 4 SGB XI 4.180 €; Anlage A HwO (Fliesen, Parkett, Estrich, Rollladen since 2020).
**BAFA/KfW subsidy rates and current GEG heating rules are deliberately not quoted** (they change often and were under political revision in 2025/26). Pages describe the schemes and link to bafa.de, kfw.de and energiewechsel.de. No prices, review counts or "X Handwerker" numbers anywhere (MyHammer's own figures are theirs, not ours).

## Design ("solides deutsches Handwerk", 2026-10-15)
Same layout family as DevisArtisans (very large tight headings, airy light sections, pill buttons, photo cards), with its own palette: anthracite #1C2227 (text, footer, CTA card), Handwerk-Grün #157A4A actions (dark #0F5E39, mint band #EDF5F0), ochre #A86400 text accents (eyebrows, highlighted h1 words), gold #F2B124 decorative tiles, warm grey #F5F3EF bands and a thin **schwarz-rot-gold** strip above the white header. Photo crops are **rounded squares** (36px radius; DevisArtisans uses circles) with a rotated gold tile behind. Fonts: Archivo 700/800 headings, Inter text. In the CSS the shared variable names are kept: `--marine` = anthracite, `--blue` = green, `--terra` = ochre; class prefix `hf-`.
Logo: green gradient rounded square (#1E9A5E → #0F5E39), white magnifier with a small white house in the lens and a gold handle. Wordmark "Handwerker" anthracite + "Finder" green (white + mint #7FD1A3 on the dark footer), plus a "von Shmor.ai" pill. The same SVG is in `layout.html`, `assets/favicon.svg` and the shmor.ai card. Below 400px the wordmark shrinks so the menu button fits at 320px.
**Photos:** free-licence Unsplash images, credited, German alt text describing only what is visible. Region photos come from Unsplash searches of each state's main city or landscape.
Checked: all 74 pages at 320, 375, 768, 1024 and 1280 px with no horizontal scroll.

## Search routing on shmor.ai
German `keywords` in `shmor-site.json`, with umlaut and ae/oe/ue variants (wärmepumpe/waermepumpe). City names are deliberately **not** keywords ("berlin hotel" must stay with HotelHero); "handwerker" catches "handwerker münchen". Tested 2026-10-15: "handwerker münchen", "elektriker berlin", "wärmepumpe installieren", "umzugsfirma hamburg", "balkonkraftwerk", "hecke schneiden" → HandwerkerFinder; "plumber near me" → LocalPlumbers, "roofer quote"/"home renovation" → TradesStation, "heat pump"/"solar panels" → EnergySavers, "plombier paris"/"pompe à chaleur" → DevisArtisans, "berlin hotel" → HotelHero.

## Commands (run here)
```bash
node tools/build.js           # rebuild after ANY change to content/, templates/ or shmor-site.json
node tools/serve.js 4020      # preview http://localhost:4020  (preview config "handwerkerfinder")
```
After changing `shmor-site.json`, also run `node tools/sync-network.js` in `../../shmor-ai`.

## Referral links (the money)
None yet. **MyHammer** runs an affiliate programme ("Werden Sie Affiliate-Partner", my-hammer.de/blog/werden-sie-partner): sign up through the **Netslave** platform; it pays a commission per Auftrag placed; contact affiliate@instapro.com. Allowed: display, text links, email (with conditions). **Not allowed: cashback, promo codes, vouchers, keywords (search-ad bidding), site-unders.** Organic SEO is fine, but never buy search ads on MyHammer terms. Once the user has the tracking link:
1. Add it to `shmor-site.json` → `"links"`, e.g. `"myhammer": { "merchant": "MyHammer", "network": "direct", "url": "<exact link from the user>", "blurb": "Auftrag kostenlos einstellen und Angebote erhalten" }`.
2. Add `"partners": ["myhammer"]` to the Gewerk and Bundesland pages (heading already set: "Kostenlose Angebote unserer Partner vergleichen"), point the header pill at it, and optionally set `"fallback": "myhammer"`.
3. Rebuild, sync the master, commit both repos.

## History & decisions
- 2026-10-15: the user asked for "another site like ProFinders with Shmor's network setup but completely in German for the German market, genuine, using German regions and services as offered on myhammer.com" (= my-hammer.de). Brand **HandwerkerFinder** ("Handwerker finden" is the core German search term; mirrors "ProFinders"). The kit gained German support (`seo.locale: "de"`) in the same change, and every other site's output is byte-identical after the kit update.
- Content was generated from structured data (trades, regions, guides, posts) in a one-off script; the JSON files in `content/` are now the source of truth: edit them directly.
- Honesty rules: footer, "So funktioniert’s" and FAQs say HandwerkerFinder is an information and referral service that doesn't employ or vet Handwerker and may earn commissions. General information only, not legal or tax advice.

## Ideas / next
MyHammer affiliate link (Netslave) · fill the Impressum/Datenschutz placeholders · consider self-hosting fonts (drops the Google Fonts IP transfer; German courts have fined dynamic Google Fonts embedding in the past) · more Gewerke from MyHammer's list (Gerüstbau, Metallbau, Glaser, Brunnenbau, Abriss, Zimmerer, Steinmetz) · city pages (Berlin, Hamburg, München, Köln…) only with genuinely local content · more blog posts (Heizungstausch once the GEG reform is settled, Grundsteuer-unrelated home topics, Frühjahrs-Check Dach).
