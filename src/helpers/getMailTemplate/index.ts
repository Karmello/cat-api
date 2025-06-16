import dict from 'src/dictionary'

type Args = {
  text: string
  link?: string
  btnText?: string
}

const getMailTemplate = ({ text, link, btnText }: Args) => {
  const displayBtn = link && btnText

  const tags = []

  if (displayBtn) {
    tags.push(`<p style="font-size: 15px;">${text}</p>`)
  } else {
    tags.push(`<h3>${text}</h3>`)
  }

  if (displayBtn) {
    tags.push('<br />')
    tags.push(`
      <div>
        <a
          href="${link}"
          target="new"
          style="
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            font-weight: bold;
            background-color: #a6192e;
            border-radius: 4px;
            cursor: pointer;
          "
        >
          ${btnText}
        </a>
      </div>
    `)
  }

  tags.push('<br /><br /><br /><hr /><br /><br /><br />')

  tags.push(`
    <div style="text-align: center;">
      <img
        src="https://cat-fe-assets.s3.eu-central-1.amazonaws.com/cat-bot-small.jpg"
        width="250px"
        style="border-radius: 250px;"
      />
      <br /><br />
      <p style="font-size: 18px;"><b>${dict.email.footerText}</b></p>
    </div>
  `)

  return `<div style="margin: 50px 25px;">${tags.join('')}</div>`
}

export default getMailTemplate
