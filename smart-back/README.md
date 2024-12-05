<h1 align="center">Automação de Ar-Condicionados - SmartSync</h1>

<p align="center">
   <img src="https://raw.githubusercontent.com/danieldemac/jogovida/8398231b303f35c6096c53848474b6abbe2239fb/images/sarmtsync1.png" alt="logo" width="50%" />
</p>

<p align="center">Esta é a primeira versão funcional do projeto SmartSync, desenvolvida para testes e documentação do Back-end. Apesar de funcional, ainda possui algumas limitações.</p>

<h2>Problemas da Versão Atual (0.0.1)</h2>

- [ ] Implementar o controle de múltiplos dispositivos usando o comando "grupos" da API Ewelink.
- [ ] Adicionar novos dispositivos automaticamente através de código.
- [ ] Criar uma funcionalidade para adquirir as informações e o status dos dispositivos.
- [x] Automatizar a obtenção do token de autorização.


<h2>Estrutura do Código</h2>
<p>A estrutura do projeto é organizada da seguinte forma:</p>
<ul>
    <li><strong>src/</strong>: Base do código, contendo todos os arquivos necessários para o funcionamento do sistema.
        <ul>
            <li><strong>client/</strong>: Contém arquivos do usuário administrador para a operação da API.</li>
            <li><strong>config/</strong>: Guarda informações de configuração, incluindo tokens, senhas e contas dos usuários (tanto administradores quanto comuns, dependendo da configuração).</li>
            <li><strong>controller/</strong>: Arquivos responsáveis pelo controle, configuração (potencialmente) e manipulação dos dispositivos Sonoff.</li>
            <li><strong>token/</strong>: Automatização para obtenção e manutenção dos tokens de acesso necessários para o uso da API (em desenvolvimento).</li>
        </ul>
    </li>
</ul>


<h2>Componentes Vitais</h2>
<p>Os seguintes arquivos são essenciais para o funcionamento do projeto:</p>
<ul>
    <li><code>Token.js</code></li>
    <li><code>.env</code></li>
    <li><code>client.js</code> ou <code>ClientConfig.js</code></li>
</ul>

<h2>Pré-requisitos</h2>
<p>Antes de iniciar, certifique-se de ter o <a href="https://nodejs.org/">Node.js</a> instalado em sua máquina. Você pode verificar a instalação com o comando:</p>
<pre><code>node -v</code></pre>

<h2>Instalação</h2>
<ol>
    <li>Clone o repositório:
        <pre><code>git clone https://github.com/thesmartsync/smart-back</code></pre>
    </li>
    <li>Instale as dependências:
        <pre><code>npm install</code></pre>
    </li>
    <li>Instale o pacote completo do Puppeteer:
        <pre><code>npm install puppeteer</code></pre>
    </li>
    <li>(Caso não consiga abrir o chrome) Forçar a instalação do navegador Chrome:
        <pre><code>npx puppeteer browsers install chrome</code></pre>
    </li>
</ol>

<h2>Como Executar</h2>
<p>Para iniciar o projeto, use o comando:</p>
<pre><code>npm start</code></pre>

<h2>Estrutura de Arquivos</h2>
<p>Abaixo está uma breve descrição da função de cada diretório e arquivo principal:</p>
<pre><code>SmartSync/
├── node_modules/          # Dependências do projeto
├── src/                   # Código-fonte principal
│   ├── client/            # Arquivos do usuário administrador para a API
│   ├── config/            # Configurações e credenciais
│   ├── controller/        # Controle e manipulação dos dispositivos Sonoff
│   └── token/             # Automação para obtenção e atualização dos tokens de acesso
├── .gitignore             # Arquivos e pastas ignorados pelo Git
├── package-lock.json      # Controle de versão das dependências
├── package.json           # Informações do projeto e dependências
└── README.md              # Documentação do projeto
</code></pre>

<p>Nota: Este README será atualizado conforme novas funcionalidades e melhorias sejam implementadas.</p>
