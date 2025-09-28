import { GetServerSideProps } from "next"
import { config } from '../config/config'

function generateSiteMap() {
  const baseUrl = config.appUrl

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseUrl}</loc>
     </url>
     <url>
       <loc>${baseUrl}/about</loc>
     </url>
     <url>
       <loc>${baseUrl}/contact</loc>
     </url>
     <url>
       <loc>${baseUrl}/auth</loc>
     </url>
     <url>
       <loc>${baseUrl}/firms</loc>
     </url>
   </urlset>
 `
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap()

  res.setHeader("Content-Type", "text/xml")
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

export default function SiteMap() {
  return null
}
