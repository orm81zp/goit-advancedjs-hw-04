import{i as y,a as v,S as b}from"./assets/vendor-0f2c19d4.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const d={error:"error",success:"success"},L={[d.error]:{backgroundColor:"#EF4040",messageColor:"#FFFFFF"},[d.success]:{backgroundColor:"#59A10D",messageColor:"#FFFFFF"}},n=(s,t=d.error)=>{y.show({...L[t],message:s,messageSize:"16px",position:"topRight",maxWidth:380})},F=v.create({baseURL:"https://pixabay.com/api",params:{key:"45059083-8ad77475a4982aeafbefc4919",image_type:"photo",orientation:"horizontal",safesearch:!0}});class w{static async search(t,a={}){return(await F.get("/",{params:{...a,q:t}})).data}}const h=document.querySelector(".gallery"),S=new b(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,className:"simple-lightbox"}),P=(s=2)=>{const{height:t}=h.lastElementChild.getBoundingClientRect();window.scrollBy({top:t*s,behavior:"smooth"})},x=({views:s,comments:t,downloads:a,likes:i})=>`
  <div class="gallery-footer">
    <div class="field"><div class="label">Likes</div><div class="value">${i}</div></div>
    <div class="field"><div class="label">Views</div><div class="value">${s}</div></div>
    <div class="field"><div class="label">Comments</div><div class="value">${t}</div></div>
    <div class="field"><div class="label">Downloads</div><div class="value">${a}</div></div>
  </div>
  `,C=()=>{h.textContent=""},E=(s,t={shouldScroll:!0})=>{const{shouldScroll:a}=t,i=s.map(({webformatURL:e,largeImageURL:o,tags:r,...c})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o}">
          <img
            class="gallery-image"
            src="${e}"
            alt="${r}"
          />
        </a>
        ${x(c)}
      </li>
      `).join("");h.insertAdjacentHTML("beforeend",i),S.refresh(),a&&P()},I=document.querySelector(".form-pixabay"),f=document.querySelector(".loader"),u=document.querySelector(".load-more"),l={searchQuery:"",page:1,totalPages:1,per_page:15},g=(s=!0)=>{s?f.classList.add("show"):f.classList.remove("show")},m=(s=!0)=>{s?u.classList.add("show"):u.classList.remove("show")},p=async(s={shouldReset:!0})=>{const t=l.searchQuery.trim(),{page:a,totalPages:i,per_page:e}=l,{shouldReset:o}=s;if(m(!1),!t){n("The search query cannot be empty");return}try{o&&C(),g();const{hits:r,totalHits:c}=await w.search(t,{page:a,per_page:e});if(r.length===0){n("Sorry, there are no images matching your search query. Please try again!");return}l.totalPages=Math.ceil(c/e),E(r,{shouldScroll:!o}),++l.page,l.totalPages>a&&m(),l.page>l.totalPages&&n("We're sorry, but you've reached the end of search results.")}catch(r){console.log(r)}finally{g(!1)}};I.addEventListener("submit",function(s){s.preventDefault(),l.searchQuery=this.elements.search.value,l.page=1,l.totalPages=1,p(),this.reset()});u.addEventListener("click",()=>{p({shouldReset:!1})});
//# sourceMappingURL=commonHelpers.js.map
