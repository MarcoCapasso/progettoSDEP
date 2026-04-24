# 🚗 AutoScout — Progetto SDEP

> Progetto universitario per il corso di **Sistemi Distribuiti e Paralleli**.
> Finto e-commerce in ambito automobilistico con autenticazione utente, catalogo prodotti e simulazione d'acquisto.

---

## 📸 Funzionalità principali

| Feature | Descrizione |
|---|---|
| 🔐 **Login / Registrazione** | Autenticazione utente con sessioni protette |
| 🚘 **Catalogo prodotti** | Visualizzazione di veicoli e annunci disponibili |
| ➕ **Inserimento prodotti** | Gli utenti registrati possono pubblicare nuovi annunci |
| 🛒 **Acquisto simulato** | Flusso di acquisto finto per testare l'esperienza e-commerce |

---

## 🛠️ Tecnologie

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

- **TypeScript** — linguaggio principale (frontend e backend)
- **Node.js** — runtime del server
- **HTML / CSS** — struttura e stile dell'interfaccia

---

## 📂 Struttura del progetto

```
progettoSDEP/
├── backend/         # Server, API, logica di business
├── frontend/        # Interfaccia utente
└── package-lock.json
```

---

## ⚡ Avvio locale

### Prerequisiti

- Node.js >= 18
- npm installato

### Installazione

1. **Clona il repo**

   ```bash
   git clone https://github.com/MarcoCapasso/progettoSDEP.git
   cd progettoSDEP
   ```

2. **Installa le dipendenze del backend**

   ```bash
   cd backend
   npm install
   ```

3. **Installa le dipendenze del frontend**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Avvia il backend**

   ```bash
   cd ../backend
   npm start
   ```

5. **Avvia il frontend**

   ```bash
   cd ../frontend
   npm start
   ```

---

## 🎓 Contesto accademico

Questo progetto è stato sviluppato come elaborato per il corso di **Sistemi Distribuiti e Paralleli** (SDEP).
L'obiettivo era progettare e implementare un'applicazione web distribuita con architettura client-server, simulando un caso d'uso reale (e-commerce).

---

## 📄 Licenza

Progetto a scopo didattico. 
