//const room = window.location.pathname.replace(/\//g, '');
//${room}

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            return cache.addAll([
                '/',
                '/index.html',
                '/manifest.json',
                '/icon.png',
                // Adicione aqui outros recursos que deseja em cache
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages')

    let list_messages = '<ul>'
    messages.forEach(message => {
        list_messages += `<li>${message.user}: ${message.msg}</li>`
    })
    list_messages += '</ul>'

    div_messages.innerHTML = list_messages
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if(!user){
            alert('Defina um Usuario')
            return
        }

        const message = document.forms['message_form_name']['msg'].value
        document.forms['message_form_name']['msg'].value = ''
        socket.emit('new_message', {user: user, msg: message })
        console.log(message)
    })

    const userForm = document.querySelector('#user_form')
    userForm.addEventListener('submit', (e) => {
        e.preventDefault()
        user = document.forms['user_form_name']['user'].value
        userForm.parentNode.removeChild(userForm)

    })
})