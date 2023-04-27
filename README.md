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

- Log in to your Segment account, go to **Connections**
- Select **Catalog** > **Functions** > **Create Function** (or **New Function**)
- Select **Source**, click **Build**
- Replace the source code with the [latest Fingerprint Segment source function](https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/releases/latest/download/fingerprint-pro-segment-source-function.js).
- Click **Configure**, and enter a descriptive name, such as "FPJS Source Function".
Optionally you can put a description and logo of your choice. Click **Create Function**.

The source function is successfully created!

### Create a Segment Source and connect it to the function

- Log in to your Segment account, go to **Connections**
- Select **Catalog** > **Functions**
- Select the source function previously created
- Select **Connect Source**
- Put a descriptive name, such as "FPJS Source". You may optionally put labels of your choice.
- Click **Continue**
- You will see the webhook URL. Don't worry about this for now.
- Click **Continue**
- Click **Finish**

The source is successfully created!

### Connect Segment Source with Fingerprint Account

- Log in to your Segment account, go to **Connections**
- Select **Sources**, and select previously created source. You should see the details of the source, along with the webhook URL
- Copy the webhook URL
- Log in to your Fingerprint account
- Go to **App Settings** > **Webhooks**
- Click **+Add Webhook**
- Paste the URL you copied earlier. Do not set authentication. Put a descriptive description, such as "Segment source"
- Click **Save**
- Click **Send Test Event**
- Sending the test event make take a while, you may wait or close the window.

The Fingerprint account is successfully connected to the Segment account!

### Configure JS Agent

The Segment integration is _not_ enabled by default. JS Agent must be configured explicitly to use the Segment Integration.
One uses Segment Integration by making use of the `tag` field. More info about the `tag` field can be found [here](https://dev.fingerprint.com/docs/js-agent#tag).

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

[Identity Spec](https://segment.com/docs/connections/spec/identify/) is controlled by the `identify` field, but it is _still_ created even when `identify` field is omitted.

- `anonymousId` is populated with the visitor ID generated by Fingerprint
- `userId` is populated with `identify.userId`
- `traits.visitorId` is populated with the visitor ID generated by Fingerprint
- `traits.createdAt` is populated with the `firstSeenAt.subscription` field of the webhook, which is [the time of the first visit of the visitor](https://dev.fingerprint.com/docs/useful-timestamps#definitions)
- Can be extended by extending the `identify` field
- `traits` field can be extended by extending the `identify.traits` field

### Page Spec

[Page Spec](https://segment.com/docs/connections/spec/page/) is controlled by the `page` field. It is _not_ created if `page` is omitted.

- `anonymousId` is populated with the visitor ID generated by Fingerprint
- `userId` is populated with `identify.userId`
- `context.ip` is populated with IP address of the visitor
- `context.browserDetails` is populated with the browser details of the visitor, such as browser name, browser operating system, etc.
- `context.incognito` is the boolean field for whether the page view was made in incognito or private mode
- `context.confidenceScore` is the confidence score of the identification, generated by Fingerprint
- `context.requestId` is the ID of the identification request to Fingerprint
- `properties.url` is the URL of the webpage that triggered the Fingerprint identification
- Can be extended by extending the `page` field
- `context` and `properties` fields can be extended by extending the `page.context`, `page.properties` fields, respectively.

### Track Spec

[Track Spec](https://segment.com/docs/connections/spec/track/) is controlled by the `track` field. It is _not_ created if `track` is omitted.

- `anonymousId` is populated with the visitor ID generated by Fingerprint
- `userId` is populated with `identify.userId`
- Can be extended by extending the `track` field

> :warning: Keep in mind that the `event` field is required for Track Spec. If `event` is not provided, Track Spec will not be created, and other Specs are not affected by this.

### Group Spec

[Group Spec](https://segment.com/docs/connections/spec/group/) is controlled by the `group` field. It is _not_ created if `group` is omitted.

- `anonymousId` is populated with the visitor ID generated by Fingerprint
- `userId` is populated with `identify.userId`
- Can be extended by extending the `group` field

> :warning: Keep in mind that the `groupId` field is required for Group Spec. If `groupId` is not provided, Group Spec will not be created, and other Specs are not affected by this.

### Screen Spec

[Screen Spec](https://segment.com/docs/connections/spec/screen/) is not supported.

### Skipping the integration

Set `skipIntegration` to `true` for preventing the source function to create any Specs. Defaults to `false`.
