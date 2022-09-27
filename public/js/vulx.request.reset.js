/* 
 * Copyright (C) Vulx - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Vulx Team <vulxdev@gmail.com>, 2022
*/

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
    }).then(window.location.href = "setup");
} window.resetAccount = resetAccount;