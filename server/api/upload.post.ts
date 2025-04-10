export default eventHandler(async (event) => {
  // Make sure the user is authenticated to upload
  const { user } = await requireUserSession(event)

  // Check last image author
  const { blobs } = await hubBlob().list({
    prefix: 'drawings/',
    limit: 1,
  })
  if (!import.meta.dev && blobs.length) {
    const [lastDrawing] = blobs
    if (lastDrawing.customMetadata?.userId === user.id) {
      throw createError({
        statusCode: 400,
        message: 'You cannot upload two drawings in a row. Please wait for someone else to draw an image.',
      })
    }
  }

  // useUpload send a formData
  const form = await readFormData(event)
  const drawing = form.get('drawing') as File

  ensureBlob(drawing, {
    maxSize: '1MB',
    types: ['image/jpeg'],
  })

  // 🔽 AI ОПИСАНИЕ ОТКЛЮЧЕНО: Генерация описания с помощью LLaVA
  // const { description } = await hubAI().run('@cf/llava-hf/llava-1.5-7b-hf', {
  //   prompt: 'Describe this drawing in one sentence.',
  //   image: [...new Uint8Array(await drawing.arrayBuffer())],
  // }).catch(() => {
  //   return { description: '' }
  // })

  // 🔁 Временно задаём пустое описание вручную
  const description = ''

  // 🔐 Фильтр запрещённого контента (например, "penis")
  if (description.includes('penis')) {
    throw createError({
      statusCode: 400,
      message: 'You cannot upload drawings with TEUB.',
    })
  }

  // Генерация уникального имени: время до 2050 года
  const name = `${new Date('2050-01-01').getTime() - Date.now()}`

  // ============================
  // Commented out AI image generation
  // ============================
  /*
  const aiImage = await hubAI().run('@cf/runwayml/stable-diffusion-v1-5-img2img', {
    prompt: description || 'A drawing',
    guidance: 8,
    strength: 0.75,
    image: [...new Uint8Array(await drawing.arrayBuffer())],
  })
    .then((blob: Blob | Uint8Array) => {
      if (blob instanceof Uint8Array) {
        blob = new Blob([blob])
      }
      // If black image, skip
      if (blob.size === 842) {
        return null
      }
      return hubBlob().put(`${name}.png`, blob, {
        prefix: 'ai/',
        addRandomSuffix: true,
        contentType: 'image/png',
      })
    })
    .catch(() => null)
  */

  return hubBlob().put(`${name}.jpg`, drawing, {
    prefix: 'drawings/',
    addRandomSuffix: true,
    customMetadata: {
      userProvider: user.provider,
      userId: user.id,
      userName: user.name,
      userAvatar: user.avatar,
      userUrl: user.url,
      description: description.trim(),
      aiImage: '', // Clear AI image field since it's not being generated
    },
  })
})
