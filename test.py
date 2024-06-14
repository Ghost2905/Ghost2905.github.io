from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def authorization():

   if request.method == 'POST':
       Login = request.form.get('Login')
       Password = request.form.get('Password')
       if Login=="admin" and Password=="admin":
           return "Correct"
       else:
           return "Incorrect"

   return '''
             <form method="POST">
                 <div><label>Login: <input type="text" name="Login"></label></div>
                 <div><label>Password: <input type="text" name="Password"></label></div>
                 <input type="submit" value="Enter">
             </form>'''

if __name__ == "__main__":
   app.run()