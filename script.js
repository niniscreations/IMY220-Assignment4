$(document).ready(function() {
  // Function to convert YouTube links to clickable hyperlinks with previews
  function convertYouTubeLinks(messageText) {
    const youtubeRegex = /https:\/\/youtu\.be\/([a-zA-Z0-9_-]+)/g;
    const matches = messageText.matchAll(youtubeRegex);

    for (const match of matches) {
      const videoId = match[1];
      const videoUrl = `https://www.youtube.com/embed/${videoId}`;
      const youtubeLink = match[0];

      // Replace the YouTube link with a clickable hyperlink and preview
      const videoPreview = `<a href="${videoUrl}" target="_blank">${youtubeLink}</a><br><iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allowfullscreen></iframe>`;
      messageText = messageText.replace(youtubeLink, videoPreview);
    }

    return messageText;
  }

  // Event handler for the "Send" buttons
  $(".submit").on("click", function() {
    const messageText = $("#message").val();
    const isLeftButton = $(this).attr("id") === "left"; // Check which button was clicked

    // Apply the appropriate message class based on the button
    let messageClass = "";
    if (isLeftButton) {
      messageClass = "light-green-message";
    } else {
      messageClass = "light-blue-message";
    }

    // Convert YouTube links to clickable hyperlinks with previews
    const formattedMessage = convertYouTubeLinks(messageText);

    // Create a new message element
    const newMessageDiv = $("<div>")
      .addClass(`col-4 offset-4 mb-3 rounded-bottom ${messageClass}`)
      .html(formattedMessage);

    const messagesContainer = $(".messages");

    // Add the message element to the messages container at the bottom
    messagesContainer.append(newMessageDiv);

    // Clear the textarea
    $("#message").val("");
  });
});
