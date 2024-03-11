"use strict";(self.webpackChunkrancher_ui_devkit=self.webpackChunkrancher_ui_devkit||[]).push([[5933],{5680:(e,n,t)=>{t.d(n,{xA:()=>u,yg:()=>f});var o=t(6540);function r(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){r(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,r=function(e,n){if(null==e)return{};var t,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)t=i[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var l=o.createContext({}),c=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},u=function(e){var n=c(e.components);return o.createElement(l.Provider,{value:n},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(t),m=r,f=d["".concat(l,".").concat(m)]||d[m]||p[m]||i;return t?o.createElement(f,a(a({ref:n},u),{},{components:t})):o.createElement(f,a({ref:n},u))}));function f(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var i=t.length,a=new Array(i);a[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[d]="string"==typeof e?e:r,a[1]=s;for(var c=2;c<i;c++)a[c]=t[c];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},9432:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var o=t(8168),r=(t(6540),t(5680));const i={},a="Custom VueX Stores",s={unversionedId:"extensions/advanced/stores",id:"extensions/advanced/stores",title:"Custom VueX Stores",description:"Extensions may want to define their own custom VueX stores.",source:"@site/docs/extensions/advanced/stores.md",sourceDirName:"extensions/advanced",slug:"/extensions/advanced/stores",permalink:"/dashboard/extensions/advanced/stores",draft:!1,tags:[],version:"current",lastUpdatedAt:1710147504,formattedLastUpdatedAt:"Mar 11, 2024",frontMatter:{},sidebar:"mainSidebar",previous:{title:"Hooks",permalink:"/dashboard/extensions/advanced/hooks"},next:{title:"Version compatibility",permalink:"/dashboard/extensions/advanced/version-compatibility"}},l={},c=[{value:"Initializing Extension Stores",id:"initializing-extension-stores",level:2}],u={toc:c},d="wrapper";function p(e){let{components:n,...t}=e;return(0,r.yg)(d,(0,o.A)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,r.yg)("h1",{id:"custom-vuex-stores"},"Custom VueX Stores"),(0,r.yg)("p",null,"Extensions may want to define their own custom VueX stores."),(0,r.yg)("h2",{id:"initializing-extension-stores"},"Initializing Extension Stores"),(0,r.yg)("p",null,"Extensions should explicitly register any store modules in their ",(0,r.yg)("inlineCode",{parentName:"p"},"index.ts")," by using the ",(0,r.yg)("inlineCode",{parentName:"p"},"addDashboardStore")," extension method. This will also add familiar ",(0,r.yg)("a",{parentName:"p",href:"https://vuex.vuejs.org/"},"Vuex")," actions for retrieving and classifying resources, details of which can be found in ",(0,r.yg)("inlineCode",{parentName:"p"},"shell/plugins/dashboard-store/index"),"."),(0,r.yg)("p",null,"An example would be to define in the folder ",(0,r.yg)("inlineCode",{parentName:"p"},"store")," of your extension a basic configuration on an ",(0,r.yg)("inlineCode",{parentName:"p"},"index.ts")," file, such as:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"import { CoreStoreSpecifics, CoreStoreConfig } from '@shell/core/types';\nimport getters from './getters'; // this would be your getters file on your extension /store folder\nimport mutations from './mutations'; // this would be your mutations file on your extension /store folder\nimport actions from './actions'; // this would be your actions file on your extension /store folder\n\n// to achieve naming consistency throughout the extension\n// we recommend this to be defined on a config file and exported\n// so that the developer can import it wherever it needs to be used\nconst YOUR_PRODUCT_NAME = 'the-name-of-your-product';\n\nconst yourExtensionFactory = (): CoreStoreSpecifics => {\n  return {\n    state() {\n      return { someStateVariable: '' };\n    },\n\n    getters: { ...getters },\n\n    mutations: { ...mutations },\n\n    actions: { ...actions },\n  };\n};\nconst config: CoreStoreConfig = { namespace: YOUR_PRODUCT_NAME };\n\nexport default {\n  specifics: yourExtensionFactory(),\n  config\n};\n")),(0,r.yg)("p",null,"In the ",(0,r.yg)("inlineCode",{parentName:"p"},"store")," folder you just need to create the ",(0,r.yg)("inlineCode",{parentName:"p"},"getters.js"),", ",(0,r.yg)("inlineCode",{parentName:"p"},"actions.js")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"mutations.js")," files and write up your store code there, based on the convention of ",(0,r.yg)("a",{parentName:"p",href:"https://vuex.vuejs.org/"},"Vuex"),"."),(0,r.yg)("p",null,"And on the ",(0,r.yg)("inlineCode",{parentName:"p"},"index.ts")," on your root folder, where you define your extension configuration, you can just use the ",(0,r.yg)("inlineCode",{parentName:"p"},"addDashboardStore")," extension method, such as:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"import { importTypes } from '@rancher/auto-import';\nimport { IPlugin } from '@shell/core/types';\nimport extensionStore from './store';\n\n// Init the package\nexport default function(plugin: IPlugin) {\n  // Auto-import model, detail, edit from the folders\n  importTypes(plugin);\n\n  // Provide extension metadata from package.json\n  // it will grab information such as `name` and `description`\n  plugin.metadata = require('./package.json');\n\n  // Load a product\n  plugin.addProduct(require('./product'));\n  \n  // => => => Add Vuex store\n  plugin.addDashboardStore(extensionStore.config.namespace, extensionStore.specifics, extensionStore.config);\n}\n")),(0,r.yg)("p",null,"Extensions can optionally define their own cluster store module by setting ",(0,r.yg)("inlineCode",{parentName:"p"},"isClusterStore")," in the store index, eg:"),(0,r.yg)("pre",null,(0,r.yg)("code",{parentName:"pre",className:"language-ts"},"// to achieve naming consistency throughout the extension\n// we recommend this to be defined on a config file and exported\n// so that the developer can import it wherever it needs to be used\nconst YOUR_PRODUCT_NAME = 'the-name-of-your-product';\n\nconst config: CoreStoreConfig = {\n  namespace:      YOUR_PRODUCT_NAME,\n  isClusterStore: true\n};\n\nexport default {\n  specifics: harvesterFactory(),\n  config,\n  init:      steveStoreInit\n};\n")),(0,r.yg)("p",null,"This will cause the shell ",(0,r.yg)("inlineCode",{parentName:"p"},"loadCluster")," action to run the extension's ",(0,r.yg)("inlineCode",{parentName:"p"},"loadCluster")," action when entering a package, and the extension store's ",(0,r.yg)("inlineCode",{parentName:"p"},"unsubscribe")," and ",(0,r.yg)("inlineCode",{parentName:"p"},"reset")," when leaving."))}p.isMDXComponent=!0}}]);