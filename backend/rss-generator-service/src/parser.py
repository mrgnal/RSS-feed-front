from playwright.sync_api import sync_playwright

def fetch_full_page(url):
    with sync_playwright() as p:

        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto(url, wait_until="networkidle")
        html_content = page.content()
        browser.close()

        return html_content

def save_page_in_file(page, file_path):
    try:
        with open(f'{file_path}', 'w') as f:
            f.write(page)
        print(f"File: {file_path} saved")
    except Exception as e:
        print(f"Error saving: {e}")


