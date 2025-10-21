# 🧩 orpc-todo-app

A modern full-stack **Next.js** Todo app powered by:

- ⚡ **oRPC** — lightweight, type-safe RPC for Next.js  
- 🗃 **Drizzle ORM** + SQLite — fast, fully typed SQL ORM  
- 🔄 **TanStack Query** — smart data fetching & caching  
- 💅 **Tailwind CSS** — clean, responsive UI styling  
- 🧈 **Bun** — fast, modern JavaScript runtime  

---

## 🚀 Features

- ✅ Full CRUD (Create, Read, Update, Delete) Todos  
- 🔁 Automatic cache invalidation with TanStack Query  
- 🧠 Type-safe from DB → API → UI  
- 🗂 Clean Next.js App Router structure  
- 💎 Polished Tailwind UI  

---

## 🏗️ Tech Stack

| Layer | Tech |
|-------|------|
| **Framework** | [Next.js](https://nextjs.org) |
| **Server RPC** | [oRPC](https://orpc.unnoq.com) |
| **Database** | [Drizzle ORM](https://orm.drizzle.team) + SQLite |
| **Client Cache** | [TanStack Query](https://tanstack.com/query) |
| **UI** | [Tailwind CSS](https://tailwindcss.com) |
| **Runtime** | [Bun](https://bun.sh) |

---

## ⚙️ Setup

### 1️⃣ Install dependencies

```bash
bun install
````

### 2️⃣ Generate & apply database schema

Make sure your `drizzle.config.ts` is correctly set up, then run:

```bash
# Generate migrations
bunx drizzle-kit generate

# Apply migrations to your SQLite database
bunx drizzle-kit migrate
```

> 💡 The latest Drizzle version replaces `push` with `generate` + `migrate`.

### 3️⃣ Run the development server

```bash
bun run dev
```

Then open → [http://localhost:3000](http://localhost:3000)

---

## 🧠 How It Works

* **`src/server/orpc/router.ts`** — defines your Todo CRUD endpoints (`getAll`, `add`, `toggle`, `remove`)
* **`src/app/rpc/[[..rest]]/route.ts`** — connects oRPC to Next.js route handler at `/rpc`
* **`src/utils/orpc.ts`** — creates the oRPC + TanStack Query client
* **`src/app/page.tsx`** — UI layer using query + mutation hooks


---

## 🧰 Commands

| Command                     | Description                              |
| --------------------------- | ---------------------------------------- |
| `bun run dev`               | Start Next.js dev server                 |
| `bun run build`             | Build production bundle                  |
| `bun run start`             | Run production build                     |
| `bunx drizzle-kit generate` | Generate SQL migrations                  |
| `bunx drizzle-kit migrate`  | Apply DB migrations                      |
| `bunx drizzle-kit studio`   | Launch Drizzle Studio (visual DB viewer) |
