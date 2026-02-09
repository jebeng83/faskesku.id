import re

file_path = 'resources/js/Pages/SDKI/sdki.jsx'

with open(file_path, 'r') as f:
    content = f.read()

# Pattern 1
pattern1 = r'(\}\s*else if \(res\.status === 419\) \{)\s*// CSRF token expired\s*pushToast\(\{.*?\}\);\s*toast\.error\("Session expired\. Silakan refresh halaman\."\);\s*(\})'
replacement = r'\1\n        window.location.reload();\n      \2'

# Pattern 2 (generic toast.error)
pattern2 = r'(\}\s*else if \(res\.status === 419\) \{)\s*toast\.error\("Session expired\. Silakan refresh halaman\."\);\s*(\})'
replacement2 = r'\1\n        window.location.reload();\n      \2' # Indentation might be off but acceptable

# Apply substitutions
new_content = re.sub(pattern1, replacement, content, flags=re.DOTALL)
new_content = re.sub(pattern2, replacement2, new_content, flags=re.DOTALL)

with open(file_path, 'w') as f:
    f.write(new_content)

print("Done")
