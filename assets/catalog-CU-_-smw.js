import{s as $,e as l,c as p,u as N,t as j,A as F}from"./utils-BN85b1KX.js";class _{static async getStoreConfig(){const{data:e,error:a}=await $.from("store_config").select("*").eq("id",1).maybeSingle();if(a)throw a;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:a}=await $.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(t=>({...t,custom_fields:Array.isArray(t.custom_fields)?t.custom_fields:[]}))}static async getSchools(){const{data:e,error:a}=await $.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}static async getPaymentMethods(){const{data:e,error:a}=await $.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]},I=document.querySelector("#app");function q(){I.innerHTML=`
    <div class="topbar">
      <div class="topbar-inner">
        <div class="brand"><div id="brandLogoCatalog" class="logo"></div><div><div id="storeNameTop">Imagine Art</div><small>Catálogo • Pedido via WhatsApp</small></div></div>
        <div class="toolbar catalog-search-toolbar">
          <input class="input" id="buscaCatalogo" placeholder="Buscar produto" style="max-width:320px">
        </div>
      </div>
    </div>
    <div class="container">
      <section class="hero">
        <div class="hero-content">
          <div>
            <div class="smallcaps" style="color:#ddd">Catálogo online</div>
            <h1>Escolha seus produtos personalizados.</h1>
            <p id="bannerText">Coleção personalizada pronta para encantar seus clientes.</p>
          </div>
          <div class="hero-panel">
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
  `}const n=o=>document.getElementById(o);function u(o,e="ok"){const a=n("orderStatus");a.classList.remove("hidden"),a.className=`status ${e}`,a.textContent=o}function C(){const e=n("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function A(){return s.cart.reduce((o,e)=>o+e.sale_price*e.qtd,0)}function E(){return A()+C()}function H(){n("cartCount").textContent=`${s.cart.reduce((o,e)=>o+e.qtd,0)} item(s)`,n("cartTotal").textContent=p(E(),s.config.moeda)}function O(o=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${l(e.name)}" ${e.name===o?"selected":""}>${l(e.name)}</option>
  `).join("")}let v="",L=!1;function z(o=""){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function M(){const o=n("filtroCategoria"),e=[...new Set(s.products.map(a=>a.category||"Sem categoria"))].sort((a,t)=>{const i=z(a).includes("touca"),r=z(t).includes("touca");return i&&!r?-1:!i&&r?1:a.localeCompare(t,"pt-BR")});L||(v=e.find(a=>z(a).includes("touca"))||e[0]||"",L=!0),o.innerHTML=`
    <button type="button" class="category-filter-btn ${v?"":"active"}" data-category="">Todas</button>
    ${e.map(a=>`
      <button type="button" class="category-filter-btn ${a===v?"active":""}" data-category="${l(a)}">
        ${l(a)}
      </button>
    `).join("")}
  `}function W(o){v=o,L=!0,M(),T()}function R(){const o=n("buscaCatalogo").value.trim().toLowerCase(),e=v;return s.products.filter(a=>{const t=[a.name,a.category||"",a.description||""].join(" ").toLowerCase().includes(o),i=!e||(a.category||"Sem categoria")===e;return t&&i})}function T(){const o=n("catalogGrid"),e=R();if(!e.length){o.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}o.innerHTML=e.map(a=>{const t=a.custom_fields||[],i=a.requires_school!==!1,r=t.map((m,h)=>`
      <div>
        <label>${l(m)}</label>
        <input class="input" id="field-${a.id}-${h}" placeholder="${l(m)}">
      </div>
    `).join(""),d=i?`
          <div>
            <label>Escola</label>
            <select class="input" id="school-${a.id}">${O()}</select>
          </div>`:"";return`
      <div class="product-card">
        <div class="product-image-wrap ${a.image_url?"clickable-image":""}" ${a.image_url?`data-role="zoom-image" data-src="${l(a.image_url)}" data-name="${l(a.name)}"`:""}>
          ${a.image_url?`<img class="product-image" src="${a.image_url}" alt="${l(a.name)}"><span class="image-zoom-hint">Clique para ampliar</span>`:"<div>Sem imagem</div>"}
        </div>
        <div class="product-info">
          <div class="smallcaps">${l(a.category||"Produto")}</div>
          <div><strong>${l(a.name)}</strong></div>
          <div style="color:#6b7280">${l(a.description||"")}</div>
          <div class="price">${p(a.sale_price,s.config.moeda)}</div>
          ${d}
          ${r}
          <div class="toolbar">
            <div class="qty">
              <button type="button" data-role="dec" data-id="${a.id}">−</button>
              <span id="qty-${a.id}">1</span>
              <button type="button" data-role="inc" data-id="${a.id}">+</button>
            </div>
            <button class="btn primary" data-role="add" data-id="${a.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `}).join("")}function Z(){const o=n("cPagamento");if(!s.paymentMethods.length){o.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}o.innerHTML=s.paymentMethods.map(e=>{const a=e.extra_fee>0?`${e.name} (+ ${p(e.extra_fee,s.config.moeda)})`:e.name;return`<option value="${l(e.name)}" data-fee="${e.extra_fee}">${l(a)}</option>`}).join("")}function D(o){const e=[o.school_name?`Escola: ${o.school_name}`:"",o.child_name?`Criança: ${o.child_name}`:"",o.classroom?`Turma/Sala: ${o.classroom}`:"",S(o.personalizacao)].filter(Boolean);return e.length?e.join(" | "):"—"}function f(){var e;H();const o=n("resumoPedido");if(!s.cart.length){o.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}o.innerHTML=s.cart.map(a=>`
    <tr>
      <td>${l(a.nome)}</td>
      <td>${a.qtd}</td>
      <td>${l(D(a))}</td>
      <td>${p(a.sale_price*a.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${a.id}">Remover</button></td>
    </tr>
  `).join(""),C()>0&&o.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${l(((e=n("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${p(C(),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function G(o){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),o&&(e.href=o)}function U(){n("storeNameTop").textContent=s.config.loja,n("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const o=document.getElementById("brandLogoCatalog");o&&(s.config.logo_url?(o.innerHTML=`<img src="${l(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,o.classList.add("brand-logo-frame")):(o.innerHTML="",o.classList.remove("brand-logo-frame"))),G(s.config.favicon_url)}function Q(o,e){const a=n(`qty-${o}`);a.textContent="1";const t=document.getElementById(`school-${o}`);t&&(t.value=""),e.forEach((i,r)=>{const d=n(`field-${o}-${r}`);d&&(d.value="")})}function k(o){const e=o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function S(o=""){return o.split("|").map(e=>e.trim()).filter(Boolean).filter(e=>{const[a]=e.split(":");return!k(a||e)}).join(" | ")}function V(o){var c;const e=s.products.find(g=>g.id===o);if(!e)return;const a=e.requires_school!==!1,t=a&&((c=document.getElementById(`school-${o}`))==null?void 0:c.value.trim())||"";if(a&&!t){u("Selecione a escola deste produto antes de adicionar.","error");return}const i=Number(n(`qty-${o}`).textContent||"1"),r=e.custom_fields||[];let d="",m="";const w=r.map((g,B)=>{var x;const b=((x=n(`field-${o}-${B}`))==null?void 0:x.value.trim())||"";if(!b)return"";const y=g.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return a&&((y.includes("crianca")||y==="nome")&&(d=b||d),(y.includes("turma")||y.includes("sala"))&&(m=b||m),k(g))?"":`${g}: ${b}`}).filter(Boolean).join(" | ");s.cart.push({id:N(),productId:e.id,nome:e.name,qtd:i,sale_price:e.sale_price,personalizacao:w,school_name:t,child_name:d,classroom:m}),Q(o,r),f(),u("Produto adicionado ao pedido.","ok")}function J(o){const e=n("cPagamento").value.trim(),a=s.cart.map((t,i)=>[`${i+1}. ${t.qtd}x ${t.nome} — ${p(t.sale_price*t.qtd,s.config.moeda)}`,t.school_name?`   Escola: ${t.school_name}`:"",S(t.personalizacao)?`   Personalização: ${S(t.personalizacao)}`:"",t.child_name?`   Criança: ${t.child_name}`:"",t.classroom?`   Turma/Sala: ${t.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",o?`Pedido #${o}`:"","","*Pedido:*",a,"",`*Total:* ${p(E(),s.config.moeda)}`,`*Cliente:* ${n("cNome").value.trim()}`,`*Telefone:* ${n("cTelefone").value.trim()}`,n("cEmail").value.trim()?`*E-mail:* ${n("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",n("cObs").value.trim()?`*Observações:* ${n("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function K(o,e){var t;const a=n("orderStatus");a.classList.remove("hidden"),a.className="status ok",a.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${o}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(t=n("copyWhatsappMessageBtn"))==null||t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),u("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{u("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function X(){if(!s.cart.length)return u("Adicione ao menos um item.","error"),null;const o=n("cNome").value.trim(),e=n("cTelefone").value.trim(),a=n("cEmail").value.trim(),t=n("cPagamento").value.trim(),i=n("cObs").value.trim();if(!o||!e)return u("Preencha nome e telefone.","error"),null;const r=[...new Set(s.cart.map(c=>c.school_name).filter(Boolean))],d=[...new Set(s.cart.map(c=>c.child_name).filter(Boolean))],m=[...new Set(s.cart.map(c=>c.classroom).filter(Boolean))],h={client_name:o,phone:e,email:a||null,school_name:r.join(", ")||null,child_name:d.join(", ")||null,classroom:m.join(", ")||null,order_date:j(),payment_method:t||null,notes:i||null,subtotal_amount:A(),extra_fee:C(),total_amount:E(),items:s.cart.map(c=>({productId:c.productId,nome:c.nome,qtd:c.qtd,sale_price:c.sale_price,personalizacao:S(c.personalizacao),school_name:c.school_name,child_name:c.child_name,classroom:c.classroom}))};return u("Salvando pedido...","warn"),await F.invokePublic("create-order",h)}async function Y(){const o=(s.config.whatsapp||"").replace(/\D/g,"");if(!o){u("Configure o WhatsApp da loja no admin.","error");return}const e=n("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const a=await X();if(!a)return;const t=J(a.id),i=`https://wa.me/${o}?text=${encodeURIComponent(t)}`;s.cart=[],f(),["cNome","cTelefone","cEmail","cObs"].forEach(r=>{n(r).value=""}),K(i,t),setTimeout(()=>{window.location.href=i},250)}catch(a){const t=a instanceof Error?a.message:"Erro ao salvar o pedido.";u(t,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function ee(o,e){const a=n("imageZoomModal"),t=n("imageZoomImg"),i=n("imageZoomCaption");t.src=o,t.alt=e?`Imagem ampliada de ${e}`:"Imagem ampliada do produto",i.textContent=e||"",a.classList.remove("hidden"),a.setAttribute("aria-hidden","false"),document.body.classList.add("modal-open")}function P(){const o=document.getElementById("imageZoomModal"),e=document.getElementById("imageZoomImg");o&&(o.classList.add("hidden"),o.setAttribute("aria-hidden","true"),document.body.classList.remove("modal-open"),e&&(e.src=""))}function ae(){document.addEventListener("click",o=>{const e=o.target,a=e.closest('[data-role="zoom-image"]');if(a){ee(a.dataset.src||"",a.dataset.name||"");return}if(e.closest('[data-role="close-image-zoom"]')){P();return}const i=e.dataset.role,r=e.dataset.id;if(!(!i||!r)){if(i==="inc"||i==="dec"){const d=n(`qty-${r}`),m=Number(d.textContent||"1");d.textContent=String(Math.max(1,m+(i==="inc"?1:-1)))}i==="add"&&V(r),i==="remove-cart"&&(s.cart=s.cart.filter(d=>d.id!==r),f())}}),document.addEventListener("keydown",o=>{o.key==="Escape"&&P()}),n("buscaCatalogo").addEventListener("input",T),n("filtroCategoria").addEventListener("click",o=>{const a=o.target.closest("[data-category]");a&&W(a.dataset.category||"")}),n("cPagamento").addEventListener("change",f),n("openResumo").addEventListener("click",()=>n("resumoCard").classList.remove("hidden")),n("hideResumo").addEventListener("click",()=>n("resumoCard").classList.add("hidden")),n("saveAndSendBtn").addEventListener("click",()=>void Y())}async function oe(){q(),ae();const[o,e,a,t]=await Promise.all([_.getStoreConfig(),_.getProducts(),_.getSchools(),_.getPaymentMethods()]);s.config=o,s.products=e,s.schools=a,s.paymentMethods=t,U(),Z(),M(),T(),f()}oe().catch(o=>{q(),u(o instanceof Error?o.message:"Erro ao iniciar o catálogo.","error")});
