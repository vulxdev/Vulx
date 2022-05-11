async function resetAccount() {
    await fetch('http://127.0.0.1:/resetAccount', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                resetAccount: true,
            }
        )
    }).then(window.location.href = "welcome.html");
}