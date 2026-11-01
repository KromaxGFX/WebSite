<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <xsl:output method="html" encoding="utf-8" indent="yes"/>
  <xsl:template match="/">
    <html lang="es">
    <head>
      <title><xsl:value-of select="rss/channel/title"/></title>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <style>
        * { box-sizing: border-box; }
        body { font-family: system-ui, sans-serif; max-width: 48rem; margin: 0 auto; padding: 2rem 1rem; color: #1a1a2e; line-height: 1.6; }
        h1 { font-size: 1.75rem; margin-bottom: 0.25rem; }
        .meta { color: #666; font-size: 0.9rem; margin-bottom: 2rem; }
        .item { border-top: 1px solid #eee; padding-top: 1.5rem; margin-top: 1.5rem; }
        .item:first-child { border-top: none; padding-top: 0; margin-top: 0; }
        .item h2 { margin: 0 0 0.5rem; font-size: 1.1rem; }
        .item h2 a { color: #eab463; text-decoration: none; }
        .item h2 a:hover { text-decoration: underline; }
        .item .date { color: #999; font-size: 0.85rem; margin-bottom: 0.5rem; }
        .item .desc { color: #444; margin: 0; }
        footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; color: #999; font-size: 0.85rem; text-align: center; }
        @media (prefers-color-scheme: dark) {
          body { color: #e8e8f0; background: #0b0d12; }
          .item { border-color: #2a2a3e; }
          .meta { color: #8a93a6; }
          .item .date { color: #8a93a6; }
          .item .desc { color: #b6bdcc; }
          footer { border-color: #2a2a3e; color: #8a93a6; }
          .item h2 a { color: #f7cf8f; }
        }
      </style>
    </head>
    <body>
      <h1><xsl:value-of select="rss/channel/title"/></h1>
      <p class="meta"><xsl:value-of select="rss/channel/description"/></p>
      <xsl:for-each select="rss/channel/item">
        <article class="item">
          <h2><a href="{link}"><xsl:value-of select="title"/></a></h2>
          <p class="date"><xsl:value-of select="pubDate"/></p>
          <p class="desc"><xsl:value-of select="description" disable-output-escaping="yes"/></p>
        </article>
      </xsl:for-each>
      <footer>Generado por <a href="https://kromaxgfx.github.io/WebSite/" style="color: inherit;">KromaxGFX</a> · <a href="{rss/channel/atom:link/@href}" style="color: inherit;">Suscribirse (RSS)</a></footer>
    </body>
    </html>
  </xsl:template>
</xsl:stylesheet>