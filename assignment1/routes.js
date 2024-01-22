const requestHandler = (req, res) => {
    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`
            <html>
            <body>
                <form action="/create-user" method="post">
                    <input type="text" name="username" placeholder="username">
                    <button type="submit">Create User</button>
                </form>
            </body>
            </html>
        `)
        return res.end()
    }

    if (req.url === '/users') {
        res.setHeader('Content-Type', 'text/html')
        res.write(`
            <html>
            <body>
                <ul>
                <li>User 1</li>
                <li>User 2</li>
                <li>User 3</li>
            </ul>
            </body>
            </html>
        `)
        return res.end()
    }

    if (req.url === '/create-user' && req.method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            body.push(chunk)
        })

        req.on('end', () => {
            const requestBody = Buffer.concat(body).toString()
            console.log(requestBody.split('=')[1])
            res.statusCode = 302
            res.setHeader('Location', '/users')
            return res.end()
        })
    }
}

module.exports.handler = requestHandler
