"use strict";(self.webpackChunkfirst_project=self.webpackChunkfirst_project||[]).push([[237],{9237:(s,e,a)=>{a.r(e),a.d(e,{default:()=>C});var i=a(2906);a(2791);const d="Dialogs_dialogs__ZyLQd",n="Dialogs_dialogsItems__QkU4L",r="Dialogs_dialog__YtWJA",l="Dialogs_masseges__DUhjn",t="Dialogs_names__b7xg+";var o=a(1087),c=a(4379),g=a(184);const m=s=>{let e="/dialogs/"+s.id;return(0,g.jsxs)("div",{className:t,children:[(0,g.jsx)("img",{src:c,alt:""}),(0,g.jsx)(o.OL,{to:e,children:s.name})]})},j=s=>(0,g.jsxs)("div",{className:r,children:[(0,g.jsx)("img",{src:c,alt:""}),(0,g.jsx)("div",{className:l,children:s.messages})]});var h=a(6139),x=a(704),u=a(3655),_=a(5304);const v=(0,x.Z)({form:"dialogAddMessageForm"})((s=>(0,g.jsxs)("form",{onSubmit:s.handleSubmit,children:[(0,g.jsx)("div",{children:(0,g.jsx)(h.Z,{component:u.Kx,validate:[_.C,(0,_.D)(100)],name:"newMessageBody",placeholder:"Enter your message"})}),(0,g.jsx)("div",{children:(0,g.jsx)("button",{children:"Send"})})]}))),p=s=>{let e=s.dialogsPage,a=e.dialogs.map((s=>(0,g.jsx)(m,{name:s.name,id:s.id},s.id))),i=e.messages.map((s=>(0,g.jsx)(j,{messages:s.messages,id:s.id},s.id)));return(0,g.jsxs)("div",{className:d,children:[(0,g.jsx)("div",{className:n,children:a}),(0,g.jsx)("div",{className:l,children:(0,g.jsx)("div",{children:i})}),(0,g.jsx)("div",{children:(0,g.jsx)(v,{onSubmit:e=>{s.sendMessageCreator(e.newMessageBody)}})})]})};var D=a(8687),f=a(9050),b=a(1548);const C=(0,f.qC)((0,D.$j)((s=>({dialogsPage:s.dialogsPage})),(s=>({sendMessageCreator:e=>{s((0,i.X)(e))}}))),b.D)(p)},1548:(s,e,a)=>{a.d(e,{D:()=>t});var i=a(2791),d=a(8687),n=a(7689),r=a(184);function l(s){return{isAuth:s.auth.isAuth}}const t=s=>{class e extends i.Component{render(){return this.props.isAuth?(0,r.jsx)(s,{...this.props}):(0,r.jsx)(n.Z5,{children:(0,r.jsx)(n.AW,{path:"*",element:(0,r.jsx)(n.Fg,{to:"/login"})})})}}return(0,d.$j)(l)(e)}}}]);
//# sourceMappingURL=237.b8c66a6e.chunk.js.map