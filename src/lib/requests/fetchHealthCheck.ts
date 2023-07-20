export const fetchHealthCheck = (): Promise<HealthCheck> => {
    return fetch('/healthcheck')
        .then(response => response.text())
        .then(response => JSON.parse(response))
        .then(response => response as HealthCheck)
}