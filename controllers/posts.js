//importazione moduli necessari
const path = require("path");
const { readJSON, writeJSON } = require("../utils.js");

//lettura dati da postsDB
const posts = readJSON("postsDB");

const index = (req, res) => {
    res.format({
        html: () => {
            let html = `
                <main style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <a href="/"><button>Home</button></a>
                    ${posts
                        .map(
                            ({ title, content, image, tags, slug }) => `
                        <div style="text-align: center; margin-bottom: 20px;">
                            <h2>${title}</h2>
                            <img width="350" src="/${image}" alt="${title}" />
                            <p style="padding: 0 200px">${content}</p>
                            <p>${tags.map((tag) => `<span>#${tag}</span>`).join(" ")}</p>
                             <a href="/posts/${slug}"><button>Details</button></a>
                        </div>
                    `
                        )
                        .join("")}
                </main>
            `;
            res.send(html);
        },
        json: () => {
            res.json(posts);
        },
    });
};

const show = (req, res) => {
    //recupero lo slug dei post
    const { slug: postSlug } = req.params;
    const post = posts.find((post) => post.slug === postSlug);

    //controllo se il post con lo slug cercato esiste, altrimenti mostro un messaggio di errore
    if (post) {
        const { title, content, image, tags } = post;

        //costruisco l'URL per il download dell'immagine dei post
        post.img_download_url = `${req.protocol}://${req.headers.host}/posts/${post.slug}/download`;

        res.format({
            html: () => {
                let html = `
                    <main style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
                        <div style="text-align: center;">
                            <h2>${title}</h2>
                            <img width="350" src="/${image}" alt="${title}" />
                            <p>${content}</p>
                            <p>${tags.map((tag) => `<span>#${tag}</span>`).join(" ")}</p>
                            <div>
                                <a href="/posts"><button>Back</button></a>
                                <a href="${
                                    post.img_download_url
                                }"><button>Download Image</button></a>
                            </div>
                        </div>
                    </main>
                `;
                res.send(html);
            },
            json: () => {
                res.json({
                    ...post,
                    image_url: `http://${req.headers.host}/${image}`,
                });
            },
        });
    } else {
        res.status(404).send(`Non esiste un post con lo slug "${postSlug}"`);
    }
};

const create = (req, res) => {
    //Se l'header Accept non include text/html, restituisce un errore 406
    if (!req.headers.accept.includes("text/html")) {
        return res.status(406).send("Not Accetable");
    }

    res.send("<h1>Creazione nuovo post</h1>");
};

const downloadImage = (req, res) => {
    //recupero lo slug dei post
    const { slug: postSlug } = req.params;
    const post = posts.find((post) => post.slug === postSlug);

    //controllo se il post o l'immagine del post non esistono
    if (!post || !post.image) {
        return res.status(404).json({
            error: "Not Found",
            description: post ? "Image not found" : `Post with slug: ${postSlug} does not exist`,
        });
    }

    //costruisco il percorso del file per il download
    const filePath = path.join(__dirname, `../public/${post.image}`);

    //Invio il file per il download
    res.download(filePath, (err) => {
        if (err) {
            return res.status(404).json({
                error: "Not Found",
                description: "Image could not be downloaded",
            });
        }
    });
};

module.exports = {
    index,
    show,
    create,
    downloadImage,
};
