# My Todo List App

A simple and clean **Todo List** web application built with HTML, CSS, and TypeScript. It allows users to manage their daily tasks by categorizing them as **Business** or **Personal**, and tracking their completion status.

---

## Features

- Add new tasks with a custom description
- Categorize tasks as **Business** or **Personal**
- View tasks split into **Not Completed** and **Completed** sections
- Update existing tasks
- Delete tasks
- Mark tasks as complete/incomplete

---

## Demo

![Todo List App Screenshot](/image/main_page.png)

---

## Tech Stack

- **HTML5** – Page structure
- **CSS3** – Styling and layout
- **TypeScript / JavaScript** – App logic

---

## Project Structure

```
todo-app-vanilla-js/
├── src/                    # TypeScript source files
│   ├── Helpers/            # Utility/helper functions
│   ├── Server/             # Data fetching logic
│   ├── Unity/              # Shared modules
│   └── index.ts            # Main entry point
├── dist/                   # Compiled JavaScript output
│   ├── Helpers/
│   ├── Server/
│   ├── Unity/
│   └── index.js
├── style/
│   └── style.css           # Stylesheet
├── image/
│   └── main_page.png       # App screenshot
├── json/
│   └── Todo_list.json      # Local data storage
├── index.html              # Main HTML file
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---

## How to Run

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```

2. **Open in browser:**
   - Simply open `index.html` in your browser, or
   - Use **Live Server** extension in VS Code for auto-reload

3. _(Optional)_ **Compile TypeScript:**
   ```bash
   tsc app.ts
   ```

---

## How to Use

1. Type your task in the **"What's on your todo"** input field
2. Select a category: **Business** or **Personal**
3. Click **"Add Todo"** to save the task
4. Your task will appear under **Not Completed Tasks**
5. Check the checkbox to mark it as done — it moves to **Completed Tasks**
6. Use **update** to edit a task or **delete** to remove it

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## License

This project is open source and available under the [MIT License](LICENSE).
