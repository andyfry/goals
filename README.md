# Daily Goals
A project to help me set and track daily goals

# Install
deno install --allow-read --unstable goals.ts 

# Usage
```
goals                           ( Show Goals for Today ) 
goals --today                   ( Show Goals for Today )
goals --yesterday               ( Show Goals for Yesterday )
goals --tomorrow                ( Show Goals for Tomorrow )
goals --date 5/4/1979           ( Show Goals for Given Date ) *Not Supported Yet*
goals add "Medition"            ( Add a new Goal to Tomorrow) *Not Supported Yet*
goals add "Medition" --today    ( Add a new Goal to Today) *Not Supported Yet*
goals stats                     ( Show Stats )
```

# TODO
- Switch to Async
- Create a command to add an item - today vs tomorrow
- Create a way to keep it visually up to date
- Create a way to complete a goal
- Structure Files Better
- Colors? Emoji?
