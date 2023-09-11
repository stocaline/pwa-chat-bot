function sendMessage() {
  var message = document.getElementById('message')
  if (!message.value) {
    message.style.border = '1px solid red'
    return
  }
  message.style.border = 'none'

  var status = document.getElementById('status')
  var btnSubmit = document.getElementById('btn-submit')

  status.style.display = 'block'
  status.innerHTML = "Carregando..."
  btnSubmit.disabled = true
  btnSubmit.style.cursor = 'not-allowed'
  message.disabled = true

  fetch("https://chatbotfastapi.squareweb.app/processaPedido/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "prefixo": "8496",
      "nomeContato": "Ibsem",
      "mensagem": `${message.value}`
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na requisição');
      }
      return response.json()
    })
    .then((response) => {
      console.log(response.respostaBOT)
      var res = response.respostaBOT
      showHistoric(message.value, res)
    })
    .catch((e) => {
      console.log('Error:', e)
      showHistoric(message.value, res)
    })
    .finally(() => {
      status.style.display = 'none'
      btnSubmit.disabled = false
      btnSubmit.style.cursor = 'pointer'
      message.disabled = false
      message.value = ''
    })
}

function showHistoric(message, response) {
  var historic = document.getElementById('historic')

  //My message
  var boxMyMessage = document.createElement('div')
  boxMyMessage.className = 'box-my-message'

  var myMessage = document.createElement('p')
  myMessage.className = 'my-message'
  myMessage.innerHTML = markdown(message)

  boxMyMessage.appendChild(myMessage)
  historic.appendChild(boxMyMessage)

  //Response
  var boxResponseMessage = document.createElement('div')
  boxResponseMessage.className = 'box-response-message'

  var chatResponse = document.createElement('p')
  chatResponse.className = 'chat-response'
  chatResponse.innerHTML = markdown(response)


  boxResponseMessage.appendChild(chatResponse)
  historic.appendChild(boxResponseMessage)


  historic.scrollTop = historic.scrollHeight
}

function markdown(text) {
  var addMarkdownLink = text.replace(/\b(http\S+)\b/g, '<a href="$1" target="_blank">$1</a>')
  var addMarkdownStrong = addMarkdownLink.replace(/\n/g, "<br>")
  var addMarkdownSpace = addMarkdownStrong.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
  return addMarkdownSpace
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}
