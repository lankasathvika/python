from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# Set Chrome options (optional)
chrome_options = Options()
chrome_options.add_argument("--disable-search-engine-choice-screen")

# ✅ Correct: Use Service for Selenium 4.10+
service = Service("C:/Users/lanka/Downloads/python/webautomation1/chromedriver-win64/chromedriver.exe")

# ✅ Use service and options
driver = webdriver.Chrome(service=service, options=chrome_options)

# Open the site
driver.get("https://www.saucedemo.com/")

# Wait for login form and fill it
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.ID, "user-name")))
driver.find_element(By.ID, "user-name").send_keys("standard_user")
driver.find_element(By.ID, "password").send_keys("secret_sauce")
driver.find_element(By.ID, "login-button").click()

# Wait for inventory list to confirm login success
WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CLASS_NAME, "inventory_list")))

# Theme change with JS
driver.execute_script("""
    document.body.style.backgroundColor = "#f8f0ff";
    document.body.style.fontFamily = "Comic Sans MS";
    document.querySelector('.app_logo').style.color = "#e91e63";
    document.querySelector('.app_logo').innerText = "Python Shop Demo";
""")

# Keep browser open
input("✅ Press Enter to close browser...")
driver.quit()

