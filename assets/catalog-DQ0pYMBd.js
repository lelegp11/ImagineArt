import{s as b,e as l,c as p,u as q,t as A,A as M}from"./utils-hKTv8i0x.js";class y{static async getStoreConfig(){const{data:e,error:a}=await b.from("store_config").select("*").eq("id",1).maybeSingle();if(a)throw a;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:a}=await b.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(t=>({...t,custom_fields:Array.isArray(t.custom_fields)?t.custom_fields:[]}))}static async getSchools(){const{data:e,error:a}=await b.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}static async getPaymentMethods(){const{data:e,error:a}=await b.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]},z=document.querySelector("#app");function L(){z.innerHTML=`
    <div class="topbar">
      <div class="topbar-inner">
        <div class="brand"><div id="brandLogoCatalog" class="logo"></div><div><div id="storeNameTop">Imagine Art</div><small>Catálogo • Pedido via WhatsApp</small></div></div>
        <div class="toolbar">
          <select id="filtroCategoria" class="input" style="max-width:220px"></select>
          <input class="input" id="buscaCatalogo" placeholder="Buscar produto" style="max-width:260px">
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

      <section class="catalog-grid" id="catalogGrid"></section>

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
  `}const n=o=>document.getElementById(o);function u(o,e="ok"){const a=n("orderStatus");a.classList.remove("hidden"),a.className=`status ${e}`,a.textContent=o}function $(){const e=n("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function w(){return s.cart.reduce((o,e)=>o+e.sale_price*e.qtd,0)}function x(){return w()+$()}function j(){n("cartCount").textContent=`${s.cart.reduce((o,e)=>o+e.qtd,0)} item(s)`,n("cartTotal").textContent=p(x(),s.config.moeda)}function N(o=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${l(e.name)}" ${e.name===o?"selected":""}>${l(e.name)}</option>
  `).join("")}function k(){const o=n("filtroCategoria"),e=[...new Set(s.products.map(a=>a.category||"Sem categoria"))];o.innerHTML='<option value="">Todas as categorias</option>'+e.map(a=>`<option value="${l(a)}">${l(a)}</option>`).join("")}function B(){const o=n("buscaCatalogo").value.trim().toLowerCase(),e=n("filtroCategoria").value;return s.products.filter(a=>{const t=[a.name,a.category||"",a.description||""].join(" ").toLowerCase().includes(o),r=!e||(a.category||"Sem categoria")===e;return t&&r})}function S(){const o=n("catalogGrid"),e=B();if(!e.length){o.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}o.innerHTML=e.map(a=>{const t=a.custom_fields||[],r=a.requires_school!==!1,c=t.map((m,v)=>`
      <div>
        <label>${l(m)}</label>
        <input class="input" id="field-${a.id}-${v}" placeholder="${l(m)}">
      </div>
    `).join(""),d=r?`
          <div>
            <label>Escola</label>
            <select class="input" id="school-${a.id}">${N()}</select>
          </div>`:"";return`
      <div class="product-card">
        <div class="product-image-wrap">${a.image_url?`<img class="product-image" src="${a.image_url}" alt="${l(a.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${l(a.category||"Produto")} • ${r?"Escolar":"Venda comum"}</div>
          <div><strong>${l(a.name)}</strong></div>
          <div style="color:#6b7280">${l(a.description||"")}</div>
          <div class="price">${p(a.sale_price,s.config.moeda)}</div>
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
    `}).join("")}function H(){const o=n("cPagamento");if(!s.paymentMethods.length){o.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}o.innerHTML=s.paymentMethods.map(e=>{const a=e.extra_fee>0?`${e.name} (+ ${p(e.extra_fee,s.config.moeda)})`:e.name;return`<option value="${l(e.name)}" data-fee="${e.extra_fee}">${l(a)}</option>`}).join("")}function O(o){const e=[o.school_name?`Escola: ${o.school_name}`:"",o.child_name?`Criança: ${o.child_name}`:"",o.classroom?`Turma/Sala: ${o.classroom}`:"",_(o.personalizacao)].filter(Boolean);return e.length?e.join(" | "):"—"}function g(){var e;j();const o=n("resumoPedido");if(!s.cart.length){o.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}o.innerHTML=s.cart.map(a=>`
    <tr>
      <td>${l(a.nome)}</td>
      <td>${a.qtd}</td>
      <td>${l(O(a))}</td>
      <td>${p(a.sale_price*a.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${a.id}">Remover</button></td>
    </tr>
  `).join(""),$()>0&&o.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${l(((e=n("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${p($(),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function F(o){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),o&&(e.href=o)}function W(){n("storeNameTop").textContent=s.config.loja,n("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const o=document.getElementById("brandLogoCatalog");o&&(s.config.logo_url?(o.innerHTML=`<img src="${l(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,o.classList.add("brand-logo-frame")):(o.innerHTML="",o.classList.remove("brand-logo-frame"))),F(s.config.favicon_url)}function R(o,e){const a=n(`qty-${o}`);a.textContent="1";const t=document.getElementById(`school-${o}`);t&&(t.value=""),e.forEach((r,c)=>{const d=n(`field-${o}-${c}`);d&&(d.value="")})}function P(o){const e=o.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function _(o=""){return o.split("|").map(e=>e.trim()).filter(Boolean).filter(e=>{const[a]=e.split(":");return!P(a||e)}).join(" | ")}function I(o){var C;const e=s.products.find(i=>i.id===o);if(!e)return;const a=e.requires_school!==!1,t=a&&((C=document.getElementById(`school-${o}`))==null?void 0:C.value.trim())||"";if(a&&!t){u("Selecione a escola deste produto antes de adicionar.","error");return}const r=Number(n(`qty-${o}`).textContent||"1"),c=e.custom_fields||[];let d="",m="";const v=c.map((i,T)=>{var E;const f=((E=n(`field-${o}-${T}`))==null?void 0:E.value.trim())||"";if(!f)return"";const h=i.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return a&&((h.includes("crianca")||h==="nome")&&(d=f||d),(h.includes("turma")||h.includes("sala"))&&(m=f||m),P(i))?"":`${i}: ${f}`}).filter(Boolean).join(" | ");s.cart.push({id:q(),productId:e.id,nome:e.name,qtd:r,sale_price:e.sale_price,personalizacao:v,school_name:t,child_name:d,classroom:m}),R(o,c),g(),u("Produto adicionado ao pedido.","ok")}function G(o){const e=n("cPagamento").value.trim(),a=s.cart.map((t,r)=>[`${r+1}. ${t.qtd}x ${t.nome} — ${p(t.sale_price*t.qtd,s.config.moeda)}`,t.school_name?`   Escola: ${t.school_name}`:"",_(t.personalizacao)?`   Personalização: ${_(t.personalizacao)}`:"",t.child_name?`   Criança: ${t.child_name}`:"",t.classroom?`   Turma/Sala: ${t.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",o?`Pedido #${o}`:"","","*Pedido:*",a,"",`*Total:* ${p(x(),s.config.moeda)}`,`*Cliente:* ${n("cNome").value.trim()}`,`*Telefone:* ${n("cTelefone").value.trim()}`,n("cEmail").value.trim()?`*E-mail:* ${n("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",n("cObs").value.trim()?`*Observações:* ${n("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function D(o,e){var t;const a=n("orderStatus");a.classList.remove("hidden"),a.className="status ok",a.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${o}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(t=n("copyWhatsappMessageBtn"))==null||t.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),u("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{u("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function U(){if(!s.cart.length)return u("Adicione ao menos um item.","error"),null;const o=n("cNome").value.trim(),e=n("cTelefone").value.trim(),a=n("cEmail").value.trim(),t=n("cPagamento").value.trim(),r=n("cObs").value.trim();if(!o||!e)return u("Preencha nome e telefone.","error"),null;const c=[...new Set(s.cart.map(i=>i.school_name).filter(Boolean))],d=[...new Set(s.cart.map(i=>i.child_name).filter(Boolean))],m=[...new Set(s.cart.map(i=>i.classroom).filter(Boolean))],v={client_name:o,phone:e,email:a||null,school_name:c.join(", ")||null,child_name:d.join(", ")||null,classroom:m.join(", ")||null,order_date:A(),payment_method:t||null,notes:r||null,subtotal_amount:w(),extra_fee:$(),total_amount:x(),items:s.cart.map(i=>({productId:i.productId,nome:i.nome,qtd:i.qtd,sale_price:i.sale_price,personalizacao:_(i.personalizacao),school_name:i.school_name,child_name:i.child_name,classroom:i.classroom}))};return u("Salvando pedido...","warn"),await M.invokePublic("create-order",v)}async function V(){const o=(s.config.whatsapp||"").replace(/\D/g,"");if(!o){u("Configure o WhatsApp da loja no admin.","error");return}const e=n("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const a=await U();if(!a)return;const t=G(a.id),r=`https://wa.me/${o}?text=${encodeURIComponent(t)}`;s.cart=[],g(),["cNome","cTelefone","cEmail","cObs"].forEach(c=>{n(c).value=""}),D(r,t),setTimeout(()=>{window.location.href=r},250)}catch(a){const t=a instanceof Error?a.message:"Erro ao salvar o pedido.";u(t,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function Q(){document.addEventListener("click",o=>{const e=o.target,a=e.dataset.role,t=e.dataset.id;if(!(!a||!t)){if(a==="inc"||a==="dec"){const r=n(`qty-${t}`),c=Number(r.textContent||"1");r.textContent=String(Math.max(1,c+(a==="inc"?1:-1)))}a==="add"&&I(t),a==="remove-cart"&&(s.cart=s.cart.filter(r=>r.id!==t),g())}}),n("buscaCatalogo").addEventListener("input",S),n("filtroCategoria").addEventListener("change",S),n("cPagamento").addEventListener("change",g),n("openResumo").addEventListener("click",()=>n("resumoCard").classList.remove("hidden")),n("hideResumo").addEventListener("click",()=>n("resumoCard").classList.add("hidden")),n("saveAndSendBtn").addEventListener("click",()=>void V())}async function J(){L(),Q();const[o,e,a,t]=await Promise.all([y.getStoreConfig(),y.getProducts(),y.getSchools(),y.getPaymentMethods()]);s.config=o,s.products=e,s.schools=a,s.paymentMethods=t,W(),H(),k(),S(),g()}J().catch(o=>{L(),u(o instanceof Error?o.message:"Erro ao iniciar o catálogo.","error")});
