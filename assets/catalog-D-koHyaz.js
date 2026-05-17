import{s as _,e as l,c as v,u as N,t as k,A as H}from"./utils-DVTfd9aY.js";class C{static async getStoreConfig(){const{data:e,error:a}=await _.from("store_config").select("*").eq("id",1).maybeSingle();if(a)throw a;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:a}=await _.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(t=>({...t,custom_fields:Array.isArray(t.custom_fields)?t.custom_fields:[]}))}static async getSchools(){const{data:e,error:a}=await _.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}static async getPaymentMethods(){const{data:e,error:a}=await _.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]},F=document.querySelector("#app");function q(){F.innerHTML=`
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
  `}const n=o=>document.getElementById(o);function u(o,e="ok"){const a=n("orderStatus");a.classList.remove("hidden"),a.className=`status ${e}`,a.textContent=o}function S(){const e=n("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function A(){return s.cart.reduce((o,e)=>o+e.sale_price*e.qtd,0)}function E(){return A()+S()}function O(){n("cartCount").textContent=`${s.cart.reduce((o,e)=>o+e.qtd,0)} item(s)`,n("cartTotal").textContent=v(E(),s.config.moeda)}function W(o=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${l(e.name)}" ${e.name===o?"selected":""}>${l(e.name)}</option>
  `).join("")}let g="";function z(o=""){return o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim()}function M(){const o=n("filtroCategoria"),e=[...new Set(s.products.map(a=>a.category||"Sem categoria"))].sort((a,t)=>{const i=z(a).includes("touca"),c=z(t).includes("touca");return i&&!c?-1:!i&&c?1:a.localeCompare(t,"pt-BR")});g||(g=e.find(a=>z(a).includes("touca"))||e[0]||""),o.innerHTML=`
    <button type="button" class="category-filter-btn ${g?"":"active"}" data-category="">Todas</button>
    ${e.map(a=>`
      <button type="button" class="category-filter-btn ${a===g?"active":""}" data-category="${l(a)}">
        ${l(a)}
      </button>
    `).join("")}
  `}function R(o){g=o,M(),L()}function D(){const o=n("buscaCatalogo").value.trim().toLowerCase(),e=g;return s.products.filter(a=>{const t=[a.name,a.category||"",a.description||""].join(" ").toLowerCase().includes(o),i=!e||(a.category||"Sem categoria")===e;return t&&i})}function L(){const o=n("catalogGrid"),e=D();if(!e.length){o.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}o.innerHTML=e.map(a=>{const t=a.custom_fields||[],i=a.requires_school!==!1,c=t.map((p,b)=>`
      <div>
        <label>${l(p)}</label>
        <input class="input" id="field-${a.id}-${b}" placeholder="${l(p)}">
      </div>
    `).join(""),m=i?`
          <div>
            <label>Escola</label>
            <select class="input" id="school-${a.id}">${W()}</select>
          </div>`:"",d=i?"":`
          <div>
            <label>Personalização</label>
            <input class="input" id="common-personalization-${a.id}" placeholder="Digite o nome ou detalhe da personalização">
          </div>`;return`
      <div class="product-card">
        <div class="product-image-wrap">${a.image_url?`<img class="product-image" src="${a.image_url}" alt="${l(a.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${l(a.category||"Produto")}</div>
          <div><strong>${l(a.name)}</strong></div>
          <div style="color:#6b7280">${l(a.description||"")}</div>
          <div class="price">${v(a.sale_price,s.config.moeda)}</div>
          ${m}
          ${d}
          ${c}
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
    `}).join("")}function I(){const o=n("cPagamento");if(!s.paymentMethods.length){o.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}o.innerHTML=s.paymentMethods.map(e=>{const a=e.extra_fee>0?`${e.name} (+ ${v(e.extra_fee,s.config.moeda)})`:e.name;return`<option value="${l(e.name)}" data-fee="${e.extra_fee}">${l(a)}</option>`}).join("")}function G(o){const e=[o.school_name?`Escola: ${o.school_name}`:"",o.child_name?`Criança: ${o.child_name}`:"",o.classroom?`Turma/Sala: ${o.classroom}`:"",P(o.personalizacao)].filter(Boolean);return e.length?e.join(" | "):"—"}function h(){var e;O();const o=n("resumoPedido");if(!s.cart.length){o.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}o.innerHTML=s.cart.map(a=>`
    <tr>
      <td>${l(a.nome)}</td>
      <td>${a.qtd}</td>
      <td>${l(G(a))}</td>
      <td>${v(a.sale_price*a.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${a.id}">Remover</button></td>
    </tr>
  `).join(""),S()>0&&o.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${l(((e=n("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${v(S(),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function U(o){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),o&&(e.href=o)}function Q(){n("storeNameTop").textContent=s.config.loja,n("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const o=document.getElementById("brandLogoCatalog");o&&(s.config.logo_url?(o.innerHTML=`<img src="${l(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,o.classList.add("brand-logo-frame")):(o.innerHTML="",o.classList.remove("brand-logo-frame"))),U(s.config.favicon_url)}function V(o,e){const a=n(`qty-${o}`);a.textContent="1";const t=document.getElementById(`school-${o}`);t&&(t.value="");const i=document.getElementById(`common-personalization-${o}`);i&&(i.value=""),e.forEach((c,m)=>{const d=n(`field-${o}-${m}`);d&&(d.value="")})}function B(o){const e=o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function P(o=""){return o.split("|").map(e=>e.trim()).filter(Boolean).filter(e=>{const[a]=e.split(":");return!B(a||e)}).join(" | ")}function J(o){var w,T;const e=s.products.find(f=>f.id===o);if(!e)return;const a=e.requires_school!==!1,t=a&&((w=document.getElementById(`school-${o}`))==null?void 0:w.value.trim())||"";if(a&&!t){u("Selecione a escola deste produto antes de adicionar.","error");return}const i=Number(n(`qty-${o}`).textContent||"1"),c=e.custom_fields||[],m=a?"":((T=document.getElementById(`common-personalization-${o}`))==null?void 0:T.value.trim())||"";let d="",p="";const b=c.map((f,j)=>{var x;const y=((x=n(`field-${o}-${j}`))==null?void 0:x.value.trim())||"";if(!y)return"";const $=f.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return a&&(($.includes("crianca")||$==="nome")&&(d=y||d),($.includes("turma")||$.includes("sala"))&&(p=y||p),B(f))?"":`${f}: ${y}`}).filter(Boolean).join(" | "),r=[m?`Personalização: ${m}`:"",b].filter(Boolean).join(" | ");s.cart.push({id:N(),productId:e.id,nome:e.name,qtd:i,sale_price:e.sale_price,personalizacao:r,school_name:t,child_name:d,classroom:p}),V(o,c),h(),u("Produto adicionado ao pedido.","ok")}function K(o){const e=n("cPagamento").value.trim(),a=s.cart.map((t,i)=>[`${i+1}. ${t.qtd}x ${t.nome} — ${v(t.sale_price*t.qtd,s.config.moeda)}`,t.school_name?`   Escola: ${t.school_name}`:"",P(t.personalizacao)?`   Personalização: ${P(t.personalizacao)}`:"",t.child_name?`   Criança: ${t.child_name}`:"",t.classroom?`   Turma/Sala: ${t.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",o?`Pedido #${o}`:"","","*Pedido:*",a,"",`*Total:* ${v(E(),s.config.moeda)}`,`*Cliente:* ${n("cNome").value.trim()}`,`*Telefone:* ${n("cTelefone").value.trim()}`,n("cEmail").value.trim()?`*E-mail:* ${n("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",n("cObs").value.trim()?`*Observações:* ${n("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function X(o,e){var t;const a=n("orderStatus");a.classList.remove("hidden"),a.className="status ok",a.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${o}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(t=n("copyWhatsappMessageBtn"))==null||t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),u("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{u("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function Y(){if(!s.cart.length)return u("Adicione ao menos um item.","error"),null;const o=n("cNome").value.trim(),e=n("cTelefone").value.trim(),a=n("cEmail").value.trim(),t=n("cPagamento").value.trim(),i=n("cObs").value.trim();if(!o||!e)return u("Preencha nome e telefone.","error"),null;const c=[...new Set(s.cart.map(r=>r.school_name).filter(Boolean))],m=[...new Set(s.cart.map(r=>r.child_name).filter(Boolean))],d=[...new Set(s.cart.map(r=>r.classroom).filter(Boolean))],p={client_name:o,phone:e,email:a||null,school_name:c.join(", ")||null,child_name:m.join(", ")||null,classroom:d.join(", ")||null,order_date:k(),payment_method:t||null,notes:i||null,subtotal_amount:A(),extra_fee:S(),total_amount:E(),items:s.cart.map(r=>({productId:r.productId,nome:r.nome,qtd:r.qtd,sale_price:r.sale_price,personalizacao:P(r.personalizacao),school_name:r.school_name,child_name:r.child_name,classroom:r.classroom}))};return u("Salvando pedido...","warn"),await H.invokePublic("create-order",p)}async function Z(){const o=(s.config.whatsapp||"").replace(/\D/g,"");if(!o){u("Configure o WhatsApp da loja no admin.","error");return}const e=n("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const a=await Y();if(!a)return;const t=K(a.id),i=`https://wa.me/${o}?text=${encodeURIComponent(t)}`;s.cart=[],h(),["cNome","cTelefone","cEmail","cObs"].forEach(c=>{n(c).value=""}),X(i,t),setTimeout(()=>{window.location.href=i},250)}catch(a){const t=a instanceof Error?a.message:"Erro ao salvar o pedido.";u(t,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function ee(){document.addEventListener("click",o=>{const e=o.target,a=e.dataset.role,t=e.dataset.id;if(!(!a||!t)){if(a==="inc"||a==="dec"){const i=n(`qty-${t}`),c=Number(i.textContent||"1");i.textContent=String(Math.max(1,c+(a==="inc"?1:-1)))}a==="add"&&J(t),a==="remove-cart"&&(s.cart=s.cart.filter(i=>i.id!==t),h())}}),n("buscaCatalogo").addEventListener("input",L),n("filtroCategoria").addEventListener("click",o=>{const a=o.target.closest("[data-category]");a&&R(a.dataset.category||"")}),n("cPagamento").addEventListener("change",h),n("openResumo").addEventListener("click",()=>n("resumoCard").classList.remove("hidden")),n("hideResumo").addEventListener("click",()=>n("resumoCard").classList.add("hidden")),n("saveAndSendBtn").addEventListener("click",()=>void Z())}async function ae(){q(),ee();const[o,e,a,t]=await Promise.all([C.getStoreConfig(),C.getProducts(),C.getSchools(),C.getPaymentMethods()]);s.config=o,s.products=e,s.schools=a,s.paymentMethods=t,Q(),I(),M(),L(),h()}ae().catch(o=>{q(),u(o instanceof Error?o.message:"Erro ao iniciar o catálogo.","error")});
