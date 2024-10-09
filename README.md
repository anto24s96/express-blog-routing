# Esercizio - express-blog-routing

Usando l'array dei post fornito con le relative immagini, creare un file di routing (`routers/posts.js`) che conterrà le rotte necessarie per l'entità post. All'interno creare le seguenti rotte:

1. **/** - index: ritornerà un HTML con una `ul` che stamperà la lista dei post.
2. **/:slug** - show: tramite il parametro dinamico che rappresenta lo slug del post, ritornerà un JSON con i dati del post.
3. **/create** - create: ritornerà un semplice HTML con un `h1` con scritto "Creazione nuovo post" e nel caso venga richiesta una risposta diversa da HTML lancerà un errore 406.
4. **/:slug/download** - download: dovrà far scaricare l’immagine del post rappresentato dallo slug. Attenzione, se lo slug contiene il simbolo `/`, la rotta non funzionerà. C’è qualche strumento che ci permette di codificare lo slug?

Scrivere tutte le funzioni delle rotte nel controller dedicato. Registrare il router dentro `app.js` con il prefisso `/posts`.

## Bonus

-   Nella rotta show, aggiungere al post una proprietà `image_url` dove creare il link completo per l'immagine.
-   Aggiungere un'altra proprietà `image_download_url` che invece dovrà far scaricare l'immagine puntando alla rotta download.
-   Rendere navigabili i post nella index, stampando un link per la show di ciascuno.
