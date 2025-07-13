from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By




chrome_options = Options()
chrome_options.add_argument("--disable-search-engine-choice-screen")

service = Service("chromedriver-win64/chromedriver-win64/chromedriver.exe")

driver = webdriver.Chrome(service=service)

driver.get("https://demoqa.com/login")

user_name=WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID,'userName')))
password=WebDriverWait(driver, 10).until(EC.visibility_of_element_located((By.ID,'password')))
login_button=driver.find_element(By.ID,'login')


user_name.send_keys("python-dev")
password.send_keys("Helloworld@123")
driver.execute_script("arguments[0].click()",login_button)
input("Enter to stop")
driver.quit()