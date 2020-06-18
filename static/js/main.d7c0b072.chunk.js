(this["webpackJsonphome-page"]=this["webpackJsonphome-page"]||[]).push([[0],{155:function(e,t,a){},156:function(e,t,a){},158:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(41),l=a.n(s),i=(a(66),a(7)),c=a(2),o=(a(31),a(42)),m={backgroundImage:"url(".concat(a.n(o).a,")"),backgroundSize:"cover",backgroundPosition:"left"};var u=function(){return r.a.createElement("header",null,r.a.createElement("div",{style:m,className:"header-content"},r.a.createElement("p",{className:"header-title"},"Game Design Portfolio"),r.a.createElement("p",{className:"header-subtitle"},"By Philip Tootill")))},g={height:"50px",backgroundColor:"#737373",color:"white",fontWeight:"bold",flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"};var h=function(){return r.a.createElement("footer",{style:g},r.a.createElement("p",null,"Designed by Philip Tootill"))},d=a(14),p=(a(67),a(43)),f=a.n(p);var b=function(){var e=Object(n.useState)(!1),t=Object(d.a)(e,2),a=t[0],s=t[1];return r.a.createElement("div",{className:"menu"},r.a.createElement("button",{onClick:function(){s(!a)},className:"menu-button"},r.a.createElement(f.a,null)),r.a.createElement("ul",{className:"menu-list",open:a},r.a.createElement("li",{className:"menu-list-item"},r.a.createElement(i.b,{to:"/about"},"About")),r.a.createElement("li",{className:"menu-list-item"},r.a.createElement(i.b,{to:"/board-games"},"Board Games")),r.a.createElement("li",{className:"menu-list-item"},r.a.createElement(i.b,{to:"/digital-games"},"Digital Games")),r.a.createElement("li",{className:"menu-list-item"},r.a.createElement(i.b,{to:"/contact"},"Contact"))))},v=(a(75),a(44)),E=a.n(v);var N=function(){return r.a.createElement("div",{className:"page-content"},r.a.createElement("p",{className:"page-title"},"About"),r.a.createElement("div",{className:"page-section"},r.a.createElement("img",{src:E.a,alt:"The author"}),r.a.createElement("p",null,"I'm an Oxford based software developer and amateur game designer. I made this site using React to showcase my game designs. The code for the site is available ",r.a.createElement("a",{href:"https://github.com/PhilipTootill/HomePage"},"here"),"."),r.a.createElement("p",null,"I started designing games in 2014, after seeing Matt Leacock give a talk about game design at the UK Games Expo. Since then, I've worked on a range of different games, and had one game published: Labyrinth, as part of the collection ",r.a.createElement("a",{href:"https://jellybean.games/the-lady-and-the-tiger/"},"The Lady and the Tiger"),"."),r.a.createElement("p",null,"Under \"Board Games\", you'll find summaries of the projects I'm most proud of, and sell sheets for the games which are in a pitchable condition."),r.a.createElement("p",null,'I also have a handful of digital prototypes, under "Digital Games".')))},x=a(45),k=a.n(x),y=a(20),O=a.n(y),I=a(46),M=a.n(I),j=a(47),w=a.n(j),S=a(48),R=a.n(S);var T=function(e){return r.a.createElement("div",{className:"link-boxes"},e.links.map((function(e){return r.a.createElement("div",{className:"link-box",style:{backgroundImage:"url(".concat(e.image,")")}},r.a.createElement(i.b,{to:e.url},r.a.createElement("div",{className:"link-box-overlay"},e.name)))})))},G=[{name:"Pyxis",image:O.a,url:"/board-games/pyxis"},{name:"Herakles",image:k.a,url:"/board-games/herakles"},{name:"The Vinyl Age",image:M.a,url:"/board-games/the-vinyl-age"},{name:"Rules Inc.",image:R.a,url:"/board-games/rules-inc"},{name:"Interns Of Hades",image:w.a,url:"/board-games/interns-of-hades"}];var C=function(){return r.a.createElement("div",{className:"page-content"},r.a.createElement("p",{className:"page-title"},"Board Games"),r.a.createElement(T,{links:G}))},P=a(21),A=a.n(P),D=a(49),H=a.n(D),B=a(50),U=a.n(B),L=a(51),V=a.n(L),J=a(52),W=a.n(J),X=a(53),q=a.n(X);var z=function(){var e=Object(c.f)().name,t="Invalid URL: The page for "+e+" doesn't exist.",a=Object(n.useState)(t),s=Object(d.a)(a,2),l=s[0],i=s[1],o={herakles:H.a,"the-vinyl-age":U.a,"rules-inc":W.a,"interns-of-hades":q.a,pyxis:V.a};return null!=o[e]&&fetch(o[e]).then((function(e){return e.text()})).then((function(e){return i(e)})),r.a.createElement("div",{className:"page-content"},r.a.createElement("div",{className:"page-section"},r.a.createElement(A.a,{source:l})))},K=[{name:"Numbers",image:O.a,url:"/digital-games/numbers"}];var F=function(){return r.a.createElement("div",{className:"page-content"},r.a.createElement("p",{className:"page-title"},"Digital Games"),r.a.createElement(T,{links:K}))},Q=a(58),Y=a(54),Z=a(55),$=a(59),_=a(57),ee=(a(155),function(e,t,a){var n=e-t+1,r=Math.floor(n/a),s=Math.floor(t/a)-1,l=Math.random();return l*=r,l=Math.ceil(l),l+=s,l*=a}),te=function(e){for(var t=e.length;t>0;){var a=Math.floor(Math.random()*t);t--;var n=e.splice(a,1);e.push(n)}},ae=function(e){Object($.a)(a,e);var t=Object(_.a)(a);function a(e){var n;return Object(Y.a)(this,a),(n=t.call(this,e)).restartGame=function(){for(var e,t=[],a=0;a<4;a++)t.push(ee(9,1,1));t.push(ee(25,10,5)),t.push(ee(100,25,25));do{e=ee(50,21,1)}while(t.includes(e));var r=[1,2,3,4,5,10];te(r),n.setState({numbers:t,upcomingNumbers:r,target:e,score:0,movesRemaining:6,highlightedOperation:null,highlightedIndex:null,errorMessage:"",scoreMessage:"",gameOver:!1})},n.operations=["+","-","X","/"],n.makeMove=function(e){var t=n.state.numbers[n.state.highlightedIndex],a=n.state.numbers[e],r=n.performOperation(t,a);if(r){var s=Object(Q.a)(n.state.numbers);s.splice(e,1,r),s.splice(n.state.highlightedIndex,1,n.pickNewRandomNumber());var l=n.state.movesRemaining-1;n.setState({movesRemaining:l,numbers:s,errorMessage:"",scoreMessage:"",highlightedIndex:null,highlightedOperation:null}),r===n.state.target?n.updateTarget():0===l&&n.endGame()}},n.performOperation=function(e,t){var a,r;switch(n.state.highlightedOperation){case"+":a=e+t;break;case"-":e>t?a=e-t:r="Must be a positive number!";break;case"X":a=e*t;break;case"/":e%t===0?a=e/t:r="Must be a whole number!";break;default:r="Must select an operation!"}return a>999999&&(r="Number is too big!",a=null),r&&n.setState({errorMessage:r,scoreMessage:"",highlightedIndex:null,highlightedOperation:null}),a},n.pickNewRandomNumber=function(){var e=n.state.upcomingNumbers.pop();return 0===n.state.upcomingNumbers.length&&n.refillUpcomingArray(),Number(e)},n.refillUpcomingArray=function(){var e;e=n.state.score<5?[1,2,3,4,5,10]:5<=n.state.score&&n.state.score<10?[1,2,3,5,8,10,25]:[1,2,3,5,8,10,25,100],te(e),n.setState({upcomingNumbers:e})},n.updateTarget=function(){var e,t,a;n.state.score%3===0?(e=30+5*Math.pow(n.state.score,2),t=60+10*Math.pow(n.state.score,2)):(e=30+5*n.state.score,t=60+10*n.state.score);do{a=ee(t,e,1)}while(n.state.numbers.includes(a));n.setState({score:n.state.score+1,target:a,scoreMessage:"Target Reached!",movesRemaining:n.state.movesRemaining+3})},n.endGame=function(){n.setState({gameOver:!0})},n.state={numbers:[],upcomingNumbers:[],target:0,score:0,movesRemaining:0,highlightedOperation:null,highlightedIndex:null,errorMessage:"",scoreMessage:"",gameOver:!1},n}return Object(Z.a)(a,[{key:"componentDidMount",value:function(){this.restartGame()}},{key:"handleNumberClick",value:function(e){this.state.gameOver||(e===this.state.highlightedIndex?this.setState({highlightedIndex:null}):null!=this.state.highlightedOperation&&null!=this.state.highlightedIndex?this.makeMove(e):this.setState({highlightedIndex:e}))}},{key:"handleOperationClick",value:function(e){this.state.gameOver||(e===this.state.highlightedOperation?this.setState({highlightedOperation:null}):null!==this.state.highlightedIndex&&this.setState({highlightedOperation:e}))}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"numbers-game-container"},r.a.createElement("div",{className:"target-container"},r.a.createElement("p",{className:"target-container-label"},"Target:"),r.a.createElement("p",{className:"target-text"},this.state.target)),r.a.createElement("div",{className:"number-box-container"},this.state.numbers.map((function(t,a){return r.a.createElement("div",{key:"number-box-"+a,className:"number-box",onClick:function(){e.handleNumberClick(a)},highlighted:a===e.state.highlightedIndex?"true":null,smalltext:t>999?"true":null},t)}))),r.a.createElement("div",{className:"operation-box-container"},this.operations.map((function(t,a){return r.a.createElement("div",{key:"operation-box-"+a,className:"operation-box",onClick:function(){e.handleOperationClick(t)},highlighted:t===e.state.highlightedOperation?"true":null},t)}))),r.a.createElement("div",{className:"information-container"},r.a.createElement("div",{className:"play-stats"},r.a.createElement("p",null,"Score: ",this.state.score),r.a.createElement("p",null,"Moves Remaining: ",this.state.movesRemaining)),r.a.createElement("div",{show:""!==this.state.errorMessage?"true":null,className:"error-container"},r.a.createElement("p",null,this.state.errorMessage)),r.a.createElement("div",{show:""!==this.state.scoreMessage?"true":null,className:"message-container"},r.a.createElement("p",null,this.state.scoreMessage)),r.a.createElement("div",{show:this.state.gameOver?"true":null,className:"endgame-container"},r.a.createElement("p",null,"No more moves!"),r.a.createElement("button",{className:"play-again-button",onClick:this.restartGame},"Play again?"))))}}]),a}(r.a.Component),ne=a(56),re=a.n(ne);var se=function(){var e=Object(n.useState)(""),t=Object(d.a)(e,2),a=t[0],s=t[1];return fetch(re.a).then((function(e){return e.text()})).then((function(e){return s(e)})),r.a.createElement("div",null,r.a.createElement("p",{className:"page-title"},"Numbers"),r.a.createElement("div",null,r.a.createElement(ae,null)),r.a.createElement("div",{className:"page-section"},r.a.createElement(A.a,{source:a})))};var le=function(){var e=Object(c.f)().name,t={numbers:r.a.createElement(se,null)},a=r.a.createElement("div",null,"Invalid URL: The page for ",e," doesn't exist.");return null!=t[e]&&(a=t[e]),r.a.createElement("div",{className:"page-content"},a)};var ie=function(){return r.a.createElement("div",{className:"page-content"},r.a.createElement("p",{className:"page-title"},"Contact"),r.a.createElement("div",{className:"page-section"},r.a.createElement("p",null,"If you have questions about any of my games, feel free to get in touch with me."),r.a.createElement("p",null,"Twitter: @WSGameDesign")))};a(156);var ce=function(){return r.a.createElement("div",{className:"main-page"},r.a.createElement(u,null),r.a.createElement(i.a,null,r.a.createElement(b,null),r.a.createElement("div",{className:"main-content"},r.a.createElement(c.c,null,r.a.createElement(c.a,{exact:!0,path:"/board-games"},r.a.createElement(C,null)),r.a.createElement(c.a,{path:"/board-games/:name"},r.a.createElement(z,null)),r.a.createElement(c.a,{exact:!0,path:"/digital-games"},r.a.createElement(F,null)),r.a.createElement(c.a,{path:"/digital-games/:name"},r.a.createElement(le,null)),r.a.createElement(c.a,{path:"/contact"},r.a.createElement(ie,null)),r.a.createElement(c.a,{path:"/"},r.a.createElement(N,null))))),r.a.createElement(h,null))};l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(ce,null)),document.getElementById("root"))},20:function(e,t,a){e.exports=a.p+"static/media/Pyxis.c67cadf1.jpg"},31:function(e,t,a){},42:function(e,t,a){e.exports=a.p+"static/media/Background.be79be34.jpeg"},44:function(e,t,a){e.exports=a.p+"static/media/profilePhoto.c6179942.jpg"},45:function(e,t,a){e.exports=a.p+"static/media/Herakles.d5add04a.jpg"},46:function(e,t,a){e.exports=a.p+"static/media/TheVinylAge.6a5d93d9.jpg"},47:function(e,t,a){e.exports=a.p+"static/media/InternsOfHades.2f156d4f.jpeg"},48:function(e,t,a){e.exports=a.p+"static/media/RulesInc.2fe16e90.jpg"},49:function(e,t,a){e.exports=a.p+"static/media/Herakles.a9476b69.md"},50:function(e,t,a){e.exports=a.p+"static/media/TheVinylAge.194b6615.md"},51:function(e,t,a){e.exports=a.p+"static/media/Pyxis.64fd2218.md"},52:function(e,t,a){e.exports=a.p+"static/media/RulesInc.f7f02f9a.md"},53:function(e,t,a){e.exports=a.p+"static/media/InternsOfHades.a7fc08c1.md"},56:function(e,t,a){e.exports=a.p+"static/media/Numbers.ac01ec60.md"},61:function(e,t,a){e.exports=a(158)},66:function(e,t,a){},67:function(e,t,a){},75:function(e,t,a){}},[[61,1,2]]]);
//# sourceMappingURL=main.d7c0b072.chunk.js.map