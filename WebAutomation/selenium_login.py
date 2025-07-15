from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

# Set Chrome options (optional)
chrome_options = Options()
chrome_options.add_argument("--disable-search-engine-choice-screen")

# ✅ Use executable_path instead of service (OLD Selenium)
driver = webdriver.Chrome(
    executable_path="chromedriver-win64/chromedriver-win64/chromedriver.exe",
    chrome_options=chrome_options
)

# Open login page
driver.get("https://demoqa.com/login")

# Wait and interact with page
user_name = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'userName')))
password = WebDriverWait(driver, 10).until(
    EC.visibility_of_element_located((By.ID, 'password')))
login_button = driver.find_element(By.ID, 'login')

# Enter login details
user_name.send_keys("python-dev")
password.send_keys("Helloworld@123")
driver.execute_script("arguments[0].click()", login_button)

# Keep browser open
input("✅ Press Enter to close browser...")
driver.quit()
