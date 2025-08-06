async function test() {
    const res = await fetch('http://localhost:3000/users', {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            "first_name": 'Jhonatan',
            'last_name': 'Morales',
            "email": 'j@gamil.com',
            "document_number": '1234567895',
            "birth_date": '2001-07-02',
            "gender": 'male',
            "address": 'cra 94D n 65 a 48',
            'phone': 3014567895,
        })
    })
}

test()