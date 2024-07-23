import{i as y,a as v,S as b}from"./assets/vendor-0f2c19d4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const d={error:"error",success:"success"},L={[d.error]:{backgroundColor:"#EF4040",messageColor:"#FFFFFF"},[d.success]:{backgroundColor:"#59A10D",messageColor:"#FFFFFF"}},u=(s,t=d.error)=>{y.show({...L[t],message:s,messageSize:"16px",position:"topRight",maxWidth:380})},F=v.create({baseURL:"https://pixabay.com/api",params:{key:"45059083-8ad77475a4982aeafbefc4919",image_type:"photo",orientation:"horizontal",safesearch:!0}});class w{static async search(t,a={}){return(await F.get("/",{params:{...a,q:t}})).data}}const S=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,className:"simple-lightbox"}),P=({views:s,comments:t,downloads:a,likes:o})=>`
  <div class="gallery-footer">
    <div class="field"><div class="label">Likes</div><div class="value">${o}</div></div>
    <div class="field"><div class="label">Views</div><div class="value">${s}</div></div>
    <div class="field"><div class="label">Comments</div><div class="value">${t}</div></div>
    <div class="field"><div class="label">Downloads</div><div class="value">${a}</div></div>
  </div>
  `,x=(s=".gallery")=>{const t=document.querySelector(s);t.textContent=""},C=(s,t=".gallery")=>{const a=document.querySelector(t);if(s.length===0){u("Sorry, there are no images matching your search query. Please try again!");return}const o=s.map(({webformatURL:r,largeImageURL:i,tags:n,...p})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${i}">
          <img
            class="gallery-image"
            src="${r}"
            alt="${n}"
          />
        </a>
        ${P(p)}
      </li>
      `).join("");a.insertAdjacentHTML("beforeend",o),S.refresh();const{height:e}=a.firstElementChild.getBoundingClientRect();window.scrollBy({top:e*2,behavior:"smooth"})},q=document.querySelector(".form-pixabay"),f=document.querySelector(".loader"),h=document.querySelector(".load-more"),l={searchQuery:"",page:1,totalPages:1,per_page:15},m=(s=!0)=>{s?f.classList.add("show"):f.classList.remove("show")},c=(s=!0)=>{s?h.classList.add("show"):h.classList.remove("show")},g=async(s={shouldReset:!0})=>{const t=l.searchQuery.trim(),{page:a,totalPages:o,per_page:e}=l,{shouldReset:r}=s;if(!t){u("The search query cannot be empty"),c(!1);return}if(a>o){u("We're sorry, but you've reached the end of search results."),c(!1);return}try{r&&x(),c(!1),m();const{hits:i,totalHits:n}=await w.search(t,{page:a,per_page:e});l.totalPages=Math.ceil(n/e),C(i),++l.page,l.totalPages>1&&c()}catch(i){console.log(i)}finally{m(!1)}};q.addEventListener("submit",function(s){s.preventDefault(),l.searchQuery=this.elements.search.value,l.page=1,l.totalPages=1,g(),this.reset()});h.addEventListener("click",()=>{g({shouldReset:!1})});
//# sourceMappingURL=commonHelpers.js.map
