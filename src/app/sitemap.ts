import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const hostname = 'https://fsbox.pp.ua'
const modsDirectory = path.join(process.cwd(), 'src', 'data', 'mods')

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = []

  // 1. Головна сторінка
  urls.push({
    url: hostname,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 1.0,
  })

  // 2. Основні розділи
  const mainPages = [
    { path: '/articles', priority: 0.7 },
    { path: '/game-servers', priority: 0.7 },
  ]

  mainPages.forEach(page => {
    urls.push({
      url: `${hostname}${page.path}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: page.priority,
    })
  })

  // 3. Сторінки ігор та моди
  if (fs.existsSync(modsDirectory)) {
    try {
      const games = fs.readdirSync(modsDirectory)

      for (const game of games) {
        const gamePath = path.join(modsDirectory, game)
        
        // Перевіряємо чи це директорія
        if (!fs.statSync(gamePath).isDirectory()) continue

        // Додаємо сторінку гри
        urls.push({
          url: `${hostname}/mods/${game}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.9,
        })

        // Додаємо всі моди для гри
        const filenames = fs.readdirSync(gamePath)
        
        for (const filename of filenames) {
          if (!filename.endsWith('.md')) continue

          try {
            const fullPath = path.join(gamePath, filename)
            const { mtime } = fs.statSync(fullPath)
            const fileContents = fs.readFileSync(fullPath, 'utf8')
            const { data } = matter(fileContents)

            // Отримуємо slug з filename
            const slug = filename.replace(/\.md$/, '')
            
            // Будуємо URL
            let urlPath: string
            if (data?.game_collection) {
              // Використовуємо game_collection якщо є
              const basePath = data.game_collection.replace(/\/+$/, '')
              urlPath = `${basePath}/${slug}`
            } else {
              // Fallback на /mods/{game}/{slug}
              urlPath = `/mods/${game}/${slug}`
            }

            // Нормалізуємо URL (прибираємо подвійні слеші)
            urlPath = urlPath.replace(/\/+/g, '/')

            urls.push({
              url: `${hostname}${urlPath}`,
              lastModified: mtime,
              changeFrequency: 'weekly',
              priority: 0.8,
            })
          } catch (error) {
            console.error(`Error processing file ${filename}:`, error)
            continue
          }
        }
      }
    } catch (error) {
      console.error('Error reading mods directory:', error)
    }
  }

  return urls
}
