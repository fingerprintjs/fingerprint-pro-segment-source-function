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

> :warning: **Work in progress**: This is a beta version of the library

# Fingerprint Pro Segment Source Function

Fingerprint provides a [Segment Source Function](https://Segment.com/docs/connections/functions/source-functions/) that can be configured to use with [Fingerprint Pro JS Agent](https://dev.fingerprint.com/docs/js-agent).
It is possible to send events for Segment destinations using this repository and JS Agent only. 

> :warning: Mobile platforms are currently not supported. Please contact support if you need help.

## How to use

### Create a Segment Source Function

- Login to your Segment account, go to Connections
- Select Catalog > Functions > Create Function (or New Function)
- Select Source, click Build
- Replace the source code with the Fingerprint Segment source function code from [here](https://github.com/fingerprintjs/fingerprint-pro-segment-source-function/releases/latest/download/fingerprint-pro-segment-source-function.js)
- Click Configure, enter a descriptive name, such as "FPJS Source Function".
Optionally you can put description and logo. Click Create Function.

Source function is successfully created!

### Create a Segment Source and connect it to the function

- Login to your Segment account, go to Connections
- Select Catalog > Functions
- Select the source function previously created
- Select Connect Source
- Put a descriptive name, such as "FPJS Source". You may optionally put labels.
- Click Continue
- You will see the webhook URL. Don't worry about this for now.
- Click Continue
- Click Finish

Source is successfully created!

### Connect Segment Source with Fingerprint Account

- Login to your Segment account, go to Connections
- Select Sources, select previously created Source. You should see the details of the source, along with webhook URL
- Copy the webhook URL
- Login to your Fingerprint account
- Go to App Settings > Webhooks
- Click +Add Webhook
- Paste the URL you copied earlier. Do not set authentication. Put a descriptive description, such as "Segment source"
- Click Save
- Click Send Test Event
- Sending the test event make take a while, you may wait or close the window.

Fingerprint account is successfully connected to the Segment account!

### Configure JS Agent

The Segment integration is _not_ enabled by default. We must configure JS Agent explicitly to use the Segment Integration.
One uses Segment Integration by making use of `tag` field. More info about `tag` can be found [here](https://dev.fingerprint.com/docs/js-agent#tag).

First of all, add the `tag` if it is not there. Then, add a field called `integrations`, and create a field called `segment` in it, like below:
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
Inside the `segment` object, define [Segment Specs](https://segment.com/docs/connections/spec/), like below

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
You may use `identify`, `page`, `group` and `track` for corresponding specs. 
You can omit the specs you don't need. There is also option
for skipping the segment integration, using `skipIntegration` field.

A full example looks like below:
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

### Setting Destinations

Now that the JS Agent and Segment Source are connected, the specs should be flowing to 
your segment account as your website gets visitors. Set up a destination to make use of flowing data, such as Google Analytics or others that suits
your business needs the best. 

Segment Source function populates the `anonymousId` field with
Fingerprint's `visitorId` info, and `userId` info with what is provided in `tag.integrations.segment.identify.userId` 
field for Identify, Page, Track and Group specs.
