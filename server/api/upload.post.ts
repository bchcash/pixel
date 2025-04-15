import { createHash } from 'crypto'

export default eventHandler(async (event) => {
  const form = await readFormData(event)
  const drawing = form.get('drawing') as File
  const walletAddress = form.get('address') as string

  if (!walletAddress) {
    throw createError({
      statusCode: 400,
      message: 'Wallet address is required.',
    })
  }

  ensureBlob(drawing, {
    maxSize: '1MB',
    types: ['image/jpeg'],
  })

  const name = `${new Date('2050-01-01').getTime() - Date.now()}`
  const timestamp = Date.now().toString()
  const dataToHash = walletAddress + timestamp
  const hash = createHash('sha256').update(dataToHash).digest('hex')
  const description = `HASH : ${hash.slice(-5).toUpperCase()}`

  return hubBlob().put(`${name}.jpg`, drawing, {
    prefix: 'drawings/',
    addRandomSuffix: true,
    customMetadata: {
      walletAddress: walletAddress,
      description: description,
      //uploadedAt: timestamp,
    },
  })
})
