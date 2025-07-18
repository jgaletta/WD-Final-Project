# WebDev-FinalProject

## Tema progetto

È stato implementato il classico gioco Memory che consiste nell'indovinare delle coppie di immagini.

## Requisiti

- **Connessione internet**
- **JSONBin** (vedi "Procedura per creare un database vuoto")

Le immagini del gioco vengono caricate in modo dinamico con il link "https://picsum.photos/200?random=X".

(X = numero dell'immagine random, ogni coppia ha lo stesso numero).

## Procedura per creare un database vuoto

1. Creare un account in [**JSONBin**](https://jsonbin.io/) e accedere al portale.
2. Nella sezione "API-KEY", creare una "X-Access-Key" con permessi di lettura e aggiornamento, in quanto vengono effettuate solo richieste GET e PUT.
3. Nella sezione "BINS" creare un nuovo file con la seguente struttura:

```
{
  "users": [],
  "scores": []
}
```

4. Modificare nel file "assets/js/server.js" del progetto le due variabili globali (URL del file bin e ACCESSKEY).

## Funzionalità implementate

### Pagina iniziale (index.html)

Pagina introduttiva con piccolo memory game. Al passaggio del mouse vengono mostrate le immagini, l'unico elemento cliccabile è il "Play Now" pulsante.
La posizione delle immagini in questo caso è statica (mi è servita questa pagina per implementare la logica del gioco successivamente).

### Login (login.html)

Controllo utente e password (vedi sezione "Gestione sessione utente"). Per accedere, creare un nuovo utente.

### Registrazione utente (register.html)

È possibile registrare un nuovo utente. Viene controllato se l'utente è già stato creato, che la password e la conferma password corrispondano e che la data di nascita sia almeno di 5 anni fa. Non ho implementato limitazioni particolari alla password, quindi nessun carattere minimo e nessuna regola di sicurezza.

### Recupero password (forgot.html)

Procedura composta da 3 passaggi:

1. Inserimento utente, email e data di nascita
2. Risposta alla domanda segreta
3. Inserimento nuova password

### Gioco (game.html)

Cuore dell'applicazione. Una volta avviato, appena si gira una carta, parte il timer di 1 minuto. Al termine del gioco viene salvata la partita e viene mostrata la posizione in classifica del punteggio della partita effettuata (con confronto al punteggio migliore ottenuto).

#### Calcolo del punteggio

- **Coppia indovinata**: +100 punti
- **Combo** (due coppie indovinate consecutive): +100 + 50 = +150 punti
- **Stessa carta girata due volte**: -10 punti
- **Bonus tempo**: 5 punti \* secondi avanzati

### Punteggi (scores.html)

Viene mostrata la classifica di tutte le partite giocate di tutti gli utenti e viene evidenziato il miglior punteggio effettuato dal giocatore.

### Profilo (profile.html)

Si può visualizzare il proprio profilo utente e si possono modificare i propri dati anagrafici e di sicurezza.

## Gestione sessione utente

Lavorando solo con Javascript, ho simulato la sessione utente memorizzando in localStorage lo username dell'utente collegato (vedi "assets/js/session.js").

## API esterne

- [**JSONBin**](https://jsonbin.io/)

Questo portale permette di gestire file JSON tramite richieste fetch.

In assenza di un backend, tutto il database degli utenti e delle partite con i punteggi è stato gestito con un file JSON hostato in questo portale.

La logica server è simulata in javascript manipolando questo file (vedi "assets/js/server.js").
