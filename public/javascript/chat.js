   let socket = io();

  function scrollToBottom () {
    let messages = jQuery('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }

    socket.on('connect', function () {
      let params = jQuery.deparam(window.location.search);

      socket.emit('join', params, function (err) {
        if (err) {
          alert(err);
          window.location.href = '/';
        } else {
          console.log('No error.');
        }
      });
    });

    socket.on('disconnect', function () {
      console.log('Disconnected from server.');
    });

    socket.on('updateUserList', function (users) {
      let ul = jQuery('<ul></ul>');

      users.forEach(function (user) {
        ul.append(jQuery('<li></li>').text(user));
      });

      jQuery('#users').html(ul);
    });

    socket.on('newMessage', function (message) {
      let formattedTime = moment(message.createdAt).format('h:mm a');
      let template = jQuery('#message-template').html();
      let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
      });

      jQuery('#messages').append(html);
      scrollToBottom();
    });

    socket.on('newLocationMessage', function (message) {
      let formattedTime = moment(message.createdAt).format('h:mm a');
      let template = jQuery('#location-message-template').html();
      let html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
      });
      jQuery('#messages').append(html);
      scrollToBottom();
    });

    jQuery('#message-form').on('submit', function (e) {
      e.preventDefault();

      let messageTextbox = jQuery('[name=message]');

      socket.emit('createMessage', {
         text: messageTextbox.val()
      }, function () {
        messageTextbox.val('')
      });
    });

     let locationButton = jQuery('#location');

    locationButton.on('click', function () {      
      if (!navigator.geolocation) {
        return alert('Geolocation is not compatible with your browser.');
      }

      locationButton.attr('disabled', 'disabled').text('Sending Location...');

      navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch your location.');
      });
    });