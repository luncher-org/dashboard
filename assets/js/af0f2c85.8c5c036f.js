"use strict";(self.webpackChunkrancher_ui_devkit=self.webpackChunkrancher_ui_devkit||[]).push([[4489],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),d=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=d(e.components);return r.createElement(l.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},h=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=d(n),h=a,m=u["".concat(l,".").concat(h)]||u[h]||c[h]||o;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[u]="string"==typeof e?e:a,i[1]=s;for(var d=2;d<o;d++)i[d]=n[d];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}h.displayName="MDXCreateElement"},8978:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var r=n(7462),a=(n(7294),n(3905));const o={},i="Making API Calls",s={unversionedId:"extensions/usecases/node-driver/proxying",id:"extensions/usecases/node-driver/proxying",title:"Making API Calls",description:"Rancher includes a proxy that can be used to make requests to third-party domains (like a cloud provider's API) without requiring that the other end supports CORS or other browser shenanigans.  Send requests to /meta/proxy/example.com/whatever/path/you/want and the request will be made from the Rancher server and proxied back to you.",source:"@site/docs/extensions/usecases/node-driver/proxying.md",sourceDirName:"extensions/usecases/node-driver",slug:"/extensions/usecases/node-driver/proxying",permalink:"/dashboard/extensions/usecases/node-driver/proxying",draft:!1,tags:[],version:"current",lastUpdatedAt:1698845169,formattedLastUpdatedAt:"Nov 1, 2023",frontMatter:{},sidebar:"mainSidebar",previous:{title:"Advanced",permalink:"/dashboard/extensions/usecases/node-driver/advanced"},next:{title:"Node Driver Example",permalink:"/dashboard/extensions/usecases/node-driver/about-example"}},l={},d=[{value:"Allow lists",id:"allow-lists",level:2}],p={toc:d},u="wrapper";function c(e){let{components:t,...n}=e;return(0,a.kt)(u,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"making-api-calls"},"Making API Calls"),(0,a.kt)("p",null,"Rancher includes a proxy that can be used to make requests to third-party domains (like a cloud provider's API) without requiring that the other end supports CORS or other browser shenanigans.  Send requests to ",(0,a.kt)("inlineCode",{parentName:"p"},"/meta/proxy/example.com/whatever/path/you/want")," and the request will be made from the Rancher server and proxied back to you."),(0,a.kt)("p",null,"TLS and port 443 are assumed.  Add a port after the hostname to change the port (",(0,a.kt)("inlineCode",{parentName:"p"},"example.com:1234"),")."),(0,a.kt)("p",null,"Plain HTTP (i.e. not HTTPS) calls can be made - but you should ",(0,a.kt)("em",{parentName:"p"},"carefully")," consider doing so. For this, use ",(0,a.kt)("inlineCode",{parentName:"p"},"/meta/proxy/http:/example.com:1234")," (note one slash after ",(0,a.kt)("inlineCode",{parentName:"p"},"http:"),", not two). "),(0,a.kt)("h2",{id:"allow-lists"},"Allow lists"),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"Important: Please be aware of the allow list restrictions below"))),(0,a.kt)("p",null,"API calls can ONLY be made to hostnames that have specifically been allowed in Rancher. This is done by including the hostname in the whitelist defined in global settings, or in the configuration for an active node driver.  If if isn't your request will be denied.  (This prevents a malicious (non-admin) user from abusing the Rancher server as an arbitrary HTTP proxy or reach internal IPs/names that the server can reach directly but the user can't from the outside.) Typically API requests to hosts not in the allow-list will return a 503 HTTP status code. "),(0,a.kt)("p",null,"The rest of the path and query string are sent to the target host as you'd expect."),(0,a.kt)("p",null,"Normal headers are copied from your request and sent to the target.  There are some exceptions for sensitive fields like the user's rancher cookies or saved basic auth creds which will not be copied.  If you send an ",(0,a.kt)("inlineCode",{parentName:"p"},"X-Api-Cookie-Header"),", its value will be sent as the normal ",(0,a.kt)("inlineCode",{parentName:"p"},"Cookie")," to the target.  If you send ",(0,a.kt)("inlineCode",{parentName:"p"},"X-API-Auth-Header"),", that will be sent out as the normal ",(0,a.kt)("inlineCode",{parentName:"p"},"Authorization"),"."),(0,a.kt)("p",null,"But normally you want to make a request using a Cloud Credential as the authorization, without knowing what the secret values in that credential are.  You ask for this by sending an ",(0,a.kt)("inlineCode",{parentName:"p"},"X-Api-CattleAuth-Header")," header.  The value of the header specifies what credential Id to use, and a ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/rancher/rancher/blob/release/v2.6/pkg/httpproxy/sign.go"},"signer")," which describes how that credential should be injected into the request."),(0,a.kt)("p",null,"Common options include ",(0,a.kt)("inlineCode",{parentName:"p"},"awsv4")," (Amazon's complicated HMAC signatures), ",(0,a.kt)("inlineCode",{parentName:"p"},"bearer"),", ",(0,a.kt)("inlineCode",{parentName:"p"},"basic"),", and ",(0,a.kt)("inlineCode",{parentName:"p"},"digest"),"."),(0,a.kt)("p",null,"For example if you send:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"X-Api-CattleAuth-Header: Basic credId=someCredentialId usernameField=user passwordField=pass")),(0,a.kt)("p",null,"Rancher will retrieve the credential with id ",(0,a.kt)("inlineCode",{parentName:"p"},"someCredentialId"),", read the values of the ",(0,a.kt)("inlineCode",{parentName:"p"},"user")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"pass")," fields from it and add the header:"),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},'Authorization: Basic <base64(user + ":" + pass)>')),(0,a.kt)("p",null,"to the proxied request for you."))}c.isMDXComponent=!0}}]);