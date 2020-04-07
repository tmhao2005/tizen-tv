## Test on real device

Read the following instruction:

```
https://docs.tizen.org/application/web/get-started/tv/first-samsung-tv-app
```

## Known issue
Before you build and run on real device, you have to delete the `node_module` folder because it makes the build process freeze.
Plus, you have to configure your webpack to output `lib`, otherwise, it would run into the same problem
