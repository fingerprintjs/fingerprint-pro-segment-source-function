import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
/*global E2E*/
/*eslint no-restricted-globals: ["off", "addEventListener"]*/
addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
})

async function handleEvent(event) {
  const url = new URL(event.request.url)
  const pathname = url.pathname
  if (pathname.startsWith('/test')) {
    const id = url.searchParams.get('id')
    if (!id) {
      return new Response(null, { status: 400 })
    }
    if (event.request.method === 'POST') {
      await E2E.put(`result_${id}`, event.request.body, { expirationTtl: 60 * 15 }) // Write result to KV with 15 mins expiration TTL
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    const value = await E2E.get(`result_${id}`)

    if (!value) {
      return new Response(null, { status: 404 })
    }

    return new Response(JSON.stringify({ success: true, data: JSON.parse(value) }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  try {
    return await getAssetFromKV(event)
  } catch (e) {
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: 'not found',
    })
  }
}
