# What Is Docker?

## The Problem: "It Works on My Machine"

Imagine you spend weeks building a web app, testing it carefully on your own computer. You finally deploy it to a server, share it with the world... and then the bug reports start rolling in. The app doesn't work for other people, even though it worked perfectly on your machine.

This is such a common headache in software development that it has its own nickname: **"the it works on my machine problem."**

### Why does this happen?

There are several common causes:

- Your machine has tools, libraries, or dependencies installed that other machines don't have.
- Configuration for the app is loaded differently depending on where it runs.
- Parts of the app depend on specific files or hardware that only exist on your computer.

## Earlier Attempts to Solve This

Before Docker, a few categories of tools tried to tackle this problem:

- **Configuration management tools** (Chef, Ansible, Puppet) — let you write code/markup describing what a machine needs in order to run your app.
- **Virtualization tools** (HashiCorp Vagrant) — let you script entire virtual machines to run your app inside.

**Downside:** both approaches usually require you to understand a lot about the underlying operating system — e.g., with Vagrant you need to define the "hardware" your VM needs and configure the OS before your app can even be installed.

## Docker's Approach

Docker takes a simpler path. It's software that lets developers package an app into an **image**, which then runs inside a **container**.

- **Images** are built from lightweight configuration files that describe everything the app needs to run.
- **Containers** are virtualized environments created from those images — unlike a full virtual machine, a container only includes just enough of an OS to run the app, nothing more.

Because containers are generated from images, any machine capable of running Docker will run your app the same way, no matter where it is. That consistency means you can build, ship, and run software faster, more safely, and more cost-effectively.

## An Analogy: Cooking a Family Recipe

Think of a treasured family recipe passed down for generations. Made in your own kitchen, it's perfect. Made in a friend's kitchen, it might turn out differently — different pans, different salt, a gas stove vs. an electric one. Countless small environmental differences change the result.

Now imagine a single box containing **all** the exact hardware, ingredients, and tools needed to recreate that recipe perfectly — anywhere, by anyone. That's the guarantee Docker brings to software: package everything the app needs once, and it will behave identically wherever it runs.

## Key Takeaways

- The "it works on my machine" problem comes from environment inconsistencies between systems.
- Older tools (Chef/Ansible/Puppet, Vagrant) addressed this but required deep OS-level configuration knowledge.
- Docker packages apps into **images**, run as lightweight **containers**, so environments stay consistent everywhere.
- Result: faster, safer, more cost-efficient development and deployment.

---
*Source: notes based on a Docker fundamentals video course.*
