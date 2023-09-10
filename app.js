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
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "prefixo": "8496",
      "nomeContato": "Ibsem",
      "mensagem": `${message.value}`
    })
  })
  .then((response) => {
    console.log(response)
    var res = JSON.parse(response.data).respostaBOT
    showHistoric(message.value, res)
  })
  .catch((e) => {
    console.log('Error:', e)
  })
  .finally(() => {
    status.style.display = 'none'
    btnSubmit.disabled = false
    btnSubmit.style.cursor = 'pointer'
    message.disabled = false
    message.value = ''
  })


  function showHistoric(message, response) {
    var historic = document.getElementById('historic')

    //My message
    var boxMyMessage = document.createElement('div')
    boxMyMessage.className = 'box-my-message'

    var myMessage = document.createElement('p')
    myMessage.className = 'my-message'
    myMessage.textContent = message

    boxMyMessage.appendChild(myMessage)
    historic.appendChild(boxMyMessage)


    //Response
    var boxResponseMessage = document.createElement('div')
    boxResponseMessage.className = 'box-response-message'

    var chatResponse = document.createElement('p')
    chatResponse.className = 'chat-response'
    chatResponse.innerHTML = response

    boxResponseMessage.appendChild(chatResponse)
    historic.appendChild(boxResponseMessage)


    historic.scrollTop = historic.scrollHeight
  }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(res => console.log("service worker registered"))
        .catch(err => console.log("service worker not registered", err))
    })
}
