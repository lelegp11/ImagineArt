import{s as b,e as d,c as v,u as L,t as x,A as P}from"./utils-gaDNL5JK.js";class y{static async getStoreConfig(){const{data:e,error:o}=await b.from("store_config").select("*").eq("id",1).maybeSingle();if(o)throw o;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5)),logo_url:(e==null?void 0:e.logo_url)??null,favicon_url:(e==null?void 0:e.favicon_url)??null}}static async getProducts(){const{data:e,error:o}=await b.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(o)throw o;return(e??[]).map(s=>({...s,custom_fields:Array.isArray(s.custom_fields)?s.custom_fields:[]}))}static async getSchools(){const{data:e,error:o}=await b.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}static async getPaymentMethods(){const{data:e,error:o}=await b.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(o)throw o;return e??[]}}const n={config:{id:1,loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:"",delivery_lead_days:5,logo_url:null,favicon_url:null},products:[],schools:[],paymentMethods:[],cart:[]},T=document.querySelector("#app");function w(){T.innerHTML=`
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
  `}const t=a=>document.getElementById(a);function p(a,e="ok"){const o=t("orderStatus");o.classList.remove("hidden"),o.className=`status ${e}`,o.textContent=a}function $(){const e=t("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function E(){return n.cart.reduce((a,e)=>a+e.sale_price*e.qtd,0)}function C(){return E()+$()}function q(){t("cartCount").textContent=`${n.cart.reduce((a,e)=>a+e.qtd,0)} item(s)`,t("cartTotal").textContent=v(C(),n.config.moeda)}function M(a=""){return'<option value="">Selecione a escola</option>'+n.schools.map(e=>`
    <option value="${d(e.name)}" ${e.name===a?"selected":""}>${d(e.name)}</option>
  `).join("")}function j(){const a=t("filtroCategoria"),e=[...new Set(n.products.map(o=>o.category||"Sem categoria"))];a.innerHTML='<option value="">Todas as categorias</option>'+e.map(o=>`<option value="${d(o)}">${d(o)}</option>`).join("")}function z(){const a=t("buscaCatalogo").value.trim().toLowerCase(),e=t("filtroCategoria").value;return n.products.filter(o=>{const s=[o.name,o.category||"",o.description||""].join(" ").toLowerCase().includes(a),l=!e||(o.category||"Sem categoria")===e;return s&&l})}function _(){const a=t("catalogGrid"),e=z();if(!e.length){a.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}a.innerHTML=e.map(o=>{const l=(o.custom_fields||[]).map((u,r)=>`
      <div>
        <label>${d(u)}</label>
        <input class="input" id="field-${o.id}-${r}" placeholder="${d(u)}">
      </div>
    `).join("");return`
      <div class="product-card">
        <div class="product-image-wrap">${o.image_url?`<img class="product-image" src="${o.image_url}" alt="${d(o.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${d(o.category||"Produto")}</div>
          <div><strong>${d(o.name)}</strong></div>
          <div style="color:#6b7280">${d(o.description||"")}</div>
          <div class="price">${v(o.sale_price,n.config.moeda)}</div>
          <div>
            <label>Escola</label>
            <select class="input" id="school-${o.id}">${M()}</select>
          </div>
          ${l}
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
    `}).join("")}function N(){const a=t("cPagamento");if(!n.paymentMethods.length){a.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}a.innerHTML=n.paymentMethods.map(e=>{const o=e.extra_fee>0?`${e.name} (+ ${v(e.extra_fee,n.config.moeda)})`:e.name;return`<option value="${d(e.name)}" data-fee="${e.extra_fee}">${d(o)}</option>`}).join("")}function g(){var e;q();const a=t("resumoPedido");if(!n.cart.length){a.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}a.innerHTML=n.cart.map(o=>`
    <tr>
      <td>${d(o.nome)}</td>
      <td>${o.qtd}</td>
      <td>${d(o.personalizacao||"—")}</td>
      <td>${v(o.sale_price*o.qtd,n.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${o.id}">Remover</button></td>
    </tr>
  `).join(""),$()>0&&a.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${d(((e=t("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${v($(),n.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function k(a){let e=document.querySelector('link[rel="icon"]');e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),a&&(e.href=a)}function A(){t("storeNameTop").textContent=n.config.loja,t("bannerText").textContent=n.config.banner||"Escolha seus produtos personalizados.";const a=document.getElementById("brandLogoCatalog");a&&(n.config.logo_url?(a.innerHTML=`<img src="${d(n.config.logo_url)}" alt="Logo" class="brand-logo-image">`,a.classList.add("brand-logo-frame")):(a.innerHTML="",a.classList.remove("brand-logo-frame"))),k(n.config.favicon_url)}function B(a,e){const o=t(`qty-${a}`);o.textContent="1";const s=t(`school-${a}`);s&&(s.value=""),e.forEach((l,u)=>{const r=t(`field-${a}-${u}`);r&&(r.value="")})}function O(a){const e=n.products.find(m=>m.id===a);if(!e)return;const o=t(`school-${a}`).value.trim();if(!o){p("Selecione a escola deste produto antes de adicionar.","error");return}const s=Number(t(`qty-${a}`).textContent||"1"),l=e.custom_fields||[];let u="",r="";const i=l.map((m,c)=>{var S;const f=((S=t(`field-${a}-${c}`))==null?void 0:S.value.trim())||"",h=m.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();return(h.includes("crianca")||h==="nome")&&(u=f||u),(h.includes("turma")||h.includes("sala"))&&(r=f||r),f?`${m}: ${f}`:""}).filter(Boolean).join(" | ");n.cart.push({id:L(),productId:e.id,nome:e.name,qtd:s,sale_price:e.sale_price,personalizacao:[o?`Escola: ${o}`:"",i].filter(Boolean).join(" | "),school_name:o,child_name:u,classroom:r}),B(a,l),g(),p("Produto adicionado ao pedido.","ok")}async function H(){if(!n.cart.length)return p("Adicione ao menos um item.","error"),!1;const a=t("cNome").value.trim(),e=t("cTelefone").value.trim(),o=t("cEmail").value.trim(),s=t("cPagamento").value.trim(),l=t("cObs").value.trim();if(!a||!e)return p("Preencha nome e telefone.","error"),!1;const u=[...new Set(n.cart.map(c=>c.school_name).filter(Boolean))],r=[...new Set(n.cart.map(c=>c.child_name).filter(Boolean))],i=[...new Set(n.cart.map(c=>c.classroom).filter(Boolean))],m={client_name:a,phone:e,email:o||null,school_name:u.join(", ")||null,child_name:r.join(", ")||null,classroom:i.join(", ")||null,order_date:x(),payment_method:s||null,notes:l||null,subtotal_amount:E(),extra_fee:$(),total_amount:C(),items:n.cart.map(c=>({productId:c.productId,nome:c.nome,qtd:c.qtd,sale_price:c.sale_price,personalizacao:c.personalizacao,school_name:c.school_name,child_name:c.child_name,classroom:c.classroom}))};return p("Salvando pedido...","warn"),await P.invokePublic("create-order",m),p("Pedido salvo com sucesso!","ok"),!0}async function F(){const a=(n.config.whatsapp||"").replace(/\D/g,"");if(!a){p("Configure o WhatsApp da loja no admin.","error");return}const e=t("cPagamento").value.trim(),o=n.cart.map((i,m)=>[`${m+1}. ${i.qtd}x ${i.nome} — ${v(i.sale_price*i.qtd,n.config.moeda)}`,i.school_name?`   Escola: ${i.school_name}`:"",i.personalizacao?`   Personalização: ${i.personalizacao}`:"",i.child_name?`   Criança: ${i.child_name}`:"",i.classroom?`   Turma/Sala: ${i.classroom}`:""].filter(Boolean).join(`
`)).join(`
`),s=[n.config.mensagem||"Olá! Gostaria de fazer este pedido:","","*Pedido:*",o,"",`*Total:* ${v(C(),n.config.moeda)}`,`*Cliente:* ${t("cNome").value.trim()}`,`*Telefone:* ${t("cTelefone").value.trim()}`,t("cEmail").value.trim()?`*E-mail:* ${t("cEmail").value.trim()}`:"",e?`*Pagamento:* ${e}`:"",t("cObs").value.trim()?`*Observações:* ${t("cObs").value.trim()}`:""].filter(Boolean).join(`
`),l=encodeURIComponent(s),u=`https://wa.me/${a}?text=${l}`,r=window.open("","_blank");try{if(!await H()){r&&r.close();return}n.cart=[],g(),["cNome","cTelefone","cEmail","cObs"].forEach(m=>{t(m).value=""}),r?r.location.href=u:window.location.href=u}catch(i){r&&r.close();const m=i instanceof Error?i.message:"Erro ao salvar ou enviar o pedido.";p(m,"error")}}function R(){document.addEventListener("click",a=>{const e=a.target,o=e.dataset.role,s=e.dataset.id;if(!(!o||!s)){if(o==="inc"||o==="dec"){const l=t(`qty-${s}`),u=Number(l.textContent||"1");l.textContent=String(Math.max(1,u+(o==="inc"?1:-1)))}o==="add"&&O(s),o==="remove-cart"&&(n.cart=n.cart.filter(l=>l.id!==s),g())}}),t("buscaCatalogo").addEventListener("input",_),t("filtroCategoria").addEventListener("change",_),t("cPagamento").addEventListener("change",g),t("openResumo").addEventListener("click",()=>t("resumoCard").classList.remove("hidden")),t("hideResumo").addEventListener("click",()=>t("resumoCard").classList.add("hidden")),t("saveAndSendBtn").addEventListener("click",()=>void F())}async function G(){w(),R();const[a,e,o,s]=await Promise.all([y.getStoreConfig(),y.getProducts(),y.getSchools(),y.getPaymentMethods()]);n.config=a,n.products=e,n.schools=o,n.paymentMethods=s,A(),N(),j(),_(),g()}G().catch(a=>{w(),p(a instanceof Error?a.message:"Erro ao iniciar o catálogo.","error")});
