/**
 * FingerprintJS Pro Segment Destination Function v0.0.1 - Copyright (c) FingerprintJS, Inc, 2023 (https://fingerprint.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license.
 */

'use strict'

async function sendEvent(event, type, settings) {
  if (!event?.context?.testId) {
    return
  }
  const { api, token } = settings
  let response
  try {
    const headers = new Headers()
    if (token) {
      headers.append('Authorization', `Bearer ${token}`)
    }
    headers.append('Content-Type', 'application/json')
    response = await fetch(`${api}?id=${event.context.testId}_${type}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(event),
    })
  } catch (error) {
    throw new RetryError(error.message)
  }
  if (response.status >= 500 || response.status === 429) {
    throw new RetryError(`Failed with ${response.status}`)
  }
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onTrack(event, settings) {
  await sendEvent(event, 'track', settings)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onIdentify(event, settings) {
  await sendEvent(event, 'identify', settings)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onGroup(event, settings) {
  await sendEvent(event, 'group', settings)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onPage(event, settings) {
  await sendEvent(event, 'page', settings)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onScreen(event, settings) {
  await sendEvent(event, 'screen', settings)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onAlias(event, settings) {
  await sendEvent(event, 'alias', settings)
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
async function onDelete(event, settings) {
  await sendEvent(event, 'delete', settings)
}
