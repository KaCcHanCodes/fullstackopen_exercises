```mermaid
sequenceDiagram

browser ->> server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
server -->> browser: [ { "message": "note created" } ]
```