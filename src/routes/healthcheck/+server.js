// @ts-ignore
import * as net from 'net';

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    const client = new net.Socket()

    const result = await new Promise((resolve) => {
        client.connect(import.meta.env.VITE_HEALTH_CHECK_PORT, import.meta.env.VITE_HEALTH_CHECK_HOST, function () {
            client.write('ping')
        })

        // @ts-ignore
        client.on('data', function (data) {
            let d = JSON.parse(data)
            resolve(d)

            client.destroy()
        })

        // @ts-ignore
        client.on('error', function (err) {
            console.error('failed to get health check: ', err)
            resolve(err)

            client.destroy()
        })
    })

    if (result == null) {
        return new Response(null, {
            status: 500
        })
    }

    if (result instanceof Error) {
        console.error('failed to get health check: ', result)
        return new Response(null, {
            status: 500
        })
    }

    return new Response(JSON.stringify(result), {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}