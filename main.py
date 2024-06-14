from flask import Flask
from flask import render_template
from flask import request
import requests

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def main():
    if request.method == 'POST':
        last_name = request.form.get('last_name')
        first_name = request.form.get('first_name')
        patronymic = request.form.get('patronymic')
        birthday = request.form.get('birthday')
        citizenship = request.form.get('citizenship')
        region = request.form.get('region')
        education = request.form.get('education')
        service = request.form.get('service')
        number_tel = request.form.get('number_tel')
        mail = request.form.get('mail')
        if last_name!="" and first_name!="":
            bd = '*Фамилия:* ' + str(last_name) + '\n' + '*Имя:* ' + str(first_name) + '\n' + '*Отчество:* ' + str(patronymic) + '\n' + '*Дата рождения:* ' + str(birthday) + '\n' + '*Гражданство:* ' + str(citizenship) + '\n' + '*Регион проживания:* ' + str(region) + '\n' + '*Уровень образования:* ' + str(education) + '\n' + '*Срочная служба:* ' + str(service)  + '\n' + '*Почта:* ' + str(mail) + '\n' + '*Номер телефона:* '+ '`' + str(number_tel) + '`'
            url = 'https://api.telegram.org/bot6384412652:AAE5RJVrojubyD4o3Azm-me50RCO1YBGdx0/sendMessage?chat_id=853173733&parse_mode=markdown&text=' + bd
            r = requests.get(url)
            r.close()
            return render_template('sended.html')
        else:
            print('Nan')
    return render_template('test.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)
    