"""
Reads muni_raw.txt (mojibake: UTF-8 file read as Latin-1),
decodes each municipality name back to proper Greek,
extracts the first valid email per municipality,
and outputs JSON for DB comparison/import.
"""
import re, json, sys

EMAIL_RE = re.compile(r'[\w.+%-]+@[\w.-]+\.[a-zA-Z]{2,}')

with open('scripts/muni_raw.txt', 'r', encoding='utf-8') as f:
    content = f.read()

results = []
for line in content.strip().split('\n'):
    line = line.strip()
    if '\t' not in line:
        continue
    name_raw, emails_raw = line.split('\t', 1)
    # Reverse the mojibake: re-encode as Latin-1 bytes, decode as UTF-8
    try:
        name = name_raw.encode('latin-1').decode('utf-8').strip()
    except Exception:
        name = name_raw.strip()

    emails = EMAIL_RE.findall(emails_raw)
    email = emails[0] if emails else ''
    results.append({'name_el': name, 'email_official': email})

json.dump(results, sys.stdout, ensure_ascii=False, indent=2)
