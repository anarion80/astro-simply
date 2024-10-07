---
postFormat: Post
publishDate: 2024-09-06T00:00:00Z
authors: ['anarion-dunedain']
title: Code examples
excerpt: Example of code syntax highlighting.
heroImage: https://images.unsplash.com/photo-1653387137517-fbc54d488ed8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
featured: false
draft: false
category: technology
tags:
    - code
    - ui
    - astro
---
Shell example with word highlight:

```shell
...
# [!code word:Caused]
10-02 14:05:00.464  4821  5579 E NetworkSM: Caused by: android.system.ErrnoException: isConnected failed: ECONNREFUSED (Connection refused)
10-02 14:05:00.464  4821  5579 E NetworkSM:  at libcore.io.IoBridge.isConnected(IoBridge.java:274)
10-02 14:05:00.464  4821  5579 E NetworkSM:  ... 28 more
10-02 14:05:00.586  4821  5121 E LocBroadcastReceiver: Error receiving zones from Home Assistant
10-02 14:05:00.586  4821  5121 E LocBroadcastReceiver: io.homeassistant.companion.android.common.data.integration.IntegrationException: javax.net.ssl.SSLHandshakeException: Unacceptable certificate: CN=R3, O=Let's Encrypt, C=US
10-02 14:05:00.586  4821  5121 E LocBroadcastReceiver:  at io.homeassistant.companion.android.common.data.integration.impl.IntegrationRepositoryImpl.getZones(IntegrationRepositoryImpl.kt:294)
10-02 14:05:00.586  4821  5121 E LocBroadcastReceiver:  at io.homeassistant.companion.android.common.data.integration.impl.IntegrationRepositoryImpl$getZones$1.invokeSuspend(Unknown Source:14)
...
```

JavaScript example with line highlight:

```js
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',  // [!code highlight]
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: false, // <--
})
```

JavaScript example with line focus:

```js
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript',
  themes: {
    light: 'vitesse-light', // [!code focus]
    dark: 'vitesse-dark',
  },
  defaultColor: false,
})
```

JavaScript example with line diff:

```js
import { codeToHtml } from 'shiki'

const code = await codeToHtml('console.log("hello")', {
  lang: 'javascript', // [!code ++]
  lang: 'shell', // [!code --]
  themes: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  defaultColor: false,
})
```
