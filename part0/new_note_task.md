```Mermaid
sequenceDiagram

browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
server -->> browser: 302 Found - Redirect - /exampleapp/notes
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/notes
server -->> browser: HTML document
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
server -->> browser: The CSS file
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
server -->> browser: The JavaScript file
browser ->> server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
server -->> browser: [ { ..., "content": "Testing", "date": "2025-07-06" } ]
```