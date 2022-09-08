import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:100, 300, 400, 500, 700, 900&display=optional"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <script src="https://kit.fontawesome.com/9b02408d79.js" crossorigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument