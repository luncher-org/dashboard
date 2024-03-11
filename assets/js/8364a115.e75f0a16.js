"use strict";(self.webpackChunkrancher_ui_devkit=self.webpackChunkrancher_ui_devkit||[]).push([[362],{5680:(e,n,t)=>{t.d(n,{xA:()=>g,yg:()=>h});var a=t(6540);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,o=function(e,n){if(null==e)return{};var t,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var s=a.createContext({}),p=function(e){var n=a.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},g=function(e){var n=p(e.components);return a.createElement(s.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,g=l(e,["components","mdxType","originalType","parentName"]),d=p(t),c=o,h=d["".concat(s,".").concat(c)]||d[c]||u[c]||i;return t?a.createElement(h,r(r({ref:n},g),{},{components:t})):a.createElement(h,r({ref:n},g))}));function h(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var i=t.length,r=new Array(i);r[0]=c;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[d]="string"==typeof e?e:o,r[1]=l;for(var p=2;p<i;p++)r[p]=t[p];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},5722:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var a=t(8168),o=(t(6540),t(5680));const i={},r="Getting Started",l={unversionedId:"extensions/extensions-getting-started",id:"extensions/extensions-getting-started",title:"Getting Started",description:"This guide will walk through creating a new extension from scratch.",source:"@site/docs/extensions/extensions-getting-started.md",sourceDirName:"extensions",slug:"/extensions/extensions-getting-started",permalink:"/dashboard/extensions/extensions-getting-started",draft:!1,tags:[],version:"current",lastUpdatedAt:1710147504,formattedLastUpdatedAt:"Mar 11, 2024",frontMatter:{},sidebar:"mainSidebar",previous:{title:"Introduction",permalink:"/dashboard/extensions/introduction"},next:{title:"Extensions configuration",permalink:"/dashboard/extensions/extensions-configuration"}},s={},p=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Creating the Application",id:"creating-the-application",level:2},{value:"Creating the Skeleton App",id:"creating-the-skeleton-app",level:3},{value:"<strong><em>Extension Options</em></strong>",id:"extension-options",level:4},{value:"Creating an Extension as a top-level-product",id:"creating-an-extension-as-a-top-level-product",level:2},{value:"Creating an Extension",id:"creating-an-extension",level:3},{value:"<strong><em>Extension Package Options</em></strong>",id:"extension-package-options",level:4},{value:"Configuring an Extension",id:"configuring-an-extension",level:3},{value:"Running the App",id:"running-the-app",level:2},{value:"Building the Extension",id:"building-the-extension",level:2},{value:"Loading Into Rancher",id:"loading-into-rancher",level:2},{value:"Prevent loading your extension in dev mode",id:"prevent-loading-your-extension-in-dev-mode",level:3},{value:"Test built extension by doing a Developer load",id:"test-built-extension-by-doing-a-developer-load",level:3},{value:"Creating a Release",id:"creating-a-release",level:2},{value:"Release Prerequisites",id:"release-prerequisites",level:3},{value:"Adding the Release Workflow",id:"adding-the-release-workflow",level:3},{value:"Consuming the Helm chart",id:"consuming-the-helm-chart",level:3},{value:"Wrap-up",id:"wrap-up",level:2}],g={toc:p},d="wrapper";function u(e){let{components:n,...i}=e;return(0,o.yg)(d,(0,a.A)({},g,i,{components:n,mdxType:"MDXLayout"}),(0,o.yg)("h1",{id:"getting-started"},"Getting Started"),(0,o.yg)("p",null,"This guide will walk through creating a new extension from scratch."),(0,o.yg)("h2",{id:"prerequisites"},"Prerequisites"),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: Extensions development is only currently supported on Mac and Linux. Windows is not currently supported.")),(0,o.yg)("p",null,"You will need a recent version of nodejs installed (Tested with node version: ",(0,o.yg)("inlineCode",{parentName:"p"},"v16.19.1"),")."),(0,o.yg)("p",null,"You'll also need the yarn package manager installed, which can be done with ",(0,o.yg)("inlineCode",{parentName:"p"},"npm install -g yarn"),"."),(0,o.yg)("h2",{id:"creating-the-application"},"Creating the Application"),(0,o.yg)("p",null,"In order to develop a new Extension, you need an application UI to host it in during development. Rancher provides a helper to create a skeleton application for you. This\ngives you a full version of the Rancher UI that can be used to develop and test your extension."),(0,o.yg)("p",null,"Rancher publishes two npm packages to help bootstrap the creation of the app and an extension. These are used in this example below."),(0,o.yg)("h3",{id:"creating-the-skeleton-app"},"Creating the Skeleton App"),(0,o.yg)("p",null,"Create a new folder and run:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"yarn create @rancher/app my-app [OPTIONS]\ncd my-app\n")),(0,o.yg)("p",null,"This will create a new folder ",(0,o.yg)("inlineCode",{parentName:"p"},"my-app")," and populate it with the minimum files needed."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: If you don't want to create a new folder, but instead want the files created in an existing folder, use ",(0,o.yg)("inlineCode",{parentName:"p"},"yarn create @rancher/app ."))),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: The skeleton application references the Rancher dashboard code via the ",(0,o.yg)("inlineCode",{parentName:"p"},"@rancher/shell")," npm module.")),(0,o.yg)("h4",{id:"extension-options"},(0,o.yg)("strong",{parentName:"h4"},(0,o.yg)("em",{parentName:"strong"},"Extension Options"))),(0,o.yg)("p",null,"There is one option available to be passed as an argument to the ",(0,o.yg)("inlineCode",{parentName:"p"},"@rancher/app")," script:"),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:"center"},"Option"),(0,o.yg)("th",{parentName:"tr",align:null},"Description"))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:"center"},(0,o.yg)("inlineCode",{parentName:"td"},"-l")),(0,o.yg)("td",{parentName:"tr",align:null},"This will automatically add the ",(0,o.yg)("a",{parentName:"td",href:"https://github.com/rancher/dashboard/blob/master/shell/creators/app/files/.gitlab-ci.yml"},(0,o.yg)("inlineCode",{parentName:"a"},".gitlab-ci.yml"))," pipeline file for integration with GitLab")))),(0,o.yg)("hr",null),(0,o.yg)("p",null,"You can run the app with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"yarn install\nAPI=<Rancher Backend URL> yarn dev\n")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: You will need to have a Rancher backend available and the ",(0,o.yg)("inlineCode",{parentName:"p"},"API")," environment variable above set correctly to reference it. Setup instructions can be found ",(0,o.yg)("a",{parentName:"p",href:"../getting-started/development_environment/#installing-rancher"},"here"),".")),(0,o.yg)("p",null,"You should be able to open a browser at ",(0,o.yg)("a",{parentName:"p",href:"https://127.0.0.1:8005"},"https://127.0.0.1:8005")," and you'll get the Rancher Dashboard UI. Your skeleton application is a full Rancher UI - but referenced via ",(0,o.yg)("inlineCode",{parentName:"p"},"npm"),"."),(0,o.yg)("h2",{id:"creating-an-extension-as-a-top-level-product"},"Creating an Extension as a top-level-product"),(0,o.yg)("p",null,"The next step is to create an extension. As a Getting Started example, we'll demonstrate an extension for a ",(0,o.yg)("a",{parentName:"p",href:"./usecases/top-level-product"},"Top-level product"),", but you also have the option to create an extension for a ",(0,o.yg)("a",{parentName:"p",href:"./usecases/cluster-level-product"},"Cluster-level product"),"."),(0,o.yg)("h3",{id:"creating-an-extension"},"Creating an Extension"),(0,o.yg)("p",null,"Once again, Rancher provides a helper to add an extension. You can choose to have multiple extensions or a single extension within\nthe parent folder."),(0,o.yg)("p",null,"Go ahead and run the following command to create a new extension:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"yarn create @rancher/pkg test [OPTIONS]\n")),(0,o.yg)("p",null,"This will create a new UI Package in the ",(0,o.yg)("inlineCode",{parentName:"p"},"./pkg/test")," folder."),(0,o.yg)("h4",{id:"extension-package-options"},(0,o.yg)("strong",{parentName:"h4"},(0,o.yg)("em",{parentName:"strong"},"Extension Package Options"))),(0,o.yg)("p",null,"There are two options that can be passed to the ",(0,o.yg)("inlineCode",{parentName:"p"},"@rancher/pkg")," script:"),(0,o.yg)("table",null,(0,o.yg)("thead",{parentName:"table"},(0,o.yg)("tr",{parentName:"thead"},(0,o.yg)("th",{parentName:"tr",align:"center"},"Option"),(0,o.yg)("th",{parentName:"tr",align:null},"Description"))),(0,o.yg)("tbody",{parentName:"table"},(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:"center"},(0,o.yg)("inlineCode",{parentName:"td"},"-t")),(0,o.yg)("td",{parentName:"tr",align:null},"Creates additional boilerplate directories for types, including: 'l10n', 'models', 'edit', 'list', and 'detail'.")),(0,o.yg)("tr",{parentName:"tbody"},(0,o.yg)("td",{parentName:"tr",align:"center"},(0,o.yg)("inlineCode",{parentName:"td"},"-w")),(0,o.yg)("td",{parentName:"tr",align:null},"Creates the workflow files ",(0,o.yg)("a",{parentName:"td",href:"https://github.com/rancher/dashboard/tree/master/shell/creators/pkg/files/.github/workflows"},(0,o.yg)("inlineCode",{parentName:"a"},"build-extension-catalog.yml"),", ",(0,o.yg)("inlineCode",{parentName:"a"},"build-extension-charts.yml"))," to be used as Github actions. This will automatically build your extension and release a Helm chart and Extension Catalog Image.")))),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: Using the ",(0,o.yg)("inlineCode",{parentName:"p"},"-w")," option to create an automated workflow will require additonal prequesites, see the ",(0,o.yg)("a",{parentName:"p",href:"#creating-a-release"},"Release")," section.")),(0,o.yg)("h3",{id:"configuring-an-extension"},"Configuring an Extension"),(0,o.yg)("p",null,"Replace the contents of the file ",(0,o.yg)("inlineCode",{parentName:"p"},"./pkg/test/index.ts")," with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"import { importTypes } from '@rancher/auto-import';\nimport { IPlugin } from '@shell/core/types';\nimport extensionRouting from './routing/extension-routing';\n\n// Init the package\nexport default function(plugin: IPlugin) {\n  // Auto-import model, detail, edit from the folders\n  importTypes(plugin);\n\n  // Provide extension metadata from package.json\n  // it will grab information such as `name` and `description`\n  plugin.metadata = require('./package.json');\n\n  // Load a product\n  plugin.addProduct(require('./product'));\n\n  // Add Vue Routes\n  plugin.addRoutes(extensionRouting);\n}\n")),(0,o.yg)("p",null,"Next, create a new file ",(0,o.yg)("inlineCode",{parentName:"p"},"./pkg/test/product.ts")," with this content:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-ts"},"import { IPlugin } from '@shell/core/types';\n\nexport function init($plugin: IPlugin, store: any) {\n  const YOUR_PRODUCT_NAME = 'myProductName';\n  const BLANK_CLUSTER = '_';\n\n  const { product } = $plugin.DSL(store, YOUR_PRODUCT_NAME);\n\n  product({\n    icon:    'gear',\n    inStore: 'management',\n    weight:  100,\n    to:      {\n      name:      `${ YOUR_PRODUCT_NAME }-c-cluster`,\n      path:      `/${ YOUR_PRODUCT_NAME }/c/:cluster/dashboard`,\n      params:      {\n        product: YOUR_PRODUCT_NAME,\n        cluster: BLANK_CLUSTER,\n        pkg:     YOUR_PRODUCT_NAME\n      }\n    }\n  });\n}\n")),(0,o.yg)("p",null,"And finally create a file + folder ",(0,o.yg)("inlineCode",{parentName:"p"},"/routing/extension-routing.js")," with the content:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"// Don't forget to create a VueJS page called index.vue in the /pages folder!!!\nimport Dashboard from '../pages/index.vue';\n\nconst BLANK_CLUSTER = '_';\nconst YOUR_PRODUCT_NAME = 'myProductName';\n\nconst routes = [\n  {\n    name:      `${ YOUR_PRODUCT_NAME }-c-cluster`,\n    path:      `/${ YOUR_PRODUCT_NAME }/c/:cluster`,\n    component: Dashboard,\n    meta:      {\n      product: YOUR_PRODUCT_NAME,\n      cluster: BLANK_CLUSTER,\n      pkg:     YOUR_PRODUCT_NAME\n    }\n  }\n];\n\nexport default routes;\n")),(0,o.yg)("h2",{id:"running-the-app"},"Running the App"),(0,o.yg)("p",null,"We've created a bare bones extension and exposed a new 'product' that will appear in the top-level slide-in menu. At this stage, it does\nnothing other than that!"),(0,o.yg)("p",null,"You should now be able to run the UI again with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"API=<Rancher Backend URL> yarn dev\n")),(0,o.yg)("p",null,"Open a web browser to ",(0,o.yg)("a",{parentName:"p",href:"https://127.0.0.1:8005"},"https://127.0.0.1:8005")," and you'll see a new 'MyProductName' nav item in the top-level slide-in menu."),(0,o.yg)("div",{style:{textAlign:"center"}},(0,o.yg)("p",null,(0,o.yg)("img",{alt:"MyProductName Nav Item",src:t(1289).A,width:"1400",height:"660"}))),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: You should be able to make changes to the extension and the UI will hot-reload and update in the browser.")),(0,o.yg)("p",null,"To further develop a product, add new pages and add new types here's an ",(0,o.yg)("a",{parentName:"p",href:"/dashboard/extensions/usecases/top-level-product"},"example"),"."),(0,o.yg)("h2",{id:"building-the-extension"},"Building the Extension"),(0,o.yg)("p",null,"Up until now, we've run the extension inside of the skeleton application - this is the developer workflow."),(0,o.yg)("p",null,"To build the extension so we can use it independently, run:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"yarn build-pkg test\n")),(0,o.yg)("p",null,"This will build the extension as a Vue library and the built extension will be placed in the ",(0,o.yg)("inlineCode",{parentName:"p"},"dist-pkg")," folder."),(0,o.yg)("h2",{id:"loading-into-rancher"},"Loading Into Rancher"),(0,o.yg)("h3",{id:"prevent-loading-your-extension-in-dev-mode"},"Prevent loading your extension in dev mode"),(0,o.yg)("p",null,"When we run ",(0,o.yg)("inlineCode",{parentName:"p"},"API=<Rancher Backend URL> yarn dev"),", our test extension will be automatically loaded into the application - this allows us to develop\nthe extension with hot-reloading. To test loading the extension dynamically, we can update configuration to tell Rancher not to include our extension."),(0,o.yg)("p",null,"To do this, edit the file ",(0,o.yg)("inlineCode",{parentName:"p"},"vue.config.js")," in the root ",(0,o.yg)("inlineCode",{parentName:"p"},"my-app")," folder, and add the name of the package you want to exclude, such as:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-js"},"const config = require('@rancher/shell/vue.config');\n\nmodule.exports = config(__dirname, {\n  excludes: ['test'],\n});\n\n")),(0,o.yg)("p",null,"Now restart your app by running the UI again with:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"API=<Rancher Backend URL> yarn dev\n")),(0,o.yg)("p",null,"Open a web browser to ",(0,o.yg)("a",{parentName:"p",href:"https://127.0.0.1:8005"},"https://127.0.0.1:8005")," and you'll see that the Example nav item is not present - since the extension was not loaded."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},"Note: You need to be an admin user to test Extensions in the Rancher UI")),(0,o.yg)("h3",{id:"test-built-extension-by-doing-a-developer-load"},"Test built extension by doing a Developer load"),(0,o.yg)("p",null,"To enable Developer load in the UI, you should go to the user avatar in the top-right and go to ",(0,o.yg)("inlineCode",{parentName:"p"},"Preferences"),". Under ",(0,o.yg)("inlineCode",{parentName:"p"},"Advanced Features"),", check the ",(0,o.yg)("inlineCode",{parentName:"p"},"Enable Extension developer features")," checkbox."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Preferences",src:t(3420).A,width:"1705",height:"794"})),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Extension Developer Features",src:t(1638).A,width:"1703",height:"795"})),(0,o.yg)("p",null,"Now we need to serve the built package locally by running the following:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"yarn serve-pkgs\n")),(0,o.yg)("p",null,"This will start a small web server (on port 4500) that serves up the contents of the ",(0,o.yg)("inlineCode",{parentName:"p"},"dist-pkg")," folder. It will output which extensions are being served up - in our case you should see output like that below - it shows the URLs to use for each of the available extensions."),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-console"},"Serving catalog on http://127.0.0.1:4500\n\nServing packages:\n\n  test-0.1.0 available at: http://127.0.0.1:4500/test-0.1.0/test-0.1.0.umd.min.js\n")),(0,o.yg)("p",null,"Now jump back into the UI and bring in the slide-in menu (click on the hamburger menu in the top-left) and click on 'Extensions'."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Developer Load",src:t(1242).A,width:"1703",height:"790"})),(0,o.yg)("p",null,"Go to the three dot menu and select 'Developer load' - you'll get a dialog allowing you to load the extension into the UI."),(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Developer Load Modal",src:t(274).A,width:"1701",height:"792"})),(0,o.yg)("p",null,"In the top input box ",(0,o.yg)("inlineCode",{parentName:"p"},"Extension URL"),", enter:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre"},"https://127.0.0.1:8005/pkg/test-0.1.0/test-0.1.0.umd.min.js\n")),(0,o.yg)("p",null,"Press 'Load' and the extension will be loaded, you should see a notification telling you the extension was loaded and if you bring in the side menu again, you should see the Example nav item there now."),(0,o.yg)("p",null,"This illustrates dynamically loading an extension."),(0,o.yg)("p",null,"You'll notice that if you reload the Rancher UI, the extension is not persistent and will need to be added again. You can make it persistent by checking the ",(0,o.yg)("inlineCode",{parentName:"p"},"Persist extension by creating custom resource")," checkbox in the Developer Load dialog."),(0,o.yg)("h2",{id:"creating-a-release"},"Creating a Release"),(0,o.yg)("p",null,"Creating a Release for your extension is the official avenue for loading extensions into any Rancher instance. As mentioned in the ",(0,o.yg)("a",{parentName:"p",href:"/dashboard/extensions/introduction"},"Introduction"),", the extension can be packaged into a Helm chart and added as a Helm repository to be easily accessible from your Rancher Manager."),(0,o.yg)("p",null,"We have created ",(0,o.yg)("a",{parentName:"p",href:"https://github.com/rancher/dashboard/tree/master/shell/creators/pkg/files/.github/workflows"},"workflows")," for ",(0,o.yg)("a",{parentName:"p",href:"https://docs.github.com/en/actions"},"Github Actions")," which will automatically build, package, and release your extension as a Helm chart for use within your Github repository, and an ",(0,o.yg)("a",{parentName:"p",href:"./advanced/air-gapped-environments"},"Extension Catalog Image")," (ECI) which is published into a specified container registry (",(0,o.yg)("inlineCode",{parentName:"p"},"ghcr.io")," by default). Depending on the use case, you can utilize the Github repository as a ",(0,o.yg)("a",{parentName:"p",href:"https://helm.sh/docs/topics/chart_repository/"},"Helm repository")," endpoint which we can use to consume the chart in Rancher, or you can import the ECI into the Extension Catalog list and serve the Helm charts locally."),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("strong",{parentName:"p"},"Note:")," GitLab support is offered through leverging the ECI build. For configuration instructions, follow the setps in the ",(0,o.yg)("a",{parentName:"p",href:"./publishing#gitlab-integration"},"Gitlab Integration")," section.")),(0,o.yg)("blockquote",null,(0,o.yg)("p",{parentName:"blockquote"},(0,o.yg)("strong",{parentName:"p"},"Note:")," If you wish to build and publish the Helm chart or the ECI manually or with specific configurations, you can follow the steps listed in the ",(0,o.yg)("a",{parentName:"p",href:"./publishing"},"Publishing an Extension")," section.")),(0,o.yg)("h3",{id:"release-prerequisites"},"Release Prerequisites"),(0,o.yg)("p",null,"In order to have a Helm repository you will need to enable Github Pages on your Github repository. Just follow these steps:"),(0,o.yg)("ol",null,(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Create a branch called ",(0,o.yg)("inlineCode",{parentName:"p"},"gh-pages")," on your Github repository for the extension")),(0,o.yg)("li",{parentName:"ol"},(0,o.yg)("p",{parentName:"li"},"Go to the repository of the extension and click the ",(0,o.yg)("inlineCode",{parentName:"p"},"Settings")," tab in the top navigation bar."))),(0,o.yg)("div",{style:{textAlign:"center"}},(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Repo Settings Tab",src:t(2742).A,width:"1994",height:"476"}))),(0,o.yg)("ol",{start:3},(0,o.yg)("li",{parentName:"ol"},"Then on the left navigation bar of the settings page click the ",(0,o.yg)("inlineCode",{parentName:"li"},"Pages")," tab.")),(0,o.yg)("div",{style:{textAlign:"center"}},(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Repo Pages Tab",src:t(4721).A,width:"1784",height:"1048"}))),(0,o.yg)("ol",{start:4},(0,o.yg)("li",{parentName:"ol"},"Lastly, select ",(0,o.yg)("inlineCode",{parentName:"li"},"GitHub Actions")," from the ",(0,o.yg)("inlineCode",{parentName:"li"},"Source")," dropdown.")),(0,o.yg)("div",{style:{textAlign:"center"}},(0,o.yg)("p",null,(0,o.yg)("img",{alt:"Repo Pages Dropdown",src:t(9497).A,width:"1784",height:"1048"}))),(0,o.yg)("h3",{id:"adding-the-release-workflow"},"Adding the Release Workflow"),(0,o.yg)("p",null,"To add the workflow to your extension, use the ",(0,o.yg)("inlineCode",{parentName:"p"},"-w")," option when running the ",(0,o.yg)("inlineCode",{parentName:"p"},"@rancher/pkg")," script. For instance:"),(0,o.yg)("pre",null,(0,o.yg)("code",{parentName:"pre",className:"language-sh"},"yarn create @rancher/pkg test -w\n")),(0,o.yg)("p",null,"This will create a ",(0,o.yg)("inlineCode",{parentName:"p"},".github")," directory within the root folder of your app which will contain the ",(0,o.yg)("inlineCode",{parentName:"p"},"build-extension.yml")," workflow file. Initially the release is gated by a Push or Pull Request targeting the ",(0,o.yg)("inlineCode",{parentName:"p"},"main")," branch. To update your workflow with different events to trigger the workflow, see the ",(0,o.yg)("a",{parentName:"p",href:"./publishing#additional-release-configuration"},"Additional Release Configuration")," section."),(0,o.yg)("h3",{id:"consuming-the-helm-chart"},"Consuming the Helm chart"),(0,o.yg)("p",null,'After releasing the Helm chart you will be able to consume this from the Rancher UI by adding your Helm repository\'s URL to the App -> Repository list. If you used the automated workflow to release the Helm chart, you can find the URL within your Github repository under the "github-pages" Environment. '),(0,o.yg)("p",null,"The URL should be listed as: ",(0,o.yg)("inlineCode",{parentName:"p"},"https://<organization>.github.io/<repository>")),(0,o.yg)("p",null,"Once the URL has been added to the repository list, the extension should appear within the Extensions page."),(0,o.yg)("h2",{id:"wrap-up"},"Wrap-up"),(0,o.yg)("p",null,"This guide has showed you how to create a skeleton application that helps you develop and test one or more extensions."),(0,o.yg)("p",null,"We showed how we can develop and test those with hot-reloading in the browser and how we can build our extensions into a package that we can dynamically load into Rancher at runtime. We also went over how to release our extensions as Helm charts using the automated workflow."))}u.isMDXComponent=!0},274:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dev-load-modal-3eb4f6004c892151f39bfd4fad64a060.png"},1242:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/dev-load-34f3a661fa0e0aa4b7f7aec49828f68b.png"},1638:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/extension-developer-features-89aa76154517cd92d213a70db29c8cff.png"},1289:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/global-nav-bfe6537a9bc6142d38cf5d2a04570ac4.png"},3420:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/preferences-7b83b30eabcdc6ec2d63c6188732ddc5.png"},9497:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/repo-pages-dropdown-ada37ef91536e123aeeaa24373988176.png"},4721:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/repo-pages-tab-6a488d8fac0cc5e6c0a1b7aa3719be9d.png"},2742:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/repo-settings-tab-6e66e84f5ce369dbd4fd898d22ecf665.png"}}]);