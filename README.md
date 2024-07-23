
# Parrot Webapp

This is the `parrot-webapp`, a frontend application built using React and Vite. Below are the commands to manage and run the application in different environments.

## Commands

### `app-build.sh`
Command to build the development container. This is the first command you should run.

```bash
ENV=prod bash dev-shortcuts/app-build.sh
```

### `app-audit.sh`
Command to run ESLint for development.

```bash
ENV=prod bash dev-shortcuts/app-audit.sh
```

### `app-npm-install.sh`
Command to install Node dependencies.

```bash
ENV=prod bash dev-shortcuts/app-npm-install.sh
```

### `app-run-build.sh`
Command to generate static files.

```bash
ENV=prod bash dev-shortcuts/app-run-build.sh
```

### `app-run.sh`
Command to start the frontend application locally.

```bash
ENV=prod bash dev-shortcuts/app-run.sh
```

### `env-commit.sh`
Command to create a commit message.

```bash
bash dev-shortcuts/env-commit.sh
```

### `env-secrets.sh`
Command to retrieve secrets.

```bash
ENV=prod bash dev-shortcuts/env-secrets.sh
```

## Usage

1. **Build the development container:**

   This is the first command you should run.

   ```bash
   ENV=prod bash dev-shortcuts/app-build.sh
   ```

2. **Install dependencies:**

   Ensure that all Node dependencies are installed.

   ```bash
   ENV=prod bash dev-shortcuts/app-npm-install.sh
   ```

3. **Build the application:**

   Generate static files needed for production.

   ```bash
   ENV=prod bash dev-shortcuts/app-run-build.sh
   ```

4. **Run the application locally:**

   Start the frontend application on your local machine.

   ```bash
   ENV=prod bash dev-shortcuts/app-run.sh
   ```

5. **Lint the application:**

   Run ESLint to check for code quality issues.

   ```bash
   ENV=prod bash dev-shortcuts/app-audit.sh
   ```

6. **Create a commit message:**

   Use the following command to generate a commit message.

   ```bash
   bash dev-shortcuts/env-commit.sh
   ```

7. **Retrieve secrets:**

   Fetch the necessary secrets for the application.

   ```bash
   ENV=prod bash dev-shortcuts/env-secrets.sh
   ```
