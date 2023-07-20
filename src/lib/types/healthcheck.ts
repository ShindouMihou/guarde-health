type HealthCheck = {
    fallback_fails: number,
    fallback_latency: Average,
    forward_latency: Average,
    request_latency: Average,
    request_size: Average,
    requests_errored: number,
    requests_forwarded: number,
    requests_received: number,
    requests_rejected: number,
    response_size: Average,
    whois_requests: number
}

type Average = {
    avg: number,
    values: number[]
}