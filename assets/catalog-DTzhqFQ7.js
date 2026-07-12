import{s as C,e as i,c as f,u as J,t as K,A as X}from"./utils-C3EQabWy.js";class z{static async getStoreConfig(){const{data:e,error:o}=await C.from("store_config").select("*").eq("id",1).maybeSingle();if(o)throw o;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",banner_images:Array.isArray(e==null?void 0:e.banner_images)?e.banner_images:[],delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:o}=await C.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(o)throw o;return(e??[]).map(t=>({...t,custom_fields:Array.isArray(t.custom_fields)?t.custom_fields:[]}))}static async getSchools(){const{data:e,error:o}=await C.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}static async getPaymentMethods(){const{data:e,error:o}=await C.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",banner_images:[],delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]};let g=0,b=null;const Y=document.querySelector("#app");function R(){Y.innerHTML=`
    <div class="topbar">
      <div class="topbar-inner">
        <div class="brand"><div id="brandLogoCatalog" class="logo"></div><div><div id="storeNameTop">Imagine Art</div><small>Catálogo • Pedido via WhatsApp</small></div></div>
        <div class="toolbar catalog-search-toolbar">
          <input class="input" id="buscaCatalogo" placeholder="Buscar produto" style="max-width:320px">
        </div>
      </div>
    </div>
    <div class="container">
      <section class="promo-carousel-section hidden" id="promoBanner">
        <button type="button" class="promo-nav promo-prev" data-role="banner-prev" aria-label="Banner anterior">‹</button>
        <img id="promoBannerImg" class="promo-banner-img" src="" alt="Promoção Imagine Art">
        <button type="button" class="promo-nav promo-next" data-role="banner-next" aria-label="Próximo banner">›</button>
        <div class="promo-dots" id="promoBannerDots"></div>
      </section>

      <section class="hero">
        <div class="hero-content">
          <div>
            <div class="smallcaps" style="color:#ddd">Catálogo online</div>
            <h1>Escolha seus produtos personalizados.</h1>
            <p id="bannerText">Coleção personalizada pronta para encantar seus clientes.</p>
          </div>
          <div class="hero-panel" id="heroInfoPanel">
            <div class="smallcaps" style="color:#e9d5ff">Como funciona</div>
            <p>Escolha os produtos, informe a personalização e salve o pedido.</p>
          </div>
        </div>
      </section>

      <div class="notice" style="margin-top:16px">
        Selecione os itens, preencha a personalização e clique em <strong>Salvar pedido e enviar no WhatsApp</strong>.
      </div>

      <section class="catalog-layout">
        <aside class="catalog-sidebar">
          <div class="catalog-sidebar-title">Categorias</div>
          <div class="catalog-category-list" id="filtroCategoria"></div>
        </aside>
        <section class="catalog-grid" id="catalogGrid"></section>
      </section>

      <div class="checkout-bar">
        <div>
          <div class="smallcaps">Resumo do pedido</div>
          <div><strong id="cartCount">0 item(s)</strong> • <span id="cartTotal">R$ 0,00</span></div>
        </div>
        <div class="toolbar">
          <button class="btn" id="openResumo">Ver resumo</button>
          <button class="btn success" id="saveAndSendBtn">Salvar pedido e enviar no WhatsApp</button>
        </div>
      </div>

      <div class="checkout-sections" style="margin-top:18px">
        <div class="card checkout-customer-card">
          <h2>Dados do cliente</h2>
          <div class="form-grid checkout-customer-grid">
            <div><label>Nome</label><input class="input" id="cNome"></div>
            <div><label>Telefone</label><input class="input" id="cTelefone"></div>
            <div><label>E-mail</label><input class="input" id="cEmail"></div>
            <div><label>Forma de pagamento</label><select class="input" id="cPagamento"></select></div>
          </div>
          <div class="checkout-customer-notes" style="margin-top:12px">
            <label>Observações gerais</label>
            <input class="input" id="cObs" placeholder="Prazo, detalhes, observações do pedido">
          </div>
          <div id="orderStatus" class="status hidden"></div>
        </div>
        <div class="card hidden checkout-summary-card" id="resumoCard">
          <div class="toolbar">
            <h2 style="margin:0">Resumo do pedido</h2>
            <span class="spacer"></span>
            <button class="btn" id="hideResumo">Fechar</button>
          </div>
          <div class="table-wrap" style="margin-top:14px">
            <table>
              <thead><tr><th>Produto</th><th>Qtd</th><th>Personalização</th><th>Subtotal</th><th>Ação</th></tr></thead>
              <tbody id="resumoPedido"></tbody>
            </table>
          </div>
          <div class="footer-note">Confira tudo antes de salvar ou enviar.</div>
        </div>
      </div>
    </div>

    <div class="image-zoom-modal hidden" id="imageZoomModal" aria-hidden="true">
      <div class="image-zoom-backdrop" data-role="close-image-zoom"></div>
      <div class="image-zoom-content" role="dialog" aria-modal="true" aria-label="Imagem ampliada do produto">
        <button type="button" class="image-zoom-close" data-role="close-image-zoom" aria-label="Fechar imagem">×</button>
        <img id="imageZoomImg" class="image-zoom-img" src="" alt="Imagem do produto">
        <div id="imageZoomCaption" class="image-zoom-caption"></div>
      </div>
    </div>
  `}const n=a=>document.getElementById(a);function u(a,e="ok"){const o=n("orderStatus");o.classList.remove("hidden"),o.className=`status ${e}`,o.textContent=a}function S(){const e=n("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function O(){return s.cart.reduce((a,e)=>a+e.sale_price*e.qtd,0)}function I(){return O()+S()}function ee(){n("cartCount").textContent=`${s.cart.reduce((a,e)=>a+e.qtd,0)} item(s)`,n("cartTotal").textContent=f(I(),s.config.moeda)}function ae(a=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${i(e.name)}" ${e.name===a?"selected":""}>${i(e.name)}</option>
  `).join("")}let v="",q=!1;function w(a=""){return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function W(a=""){return w(a).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Z(){const a="/ImagineArt/".replace(/\/+$/,"");return a===""?"":a}function oe(){const a=Z();let e=window.location.pathname||"/";return a&&a!=="/"&&e.startsWith(a)&&(e=e.slice(a.length)||"/"),e.startsWith("/")?e:`/${e}`}function te(a){const e=oe().match(/^\/categoria\/([^/]+)/);if(!e)return null;const o=decodeURIComponent(e[1]||"");return a.find(t=>W(t)===o)||null}function ne(a){return a.find(e=>w(e).includes("touca"))||a[0]||""}function T(a){const e=Z(),o=e==="/"?"":e;return a?`${o||""}/categoria/${encodeURIComponent(W(a))}`:`${o||""}/`}function U(a,e=!1){const o=T(a);`${window.location.pathname}${window.location.search}${window.location.hash}`!==o&&window.history[e?"replaceState":"pushState"]({category:a},"",o)}function D(){return[...new Set(s.products.map(a=>a.category||"Sem categoria"))].sort((a,e)=>{const o=w(a).includes("touca"),t=w(e).includes("touca");return o&&!t?-1:!o&&t?1:a.localeCompare(e,"pt-BR")})}function G(a=!1){const e=D(),o=te(e);v=o||(a?ne(e):""),q=!0,a&&v&&!o&&U(v,!0)}function M(){const a=n("filtroCategoria"),e=D();q||G(!0),a.innerHTML=`
    <button type="button" class="category-filter-btn ${v?"":"active"}" data-category="" data-url="${i(T(""))}">Todas</button>
    ${e.map(o=>`
      <button type="button" class="category-filter-btn ${o===v?"active":""}" data-category="${i(o)}" data-url="${i(T(o))}">
        ${i(o)}
      </button>
    `).join("")}
  `}function se(a,e=!0){v=a,q=!0,e&&U(a),M(),L()}function re(){const a=n("buscaCatalogo").value.trim().toLowerCase(),e=v;return s.products.filter(o=>{const t=[o.name,o.category||"",o.description||""].join(" ").toLowerCase().includes(a),r=!e||(o.category||"Sem categoria")===e;return t&&r})}function L(){const a=n("catalogGrid"),e=re();if(!e.length){a.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}a.innerHTML=e.map(o=>{const t=o.custom_fields||[],r=o.requires_school!==!1,c=t.map((p,x)=>`
      <div>
        <label>${i(p)}</label>
        <input class="input" id="field-${o.id}-${x}" placeholder="${i(p)}">
      </div>
    `).join(""),d=o.has_sizes?`
          <div>
            <label>Tamanho</label>
            <select class="input" id="size-${o.id}">
              <option value="">Selecione</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
            </select>
          </div>`:"",l=r?`
          <div>
            <label>Escola</label>
            <select class="input" id="school-${o.id}">${ae()}</select>
          </div>`:"";return`
      <div class="product-card">
        <div class="product-image-wrap ${o.image_url?"clickable-image":""}" ${o.image_url?`data-role="zoom-image" data-src="${i(o.image_url)}" data-name="${i(o.name)}"`:""}>
          ${o.image_url?`<img class="product-image" src="${o.image_url}" alt="${i(o.name)}"><span class="image-zoom-hint">Clique para ampliar</span>`:"<div>Sem imagem</div>"}
        </div>
        <div class="product-info">
          <div class="smallcaps">${i(o.category||"Produto")}</div>
          <div><strong>${i(o.name)}</strong></div>
          <div style="color:#6b7280">${i(o.description||"")}</div>
          <div class="price">${f(o.sale_price,s.config.moeda)}</div>
          ${d}
          ${l}
          ${c}
          <div class="toolbar">
            <div class="qty">
              <button type="button" data-role="dec" data-id="${o.id}">−</button>
              <span id="qty-${o.id}">1</span>
              <button type="button" data-role="inc" data-id="${o.id}">+</button>
            </div>
            <button class="btn primary" data-role="add" data-id="${o.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `}).join("")}function ie(){const a=n("cPagamento");if(!s.paymentMethods.length){a.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}a.innerHTML=s.paymentMethods.map(e=>{const o=e.extra_fee>0?`${e.name} (+ ${f(e.extra_fee,s.config.moeda)})`:e.name;return`<option value="${i(e.name)}" data-fee="${e.extra_fee}">${i(o)}</option>`}).join("")}function le(a){const e=[a.size?`Tamanho: ${a.size}`:"",a.school_name?`Escola: ${a.school_name}`:"",a.child_name?`Criança: ${a.child_name}`:"",a.classroom?`Turma/Sala: ${a.classroom}`:"",P(a.personalizacao,E(a))].filter(Boolean);return e.length?e.join(" | "):"—"}function y(){var e;ee();const a=n("resumoPedido");if(!s.cart.length){a.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}a.innerHTML=s.cart.map(o=>`
    <tr>
      <td>${i(o.nome)}</td>
      <td>${o.qtd}</td>
      <td>${i(le(o))}</td>
      <td>${f(o.sale_price*o.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${o.id}">Remover</button></td>
    </tr>
  `).join(""),S()>0&&a.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${i(((e=n("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${f(S(),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function ce(a){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),a&&(e.href=a)}function A(){return Array.isArray(s.config.banner_images)?s.config.banner_images.filter(Boolean):[]}function B(){const a=A(),e=document.getElementById("promoBanner"),o=document.getElementById("heroInfoPanel"),t=document.getElementById("promoBannerImg"),r=document.getElementById("promoBannerDots");if(!(!e||!t||!r)){if(!a.length){e.classList.add("hidden"),o==null||o.classList.remove("hidden"),b&&window.clearInterval(b),b=null;return}o==null||o.classList.add("hidden"),e.classList.remove("hidden"),g>=a.length&&(g=0),t.src=a[g],r.innerHTML=a.map((c,d)=>`<button type="button" class="promo-dot ${d===g?"active":""}" data-role="banner-dot" data-index="${d}" aria-label="Ir para banner ${d+1}"></button>`).join(""),!b&&a.length>1&&(b=window.setInterval(()=>{g=(g+1)%A().length,B()},5e3))}}function F(a){const e=A();e.length&&(g=(g+a+e.length)%e.length,B())}function de(){n("storeNameTop").textContent=s.config.loja,n("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const a=document.getElementById("brandLogoCatalog");a&&(s.config.logo_url?(a.innerHTML=`<img src="${i(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,a.classList.add("brand-logo-frame")):(a.innerHTML="",a.classList.remove("brand-logo-frame"))),ce(s.config.favicon_url),B()}function me(a,e){const o=n(`qty-${a}`);o.textContent="1";const t=document.getElementById(`size-${a}`);t&&(t.value="");const r=document.getElementById(`school-${a}`);r&&(r.value=""),e.forEach((c,d)=>{const l=n(`field-${a}-${d}`);l&&(l.value="")})}function Q(a){const e=a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function E(a){const e=s.products.find(t=>t.id===a.productId);return(e?e.requires_school!==!1:!!(a.school_name||a.child_name||a.classroom))||!!(a.school_name||a.child_name||a.classroom)}function P(a="",e=!0){return a.split("|").map(o=>o.trim()).filter(Boolean).filter(o=>{if(!e)return!0;const[t]=o.split(":");return!Q(t||o)}).join(" | ")}function ue(a){var k,N;const e=s.products.find(h=>h.id===a);if(!e)return;const o=e.requires_school!==!1,t=e.has_sizes&&((k=document.getElementById(`size-${a}`))==null?void 0:k.value.trim())||"";if(e.has_sizes&&!t){u("Selecione o tamanho deste produto antes de adicionar.","error");return}const r=o&&((N=document.getElementById(`school-${a}`))==null?void 0:N.value.trim())||"";if(o&&!r){u("Selecione a escola deste produto antes de adicionar.","error");return}const c=Number(n(`qty-${a}`).textContent||"1"),d=e.custom_fields||[];let l="",p="";const m=d.map((h,V)=>{var j;const $=((j=n(`field-${a}-${V}`))==null?void 0:j.value.trim())||"";if(!$)return"";const _=h.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return o&&((_.includes("crianca")||_==="nome")&&(l=$||l),(_.includes("turma")||_.includes("sala"))&&(p=$||p),Q(h))?"":`${h}: ${$}`}).filter(Boolean).join(" | ");s.cart.push({id:J(),productId:e.id,nome:e.name,qtd:c,sale_price:e.sale_price,size:t||null,personalizacao:m,school_name:r,child_name:l,classroom:p}),me(a,d),y(),u("Produto adicionado ao pedido.","ok")}function pe(a){const e=n("cPagamento").value.trim(),o=s.cart.map((t,r)=>[`${r+1}. ${t.qtd}x ${t.nome} — ${f(t.sale_price*t.qtd,s.config.moeda)}`,t.size?`   Tamanho: ${t.size}`:"",t.school_name?`   Escola: ${t.school_name}`:"",P(t.personalizacao,E(t))?`   Personalização: ${P(t.personalizacao,E(t))}`:"",t.child_name?`   Criança: ${t.child_name}`:"",t.classroom?`   Turma/Sala: ${t.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",a?`Pedido #${a}`:"","","*Pedido:*",o,"",`*Total:* ${f(I(),s.config.moeda)}`,`*Cliente:* ${n("cNome").value.trim()}`,`*Telefone:* ${n("cTelefone").value.trim()}`,n("cEmail").value.trim()?`*E-mail:* ${n("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",n("cObs").value.trim()?`*Observações:* ${n("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function ge(a,e){var t;const o=n("orderStatus");o.classList.remove("hidden"),o.className="status ok",o.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${a}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(t=n("copyWhatsappMessageBtn"))==null||t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),u("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{u("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function ve(){if(!s.cart.length)return u("Adicione ao menos um item.","error"),null;const a=n("cNome").value.trim(),e=n("cTelefone").value.trim(),o=n("cEmail").value.trim(),t=n("cPagamento").value.trim(),r=n("cObs").value.trim();if(!a||!e)return u("Preencha nome e telefone.","error"),null;const c=[...new Set(s.cart.map(m=>m.school_name).filter(Boolean))],d=[...new Set(s.cart.map(m=>m.child_name).filter(Boolean))],l=[...new Set(s.cart.map(m=>m.classroom).filter(Boolean))],p={client_name:a,phone:e,email:o||null,school_name:c.join(", ")||null,child_name:d.join(", ")||null,classroom:l.join(", ")||null,order_date:K(),payment_method:t||null,notes:r||null,subtotal_amount:O(),extra_fee:S(),total_amount:I(),items:s.cart.map(m=>({productId:m.productId,nome:m.nome,qtd:m.qtd,sale_price:m.sale_price,personalizacao:P(m.personalizacao,E(m)),school_name:m.school_name,child_name:m.child_name,classroom:m.classroom}))};return u("Salvando pedido...","warn"),await X.invokePublic("create-order",p)}async function fe(){const a=(s.config.whatsapp||"").replace(/\D/g,"");if(!a){u("Configure o WhatsApp da loja no admin.","error");return}const e=n("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const o=await ve();if(!o)return;const t=pe(o.id),r=`https://wa.me/${a}?text=${encodeURIComponent(t)}`;s.cart=[],y(),["cNome","cTelefone","cEmail","cObs"].forEach(c=>{n(c).value=""}),ge(r,t),setTimeout(()=>{window.location.href=r},250)}catch(o){const t=o instanceof Error?o.message:"Erro ao salvar o pedido.";u(t,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function he(a,e){const o=n("imageZoomModal"),t=n("imageZoomImg"),r=n("imageZoomCaption");t.src=a,t.alt=e?`Imagem ampliada de ${e}`:"Imagem ampliada do produto",r.textContent=e||"",o.classList.remove("hidden"),o.setAttribute("aria-hidden","false"),document.body.classList.add("modal-open")}function H(){const a=document.getElementById("imageZoomModal"),e=document.getElementById("imageZoomImg");a&&(a.classList.add("hidden"),a.setAttribute("aria-hidden","true"),document.body.classList.remove("modal-open"),e&&(e.src=""))}function be(){document.addEventListener("click",a=>{const e=a.target,o=e.closest('[data-role="zoom-image"]');if(o){he(o.dataset.src||"",o.dataset.name||"");return}if(e.closest('[data-role="close-image-zoom"]')){H();return}const r=e.closest('[data-role="banner-prev"], [data-role="banner-next"], [data-role="banner-dot"]');if(r){const l=r.dataset.role;l==="banner-prev"&&F(-1),l==="banner-next"&&F(1),l==="banner-dot"&&(g=Number(r.dataset.index||0),B());return}const c=e.dataset.role,d=e.dataset.id;if(!(!c||!d)){if(c==="inc"||c==="dec"){const l=n(`qty-${d}`),p=Number(l.textContent||"1");l.textContent=String(Math.max(1,p+(c==="inc"?1:-1)))}c==="add"&&ue(d),c==="remove-cart"&&(s.cart=s.cart.filter(l=>l.id!==d),y())}}),document.addEventListener("keydown",a=>{a.key==="Escape"&&H()}),n("buscaCatalogo").addEventListener("input",L),n("filtroCategoria").addEventListener("click",a=>{const o=a.target.closest("[data-category]");o&&se(o.dataset.category||"")}),n("cPagamento").addEventListener("change",y),n("openResumo").addEventListener("click",()=>n("resumoCard").classList.remove("hidden")),n("hideResumo").addEventListener("click",()=>n("resumoCard").classList.add("hidden")),n("saveAndSendBtn").addEventListener("click",()=>void fe()),window.addEventListener("popstate",()=>{G(!1),M(),L()})}async function ye(){R(),be();const[a,e,o,t]=await Promise.all([z.getStoreConfig(),z.getProducts(),z.getSchools(),z.getPaymentMethods()]);s.config=a,s.products=e,s.schools=o,s.paymentMethods=t,de(),ie(),M(),L(),y()}ye().catch(a=>{R(),u(a instanceof Error?a.message:"Erro ao iniciar o catálogo.","error")});
