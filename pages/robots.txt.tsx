// pages/robots.txt.tsx
import { GetServerSideProps } from "next"
import { config } from "../config/config"

function RobotsTxt() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain")
  res.write(`User-agent: *
Allow: /

Sitemap: ${config.appUrl}/sitemap.xml
`)
  res.end()
  return { props: {} }
}

export default RobotsTxt
