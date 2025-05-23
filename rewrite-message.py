def message_callback(message, commit):
    if commit.original_id.decode()[:7] == "e70248f":
        return b"added gemini support"
    return message or b""
