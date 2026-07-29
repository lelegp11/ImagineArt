import{s as x,e as l,c as y,u as X,t as ee,A as ae}from"./utils-p7IFJXvB.js";class P{static async getStoreConfig(){const{data:e,error:t}=await x.from("store_config").select("*").eq("id",1).maybeSingle();if(t)throw t;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",banner_images:Array.isArray(e==null?void 0:e.banner_images)?e.banner_images:[],delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:t}=await x.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(t)throw t;return(e??[]).map(o=>({...o,custom_fields:Array.isArray(o.custom_fields)?o.custom_fields:[]}))}static async getSchools(){const{data:e,error:t}=await x.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(t)throw t;return e??[]}static async getPaymentMethods(){const{data:e,error:t}=await x.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(t)throw t;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",banner_images:[],delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]};let h=0,$=null;const te=document.querySelector("#app");function D(){te.innerHTML=`
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
  `}const n=a=>document.getElementById(a);function p(a,e="ok"){const t=n("orderStatus");t.classList.remove("hidden"),t.className=`status ${e}`,t.textContent=a}function U(a=""){return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function N(){return U(n("cPagamento").value).includes("pix")?-(j()*.05):0}function j(){return s.cart.reduce((a,e)=>a+e.sale_price*e.qtd,0)}function F(){return j()+N()}function oe(){n("cartCount").textContent=`${s.cart.reduce((a,e)=>a+e.qtd,0)} item(s)`,n("cartTotal").textContent=y(F(),s.config.moeda)}function ne(a=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${l(e.name)}" ${e.name===a?"selected":""}>${l(e.name)}</option>
  `).join("")}let b="",H=!1;function E(a=""){return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function G(a=""){return E(a).replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function Q(){const a="/ImagineArt/".replace(/\/+$/,"");return a===""?"":a}function se(){const a=Q();let e=window.location.pathname||"/";return a&&a!=="/"&&e.startsWith(a)&&(e=e.slice(a.length)||"/"),e.startsWith("/")?e:`/${e}`}function ie(a){const e=se().match(/^\/categoria\/([^/]+)/);if(!e)return null;const t=decodeURIComponent(e[1]||"");return a.find(o=>G(o)===t)||null}function re(a){return a.find(e=>E(e).includes("touca"))||a[0]||""}function T(a){const e=Q(),t=e==="/"?"":e;return a?`${t||""}/categoria/${encodeURIComponent(G(a))}`:`${t||""}/`}function V(a,e=!1){const t=T(a);`${window.location.pathname}${window.location.search}${window.location.hash}`!==t&&window.history[e?"replaceState":"pushState"]({category:a},"",t)}function Y(){return[...new Set(s.products.map(a=>a.category||"Sem categoria"))].sort((a,e)=>{const t=E(a).includes("touca"),o=E(e).includes("touca");return t&&!o?-1:!t&&o?1:a.localeCompare(e,"pt-BR")})}function J(a=!1){const e=Y(),t=ie(e);b=t||(a?re(e):""),H=!0,a&&b&&!t&&V(b,!0)}function R(){const a=n("filtroCategoria"),e=Y();H||J(!0),a.innerHTML=`
    <button type="button" class="category-filter-btn ${b?"":"active"}" data-category="" data-url="${l(T(""))}">Todas</button>
    ${e.map(t=>`
      <button type="button" class="category-filter-btn ${t===b?"active":""}" data-category="${l(t)}" data-url="${l(T(t))}">
        ${l(t)}
      </button>
    `).join("")}
  `}function le(a,e=!0){b=a,H=!0,e&&V(a),R(),L()}function ce(){const a=n("buscaCatalogo").value.trim().toLowerCase(),e=b;return s.products.filter(t=>{const o=[t.name,t.category||"",t.description||""].join(" ").toLowerCase().includes(a),i=!e||(t.category||"Sem categoria")===e;return o&&i})}function L(){const a=n("catalogGrid"),e=ce();if(!e.length){a.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}a.innerHTML=e.map(t=>{const o=t.custom_fields||[],i=t.requires_school!==!1,c=o.map((g,u)=>`
      <div>
        <label>${l(g)}</label>
        <input class="input" id="field-${t.id}-${u}" placeholder="${l(g)}">
      </div>
    `).join(""),d=t.has_sizes?`
          <div>
            <label>Tamanho</label>
            <select class="input" id="size-${t.id}">
              <option value="">Selecione</option>
              <option value="P">P</option>
              <option value="M">M</option>
              <option value="G">G</option>
            </select>
          </div>`:"",m=i?`
          <div>
            <label>Escola</label>
            <select class="input" id="school-${t.id}">${ne()}</select>
          </div>`:"";return`
      <div class="product-card">
        <div class="product-image-wrap ${t.image_url?"clickable-image":""}" ${t.image_url?`data-role="zoom-image" data-src="${l(t.image_url)}" data-name="${l(t.name)}"`:""}>
          ${t.image_url?`<img class="product-image" src="${t.image_url}" alt="${l(t.name)}"><span class="image-zoom-hint">Clique para ampliar</span>`:"<div>Sem imagem</div>"}
        </div>
        <div class="product-info">
          <div class="smallcaps">${l(t.category||"Produto")}</div>
          <div><strong>${l(t.name)}</strong></div>
          <div style="color:#6b7280">${l(t.description||"")}</div>
          <div class="price">${y(t.sale_price,s.config.moeda)}</div>
          ${t.track_stock?`<div class="stock-label ${Number(t.stock_quantity||0)<=0?"sold-out":""}">${Number(t.stock_quantity||0)<=0?"Produto esgotado":`Disponível: ${Math.max(0,Number(t.stock_quantity||0))} unidade(s)`}</div>`:""}
          ${d}
          ${m}
          ${c}
          <div class="toolbar">
            <div class="qty">
              <button type="button" data-role="dec" data-id="${t.id}" ${t.track_stock&&Number(t.stock_quantity||0)<=0?"disabled":""}>−</button>
              <span id="qty-${t.id}">1</span>
              <button type="button" data-role="inc" data-id="${t.id}" ${t.track_stock&&Number(t.stock_quantity||0)<=0?"disabled":""}>+</button>
            </div>
            <button class="btn primary" data-role="add" data-id="${t.id}" ${t.track_stock&&Number(t.stock_quantity||0)<=0?"disabled":""}>${t.track_stock&&Number(t.stock_quantity||0)<=0?"Esgotado":"Adicionar"}</button>
          </div>
        </div>
      </div>
    `}).join("")}function de(){const a=n("cPagamento");if(!s.paymentMethods.length){a.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}a.innerHTML=s.paymentMethods.map(e=>{const o=U(e.name).includes("pix")?`${e.name} (5% de desconto)`:e.name;return`<option value="${l(e.name)}">${l(o)}</option>`}).join("")}function me(a){const e=[a.size?`Tamanho: ${a.size}`:"",a.school_name?`Escola: ${a.school_name}`:"",a.child_name?`Criança: ${a.child_name}`:"",a.classroom?`Turma/Sala: ${a.classroom}`:"",I(a.personalizacao,q(a))].filter(Boolean);return e.length?e.join(" | "):"—"}function _(){var t;oe();const a=n("resumoPedido");if(!s.cart.length){a.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}a.innerHTML=s.cart.map(o=>`
    <tr>
      <td>${l(o.nome)}</td>
      <td>${o.qtd}</td>
      <td>${l(me(o))}</td>
      <td>${y(o.sale_price*o.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${o.id}">Remover</button></td>
    </tr>
  `).join("");const e=N();e<0&&a.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Desconto no Pix (5%)</strong></td>
        <td>—</td>
        <td>${l(((t=n("cPagamento").selectedOptions[0])==null?void 0:t.textContent)||"")}</td>
        <td>− ${y(Math.abs(e),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function ue(a){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),a&&(e.href=a)}function A(){return Array.isArray(s.config.banner_images)?s.config.banner_images.filter(Boolean):[]}function B(){const a=A(),e=document.getElementById("promoBanner"),t=document.getElementById("heroInfoPanel"),o=document.getElementById("promoBannerImg"),i=document.getElementById("promoBannerDots");if(!(!e||!o||!i)){if(!a.length){e.classList.add("hidden"),t==null||t.classList.remove("hidden"),$&&window.clearInterval($),$=null;return}t==null||t.classList.add("hidden"),e.classList.remove("hidden"),h>=a.length&&(h=0),o.src=a[h],i.innerHTML=a.map((c,d)=>`<button type="button" class="promo-dot ${d===h?"active":""}" data-role="banner-dot" data-index="${d}" aria-label="Ir para banner ${d+1}"></button>`).join(""),!$&&a.length>1&&($=window.setInterval(()=>{h=(h+1)%A().length,B()},5e3))}}function W(a){const e=A();e.length&&(h=(h+a+e.length)%e.length,B())}function pe(){n("storeNameTop").textContent=s.config.loja,n("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const a=document.getElementById("brandLogoCatalog");a&&(s.config.logo_url?(a.innerHTML=`<img src="${l(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,a.classList.add("brand-logo-frame")):(a.innerHTML="",a.classList.remove("brand-logo-frame"))),ue(s.config.favicon_url),B()}function ge(a,e){const t=n(`qty-${a}`);t.textContent="1";const o=document.getElementById(`size-${a}`);o&&(o.value="");const i=document.getElementById(`school-${a}`);i&&(i.value=""),e.forEach((c,d)=>{const m=n(`field-${a}-${d}`);m&&(m.value="")})}function K(a){const e=a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function q(a){const e=s.products.find(o=>o.id===a.productId);return(e?e.requires_school!==!1:!!(a.school_name||a.child_name||a.classroom))||!!(a.school_name||a.child_name||a.classroom)}function I(a="",e=!0){return a.split("|").map(t=>t.trim()).filter(Boolean).filter(t=>{if(!e)return!0;const[o]=t.split(":");return!K(o||t)}).join(" | ")}function ve(a){var f,S;const e=s.products.find(v=>v.id===a);if(!e)return;const t=Math.max(0,Number(e.stock_quantity||0)),o=s.cart.filter(v=>v.productId===a).reduce((v,M)=>v+Number(M.qtd||0),0);if(e.track_stock&&t<=0){p("Este produto está esgotado.","error");return}const i=e.requires_school!==!1,c=e.has_sizes&&((f=document.getElementById(`size-${a}`))==null?void 0:f.value.trim())||"";if(e.has_sizes&&!c){p("Selecione o tamanho deste produto antes de adicionar.","error");return}const d=i&&((S=document.getElementById(`school-${a}`))==null?void 0:S.value.trim())||"";if(i&&!d){p("Selecione a escola deste produto antes de adicionar.","error");return}const m=Number(n(`qty-${a}`).textContent||"1");if(e.track_stock&&m+o>t){p(`Quantidade indisponível. Restam ${Math.max(0,t-o)} unidade(s).`,"error");return}const g=e.custom_fields||[];let u="",r="";const z=g.map((v,M)=>{var O;const k=((O=n(`field-${a}-${M}`))==null?void 0:O.value.trim())||"";if(!k)return"";const w=v.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return i&&((w.includes("crianca")||w==="nome")&&(u=k||u),(w.includes("turma")||w.includes("sala"))&&(r=k||r),K(v))?"":`${v}: ${k}`}).filter(Boolean).join(" | ");s.cart.push({id:X(),productId:e.id,nome:e.name,qtd:m,sale_price:e.sale_price,size:c||null,personalizacao:z,school_name:d,child_name:u,classroom:r}),ge(a,g),_(),p("Produto adicionado ao pedido.","ok")}function he(a){const e=n("cPagamento").value.trim(),t=s.cart.map((o,i)=>[`${i+1}. ${o.qtd}x ${o.nome} — ${y(o.sale_price*o.qtd,s.config.moeda)}`,o.size?`   Tamanho: ${o.size}`:"",o.school_name?`   Escola: ${o.school_name}`:"",I(o.personalizacao,q(o))?`   Personalização: ${I(o.personalizacao,q(o))}`:"",o.child_name?`   Criança: ${o.child_name}`:"",o.classroom?`   Turma/Sala: ${o.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",a?`Pedido #${a}`:"","","*Pedido:*",t,"",`*Total:* ${y(F(),s.config.moeda)}`,`*Cliente:* ${n("cNome").value.trim()}`,`*Telefone:* ${n("cTelefone").value.trim()}`,n("cEmail").value.trim()?`*E-mail:* ${n("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",n("cObs").value.trim()?`*Observações:* ${n("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function fe(a,e){var o;const t=n("orderStatus");t.classList.remove("hidden"),t.className="status ok",t.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${a}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(o=n("copyWhatsappMessageBtn"))==null||o.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),p("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{p("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function be(){if(!s.cart.length)return p("Adicione ao menos um item.","error"),null;const a=n("cNome").value.trim(),e=n("cTelefone").value.trim(),t=n("cEmail").value.trim(),o=n("cPagamento").value.trim(),i=n("cObs").value.trim();if(!a||!e)return p("Preencha nome e telefone.","error"),null;const c=[...new Set(s.cart.map(r=>r.school_name).filter(Boolean))],d=[...new Set(s.cart.map(r=>r.child_name).filter(Boolean))],m=[...new Set(s.cart.map(r=>r.classroom).filter(Boolean))],g={client_name:a,phone:e,email:t||null,school_name:c.join(", ")||null,child_name:d.join(", ")||null,classroom:m.join(", ")||null,order_date:ee(),payment_method:o||null,notes:i||null,subtotal_amount:j(),extra_fee:N(),total_amount:F(),items:s.cart.map(r=>({productId:r.productId,nome:r.nome,qtd:r.qtd,sale_price:r.sale_price,personalizacao:I(r.personalizacao,q(r)),school_name:r.school_name,child_name:r.child_name,classroom:r.classroom}))};return p("Salvando pedido...","warn"),await ae.invokePublic("create-order",g)}async function ye(){const a=(s.config.whatsapp||"").replace(/\D/g,"");if(!a){p("Configure o WhatsApp da loja no admin.","error");return}const e=n("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const t=await be();if(!t)return;const o=he(t.id),i=`https://wa.me/${a}?text=${encodeURIComponent(o)}`;s.cart=[],_(),["cNome","cTelefone","cEmail","cObs"].forEach(c=>{n(c).value=""}),fe(i,o),setTimeout(()=>{window.location.href=i},250)}catch(t){const o=t instanceof Error?t.message:"Erro ao salvar o pedido.";p(o,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function $e(a,e){const t=n("imageZoomModal"),o=n("imageZoomImg"),i=n("imageZoomCaption");o.src=a,o.alt=e?`Imagem ampliada de ${e}`:"Imagem ampliada do produto",i.textContent=e||"",t.classList.remove("hidden"),t.setAttribute("aria-hidden","false"),document.body.classList.add("modal-open")}function Z(){const a=document.getElementById("imageZoomModal"),e=document.getElementById("imageZoomImg");a&&(a.classList.add("hidden"),a.setAttribute("aria-hidden","true"),document.body.classList.remove("modal-open"),e&&(e.src=""))}function _e(){document.addEventListener("click",a=>{const e=a.target,t=e.closest('[data-role="zoom-image"]');if(t){$e(t.dataset.src||"",t.dataset.name||"");return}if(e.closest('[data-role="close-image-zoom"]')){Z();return}const i=e.closest('[data-role="banner-prev"], [data-role="banner-next"], [data-role="banner-dot"]');if(i){const m=i.dataset.role;m==="banner-prev"&&W(-1),m==="banner-next"&&W(1),m==="banner-dot"&&(h=Number(i.dataset.index||0),B());return}const c=e.dataset.role,d=e.dataset.id;if(!(!c||!d)){if(c==="inc"||c==="dec"){const m=n(`qty-${d}`),g=Number(m.textContent||"1"),u=s.products.find(f=>f.id===d),r=s.cart.filter(f=>f.productId===d).reduce((f,S)=>f+Number(S.qtd||0),0),C=u!=null&&u.track_stock?Math.max(0,Number(u.stock_quantity||0)-r):Number.POSITIVE_INFINITY,z=Math.max(1,g+(c==="inc"?1:-1));m.textContent=String(Math.min(z,Math.max(1,C))),c==="inc"&&(u!=null&&u.track_stock)&&z>C&&p(`Quantidade máxima disponível: ${Math.max(0,C)} unidade(s).`,"warn")}c==="add"&&ve(d),c==="remove-cart"&&(s.cart=s.cart.filter(m=>m.id!==d),_())}}),document.addEventListener("keydown",a=>{a.key==="Escape"&&Z()}),n("buscaCatalogo").addEventListener("input",L),n("filtroCategoria").addEventListener("click",a=>{const t=a.target.closest("[data-category]");t&&le(t.dataset.category||"")}),n("cPagamento").addEventListener("change",_),n("openResumo").addEventListener("click",()=>n("resumoCard").classList.remove("hidden")),n("hideResumo").addEventListener("click",()=>n("resumoCard").classList.add("hidden")),n("saveAndSendBtn").addEventListener("click",()=>void ye()),window.addEventListener("popstate",()=>{J(!1),R(),L()})}async function Ce(){D(),_e();const[a,e,t,o]=await Promise.all([P.getStoreConfig(),P.getProducts(),P.getSchools(),P.getPaymentMethods()]);s.config=a,s.products=e,s.schools=t,s.paymentMethods=o,pe(),de(),R(),L(),_()}Ce().catch(a=>{D(),p(a instanceof Error?a.message:"Erro ao iniciar o catálogo.","error")});
