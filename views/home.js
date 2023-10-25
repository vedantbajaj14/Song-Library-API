export function home(res) {
    let html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vedant's Music API</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
            color: #333;
        }
        h1 {
            margin: 0;
        }
    </style>
</head>
<body>
    <h1>Welcome to Vedant's Music API 🎵</h1>
</body>
</html>
    `;

    res.send(html);
}
