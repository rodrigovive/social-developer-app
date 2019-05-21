# Social Developer

Social Developer is a web application for shared with others developers or co-worker.

# Demo
👉 Check it <a href="http://dev-connet.herokuapp.com">here</a>.
<br>


## Installation

### For developers
Clone the source locally:

```sh
$ git clone https://github.com/rodrigovive/social-developer-app
$ cd social-developer-app
```
Install server dependencies:

```sh
$ npm install
```

Install client dependencies:

```sh
$ npm run client-install
```


#### Config

1. Environment variables in `keys_dev.js` inside `/src/config`:

   ```
   {
       mongoURI: 'database',
       secretOrKey: 'public'
   }
   ```


## Usage

Start the app:

```sh
$ npm run dev
```