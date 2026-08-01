# ⭐ Three kinds of variables

1. **env variables**
2. **vars variables**
3. **secrets**

Each one has a different purpose and different power.

Let’s go one by one.

---

# 🌱 1. What are `env:` variables in workflow YAML?

These are **environment variables that you define inside the workflow file itself**.

Example:

```yaml
env:
  APP_VERSION: 1.0.0
  EC2_USER: ubuntu
```

Or inside a job:

```yaml
jobs:
  build:
    env:
      REGION: ap-south-1
```

Or inside a step:

```yaml
steps:
  - run: echo $APP_VERSION
    env:
      APP_VERSION: 2.0.0
```

### ✔ When to use workflow `env:` variables

Use them for **temporary configuration** that belongs only to this workflow.

Examples:

* Region name
* Deployment folder paths
* Script options
* Versions
* Branch based settings
* Anything that is OK to store inside the workflow file

### ✔ These are not stored in GitHub UI

These variables exist only in the YAML file.

### ✔ These are available as

* `$APP_VERSION` in the shell
* `${{ env.APP_VERSION }}` in expressions

### ✔ They cannot be encrypted

They are visible to anyone who can view the workflow file.

---

# 📌 2. What are `vars` variables (GitHub UI variables)?

These are variables stored in GitHub UI:

* Repo level variables
* Environment level variables
* Organization level variables

Created from:

```
Settings → Secrets and variables → Actions → Variables
```

### ✔ They are accessed as:

```yaml
${{ vars.API_URL }}
```

### ✔ When to use GitHub UI variables

Use them for **non sensitive configuration** that should not be inside the workflow file.

Examples:

* Production URLs
* Development URLs
* Bucket names
* Slack webhook URLs (only if public or non sensitive)
* Service names
* Feature flags
* Paths
* Cloud region for each environment
* Public identifiers
* Configuration that rarely changes

### ✔ Why use GitHub UI variables?

* Easier to update without touching the workflow file
* Different environments can have different values
* Not encrypted, but stored separately
* Keeps workflow file clean

These do not appear in the environment unless you attach:

```yaml
environment: production
```

If you attach `environment: production`, GitHub will load:

```
Settings → Environments → production → Variables
```

and make them available as:

```yaml
${{ vars.KEY }}
```

---

# 🔐 3. What are Secrets?

Secrets are **encrypted** values stored in GitHub UI.

Stored in:

```
Settings → Secrets and variables → Actions → Secrets
```

### ✔ Access them like this:

```yaml
${{ secrets.API_KEY }}
```

### ✔ When to use secrets

Use secrets for **sensitive values**:

* API keys
* SSH private keys
* Access tokens
* Database passwords
* Cloud credentials
* Deployment tokens
* Anything that must be hidden

### ✔ Secrets are always masked

Whenever logged, they appear as `***`.

### ✔ Available only inside workflows

Not printed in build logs unless masked.

---

# ⭐ Now the real question

## What is the **difference between `env:` and `vars`?**

This is where most people get confused.
Let’s break it down in a clean table and then in examples.

---

# 📊 Table: env vs vars vs secrets

| Feature                    | env                     | vars                      | secrets                   |
| -------------------------- | ----------------------- | ------------------------- | ------------------------- |
| Defined in                 | workflow YAML           | GitHub UI                 | GitHub UI                 |
| Sensitivity                | public                  | public                    | private                   |
| Best for                   | temporary config        | stable config             | sensitive info            |
| Scope                      | workflow or job or step | repository or environment | repository or environment |
| Change requires commit     | Yes                     | No                        | No                        |
| Access in expression       | `${{ env.X }}`          | `${{ vars.X }}`           | `${{ secrets.X }}`        |
| Access in shell            | `$X`                    | (not directly)            | (not directly)            |
| Part of GitHub Environment | No                      | Yes                       | Yes                       |
| Used by multiple workflows | No                      | Yes                       | Yes                       |
| Versioned in git           | Yes                     | No                        | No                        |

---

# 🎯 Simple rule to decide

## Use **env** when:

* value is only for this workflow
* value changes often
* value is part of workflow logic
* value should travel into shell (`$VALUE`)

## Use **vars** when:

* value belongs to the repo configuration
* value should be different for dev, staging, prod
* value is not sensitive
* value should be edited from GitHub UI
* value is shared across workflows

## Use **secrets** when:

* value is sensitive
* must never appear in logs
* must be encrypted

---

# 🧪 Example that shows all three working together

```yaml
name: Deploy

env:
  LOCAL_PATH: ./dist
  DEPLOY_SCRIPT: deploy.sh

jobs:
  deploy:
    environment: production

    steps:
      - run: echo "Local path is $LOCAL_PATH"

      - run: echo "Production API URL is ${{ vars.API_URL }}"

      - run: echo "Using secret token ${{ secrets.DEPLOY_TOKEN }}"
```

Here:

* `LOCAL_PATH` and `DEPLOY_SCRIPT` are temporary workflow variables
* `API_URL` comes from GitHub UI, different for each environment
* `DEPLOY_TOKEN` is secret used for real deployment

---

# 💡 Perfect one line summary for you

> `env` is for workflow level variables stored in YAML.
> `vars` is for non sensitive configuration stored in GitHub UI.
> `secrets` is for encrypted sensitive values stored in GitHub UI.
