from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time

# Setup Chrome options
chrome_options = Options()
chrome_options.add_experimental_option("detach", True)

# Setup ChromeDriver path (change path if needed)
service = Service("chromedriver-win64/chromedriver.exe")  # or give full absolute path

# Create driver
driver = webdriver.Chrome(service=service, options=chrome_options)

# Maximize the window
driver.maximize_window()

# Step 1: Open OrangeHRM login page
driver.get("https://opensource-demo.orangehrmlive.com/")

# Step 2: Wait for page to load
time.sleep(2)

# Step 3: Enter username
username_field = driver.find_element(By.NAME, "username")
username_field.send_keys("Admin")

# Step 4: Enter password
password_field = driver.find_element(By.NAME, "password")
password_field.send_keys("admin123")

# Step 5: Click login
login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
login_button.click()

# Step 6: Wait for dashboard to load
time.sleep(5)

# Done: You are now logged in

