import { createHash } from 'crypto'

const recentUploads = new Map<string, number>()
const UPLOAD_COOLDOWN = 600000

export default eventHandler(async (event) => {
  const form = await readFormData(event)
  const drawing = form.get('drawing') as File
  const walletAddress = form.get('address') as string

  if (!walletAddress) {
    throw createError({ statusCode: 400, message: 'Wallet address is required.' })
  }

  const now = Date.now()
  const lastUpload = recentUploads.get(walletAddress)

  if (lastUpload && now - lastUpload < UPLOAD_COOLDOWN) {
    throw createError({
      statusCode: 429,
      message: `Too many uploads. Please wait ${Math.ceil((UPLOAD_COOLDOWN - (now - lastUpload)) / 1000)} seconds.`,
    })
  }

  ensureBlob(drawing, {
    maxSize: '1MB',
    types: ['image/jpeg'],
  })

  const name = `${new Date('2050-01-01').getTime() - Date.now()}`
  const timestamp = now.toString()
  const dataToHash = walletAddress + timestamp
  const hash = createHash('sha256').update(dataToHash).digest('hex')
  const description = `HASH : ${hash.slice(-4).toUpperCase()}`

  await hubBlob().put(`${name}.jpg`, drawing, {
    prefix: 'drawings/',
    addRandomSuffix: true,
    customMetadata: {
      walletAddress: walletAddress,
      description: description,
      createdAt: timestamp,
    },
  })

  // Обновляем время последней отправки
  recentUploads.set(walletAddress, now)

  return { success: true }
})
