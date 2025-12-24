# PokéDex Challenge

Uma aplicação web interativa de Pokédex desenvolvida com Vanilla JavaScript e Vite, seguindo o design fornecido no Figma.

## 🚀 Funcionalidades

- **Listagem de Pokémon**: Exibe uma grade de Pokémon com dados da PokeAPI
- **Busca em tempo real**: Busca Pokémon por nome sem recarregar a página
- **Filtros por tipo**: Filtre Pokémon por tipo usando um campo select
- **Paginação**: Navegação entre páginas com controles intuitivos
- **Dark Theme**: Alternância entre tema claro e escuro com persistência
- **Navegação**: Tela Home e Pokédex com navegação fluida
- **Design responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Cache inteligente**: Otimização de requisições com cache em memória

## 🛠️ Tecnologias

- **Vite**: Build tool e servidor de desenvolvimento
- **Vanilla JavaScript**: JavaScript puro, sem frameworks
- **CSS3**: Estilização moderna com Grid e Flexbox
- **PokeAPI**: API pública para dados de Pokémon

### Justificativa das Ferramentas

**Vite** foi escolhido para:
- Servidor de desenvolvimento rápido com HMR (Hot Module Replacement)
- Build otimizado para produção
- Suporte nativo a ES modules
- Melhor experiência de desenvolvimento sem adicionar complexidade desnecessária

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para rodar o projeto

1. **Clone o repositório** (se aplicável):
```bash
git clone <url-do-repositorio>
cd pokedex-challenge
```

2. **Instale as dependências**:
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

4. **Acesse a aplicação**:
   - Abra seu navegador em `http://localhost:5173` (ou a porta indicada no terminal)
   - O servidor Vite mostrará a URL exata no terminal

### Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview
```

## 🏗️ Estrutura do Projeto

```
pokedex-challenge/
├── index.html              # HTML principal
├── package.json
├── vite.config.js          # Configuração do Vite
├── public/
│   └── logo.svg            # Logo da aplicação
└── src/
    ├── main.js             # Entry point da aplicação
    ├── css/
    │   └── style.css       # Estilos da aplicação
    └── js/
        ├── api.js          # Integração com PokeAPI
        ├── components.js   # Componentes de renderização
        ├── state.js        # Gerenciamento de estado
        ├── theme.js        # Gerenciamento de tema (dark/light)
        └── utils.js        # Funções utilitárias
```

## 🎨 Design

O design segue fielmente o layout do Figma fornecido:
- Header com logo, navegação (Home/Pokédex) e botão de tema
- Tela Home com boas-vindas e call-to-action
- Campo de busca e filtro por tipo lado a lado
- Grid de cards (6 colunas desktop, 3 tablet, 2 mobile)
- Paginação com botões anterior/próximo e números de página

## 📱 Responsividade

- **Desktop** (>1024px): 6 colunas, 18 Pokémon por página
- **Tablet** (768-1024px): 3 colunas
- **Mobile** (<768px): 2 colunas
- **Mobile Pequeno** (<480px): 1 coluna

## 🌓 Dark Theme

A aplicação suporta tema claro e escuro:
- Botão de alternância no header (ícone de sol/lua)
- Preferência salva no localStorage
- Respeita a preferência do sistema na primeira visita
- Transições suaves entre temas

## 🔧 Funcionalidades Técnicas

### Gerenciamento de Estado
- Sistema de estado centralizado com padrão Observer
- Atualizações reativas da UI baseadas em mudanças de estado
- Controle de tela atual (Home/Pokédex)

### Cache
- Cache em memória com duração de 5 minutos
- Reduz requisições desnecessárias à API

### Debounce
- Busca com debounce de 300ms para otimizar performance
- Evita requisições excessivas durante a digitação

### Filtros
- Filtro por tipo de Pokémon usando select
- Combinação de busca por nome e filtro por tipo
- Reset automático de página ao filtrar

### Navegação
- Sistema de navegação entre Home e Pokédex
- Estado persistente durante a navegação
- Links ativos destacados visualmente

### Tratamento de Erros
- Estados de loading, erro e vazio
- Mensagens amigáveis ao usuário
- Fallback para imagens que falham ao carregar

## 📝 Notas de Implementação

- A aplicação carrega inicialmente 1000 Pokémon para permitir busca completa
- Os detalhes são buscados em paralelo para melhor performance
- A paginação funciona tanto com a lista completa quanto com resultados filtrados
- Cores dos tipos de Pokémon seguem a paleta padrão da franquia
- Nomes dos tipos traduzidos para português
- Tema dark com cores otimizadas para contraste e legibilidade

## 🎯 Critérios de Avaliação Atendidos

✅ **Funcionalidade**: Todas as funcionalidades (busca, filtros, paginação, listagem) funcionando corretamente

✅ **Estrutura do Código**: Código organizado em módulos, fácil de entender e manter

✅ **Responsividade**: Layout funciona bem em diferentes dispositivos

✅ **Interatividade**: Busca, filtros e paginação funcionam sem recarregar a página

✅ **Design**: Design segue o modelo do Figma e é agradável de usar

✅ **Uso de Ferramentas**: Vite escolhido adequadamente para melhor DX sem adicionar complexidade

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
