import React from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'

function App() {
  const url = new URL(window.location)
  const testId = url.searchParams.get('id')

  const { data, getData } = useVisitorData(
    {
      extendedResult: true,
      tag: {
        integrations: {
          segment: {
            group: {
              context: {
                testId,
              },
              groupId: 'e2e_test',
              traits: {
                name: 'Fingerprint',
              },
            },
            track: {
              context: {
                testId,
              },
              event: 'Plan Updated',
              properties: {
                revenue: '19.99',
                currency: 'TRY',
                value: '19.99',
              },
            },
            identify: {
              context: {
                testId,
              },
              userId: 'us_support_def123',
              useSegmentAnonymousId: false,
              traits: {
                name: 'Fingerprint Support',
                email: 'support@fingerprint.com',
              },
            },
            page: {
              category: 'Account',
              name: 'Update Password',
              context: {
                ip: '8.8.8.8',
                userAgent: 'Mozilla',
                testId,
              },
              properties: {
                path: '/account/password',
                referrer: '/account/home',
                search: 'debug=true&testParam=123',
                title: 'Appify - Update Account Password',
                url: 'https://appify.dev/account/password',
                keywords: ['password', 'update', 'account', 'change'],
              },
            },
          },
        },
      },
    },
    { immediate: true }
  )

  return (
    <div className='App'>
      <button type='button' onClick={() => getData({ ignoreCache: true })}>
        Fetch
      </button>
      <br />
      <strong>Result:&nbsp;</strong>
      <br />
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  )
}

export default App
