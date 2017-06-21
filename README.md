# UPDATE: Issue resolved by updating dependencies

# Info

I ran into a weird bug when compiling React in production with Babili, in what
appears to be a runtime error in the React library, but there's no error using
their minified build directly. This repo reproduces the bug and also shows a
way of working around the issue, in the hopes of finding the source and getting
it fixed. The bug in question happens in event handlers:

```
Uncaught TypeError: e.isPersistent is not a function
```

# Setup

- Fetch the code & run `yarn`.
- To reproduce the problem, run `yarn build`, open `build/index.html` and the
  developer tools console. On clicking the button you will get the error
  mentioned above.
- To run the build with the workaround, run `yarn build-with-workaround` and
  follow the same steps - there shouldn't be any error logged to the console.
