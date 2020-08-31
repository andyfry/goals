# Daily Goals
A project to help me set and track daily goals

# Install
deno install --allow-read --allow-write --unstable goals.ts 

# Usage
```
goals                           ( Show Goals for Today ) 
goals --today                   ( Show Goals for Today )
goals --yesterday               ( Show Goals for Yesterday )
goals --tomorrow                ( Show Goals for Tomorrow )
goals --date 5/4/1979           ( Show Goals for Given Date ) *Not Supported Yet*
goals add "Medition"            ( Add a new Goal to Tomorrow) 
goals add "Medition" --today    ( Add a new Goal to Today)
goals done 1                    ( Mark the first goal done for Today )
goals done 3 --yesterday        ( Mark the third goal done for Yesterday )
goals done 1 --undo             ( Unmark the first goal done for Today )
goals stats                     ( Show Stats )
goals watch                     ( Listen for changes to the goals file ) *Not Supported Yet*
```

# TODO
- Switch to Async
- Create a way to keep it visually up to date
- Polish Help and Error Message 
- Separate Data from the app
