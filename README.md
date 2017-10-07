This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

After that, I installed *fengari* and *fengari-interop*

```bash
yarn add fengari-lua/fengari fengari-lua/fengari-interop
```

That command installs *fengari* and *fengari-interop* directly from the github repo, not from npm packages (which they ain't published). That means that the installation gets tied to a specific commitish in their git repo (the latest in the main branch at the time of issuing the add/install command). They promise there should be a npm package published (sometime).

## Run this project

To run this webapp use:

Just the first time:
```bash
yarn install
```

Every time:
```bash
yarn start
```

## Caveats

* `fengari-web` is a tool to use `<script>` tags embeded with lua code. That tool inits `fengari` and `fengari-interop` loads a single lua vm for the whole web and you ain't got control over it. That's the reason why I 'm not using it. Despite being on web I prefer to init `fengari` and `fengari-interop` myself so I got control on the loaded code and vm.
* Although it should be possible I 'm not testing calling a JS function from LUA code (it should b e possible using fengari-interop) I 'm just testing calling a LUA function from JS (the function is really defined by lua code in the global/window context). The example was taken from a fengari-interop github issue (docs are not abundant)


