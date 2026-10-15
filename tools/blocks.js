/* Site-specific block types (shared with DevisArtisans) (loaded by tools/build.js when present).
   "cards": photo cards. Block { type: "cards", class, title, intro, more: { title, slug }, items: [...] }
   Item { title, text, icon, slug | href, image (optional; defaults to the linked page's photo), cta }. */
module.exports = {
  cards(b, p, k) {
    const { esc, icon, pagePath, bySlug, imgSrc, imgOf } = k;
    const href = it => it.href || (it.slug !== undefined ? pagePath(bySlug.get(it.slug) || { slug: it.slug }) : '');
    const card = it => {
      const page = it.slug !== undefined ? bySlug.get(it.slug) : null;
      if (it.slug !== undefined && !page) k.errors.push(`${p._file}: card links to missing page "${it.slug}"`);
      const i = imgOf(it.image) || imgOf(page && page.image);
      const img = i ? `<img class="pcard-img" src="${esc(imgSrc(i, 480, 300))}" srcset="${[320, 480, 720].map(w => `${esc(imgSrc(i, w, Math.round(w * .625)))} ${w}w`).join(', ')}" sizes="(max-width: 640px) 100vw, 300px" width="480" height="300" alt="${esc(i.alt || '')}" loading="lazy" decoding="async">` : '';
      const title = it.title || (page && (page.nav || page.h1)) || '';
      return `<a class="pcard${i ? '' : ' no-img'}" href="${esc(href(it))}">${img}<span class="pcard-body">${it.icon ? `<span class="pcard-ico">${icon(it.icon)}</span>` : ''}<h3>${esc(title)}</h3>${it.text ? `<p>${esc(it.text)}</p>` : ''}<span class="cta">${esc(it.cta || 'Mehr erfahren')} →</span></span></a>`;
    };
    const more = b.more ? `<a class="block-more" href="${esc(href(b.more))}">${esc(b.more.title)} →</a>` : '';
    const head = b.title ? `<div class="block-head"><h2>${esc(b.title)}</h2>${b.intro ? `<p>${b.intro}</p>` : ''}${more}</div>` : '';
    return `<section class="blocks blocks-cards${b.class ? ` ${esc(b.class)}` : ''}"><div class="wrap">${head}<div class="pcards">${(b.items || []).map(card).join('')}</div></div></section>`;
  },
};
