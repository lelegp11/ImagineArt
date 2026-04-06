# Como publicar no GitHub Pages

Arquivos incluídos:
- index.html -> catálogo público para clientes
- admin.html -> painel administrativo

## 1) Criar repositório
1. Entre no GitHub.
2. Clique em New repository.
3. Nome sugerido: loja-personalizados
4. Deixe Public.
5. Clique em Create repository.

## 2) Enviar os arquivos
1. Dentro do repositório, clique em Add file > Upload files.
2. Envie index.html e admin.html.
3. Clique em Commit changes.

## 3) Ativar GitHub Pages
1. No repositório, clique em Settings.
2. No menu lateral, clique em Pages.
3. Em Build and deployment, escolha Source = Deploy from a branch.
4. Em Branch, escolha main e a pasta /(root).
5. Clique em Save.
6. Aguarde o GitHub publicar.

## 4) Link do site
O catálogo ficará em um link parecido com:
https://SEU-USUARIO.github.io/loja-personalizados/

## 5) Como abrir o painel admin
O arquivo admin.html ficará em:
https://SEU-USUARIO.github.io/loja-personalizados/admin.html

## 6) Como usar
- Abra admin.html para cadastrar produtos e pedidos.
- Abra a página principal index.html para compartilhar com clientes.
- Os dados ficam salvos no navegador usado. Se quiser usar em outro computador, exporte/importe os dados no próprio sistema.

## 7) Observação importante
Como é HTML puro com localStorage:
- o catálogo do cliente não recebe automaticamente os produtos do admin em outro navegador;
- para uso profissional em múltiplos aparelhos, o próximo passo é conectar Supabase.

Para começar, o ideal é:
- cadastrar e testar no mesmo navegador;
- depois evoluir para banco online.
