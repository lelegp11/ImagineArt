import{s as C,e as d,c as g,u as R,t as W,A as Z}from"./utils-C3EQabWy.js";class S{static async getStoreConfig(){const{data:e,error:o}=await C.from("store_config").select("*").eq("id",1).maybeSingle();if(o)throw o;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",banner_images:Array.isArray(e==null?void 0:e.banner_images)?e.banner_images:[],delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:o}=await C.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(o)throw o;return(e??[]).map(t=>({...t,custom_fields:Array.isArray(t.custom_fields)?t.custom_fields:[]}))}static async getSchools(){const{data:e,error:o}=await C.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}static async getPaymentMethods(){const{data:e,error:o}=await C.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",banner_images:[],delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]};let p=0,h=null;const D=document.querySelector("#app");function N(){D.innerHTML=`
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
  `}const n=a=>document.getElementById(a);function u(a,e="ok"){const o=n("orderStatus");o.classList.remove("hidden"),o.className=`status ${e}`,o.textContent=a}function L(){const e=n("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function j(){return s.cart.reduce((a,e)=>a+e.sale_price*e.qtd,0)}function T(){return j()+L()}function G(){n("cartCount").textContent=`${s.cart.reduce((a,e)=>a+e.qtd,0)} item(s)`,n("cartTotal").textContent=g(T(),s.config.moeda)}function U(a=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${d(e.name)}" ${e.name===a?"selected":""}>${d(e.name)}</option>
  `).join("")}let b="",w=!1;function x(a=""){return a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function F(){const a=n("filtroCategoria"),e=[...new Set(s.products.map(o=>o.category||"Sem categoria"))].sort((o,t)=>{const r=x(o).includes("touca"),i=x(t).includes("touca");return r&&!i?-1:!r&&i?1:o.localeCompare(t,"pt-BR")});w||(b=e.find(o=>x(o).includes("touca"))||e[0]||"",w=!0),a.innerHTML=`
    <button type="button" class="category-filter-btn ${b?"":"active"}" data-category="">Todas</button>
    ${e.map(o=>`
      <button type="button" class="category-filter-btn ${o===b?"active":""}" data-category="${d(o)}">
        ${d(o)}
      </button>
    `).join("")}
  `}function Q(a){b=a,w=!0,F(),A()}function V(){const a=n("buscaCatalogo").value.trim().toLowerCase(),e=b;return s.products.filter(o=>{const t=[o.name,o.category||"",o.description||""].join(" ").toLowerCase().includes(a),r=!e||(o.category||"Sem categoria")===e;return t&&r})}function A(){const a=n("catalogGrid"),e=V();if(!e.length){a.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}a.innerHTML=e.map(o=>{const t=o.custom_fields||[],r=o.requires_school!==!1,i=t.map((m,v)=>`
      <div>
        <label>${d(m)}</label>
        <input class="input" id="field-${o.id}-${v}" placeholder="${d(m)}">
      </div>
    `).join(""),l=r?`
          <div>
            <label>Escola</label>
            <select class="input" id="school-${o.id}">${U()}</select>
          </div>`:"";return`
      <div class="product-card">
        <div class="product-image-wrap ${o.image_url?"clickable-image":""}" ${o.image_url?`data-role="zoom-image" data-src="${d(o.image_url)}" data-name="${d(o.name)}"`:""}>
          ${o.image_url?`<img class="product-image" src="${o.image_url}" alt="${d(o.name)}"><span class="image-zoom-hint">Clique para ampliar</span>`:"<div>Sem imagem</div>"}
        </div>
        <div class="product-info">
          <div class="smallcaps">${d(o.category||"Produto")}</div>
          <div><strong>${d(o.name)}</strong></div>
          <div style="color:#6b7280">${d(o.description||"")}</div>
          <div class="price">${g(o.sale_price,s.config.moeda)}</div>
          ${l}
          ${i}
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
    `}).join("")}function J(){const a=n("cPagamento");if(!s.paymentMethods.length){a.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}a.innerHTML=s.paymentMethods.map(e=>{const o=e.extra_fee>0?`${e.name} (+ ${g(e.extra_fee,s.config.moeda)})`:e.name;return`<option value="${d(e.name)}" data-fee="${e.extra_fee}">${d(o)}</option>`}).join("")}function K(a){const e=[a.school_name?`Escola: ${a.school_name}`:"",a.child_name?`Criança: ${a.child_name}`:"",a.classroom?`Turma/Sala: ${a.classroom}`:"",E(a.personalizacao,z(a))].filter(Boolean);return e.length?e.join(" | "):"—"}function y(){var e;G();const a=n("resumoPedido");if(!s.cart.length){a.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}a.innerHTML=s.cart.map(o=>`
    <tr>
      <td>${d(o.nome)}</td>
      <td>${o.qtd}</td>
      <td>${d(K(o))}</td>
      <td>${g(o.sale_price*o.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${o.id}">Remover</button></td>
    </tr>
  `).join(""),L()>0&&a.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${d(((e=n("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${g(L(),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function X(a){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),a&&(e.href=a)}function B(){return Array.isArray(s.config.banner_images)?s.config.banner_images.filter(Boolean):[]}function P(){const a=B(),e=document.getElementById("promoBanner"),o=document.getElementById("heroInfoPanel"),t=document.getElementById("promoBannerImg"),r=document.getElementById("promoBannerDots");if(!(!e||!t||!r)){if(!a.length){e.classList.add("hidden"),o==null||o.classList.remove("hidden"),h&&window.clearInterval(h),h=null;return}o==null||o.classList.add("hidden"),e.classList.remove("hidden"),p>=a.length&&(p=0),t.src=a[p],r.innerHTML=a.map((i,l)=>`<button type="button" class="promo-dot ${l===p?"active":""}" data-role="banner-dot" data-index="${l}" aria-label="Ir para banner ${l+1}"></button>`).join(""),!h&&a.length>1&&(h=window.setInterval(()=>{p=(p+1)%B().length,P()},5e3))}}function M(a){const e=B();e.length&&(p=(p+a+e.length)%e.length,P())}function Y(){n("storeNameTop").textContent=s.config.loja,n("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const a=document.getElementById("brandLogoCatalog");a&&(s.config.logo_url?(a.innerHTML=`<img src="${d(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,a.classList.add("brand-logo-frame")):(a.innerHTML="",a.classList.remove("brand-logo-frame"))),X(s.config.favicon_url),P()}function ee(a,e){const o=n(`qty-${a}`);o.textContent="1";const t=document.getElementById(`school-${a}`);t&&(t.value=""),e.forEach((r,i)=>{const l=n(`field-${a}-${i}`);l&&(l.value="")})}function H(a){const e=a.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function z(a){const e=s.products.find(t=>t.id===a.productId);return(e?e.requires_school!==!1:!!(a.school_name||a.child_name||a.classroom))||!!(a.school_name||a.child_name||a.classroom)}function E(a="",e=!0){return a.split("|").map(o=>o.trim()).filter(Boolean).filter(o=>{if(!e)return!0;const[t]=o.split(":");return!H(t||o)}).join(" | ")}function ae(a){var c;const e=s.products.find(f=>f.id===a);if(!e)return;const o=e.requires_school!==!1,t=o&&((c=document.getElementById(`school-${a}`))==null?void 0:c.value.trim())||"";if(o&&!t){u("Selecione a escola deste produto antes de adicionar.","error");return}const r=Number(n(`qty-${a}`).textContent||"1"),i=e.custom_fields||[];let l="",m="";const q=i.map((f,O)=>{var I;const $=((I=n(`field-${a}-${O}`))==null?void 0:I.value.trim())||"";if(!$)return"";const _=f.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return o&&((_.includes("crianca")||_==="nome")&&(l=$||l),(_.includes("turma")||_.includes("sala"))&&(m=$||m),H(f))?"":`${f}: ${$}`}).filter(Boolean).join(" | ");s.cart.push({id:R(),productId:e.id,nome:e.name,qtd:r,sale_price:e.sale_price,personalizacao:q,school_name:t,child_name:l,classroom:m}),ee(a,i),y(),u("Produto adicionado ao pedido.","ok")}function oe(a){const e=n("cPagamento").value.trim(),o=s.cart.map((t,r)=>[`${r+1}. ${t.qtd}x ${t.nome} — ${g(t.sale_price*t.qtd,s.config.moeda)}`,t.school_name?`   Escola: ${t.school_name}`:"",E(t.personalizacao,z(t))?`   Personalização: ${E(t.personalizacao,z(t))}`:"",t.child_name?`   Criança: ${t.child_name}`:"",t.classroom?`   Turma/Sala: ${t.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",a?`Pedido #${a}`:"","","*Pedido:*",o,"",`*Total:* ${g(T(),s.config.moeda)}`,`*Cliente:* ${n("cNome").value.trim()}`,`*Telefone:* ${n("cTelefone").value.trim()}`,n("cEmail").value.trim()?`*E-mail:* ${n("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",n("cObs").value.trim()?`*Observações:* ${n("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function te(a,e){var t;const o=n("orderStatus");o.classList.remove("hidden"),o.className="status ok",o.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${a}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(t=n("copyWhatsappMessageBtn"))==null||t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),u("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{u("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function ne(){if(!s.cart.length)return u("Adicione ao menos um item.","error"),null;const a=n("cNome").value.trim(),e=n("cTelefone").value.trim(),o=n("cEmail").value.trim(),t=n("cPagamento").value.trim(),r=n("cObs").value.trim();if(!a||!e)return u("Preencha nome e telefone.","error"),null;const i=[...new Set(s.cart.map(c=>c.school_name).filter(Boolean))],l=[...new Set(s.cart.map(c=>c.child_name).filter(Boolean))],m=[...new Set(s.cart.map(c=>c.classroom).filter(Boolean))],v={client_name:a,phone:e,email:o||null,school_name:i.join(", ")||null,child_name:l.join(", ")||null,classroom:m.join(", ")||null,order_date:W(),payment_method:t||null,notes:r||null,subtotal_amount:j(),extra_fee:L(),total_amount:T(),items:s.cart.map(c=>({productId:c.productId,nome:c.nome,qtd:c.qtd,sale_price:c.sale_price,personalizacao:E(c.personalizacao,z(c)),school_name:c.school_name,child_name:c.child_name,classroom:c.classroom}))};return u("Salvando pedido...","warn"),await Z.invokePublic("create-order",v)}async function se(){const a=(s.config.whatsapp||"").replace(/\D/g,"");if(!a){u("Configure o WhatsApp da loja no admin.","error");return}const e=n("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const o=await ne();if(!o)return;const t=oe(o.id),r=`https://wa.me/${a}?text=${encodeURIComponent(t)}`;s.cart=[],y(),["cNome","cTelefone","cEmail","cObs"].forEach(i=>{n(i).value=""}),te(r,t),setTimeout(()=>{window.location.href=r},250)}catch(o){const t=o instanceof Error?o.message:"Erro ao salvar o pedido.";u(t,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function re(a,e){const o=n("imageZoomModal"),t=n("imageZoomImg"),r=n("imageZoomCaption");t.src=a,t.alt=e?`Imagem ampliada de ${e}`:"Imagem ampliada do produto",r.textContent=e||"",o.classList.remove("hidden"),o.setAttribute("aria-hidden","false"),document.body.classList.add("modal-open")}function k(){const a=document.getElementById("imageZoomModal"),e=document.getElementById("imageZoomImg");a&&(a.classList.add("hidden"),a.setAttribute("aria-hidden","true"),document.body.classList.remove("modal-open"),e&&(e.src=""))}function ie(){document.addEventListener("click",a=>{const e=a.target,o=e.closest('[data-role="zoom-image"]');if(o){re(o.dataset.src||"",o.dataset.name||"");return}if(e.closest('[data-role="close-image-zoom"]')){k();return}const r=e.closest('[data-role="banner-prev"], [data-role="banner-next"], [data-role="banner-dot"]');if(r){const m=r.dataset.role;m==="banner-prev"&&M(-1),m==="banner-next"&&M(1),m==="banner-dot"&&(p=Number(r.dataset.index||0),P());return}const i=e.dataset.role,l=e.dataset.id;if(!(!i||!l)){if(i==="inc"||i==="dec"){const m=n(`qty-${l}`),v=Number(m.textContent||"1");m.textContent=String(Math.max(1,v+(i==="inc"?1:-1)))}i==="add"&&ae(l),i==="remove-cart"&&(s.cart=s.cart.filter(m=>m.id!==l),y())}}),document.addEventListener("keydown",a=>{a.key==="Escape"&&k()}),n("buscaCatalogo").addEventListener("input",A),n("filtroCategoria").addEventListener("click",a=>{const o=a.target.closest("[data-category]");o&&Q(o.dataset.category||"")}),n("cPagamento").addEventListener("change",y),n("openResumo").addEventListener("click",()=>n("resumoCard").classList.remove("hidden")),n("hideResumo").addEventListener("click",()=>n("resumoCard").classList.add("hidden")),n("saveAndSendBtn").addEventListener("click",()=>void se())}async function le(){N(),ie();const[a,e,o,t]=await Promise.all([S.getStoreConfig(),S.getProducts(),S.getSchools(),S.getPaymentMethods()]);s.config=a,s.products=e,s.schools=o,s.paymentMethods=t,Y(),J(),F(),A(),y()}le().catch(a=>{N(),u(a instanceof Error?a.message:"Erro ao iniciar o catálogo.","error")});
