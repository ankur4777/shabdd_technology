<!doctype html>
<html>
<body style="font-family: Arial, sans-serif; color: #111827; line-height: 1.5;">
    <h2>New Contact Form Message</h2>

    <p><strong>Name:</strong> {{ $contact['name'] }}</p>
    <p><strong>Email:</strong> {{ $contact['email'] }}</p>
    <p><strong>Subject:</strong> {{ $contact['subject'] }}</p>

    <p><strong>Message:</strong></p>
    <p>{{ $contact['message'] ?: 'No message provided.' }}</p>
</body>
</html>
