(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(0),r=t(1),a=t(15),o=t.n(a),u=t(6),i=t(3),s=function(e){var n=e.person,t=e.del;return Object(c.jsxs)("li",{children:[n.name," ",n.number,Object(c.jsx)("button",{onClick:t,children:"Delete"})]})},d=function(e){return Object(c.jsxs)("form",{onSubmit:e.addPerson,children:[Object(c.jsxs)("div",{children:["name: ",Object(c.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(c.jsxs)("div",{children:["number: ",Object(c.jsx)("input",{value:e.newNumber,onChange:e.handleNumChange})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"add"})})]})},l=function(e){return Object(c.jsxs)("div",{children:["filter shown with ",Object(c.jsx)("input",{onChange:e.handleFilterChange})]})},j=t(4),h=t.n(j),f="/api/persons",b=function(){return h.a.get(f).then((function(e){return e.data}))},m=function(e){return h.a.post(f,e).then((function(e){return e.data}))},O=function(e,n){return h.a.put("".concat(f,"/").concat(e),n).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=function(e){var n=e.message;return null===n?null:n.status?Object(c.jsx)("div",{className:"note",children:n.content}):Object(c.jsx)("div",{className:"error",children:n.content})},x=function(){var e=Object(r.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],o=Object(r.useState)(""),j=Object(i.a)(o,2),h=j[0],f=j[1],x=Object(r.useState)(""),g=Object(i.a)(x,2),w=g[0],C=g[1],N=Object(r.useState)(""),k=Object(i.a)(N,2),S=k[0],y=k[1],D=Object(r.useState)({content:"",status:!0}),P=Object(i.a)(D,2),A=P[0],E=P[1];Object(r.useEffect)((function(){console.log("effect"),b().then((function(e){return a(e)}))}),[h]);var F=t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())}));return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(p,{message:A}),Object(c.jsx)(l,{handleFilterChange:function(e){return y(e.target.value)}}),Object(c.jsx)("h2",{children:"Add a new"}),Object(c.jsx)(d,{addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===h}));if(void 0!==n){if(console.log("id ".concat(n.id)),window.confirm("".concat(h," is already added to phonebook, replace the old number with the new one?"))){var c=Object(u.a)(Object(u.a)({},n),{},{number:w});O(n.id,c).then((function(e){console.log(e),a(t.map((function(t){return t.id!==n.id?t:e}))),console.log(t);var c={content:"Updated ".concat(e.name),status:!0};E(c)})).catch((function(e){var n={content:e.response.data,status:!1};E(n),a(t.filter((function(e){return e.name!==h})))}))}}else m({name:h,number:w}).then((function(e){a(t.concat(e)),console.log(e);var n={content:"Added ".concat(e.name),status:!0};E(n)})).catch((function(e){var n={content:e.response.data,status:!1};E(n)}));f(""),C("")},newName:h,handleNameChange:function(e){return f(e.target.value)},newNumber:w,handleNumChange:function(e){return C(e.target.value)}}),Object(c.jsx)("h2",{children:"Numbers"}),Object(c.jsx)("div",{children:F.map((function(e,n){return Object(c.jsx)(s,{person:e,del:function(){return function(e){var n=t.find((function(n){return n.id===e})),c=t.filter((function(n){return n.id!==e}));window.confirm("Do you really want to delete ".concat(n.name,"?"))&&v(e).then((function(){return a(c)})).catch((function(e){var c={content:"Information of ".concat(n.name," has been removed from the server."),status:!1};E(c),a(t.filter((function(e){return e.id!==n.id})))}))}(e.id)}},n)}))})]})};t(39);o.a.render(Object(c.jsx)(x,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.56c45126.chunk.js.map