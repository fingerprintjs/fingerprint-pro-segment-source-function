<p align="center">
  <a href="https://fingerprint.com">
    <picture>
     <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/fingerprintjs/home/main/resources/logo_light.svg" />
     <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/fingerprintjs/home/main/resources/logo_dark.svg" />
     <img src="https://raw.githubusercontent.com/fingerprintjs/home/main/resources/logo_dark.svg" alt="Fingerprint logo" width="312px" />
   </picture>
  </a>
</p>
<p align="center">
  <a href="https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/actions/workflows/build.yml">
    <img src="https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/actions/workflows/build.yml/badge.svg" alt="Build status">
  </a>
  <a href="https://fingerprintjs.github.io/fingerprint-pro-segment-source-function/coverage">
    <img src="https://raw.githubusercontent.com/fingerprintjs/fingerprint-pro-segment-source-function/gh-pages/coverage/badges.svg" alt="coverage">
  </a>
  <a href="https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/actions/workflows/release.yml">
    <img src="https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/actions/workflows/release.yml/badge.svg" alt="Release status">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/:license-mit-blue.svg" alt="MIT license">
  </a>
  <a href="https://discord.gg/39EpE2neBg">
    <img src="https://img.shields.io/discord/852099967190433792?style=logo&label=Discord&logo=Discord&logoColor=white" alt="Discord server">
  </a>
   <a href="https://fingerprintjs.github.io/fingerprint-pro-segment-source-function/docs/">
     <img src="https://img.shields.io/badge/-Documentation-green" alt="Documentation">
   </a>
</p>

# Fingerprint Pro Segment Source Function

Fingerprint provides a [Segment Source Function](https://Segment.com/docs/connections/functions/source-functions/) that can be configured to use with [Fingerprint Pro JS Agent](https://dev.fingerprint.com/docs/js-agent).
It is possible to send events for Segment destinations using this repository and JS Agent only.

Fingerprint Segment integration uses [Fingerprint Webhooks](https://dev.fingerprint.com/docs/webhooks) to send data to Segment servers.

> :warning: Mobile platforms are currently not supported. Please contact support if you need help.

## How to set up

### Create a Segment Source Function

1. Log in to your Segment account, go to **Connections**.
2. Select **Catalog** > **Functions** > **Create Function** (or **New Function**).
3. Select **Source**, click **Build**.
4. Replace the source code with the [latest Fingerprint Segment source function](https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/releases/latest/download/fingerprint-pro-segment-source-function.js).
5. Click **Configure**, and enter a descriptive name, such as "FPJS Source Function".
Optionally you can put a description and logo of your choice. Click **Create Function**.

The source function is successfully created!

### Create a Segment Source and connect it to the function

1. Log in to your Segment account, go to **Connections**.
2. Select **Catalog** > **Functions**.
3. Select the source function previously created.
4. Select **Connect Source**.
5. Put a descriptive name, such as "FPJS Source". You may optionally put labels of your choice.
6. Click **Continue**.
7. You will see the webhook URL. Don't worry about this for now.
8. Click **Continue**.
9. Click **Finish**.

The source is successfully created!

### Connect Segment Source with Fingerprint Account

1. Log in to your Segment account, go to **Connections**.
2. Select **Sources**, and select previously created source. You should see the details of the source, along with the webhook URL.
3. Copy the webhook URL.
4. Log in to your Fingerprint account.
5. Go to **App Settings** > **Webhooks**.
6. Click **+Add Webhook**.
7. Paste the URL you copied earlier. Do not set authentication. Put a descriptive description, such as "Segment source".
8. Click **Save**.
9. Click **Send Test Event**.
10. Sending the test event can take a minute or two.

For every visitor identification event, Fingerprint will now send the identification result to your Segment Source function.

### Configure JS Agent

The Segment integration is _not_ enabled by default. JS Agent must be configured explicitly to use the Segment Integration.
Use the JS agent's `tag` property to enable your Segment integration. See more info about `tag` see the [JS agent API Reference](https://dev.fingerprint.com/docs/js-agent#tag).

Add the `tag` field if it is not there. Then, add a field called `integrations`, and create a field called `segment` in it, like below:
```javascript
fp.get({
  tag: {
    integrations: {
      segment: {
        // segment fields
      }
    }
  }
  // ... more fields
})
```
Inside the `segment` object, define [Segment Specs](https://segment.com/docs/connections/spec/), like below:

```javascript
const segmentFields = {
  skipIntegration: false,
  identify: {
    // ... identify spec fields
  },
  page: {
    // ... page spec fields
  },
  track: {
    // ... track spec fields
  },
  group: {
    // ... group spec fields
  }
}
```
You may use `identify`, `page`, `group`, and `track` for corresponding Specs. 
You can omit the Specs you don't need (exception: Identity Spec is still created when omitted). You can use `skipIntegration` field for skipping the segment integration entirely.

### Setting Destinations

Now that the JS Agent and Segment Source are connected, the Specs should be flowing to 
your segment account as your website gets visitors. Set up a destination to make use of flowing data, such as Google Analytics or others that suits
your business needs the best. 

## How to use

The Segment Source function creates Specs based on the `tag.integration.segment` object.

<details>
<summary>Full Example</summary>

```javascript
fp.get({
  tag: {
    integrations: {
      segment: {
        skipIntegration: false,
        identify: {
          userId: 'someUserId',
          traits: {
            name: 'Jon Doe',
            email: 'jondoe@example.com',
            plan: 'free',
            logins: 12,
            address: {
              street: 'street1',
              city: 'city1',
              state: 'state1',
            },
          },
        },
        page: {
          category: 'Account',
          name: 'Update Password',
          context: {
            ip: '8.8.8.8',
            userAgent: 'Mozilla'
          },
          properties: {
            path: '/account/password',
            referrer: '/account/home',
            search: 'debug=true&testParam=123',
            title: 'Appify - Update Account Password',
            url: 'https://appify.dev/account/password',
            keywords: [
              'password',
              'update',
              'account',
              'change'
            ]
          }
        },
        track: {
          event: 'Plan Updated',
          properties: {
            revenue: '19.99',
            currency: 'USD',
            value: '19.99'
          }
        },
        group: {
          groupId: '0e8c78ea9d97a7b8185e8632',
          traits: {
            name: 'Fingerprint',
            industry: 'Tech',
            employees: 110,
            plan: 'enterprise',
            "total billed": 12000,
            website: 'fingerprint.com',
            address: {
              city: 'New York',
              country: 'USA',
              postalCode: '32320',
              state: 'New York',
              street: '5th Ave'
            },
            avatar: 'https://fingerprint.com/favicon.ico',
            description: 'A Fingerprinting company',
            email: 'support@fingerprint.com',
            id: '0e8c78ea9d97a7b8185e8632'
          }
        }
      }
    }
  }
  // ... more fields
})
```
</details>

### Identify Spec

Identify call lets you tie a user to their actions and record traits about them. It includes a unique User ID and any optional traits you know about the user, like their email, name, and more.

[Identity Spec](https://segment.com/docs/connections/spec/identify/) is defined by the `identify` field, but it is _still_ created even when you omit the `identify` field.

- `anonymousId` is populated with the [`visitorId`](https://dev.fingerprint.com/docs/js-agent#visitorid) generated by Fingerprint.
- `userId` is populated with `identify.userId`.
- `traits.visitorId` is populated with the visitor ID generated by Fingerprint.
- `traits.createdAt` is populated with the `firstSeenAt.subscription` field of the webhook, which is [the time of the first visit of the visitor](https://dev.fingerprint.com/docs/useful-timestamps#definitions).
- Can be extended by extending the `identify` field.
- `traits` field can be extended by extending the `identify.traits` field.

### Page Spec

The page call lets you record whenever a user sees a page of your website, along with any optional properties about the page

[Page Spec](https://segment.com/docs/connections/spec/page/) is defined by the `page` field.

- `anonymousId` is populated with the visitor ID generated by Fingerprint.
- `userId` is populated with `identify.userId`.
- `context.ip` is populated with IP address of the visitor.
- `context.browserDetails` is populated with the browser details of the visitor, such as browser name, browser operating system, etc.
- `context.incognito` is the boolean field for whether the page view was made in incognito or private mode.
- `context.confidenceScore` is the confidence score of the identification, generated by Fingerprint.
- `context.requestId` is the ID of the identification request to Fingerprint.
- `properties.url` is the URL of the webpage that triggered the Fingerprint identification.
- Can be extended by extending the `page` field.
- `context` and `properties` fields can be extended by extending the `page.context`, `page.properties` fields, respectively.

### Track Spec

The track call is how you record any actions your users perform, along with any properties that describe the action.

[Track Spec](https://segment.com/docs/connections/spec/track/) is defined by the `track` field.

- `anonymousId` is populated with the visitor ID generated by Fingerprint.
- `userId` is populated with `identify.userId`.
- Can be extended by extending the `track` field.

> :warning: Keep in mind that the `event` field is required for Track Spec. If `event` is not provided, Track Spec will not be created. Other Specs are still going to be created.

### Group Spec

The group call is how you associate an individual user with a group—be it a company, organization, account, project, team or whatever other name you came up with for the same concept!

[Group Spec](https://segment.com/docs/connections/spec/group/) is defined by the `group` field.

- `anonymousId` is populated with the visitor ID generated by Fingerprint.
- `userId` is populated with `identify.userId`.
- Can be extended by extending the `group` field.

> :warning: Keep in mind that the `groupId` field is required for Group Spec. If `groupId` is not provided, Group Spec will not be created. Other Specs are still going to be created.

### Screen Spec

The screen call lets you record whenever a user sees a screen, the mobile equivalent of page, in your mobile app, along with any properties about the screen

[Screen Spec](https://segment.com/docs/connections/spec/screen/) is not supported.

### Skipping the integration

Set `skipIntegration` to `true` for preventing the source function to create any Specs. Defaults to `false`.