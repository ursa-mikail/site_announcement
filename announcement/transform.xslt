<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" encoding="UTF-8"/>
    <xsl:template match="/">
        <html>
            <head>
                <title>Transformed XML Content</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    section { margin-bottom: 20px; }
                    h2 { color: #2a7ae2; }
                    p { font-size: 14px; }
                </style>
            </head>
            <body>
                <h1>XML Content</h1>
                <xsl:apply-templates/>
            </body>
        </html>
    </xsl:template>

    <xsl:template match="section">
        <section>
            <h2><xsl:value-of select="title"/></h2>
            <p><xsl:value-of select="description"/></p>
        </section>
    </xsl:template>
</xsl:stylesheet>
