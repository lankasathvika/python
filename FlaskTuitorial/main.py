from flask import Flask, render_template, request, make_response, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    theme = request.cookies.get('theme', 'light')
    return render_template('tuitorial.html', theme=theme)

@app.route('/about/')
def about():
    theme = request.cookies.get('theme', 'light')
    return render_template('about.html', theme=theme)

@app.route('/switch-theme/')
def switch_theme():
    current_theme = request.cookies.get('theme', 'light')
    new_theme = 'dark' if current_theme == 'light' else 'light'
    response = make_response(jsonify({'theme': new_theme}))
    response.set_cookie('theme', new_theme)
    return response

if __name__ == '__main__':
    app.run(debug=True)