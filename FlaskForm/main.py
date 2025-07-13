from flask import Flask, render_template, request, redirect, url_for

app = Flask("Website")

@app.route('/',methods=['GET','POST'])
def home():
    print(request.method)
    if request.method == "POST":
        firstName = request.form['firstName']
        lastName = request.form['lastName']
        email = request.form['email']
        status = request.form['status']
        return redirect(url_for('about', firstName=firstName, lastName=lastName, email=email, status=status))

    return render_template("home.html")
@app.route('/about/')
def about():
    firstName = request.args.get('firstName')
    lastName = request.args.get('lastName')
    email = request.args.get('email')
    status = request.args.get('status')
    return render_template("about.html",firstName=firstName, lastName=lastName, email=email, status=status)

app.run(debug=True)