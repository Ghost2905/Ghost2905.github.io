from flask import Flask, request
import telegram

TOKEN = "6384412652:AAE5RJVrojubyD4o3Azm-me50RCO1YBGdx0"
URL = "https://our-public-secure-url/"

app = Flask(__name__)
bot = telegram.Bot(token=TOKEN)

# ----------------------------------
# Our public Webhook URL
# ----------------------------------
@app.route('/{}'.format(TOKEN), methods=['POST'])
def respond():
    # retrieve the message in JSON and then transform it to Telegram object
    update = telegram.Update.de_json(request.get_json(force=True), bot)

    # TODO: do something with the message

    return 'ok'

# ----------------------------------
# Our Private to 'set' our webhook URL (you should protect this URL)
# ----------------------------------
@app.route('/setwebhook', methods=['GET', 'POST'])
def set_webhook():
    s = bot.setWebhook('{URL}{HOOK}'.format(URL=URL, HOOK=TOKEN))
    if s:
        return "webhook ok"
    else:
        return "webhook failed"