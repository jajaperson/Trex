<h1 align="center">Trex Imports 🦕</h1>

<p align="center">
  <img src="http://clipart-library.com/image_gallery/3119.png" width="350">
  <p align="center">Package management for deno (pronounced "tee rex") </p>
</p>

<p align="center">
   <a href="https://github.com/crewdevio/Trex/issues">
     <img alt="GitHub issues" src="https://img.shields.io/github/issues/crewdevio/Trex">
   </a>
   <a href="https://github.com/crewdevio/Trex/network">
     <img alt="GitHub forks" src="https://img.shields.io/github/forks/crewdevio/Trex">
   </a>
   <a href="https://github.com/crewdevio/Trex/stargazers">
     <img alt="GitHub stars" src="https://img.shields.io/github/stars/crewdevio/Trex">
   </a>
   <a href="https://github.com/crewdevio/Trex/blob/master/LICENSE">
     <img alt="GitHub license" src="https://img.shields.io/github/license/crewdevio/Trex">
   </a>
   <a href="https://deno.land">
     <img src="https://img.shields.io/badge/deno-%5E1.2.0-green?logo=deno"/>
   </a>
   <a href="https://nest.land/package/Trex">
     <img src="https://nest.land/badge.svg" />
   </a>
   <a href="https://cdn.discordapp.com/attachments/727169454667989016/728363543614980116/ajio.gif">
     <img src="http://hits.dwyl.com/crewdevio/Trex.svg" />
   </a>
</p>

## About

`trex imports` is a package management tool for deno similar to npm but keeping close to the deno philosophy.

## Additional topics

- [why does this version exist?](https://dev.to/buttercubz/rethinking-the-way-we-handle-dependency-imports-in-deno-3j72)

- [hash and fingerprint in deps.json file](./docs/hash.md)

## Installation

```console
deno install -A --unstable -n imports https://denopkg.com/crewdevio/Trex@imports/cli.ts
```

> **note**: Works with deno >= 1.2.0

**we shorten the install command so it's not that long**

The permissions that imports uses are:

- --allow-net
- --allow-read
- --allow-write
- --allow-run

You can give those permissions explicitly.

## Updating imports

Install new version with the `-f` flag:

```console
deno install -f -A --unstable -n imports https://denopkg.com/crewdevio/Trex@imports/cli.ts
```

Or use the `upgrade` command:

```console
imports upgrade
```

> **Note**: available for versions 0.2.0 or higher.

Verify the installation of imports:

```console
imports --version
```

and the console should print the imports version.

For help on the commands that imports provides, use:

```console
imports --help
```

For a better implementation of this tool you can use the [Commands](https://deno.land/x/commands) utility.

## Usage

### Installing from deno.land

Install the `fs`, `http` and `fmt` modules from std:

```console
imports install --map fs http fmt
```

> **note**: you can use `imports i --map fs http fmt`

`--map` installs packages from the standard library and those hosted at `deno.land/x`

### Installing from nest.land

Install a package hosted on [nest.land](https://nest.land/gallery):

```console
imports install --nest opine@0.13.0
```

> **note**: if you want to install a package using nest.land you must specify a version explicitly as above

You can install packages from std hosted in nest.land by specifying the package and the version:

```console
imports install --nest fs@0.61.0
```

### Installing from a repository

```console
imports install --pkg [user]/[repo or repo@tag/branch]/[path/to/file] [packageName]
```

Example:

```console
imports install --pkg oakserver/oak/mod.ts oak
```

The above downloads oak directly from its repository.

### structure

all installation methods produce a folder with the following structure:

`example`

```console
imports/
  |- fmt.ts
  |- oak.ts
  |- dinoenv.ts
  |- deps.json
```

the deps.json file is used as an import map for internal functionalities.

`deps.json`

```js
{
  "meta": {
    "fmt": {
      "url": "https://denopkg/crewdevio/Trex@proxy/proxy/files/fmt.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    },
    "oak": {
      "url": "https://deno.land/x/oak/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    },
    "dinoenv": {
      "url": "https://deno.land/x/dinoenv/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    }
  }
}
```

### Downloading packages

Download all the packages listed in the `deps.json` similar to `npm install`:

```console
imports install
```

### Adding custom packages

Install a package from a custom URL source:

```console
imports --custom react=https://dev.jspm.io/react/index.js
```

`imports`:

```console
imports/
  |- fmt.ts
  |- oak.ts
  |- http.ts
  |- react.ts
  |- deps.json
```

### Deleting packages

```console
imports delete React
```

Remove a specific version from the imports dir and the `deps.json` file:

```console
imports delete fs@0.52.0
```

`deps.json`:

```json
{
  "meta": {
    "fmt": {
      "url": "https://denopkg/crewdevio/Trex@proxy/proxy/files/fmt.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    },
    "oak": {
      "url": "https://deno.land/x/oak/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    },
    "http": {
      "url": "https://deno.land/std/http/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    }
  }
}
```

Removing from cache only works with standard packages and those installed from `deno.land/x`

### Selecting a specific version of a package

Specify a package's version:

```console
imports install --map fs@0.54.0
```

`import_map.json`

```json
{
  "meta": {
    "fs": {
      "url": "https://deno.land/std@0.54.0/fs/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    }
  }
}
```

> **note**: can be used with third party packages.

### Run Scripts (experimental)

now you can create command aliases similar to [npm run](https://docs.npmjs.com/cli-commands/run-script.html), you just have to create a run.json file with the following structure:

```json
// example
{
  "scripts": {
    "welcome": "deno run https://deno.land/std@0.71.0/examples/welcome.ts"
  }
}
```

> **note**: to run command aliases you must use the command `imports run <aliases>`

now you can call a command within another or call a deno script like denopack or eggs within a command alias

```json
// example
{
  "scripts": {
    "welcome": "deno run https://deno.land/std@0.71.0/examples/welcome.ts",
    "bundler": "denopack -i mod.ts -o bundle.mod.js",
    "publish": "eggs publish",
    "start": "imports run welcome"
  }
}
```

> **note**: you can use the --watch flag to monitor the changes and rerun the script, example: deno run --watch --unstable https://deno.land/std@0.71.0/examples/welcome.ts

you can pass arguments in the command alias and these will be resisted by the file to execute

```console
imports run start --port=3000 --env
```

```typescript
console.log(Deno.args); // ["--port=3000", "--env"]
```

### Checking a package's dependency tree

```console
imports tree fs
```

This prints out something like:

```console
local: C:\Users\trex\AppData\Local\deno\deps\https\deno.land\434fe4a7be02d187573484b382f4c1fec5b023d27d1dcf4f768f300799a073e0
type: TypeScript
compiled: C:\Users\trex\AppData\Local\deno\gen\https\deno.land\std\fs\mod.ts.js
map: C:\Users\trex\AppData\Local\deno\gen\https\deno.land\std\fs\mod.ts.js.map
deps:
https://deno.land/std/fs/mod.ts
  ├─┬ https://deno.land/std/fs/empty_dir.ts
  │ └─┬ https://deno.land/std/path/mod.ts
  │   ├── https://deno.land/std/path/_constants.ts
  │   ├─┬ https://deno.land/std/path/win32.ts
  │   │ ├── https://deno.land/std/path/_constants.ts
  │   │ ├─┬ https://deno.land/std/path/_util.ts
  │   │ │ └── https://deno.land/std/path/_constants.ts
  │   │ └── https://deno.land/std/_util/assert.ts
  │   ├─┬ https://deno.land/std/path/posix.ts
  │   │ ├── https://deno.land/std/path/_constants.ts
  │   │ └── https://deno.land/std/path/_util.ts
  │   ├─┬ https://deno.land/std/path/common.ts
  │   │ └─┬ https://deno.land/std/path/separator.ts
  │   │   └── https://deno.land/std/path/_constants.ts
  │   ├── https://deno.land/std/path/separator.ts
  │   ├── https://deno.land/std/path/_interface.ts
  │   └─┬ https://deno.land/std/path/glob.ts
  │     ├── https://deno.land/std/path/separator.ts
  │     ├─┬ https://deno.land/std/path/_globrex.ts
  │     │ └── https://deno.land/std/path/_constants.ts
  │     ├── https://deno.land/std/path/mod.ts
  │     └── https://deno.land/std/_util/assert.ts
  ├─┬ https://deno.land/std/fs/ensure_dir.ts
  │ └─┬ https://deno.land/std/fs/_util.ts
  │   └── https://deno.land/std/path/mod.ts
  ├─┬ https://deno.land/std/fs/ensure_file.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├─┬ https://deno.land/std/fs/ensure_link.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ ├── https://deno.land/std/fs/exists.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├─┬ https://deno.land/std/fs/ensure_symlink.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ ├── https://deno.land/std/fs/exists.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├── https://deno.land/std/fs/exists.ts
  ├─┬ https://deno.land/std/fs/expand_glob.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├─┬ https://deno.land/std/fs/walk.ts
  │ │ ├── https://deno.land/std/_util/assert.ts
  │ │ └── https://deno.land/std/path/mod.ts
  │ └── https://deno.land/std/_util/assert.ts
  ├─┬ https://deno.land/std/fs/move.ts
  │ ├── https://deno.land/std/fs/exists.ts
  │ └── https://deno.land/std/fs/_util.ts
  ├─┬ https://deno.land/std/fs/copy.ts
  │ ├── https://deno.land/std/path/mod.ts
  │ ├── https://deno.land/std/fs/ensure_dir.ts
  │ ├── https://deno.land/std/fs/_util.ts
  │ └── https://deno.land/std/_util/assert.ts
  ├── https://deno.land/std/fs/read_file_str.ts
  ├── https://deno.land/std/fs/write_file_str.ts
  ├── https://deno.land/std/fs/read_json.ts
  ├── https://deno.land/std/fs/write_json.ts
  ├── https://deno.land/std/fs/walk.ts
  └── https://deno.land/std/fs/eol.ts
```

### Integrity checking & lock files

Let's say your module depends on a remote module.
When you compile your module for the first time, it is retrieved, compiled and cached.
It will remain this way until you run your module on a new machine (e.g. in production) or reload the cache.

But what happens if the content in the remote url is changed?
This could lead to your production module running with different dependency code than your local module.
Deno's solution to avoid this is to use integrity checking and lock files.

Create a lockfile:

```console
deno cache --lock=lock.json --lock-write file.ts
```

The above generates a `lock.json` file.

See [deno document](https://deno.land/manual/linking_to_external_code/integrity_checking) for more info.

## Complete example

### A simple std server

Install `http` and `fmt`:

```console
imports install --map http fmt
```

Create a simple server:

```typescript
// server.ts
import { serve } from "./imports/http.ts";
import { colors } from "./imports/fmt.ts";

const server = serve({ port: 8000 });
console.log(colors.green("http://localhost:8000/"));

for await (const req of server) {
  req.respond({ body: "Hello World\n" });
}
```

Run the server:

```console
deno run --allow-net server.ts
```

### Adding third party packages

Example using [oak](https://deno.land/x/oak)

Add the master version of oak:

```console
imports i --map oak
```

This adds `oak` to the `deps.json` file:

```json
{
  "meta": {
    "fmt": {
      "url": "https://denopkg/crewdevio/Trex@proxy/proxy/files/fmt.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    },
    "oak": {
      "url": "https://deno.land/x/oak/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    },
    "http": {
      "url": "https://deno.land/std/http/mod.ts",
      "hash": "bf6f443a9fdb69b2a75df70de59458244db6067173a20f30af36cfcd3923389a"
    }
  }
}
```

> **note**: third party packages are added using **mod.ts**

Then create an oak application. Note the `import` statement.

```typescript
// app.ts
import { Application } from "./imports/oak.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World!";
});

await app.listen({ port: 8000 });
```

Run the server:

```console
deno run --allow-net app.ts
```

## Contributing

Contributions are welcome, see [CONTRIBUTING GUIDELINES](CONTRIBUTING.md).

## Licensing

Trex Imports is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

</br>
 <p align="center">
    <img src="http://clipart-library.com/image_gallery/3119.png" width="150">
    <h3 align="center">Trex imports is powered by</h3>
    <p align="center">
       <a href="https://nest.land/">
	  <img src="https://cdn.discordapp.com/attachments/656976424778989602/735587312448176132/favicon_light.svg" width="85" height="85">
       </a>
       <a href="https://deno.land/">
	  <img src="https://raw.githubusercontent.com/denoland/deno_website2/master/public/logo.svg" width="85" height="85">
       </a>
       <a href="https://denopkg.com/">
	  <img src="https://raw.githubusercontent.com/denopkg/denopkg.com/master/public/denopkg.png" width="90" height="90">
       </a>
    </p>
  </p>
