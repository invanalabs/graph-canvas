import{A as D,C as E,G as S,P as u}from"./HTMLText-DZ17wCYg.js";import"./_commonjsHelpers-BosuxZz1.js";const b=()=>{const o=new D({width:800,height:600,antialias:!0,backgroundColor:16777215});document.body.appendChild(o.view);const a=new E;o.stage.addChild(a);const n=new S;n.beginFill(16711680),n.drawCircle(0,0,20),n.endFill(),n.interactive=!0,n.buttonMode=!0,a.addChild(n);let t=1,r=new u(0,0);n.on("pointerdown",y).on("pointerup",c).on("pointerupoutside",c).on("pointermove",C).on("wheel",v);function y(e){this.data=e.data,this.dragging=!0,this.dragPoint=this.data.getLocalPosition(this.parent)}function c(){this.dragging=!1,this.data=null}function C(){if(this.dragging){const e=this.data.getLocalPosition(this.parent),s=new u(e.x-this.dragPoint.x,e.y-this.dragPoint.y);this.x+=s.x,this.y+=s.y,this.dragPoint=e}}function v(e){const s=e.deltaY;t+=s*.1,t=Math.min(Math.max(t,.5),2),a.scale.set(t);const l=e.data.getLocalPosition(a),p=(l.x-r.x)/(t-1),h=(l.y-r.y)/(t-1);a.pivot.set(p,h),a.position.set(r.x-p*t,r.y-h*t)}window.addEventListener("resize",()=>{o.renderer.resize(window.innerWidth,window.innerHeight)}),o.ticker.add(()=>{})},i=()=>{const o=document.createElement("div");return b(),o},k={title:"Test Canvases/node-interaction",render:()=>i(),parameters:{layout:"fullscreen"}},d={};var g,m,w;i.parameters={...i.parameters,docs:{...(g=i.parameters)==null?void 0:g.docs,source:{originalSource:`() => {
  const html = document.createElement("div");
  draw();
  return html;
}`,...(w=(m=i.parameters)==null?void 0:m.docs)==null?void 0:w.source}}};var P,f,x;d.parameters={...d.parameters,docs:{...(P=d.parameters)==null?void 0:P.docs,source:{originalSource:"{}",...(x=(f=d.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};const A=["createPage","Default"];export{d as Default,A as __namedExportsOrder,i as createPage,k as default};
