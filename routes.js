const fs = require("fs");

const requestHandler = (req, res) => {
    if (req.url === '/') {
        res.write(`
            <html lang="en">
            <head>
            <title>Enter message</title>
            </head>
            <body>
            <form action="/message" method="post">
                <input type="text" name="message">
                <button type="submit">Send</button>        
            </form>
            </body>
            </html>
        `)
        return res.end()
    }

    if (req.url === '/message' && req.method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, err => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.write(`
            <html lang="en">
            <head>
            <title>Test</title>
            </head>
            <body>
               <h1>Test</h1>
            </body>
            </html>
        `)
    return res.end()
}

module.exports = requestHandler
