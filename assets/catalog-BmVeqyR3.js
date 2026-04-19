import{s as b,e as l,c as p,u as E,t as w,A as P}from"./utils-gaDNL5JK.js";class y{static async getStoreConfig(){const{data:e,error:o}=await b.from("store_config").select("*").eq("id",1).maybeSingle();if(o)throw o;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:o}=await b.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(o)throw o;return(e??[]).map(i=>({...i,custom_fields:Array.isArray(i.custom_fields)?i.custom_fields:[]}))}static async getSchools(){const{data:e,error:o}=await b.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}static async getPaymentMethods(){const{data:e,error:o}=await b.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}}const n={config:{loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]},T=document.querySelector("#app");function L(){T.innerHTML=`
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
  `}const t=a=>document.getElementById(a);function u(a,e="ok"){const o=t("orderStatus");o.classList.remove("hidden"),o.className=`status ${e}`,o.textContent=a}function $(){const e=t("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function x(){return n.cart.reduce((a,e)=>a+e.sale_price*e.qtd,0)}function C(){return x()+$()}function q(){t("cartCount").textContent=`${n.cart.reduce((a,e)=>a+e.qtd,0)} item(s)`,t("cartTotal").textContent=p(C(),n.config.moeda)}function M(a=""){return'<option value="">Selecione a escola</option>'+n.schools.map(e=>`
    <option value="${l(e.name)}" ${e.name===a?"selected":""}>${l(e.name)}</option>
  `).join("")}function j(){const a=t("filtroCategoria"),e=[...new Set(n.products.map(o=>o.category||"Sem categoria"))];a.innerHTML='<option value="">Todas as categorias</option>'+e.map(o=>`<option value="${l(o)}">${l(o)}</option>`).join("")}function z(){const a=t("buscaCatalogo").value.trim().toLowerCase(),e=t("filtroCategoria").value;return n.products.filter(o=>{const i=[o.name,o.category||"",o.description||""].join(" ").toLowerCase().includes(a),r=!e||(o.category||"Sem categoria")===e;return i&&r})}function _(){const a=t("catalogGrid"),e=z();if(!e.length){a.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}a.innerHTML=e.map(o=>{const r=(o.custom_fields||[]).map((d,s)=>`
      <div>
        <label>${l(d)}</label>
        <input class="input" id="field-${o.id}-${s}" placeholder="${l(d)}">
      </div>
    `).join("");return`
      <div class="product-card">
        <div class="product-image-wrap">${o.image_url?`<img class="product-image" src="${o.image_url}" alt="${l(o.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${l(o.category||"Produto")}</div>
          <div><strong>${l(o.name)}</strong></div>
          <div style="color:#6b7280">${l(o.description||"")}</div>
          <div class="price">${p(o.sale_price,n.config.moeda)}</div>
          <div>
            <label>Escola</label>
            <select class="input" id="school-${o.id}">${M()}</select>
          </div>
          ${r}
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
    `}).join("")}function N(){const a=t("cPagamento");if(!n.paymentMethods.length){a.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}a.innerHTML=n.paymentMethods.map(e=>{const o=e.extra_fee>0?`${e.name} (+ ${p(e.extra_fee,n.config.moeda)})`:e.name;return`<option value="${l(e.name)}" data-fee="${e.extra_fee}">${l(o)}</option>`}).join("")}function g(){var e;q();const a=t("resumoPedido");if(!n.cart.length){a.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}a.innerHTML=n.cart.map(o=>`
    <tr>
      <td>${l(o.nome)}</td>
      <td>${o.qtd}</td>
      <td>${l(o.personalizacao||"—")}</td>
      <td>${p(o.sale_price*o.qtd,n.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${o.id}">Remover</button></td>
    </tr>
  `).join(""),$()>0&&a.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${l(((e=t("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${p($(),n.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function k(a){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),a&&(e.href=a)}function A(){t("storeNameTop").textContent=n.config.loja,t("bannerText").textContent=n.config.banner||"Escolha seus produtos personalizados.";const a=document.getElementById("brandLogoCatalog");a&&(n.config.logo_url?(a.innerHTML=`<img src="${l(n.config.logo_url)}" alt="Logo" class="brand-logo-image">`,a.classList.add("brand-logo-frame")):(a.innerHTML="",a.classList.remove("brand-logo-frame"))),k(n.config.favicon_url)}function B(a,e){const o=t(`qty-${a}`);o.textContent="1";const i=t(`school-${a}`);i&&(i.value=""),e.forEach((r,d)=>{const s=t(`field-${a}-${d}`);s&&(s.value="")})}function O(a){const e=n.products.find(m=>m.id===a);if(!e)return;const o=t(`school-${a}`).value.trim();if(!o){u("Selecione a escola deste produto antes de adicionar.","error");return}const i=Number(t(`qty-${a}`).textContent||"1"),r=e.custom_fields||[];let d="",s="";const v=r.map((m,c)=>{var S;const f=((S=t(`field-${a}-${c}`))==null?void 0:S.value.trim())||"",h=m.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();return(h.includes("crianca")||h==="nome")&&(d=f||d),(h.includes("turma")||h.includes("sala"))&&(s=f||s),f?`${m}: ${f}`:""}).filter(Boolean).join(" | ");n.cart.push({id:E(),productId:e.id,nome:e.name,qtd:i,sale_price:e.sale_price,personalizacao:[o?`Escola: ${o}`:"",v].filter(Boolean).join(" | "),school_name:o,child_name:d,classroom:s}),B(a,r),g(),u("Produto adicionado ao pedido.","ok")}async function H(){if(!n.cart.length)return u("Adicione ao menos um item.","error"),!1;const a=t("cNome").value.trim(),e=t("cTelefone").value.trim(),o=t("cEmail").value.trim(),i=t("cPagamento").value.trim(),r=t("cObs").value.trim();if(!a||!e)return u("Preencha nome e telefone.","error"),!1;const d=[...new Set(n.cart.map(c=>c.school_name).filter(Boolean))],s=[...new Set(n.cart.map(c=>c.child_name).filter(Boolean))],v=[...new Set(n.cart.map(c=>c.classroom).filter(Boolean))],m={client_name:a,phone:e,email:o||null,school_name:d.join(", ")||null,child_name:s.join(", ")||null,classroom:v.join(", ")||null,order_date:w(),payment_method:i||null,notes:r||null,subtotal_amount:x(),extra_fee:$(),total_amount:C(),items:n.cart.map(c=>({productId:c.productId,nome:c.nome,qtd:c.qtd,sale_price:c.sale_price,personalizacao:c.personalizacao,school_name:c.school_name,child_name:c.child_name,classroom:c.classroom}))};return u("Salvando pedido...","warn"),await P.invoke("create-order",m),u("Pedido salvo com sucesso!","ok"),!0}async function F(){const a=(n.config.whatsapp||"").replace(/\D/g,"");if(!a){u("Configure o WhatsApp da loja no admin.","error");return}if(!await H())return;const o=t("cPagamento").value.trim(),i=n.cart.map((s,v)=>[`${v+1}. ${s.qtd}x ${s.nome} — ${p(s.sale_price*s.qtd,n.config.moeda)}`,s.school_name?`   Escola: ${s.school_name}`:"",s.personalizacao?`   Personalização: ${s.personalizacao}`:"",s.child_name?`   Criança: ${s.child_name}`:"",s.classroom?`   Turma/Sala: ${s.classroom}`:""].filter(Boolean).join(`
`)).join(`
`),r=[n.config.mensagem||"Olá! Gostaria de fazer este pedido:","","*Pedido:*",i,"",`*Total:* ${p(C(),n.config.moeda)}`,`*Cliente:* ${t("cNome").value.trim()}`,`*Telefone:* ${t("cTelefone").value.trim()}`,t("cEmail").value.trim()?`*E-mail:* ${t("cEmail").value.trim()}`:"",o?`*Pagamento:* ${o}`:"",t("cObs").value.trim()?`*Observações:* ${t("cObs").value.trim()}`:""].filter(Boolean).join(`
`);n.cart=[],g(),["cNome","cTelefone","cEmail","cObs"].forEach(s=>{t(s).value=""});const d=encodeURIComponent(r);window.open(`https://wa.me/${a}?text=${d}`,"_blank")}function R(){document.addEventListener("click",a=>{const e=a.target,o=e.dataset.role,i=e.dataset.id;if(!(!o||!i)){if(o==="inc"||o==="dec"){const r=t(`qty-${i}`),d=Number(r.textContent||"1");r.textContent=String(Math.max(1,d+(o==="inc"?1:-1)))}o==="add"&&O(i),o==="remove-cart"&&(n.cart=n.cart.filter(r=>r.id!==i),g())}}),t("buscaCatalogo").addEventListener("input",_),t("filtroCategoria").addEventListener("change",_),t("cPagamento").addEventListener("change",g),t("openResumo").addEventListener("click",()=>t("resumoCard").classList.remove("hidden")),t("hideResumo").addEventListener("click",()=>t("resumoCard").classList.add("hidden")),t("saveAndSendBtn").addEventListener("click",()=>void F())}async function G(){L(),R();const[a,e,o,i]=await Promise.all([y.getStoreConfig(),y.getProducts(),y.getSchools(),y.getPaymentMethods()]);n.config=a,n.products=e,n.schools=o,n.paymentMethods=i,A(),N(),j(),_(),g()}G().catch(a=>{L(),u(a instanceof Error?a.message:"Erro ao iniciar o catálogo.","error")});
