import express from 'express'
import log from '@ajar/marker'
import morgan from 'morgan'

const { PORT, HOST } = process.env

const app = express()

app.use( morgan('dev') )
app.use(express.json())

app.get('/',  (req, res) => {
    const hello = 
    `<div>
    <p>hello</p>
    </div>`;
    res.status(200).set('Content-Type', 'text/html').send(hello)
})

app.get('/users', (req, res) => {
    res.status(200).send('Get all Users')
})

app.get('/search', (req, res) => {
    res.status(200).send(req.query)
})
// '/search?food=burger&town=ashdod'

app.get('/search/:searchId/:searchResult', (req, res) => {
    const {searchId, searchResult} = req.params
    res.status(200).send(`${searchId} & ${searchResult}`)
})

// 'search/4517/Result'

app.post('/', (req, res) => {
    res.status(200).json(req.body)
})

app.get('/data', (req, res) => {
    const data = [
        {Name: "Morty", Age: 14},
        {Name: "Rick", Age: 72}
    ]
    res.status(200).json(data)
})

app.use((req, res, next) => {
    res.status(400).send(`404 - ${req.url} was not found`)
})

app.listen(PORT, HOST,  ()=> {
    log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`)
});


//------------------------------------------
//         Express Echo Server
//------------------------------------------

/* challenge instructions

     - install another middleware - morgan
        configuring app middleware like so:
        app.use( morgan('dev') );

    -  define more routing functions that use

        - req.query - access the querystring part of the request url
        - req.params - access dynamic parts of the url
        - req.body - access the request body of a POST request
        
        in each routing function you want to pass some values to the server from the client
        and echo those back in the server response

    - return api json response - json.(data)
    - return html markup response set.(content-type)
    - return 404 status with a custom response to unsupported routes

*/
