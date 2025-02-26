# Fastify Project Setup

Below steps are taken to create this **Fastify** project with **TypeScript**.

---

## 📌 Step 1: Check Node.js Version
Ensure you have **Node.js** installed. Run:

```sh
node -v
```

---

## 📌 Step 2: Initialize `package.json`
Run the following command to create a `package.json` file:

```sh
npm init -y
```

---

## 📌 Step 3: Install Fastify
Install **Fastify** as a dependency:

```sh
npm install fastify
```

---

## 📌 Step 4: Install TypeScript Libraries
Install TypeScript and necessary types:

```sh
npm install --save-dev typescript fastify-tsconfig @types/node ts-node
```

---

## 📌 Step 5: Create `tsconfig.json`
Generate a TypeScript configuration file:

```sh
npx tsc -p
```

Then, replace its content with:

```json
{
    "extends": "fastify-tsconfig",
    "compilerOptions": {
        "outDir": "dist",
        "sourceMap": true
    },
    "include": [
        "src/**/*.ts"
    ]
}
```

---

## 📌 Step 6: Install Security Middleware
To enhance security, install **Helmet** , **CORS**, **COMPRESS**:

```sh
npm install fastify-helmet fastify-cors fastify-compress
```

---

## 📌 Step 7: Install static library 
To serve static files:

```sh
npm i @fastify/static
```

---
## 📌 Step 8: Install autoloader library 
To automatically loads routes, plugins, and other Fastify configurations from a directory, reducing the need for manual register() calls.

```sh
npm i @fastify/autoload
```

---

## 📌 Step 9: Install multipart library 
Fastify plugin that enables handling multipart form data, such as file uploads.

```sh
npm i @fastify/multipart
```

---

## 📌 Step 10: Install Swagger library 
Swagger plugin.

```sh
npm install  @fastify/swagger
```

--- 

## 📌 Step 11: Add Scripts to `package.json`
Modify `package.json` to include build and start scripts:

```json
"scripts": {
    "build": "tsc -p tsconfig.json",
    "start": "tsc -p tsconfig.json && node dist/server.js"
}
```

---

🎉 **You're all set!** Run `npm run build` to compile your project and `npm start` to launch the server. 🚀

