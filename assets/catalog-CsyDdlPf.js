import{s as f,e as c,c as p,u as P,t as T,A}from"./utils-aZmsPcRj.js";class h{static async getStoreConfig(){const{data:e,error:a}=await f.from("store_config").select("*").eq("id",1).maybeSingle();if(a)throw a;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:a}=await f.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(n=>({...n,custom_fields:Array.isArray(n.custom_fields)?n.custom_fields:[]}))}static async getSchools(){const{data:e,error:a}=await f.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}static async getPaymentMethods(){const{data:e,error:a}=await f.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}}const s={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]},M=document.querySelector("#app");function L(){M.innerHTML=`
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
  `}const o=t=>document.getElementById(t);function u(t,e="ok"){const a=o("orderStatus");a.classList.remove("hidden"),a.className=`status ${e}`,a.textContent=t}function b(){const e=o("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function w(){return s.cart.reduce((t,e)=>t+e.sale_price*e.qtd,0)}function C(){return w()+b()}function q(){o("cartCount").textContent=`${s.cart.reduce((t,e)=>t+e.qtd,0)} item(s)`,o("cartTotal").textContent=p(C(),s.config.moeda)}function z(t=""){return'<option value="">Selecione a escola</option>'+s.schools.map(e=>`
    <option value="${c(e.name)}" ${e.name===t?"selected":""}>${c(e.name)}</option>
  `).join("")}function N(){const t=o("filtroCategoria"),e=[...new Set(s.products.map(a=>a.category||"Sem categoria"))];t.innerHTML='<option value="">Todas as categorias</option>'+e.map(a=>`<option value="${c(a)}">${c(a)}</option>`).join("")}function j(){const t=o("buscaCatalogo").value.trim().toLowerCase(),e=o("filtroCategoria").value;return s.products.filter(a=>{const n=[a.name,a.category||"",a.description||""].join(" ").toLowerCase().includes(t),i=!e||(a.category||"Sem categoria")===e;return n&&i})}function $(){const t=o("catalogGrid"),e=j();if(!e.length){t.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}t.innerHTML=e.map(a=>{const i=(a.custom_fields||[]).map((l,d)=>`
      <div>
        <label>${c(l)}</label>
        <input class="input" id="field-${a.id}-${d}" placeholder="${c(l)}">
      </div>
    `).join("");return`
      <div class="product-card">
        <div class="product-image-wrap">${a.image_url?`<img class="product-image" src="${a.image_url}" alt="${c(a.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${c(a.category||"Produto")}</div>
          <div><strong>${c(a.name)}</strong></div>
          <div style="color:#6b7280">${c(a.description||"")}</div>
          <div class="price">${p(a.sale_price,s.config.moeda)}</div>
          <div>
            <label>Escola</label>
            <select class="input" id="school-${a.id}">${z()}</select>
          </div>
          ${i}
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
    `}).join("")}function k(){const t=o("cPagamento");if(!s.paymentMethods.length){t.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}t.innerHTML=s.paymentMethods.map(e=>{const a=e.extra_fee>0?`${e.name} (+ ${p(e.extra_fee,s.config.moeda)})`:e.name;return`<option value="${c(e.name)}" data-fee="${e.extra_fee}">${c(a)}</option>`}).join("")}function v(){var e;q();const t=o("resumoPedido");if(!s.cart.length){t.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}t.innerHTML=s.cart.map(a=>`
    <tr>
      <td>${c(a.nome)}</td>
      <td>${a.qtd}</td>
      <td>${c(a.personalizacao||"—")}</td>
      <td>${p(a.sale_price*a.qtd,s.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${a.id}">Remover</button></td>
    </tr>
  `).join(""),b()>0&&t.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${c(((e=o("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${p(b(),s.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function B(t){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),t&&(e.href=t)}function O(){o("storeNameTop").textContent=s.config.loja,o("bannerText").textContent=s.config.banner||"Escolha seus produtos personalizados.";const t=document.getElementById("brandLogoCatalog");t&&(s.config.logo_url?(t.innerHTML=`<img src="${c(s.config.logo_url)}" alt="Logo" class="brand-logo-image">`,t.classList.add("brand-logo-frame")):(t.innerHTML="",t.classList.remove("brand-logo-frame"))),B(s.config.favicon_url)}function F(t,e){const a=o(`qty-${t}`);a.textContent="1";const n=o(`school-${t}`);n&&(n.value=""),e.forEach((i,l)=>{const d=o(`field-${t}-${l}`);d&&(d.value="")})}function E(t){const e=t.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();return e==="nome"||e.includes("nome da crianca")||e.includes("nome crianca")||e.includes("crianca")||e.includes("turma")||e.includes("sala")||e.includes("escola")}function _(t=""){return t.split("|").map(e=>e.trim()).filter(Boolean).filter(e=>{const[a]=e.split(":");return!E(a||e)}).join(" | ")}function H(t){const e=s.products.find(m=>m.id===t);if(!e)return;const a=o(`school-${t}`).value.trim();if(!a){u("Selecione a escola deste produto antes de adicionar.","error");return}const n=Number(o(`qty-${t}`).textContent||"1"),i=e.custom_fields||[];let l="",d="";const y=i.map((m,S)=>{var x;const r=((x=o(`field-${t}-${S}`))==null?void 0:x.value.trim())||"",g=m.normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase();return(g.includes("crianca")||g==="nome")&&(l=r||l),(g.includes("turma")||g.includes("sala"))&&(d=r||d),!r||E(m)?"":`${m}: ${r}`}).filter(Boolean).join(" | ");s.cart.push({id:P(),productId:e.id,nome:e.name,qtd:n,sale_price:e.sale_price,personalizacao:y,school_name:a,child_name:l,classroom:d}),F(t,i),v(),u("Produto adicionado ao pedido.","ok")}function W(t){const e=o("cPagamento").value.trim(),a=s.cart.map((n,i)=>[`${i+1}. ${n.qtd}x ${n.nome} — ${p(n.sale_price*n.qtd,s.config.moeda)}`,n.school_name?`   Escola: ${n.school_name}`:"",_(n.personalizacao)?`   Personalização: ${_(n.personalizacao)}`:"",n.child_name?`   Criança: ${n.child_name}`:"",n.classroom?`   Turma/Sala: ${n.classroom}`:""].filter(Boolean).join(`
`)).join(`
`);return[s.config.mensagem||"Olá! Gostaria de fazer este pedido:",t?`Pedido #${t}`:"","","*Pedido:*",a,"",`*Total:* ${p(C(),s.config.moeda)}`,`*Cliente:* ${o("cNome").value.trim()}`,`*Telefone:* ${o("cTelefone").value.trim()}`,o("cEmail").value.trim()?`*E-mail:* ${o("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",o("cObs").value.trim()?`*Observações:* ${o("cObs").value.trim()}`:""].filter(Boolean).join(`
`)}function R(t,e){var n;const a=o("orderStatus");a.classList.remove("hidden"),a.className="status ok",a.innerHTML=`
    <strong>Pedido salvo com sucesso!</strong><br>
    O WhatsApp deve abrir automaticamente. Se não abrir, use uma das opções abaixo.
    <div class="toolbar" style="margin-top:10px">
      <a class="btn success small" href="${t}" target="_blank" rel="noopener">Abrir WhatsApp</a>
      <button class="btn small" type="button" id="copyWhatsappMessageBtn">Copiar mensagem</button>
    </div>
  `,(n=o("copyWhatsappMessageBtn"))==null||n.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(e),u("Mensagem copiada. Abra o WhatsApp e cole a mensagem para enviar.","ok")}catch{u("Não consegui copiar automaticamente. Use o botão Abrir WhatsApp ou copie manualmente.","warn")}})}async function G(){if(!s.cart.length)return u("Adicione ao menos um item.","error"),null;const t=o("cNome").value.trim(),e=o("cTelefone").value.trim(),a=o("cEmail").value.trim(),n=o("cPagamento").value.trim(),i=o("cObs").value.trim();if(!t||!e)return u("Preencha nome e telefone.","error"),null;const l=[...new Set(s.cart.map(r=>r.school_name).filter(Boolean))],d=[...new Set(s.cart.map(r=>r.child_name).filter(Boolean))],y=[...new Set(s.cart.map(r=>r.classroom).filter(Boolean))],m={client_name:t,phone:e,email:a||null,school_name:l.join(", ")||null,child_name:d.join(", ")||null,classroom:y.join(", ")||null,order_date:T(),payment_method:n||null,notes:i||null,subtotal_amount:w(),extra_fee:b(),total_amount:C(),items:s.cart.map(r=>({productId:r.productId,nome:r.nome,qtd:r.qtd,sale_price:r.sale_price,personalizacao:_(r.personalizacao),school_name:r.school_name,child_name:r.child_name,classroom:r.classroom}))};return u("Salvando pedido...","warn"),await A.invokePublic("create-order",m)}async function D(){const t=(s.config.whatsapp||"").replace(/\D/g,"");if(!t){u("Configure o WhatsApp da loja no admin.","error");return}const e=o("saveAndSendBtn");e.disabled=!0,e.textContent="Salvando pedido...";try{const a=await G();if(!a)return;const n=W(a.id),i=`https://wa.me/${t}?text=${encodeURIComponent(n)}`;s.cart=[],v(),["cNome","cTelefone","cEmail","cObs"].forEach(l=>{o(l).value=""}),R(i,n),setTimeout(()=>{window.location.href=i},250)}catch(a){const n=a instanceof Error?a.message:"Erro ao salvar o pedido.";u(n,"error")}finally{e.disabled=!1,e.textContent="Salvar pedido e enviar no WhatsApp"}}function I(){document.addEventListener("click",t=>{const e=t.target,a=e.dataset.role,n=e.dataset.id;if(!(!a||!n)){if(a==="inc"||a==="dec"){const i=o(`qty-${n}`),l=Number(i.textContent||"1");i.textContent=String(Math.max(1,l+(a==="inc"?1:-1)))}a==="add"&&H(n),a==="remove-cart"&&(s.cart=s.cart.filter(i=>i.id!==n),v())}}),o("buscaCatalogo").addEventListener("input",$),o("filtroCategoria").addEventListener("change",$),o("cPagamento").addEventListener("change",v),o("openResumo").addEventListener("click",()=>o("resumoCard").classList.remove("hidden")),o("hideResumo").addEventListener("click",()=>o("resumoCard").classList.add("hidden")),o("saveAndSendBtn").addEventListener("click",()=>void D())}async function U(){L(),I();const[t,e,a,n]=await Promise.all([h.getStoreConfig(),h.getProducts(),h.getSchools(),h.getPaymentMethods()]);s.config=t,s.products=e,s.schools=a,s.paymentMethods=n,O(),k(),N(),$(),v()}U().catch(t=>{L(),u(t instanceof Error?t.message:"Erro ao iniciar o catálogo.","error")});
