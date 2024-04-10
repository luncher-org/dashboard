"use strict";(self.webpackChunkrancher_ui_devkit=self.webpackChunkrancher_ui_devkit||[]).push([[9774],{3267:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/index","metadata":{"permalink":"/dashboard/blog/index","source":"@site/blog/index.md","title":"The Rancher UX/UI team","description":"Our Team","date":"2024-04-10T07:41:18.000Z","formattedDate":"April 10, 2024","tags":[{"label":"Team","permalink":"/dashboard/blog/tags/team"},{"label":"Rancher","permalink":"/dashboard/blog/tags/rancher"},{"label":"Manager","permalink":"/dashboard/blog/tags/manager"},{"label":"Epinio","permalink":"/dashboard/blog/tags/epinio"},{"label":"Opni","permalink":"/dashboard/blog/tags/opni"},{"label":"Desktop","permalink":"/dashboard/blog/tags/desktop"},{"label":"Harvester","permalink":"/dashboard/blog/tags/harvester"},{"label":"Fleet","permalink":"/dashboard/blog/tags/fleet"},{"label":"Elemental","permalink":"/dashboard/blog/tags/elemental"}],"readingTime":0.975,"hasTruncateMarker":false,"authors":[{"name":"Kenneth Wimer","title":"Lizard Wizard","url":"https://github.com/kwwii","imageURL":"https://github.com/kwwii.png","key":"kwwii"}],"frontMatter":{"title":"The Rancher UX/UI team","authors":["kwwii"],"tags":["Team","Rancher","Manager","Epinio","Opni","Desktop","Harvester","Fleet","Elemental"]},"nextItem":{"title":"Easily configure and build ISOs with Elemental","permalink":"/dashboard/blog/2023/04/18/elemental-iso-build/elemental-iso-build"}},"content":"## Our Team\\n\\nAs a team, we are dedicated to creating intuitive, user-friendly interfaces that make it easy for our customers to manage their containerized applications at scale. We strive to provide a seamless experience that simplifies complex tasks and enables users to focus on what matters most - their business objectives. \\n\\nWe believe that good UX is a combination of empathy, user research, and iterative improvement - we are committed to constantly improving our UI based on user feedback.\\n\\n## Our Goals\\n\\n   - **Improve productivity**: Make it easier for users to complete tasks quickly and efficiently. This can lead to improved productivity and a more efficient use of time and resources.\\n\\n   - **Increase adoption**: Make the software more approachable and easier to learn, which can increase adoption rates and reduce training costs.\\n\\n   - **Reduce errors**: Reduce the likelihood of errors and make it easier to recover from mistakes.\\n\\n   - **Better user satisfaction**: Make the software more enjoyable to use, which can lead to increased user satisfaction and better overall user experiences.\\n\\n   - **Competitive advantage**: Give companies a competitive advantage by providing users with a better experience and making the software more appealing to use."},{"id":"/2023/04/18/elemental-iso-build/elemental-iso-build","metadata":{"permalink":"/dashboard/blog/2023/04/18/elemental-iso-build/elemental-iso-build","source":"@site/blog/2023-04-18-elemental-iso-build/elemental-iso-build.md","title":"Easily configure and build ISOs with Elemental","description":"Allow the user to configure and build Elemental ISO images","date":"2023-04-18T00:00:00.000Z","formattedDate":"April 18, 2023","tags":[{"label":"Manager","permalink":"/dashboard/blog/tags/manager"},{"label":"Elemental","permalink":"/dashboard/blog/tags/elemental"},{"label":"Extensions","permalink":"/dashboard/blog/tags/extensions"}],"readingTime":0.44,"hasTruncateMarker":false,"authors":[{"name":"Alexandre Alves","title":"UX/UI Developer","url":"https://github.com/aalves08","imageURL":"https://github.com/aalves08.png","key":"alex"},{"name":"Kenneth Wimer","title":"Lizard Wizard","url":"https://github.com/kwwii","imageURL":"https://github.com/kwwii.png","key":"kwwii"}],"frontMatter":{"title":"Easily configure and build ISOs with Elemental","description":"Allow the user to configure and build Elemental ISO images","authors":["alex","kwwii"],"tags":["Manager","Elemental","Extensions"]},"prevItem":{"title":"The Rancher UX/UI team","permalink":"/dashboard/blog/index"},"nextItem":{"title":"Cluster creation with NetBios compatibile hostnames","permalink":"/dashboard/blog/2023/04/16/hostname-truncation/hostname-truncation"}},"content":"## Building ISO Images\\n\\nCurrently, when users want to add an Edge machine to an Elemental cluster they have to create an ISO image which is properly configured with the registration endpoint information by hand. \\n\\nTo simplify this workflow we\'ve added the ability to build an ISO image preconfigured for a given Elemental endpoint. After booting this image, the machine will be available to Rancher for inclusion in a cluster.\\n\\n![ISO Build](./image1.png)\\n\\nUsers can also build images directly on the dashboard for any registration endpoint.\\n\\n![Dashboard ISO Build](./image2.png)"},{"id":"/2023/04/16/hostname-truncation/hostname-truncation","metadata":{"permalink":"/dashboard/blog/2023/04/16/hostname-truncation/hostname-truncation","source":"@site/blog/2023-04-16-hostname-truncation/hostname-truncation.md","title":"Cluster creation with NetBios compatibile hostnames","description":"Adding NetBios compatibility when creating a cluster","date":"2023-04-16T00:00:00.000Z","formattedDate":"April 16, 2023","tags":[{"label":"Manager","permalink":"/dashboard/blog/tags/manager"},{"label":"Windows","permalink":"/dashboard/blog/tags/windows"}],"readingTime":0.41,"hasTruncateMarker":false,"authors":[{"name":"Richa Bisht","title":"UX/UI Design and Development","url":"https://github.com/bisht-richa","imageURL":"https://github.com/bisht-richa.png","key":"richa"}],"frontMatter":{"title":"Cluster creation with NetBios compatibile hostnames","description":"Adding NetBios compatibility when creating a cluster","authors":["richa"],"tags":["Manager","Windows"]},"prevItem":{"title":"Easily configure and build ISOs with Elemental","permalink":"/dashboard/blog/2023/04/18/elemental-iso-build/elemental-iso-build"},"nextItem":{"title":"Inactivity notification and timeout settings in the UI","permalink":"/dashboard/blog/2023/04/13/socket-disconnect-modal"}},"content":"## Truncating Hostnames\\n\\nKubernetes allows for 63 character hostnames but for systems running Windows there is a hard limit of 15 characters. We\'ve added a checkbox to the cluster creation UI which will tell the Rancher server to truncate the machine pool hostnames to 15 character when creating a cluster.\\n\\n![Hostname-truncation](./image.png)\\n\\nUsers will be notified when editing clusters or singular machine pools with settings beyond those supported by the UI. Changing the truncation setting after creation is currently not supported.\\n\\n![Hostname-truncation-cluster-warning](./image1.png)\\n\\n![Hostname-truncation-machine-pool-warning](./image2.png)"},{"id":"/2023/04/13/socket-disconnect-modal","metadata":{"permalink":"/dashboard/blog/2023/04/13/socket-disconnect-modal","source":"@site/blog/2023-04-13-socket-disconnect-modal.md","title":"Inactivity notification and timeout settings in the UI","description":"Inactivity notification and timeout settings in the UI","date":"2023-04-13T00:00:00.000Z","formattedDate":"April 13, 2023","tags":[{"label":"Manager","permalink":"/dashboard/blog/tags/manager"},{"label":"Modal","permalink":"/dashboard/blog/tags/modal"},{"label":"Timeout","permalink":"/dashboard/blog/tags/timeout"},{"label":"Inactivity","permalink":"/dashboard/blog/tags/inactivity"}],"readingTime":0.91,"hasTruncateMarker":false,"authors":[{"name":"Ed\xe9n Hern\xe1ndez L\xf3pez","title":"UX Lead","url":"https://github.com/rayito","imageURL":"https://github.com/rayito.png","key":"eden"}],"frontMatter":{"title":"Inactivity notification and timeout settings in the UI","description":"Inactivity notification and timeout settings in the UI","authors":["eden"],"tags":["Manager","Modal","Timeout","Inactivity"]},"prevItem":{"title":"Cluster creation with NetBios compatibile hostnames","permalink":"/dashboard/blog/2023/04/16/hostname-truncation/hostname-truncation"},"nextItem":{"title":"Flexibily create, update, and export apps with Epinio.","permalink":"/dashboard/blog/2023/04/10/epinio-gitlab/epinio-gitlab"}},"content":"## Socket Timeout UX\\n\\nAs part of Rancher Manager\'s wider performance improvement work, we looked at simple ways to improve the browser\'s performance.\\n\\nUsers often have many tabs open in their browser, each connecting to the Rancher backend via sockets. To reduce this load when browser tabs go unnoticed, we will implement a user-configurable time-out to disconnect any sockets the UI has open to the backend. \\n\\nOnce implemented, after a given time, the user will receive an intitial modal dialogue warning them of the pending socket time-out and allow them to reset the timer, signalling that the sockets should stay connected and a time-out modal when the time-out has expired.\\n\\n## Workflow\\n\\n\\nInitially, the user will receive a modal dialogue with a countdown showing the time remaining until the sockets disconnect and a button allowing them to resume the session.\\n\\n**Session expiration modal**\\n\\n![Resume session](https://user-images.githubusercontent.com/120640736/224100284-79b6e0b4-3dd7-43dd-a4e3-b549f2f4c159.png)\\n\\nAfter the timeout has expired, a modal will be shown informing the user that the sockets have been disconnected, and the user will need to refresh the page to restart the sockets.\\n\\n\\n**Session expired modal**\\n\\n![Reload page](https://user-images.githubusercontent.com/120640736/224100461-60b68a5b-8161-4fd4-8073-93bcf01e890b.png)"},{"id":"/2023/04/10/epinio-gitlab/epinio-gitlab","metadata":{"permalink":"/dashboard/blog/2023/04/10/epinio-gitlab/epinio-gitlab","source":"@site/blog/2023-04-10-epinio-gitlab/epinio-gitlab.md","title":"Flexibily create, update, and export apps with Epinio.","description":"Allowing the user more flexibility in how they create and export apps","date":"2023-04-10T00:00:00.000Z","formattedDate":"April 10, 2023","tags":[{"label":"Epinio","permalink":"/dashboard/blog/tags/epinio"}],"readingTime":0.645,"hasTruncateMarker":false,"authors":[{"name":"Sorin Cursecu","title":"Sr. UX Developer","url":"https://github.com/scures","imageURL":"https://github.com/scures.png","key":"sorin"},{"name":"Richard Cox","title":"UX/UI Developer","url":"https://github.com/richard-cox","imageURL":"https://github.com/richard-cox.png","key":"richard"},{"name":"Francesco Torchia","title":"UX/UI Developer","url":"https://github.com/torchiaf","imageURL":"https://github.com/torchiaf.png","key":"francesco"}],"frontMatter":{"title":"Flexibily create, update, and export apps with Epinio.","description":"Allowing the user more flexibility in how they create and export apps","authors":["sorin","richard","francesco"],"tags":["Epinio"]},"prevItem":{"title":"Inactivity notification and timeout settings in the UI","permalink":"/dashboard/blog/2023/04/13/socket-disconnect-modal"}},"content":"## Epinio Applications Workflow Updates\\n\\nBased on user feedback, we\'ve made 4 improvements to the Epinio UI which make it easier to create, update and export applications.\\n\\nEpinio now supports Gitlab directly in the application deployment creation workflow. \\nUsers can create application deployments from Gitlab repositories:\\n\\n![Step 1](./image4.png)\\n\\n---\\n\\nThe application deployment creation UI now supports custom application variables (based on schema-ish metadata). Where possible, the UI informs the user about boundaries such as min/max allowed values.\\n\\n![Step 2](./image2.png)\\n\\n---\\n\\nIt\'s now possible to change the source of an existing application. For example, if an application was initially deployed from a GitHub repository, we can now update the source to point to Gitlab instead.\\n\\n![Overview](./image3.png)\\n\\n---\\n\\nUsers can export applications as a helm chart and corresponding container image(s). \\n\\n![Export](./image1.png)"}]}')}}]);