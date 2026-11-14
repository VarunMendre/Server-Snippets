/*
Design the plugin system used by a PluginEditor class. Every plugin follows the same contract: it has a name and knows how to transform a piece of text. The editor can therefore run any installed plugin without knowing its concrete type or implementation.

- PluginEditor() creates an editor with no installed plugins.
- boolean install(String name) installs a known plugin and returns true. If the name is unknown or the plugin is already installed, leave the editor unchanged and return false.
- String[] installed() returns the installed plugin names in installation order.
- int pluginCount() returns the number of installed plugins.
- String run(String text) passes the text through every installed plugin in order. Each plugin receives the previous plugin's output, and the final transformed text is returned. With no plugins installed, return the original text unchanged.

Implement these plugins:

- UpperPlugin reports the name "upper" and converts text to uppercase.
- TrimPlugin reports the name "trim" and removes leading and trailing spaces.
- ExclaimPlugin reports the name "exclaim" and appends !.

Installation order matters because transformations are chained. For example, running trim and then exclaim on " b " produces "b!", while running exclaim and then trim produces "b !".

Adding another plugin later may require registering it with the editor's factory, but it must not require changing run. Read the supplied class to see the exact interface, abstract class, or method names expected in your language.
*/

interface EditorPlugin {
  execute(text: string): string;
  name(): string;
}

class UpperPlugin implements EditorPlugin {
  execute(text: string): string {
    return text.toUpperCase();
  }
  name(): string {
    return "upper";
  }
}
class TrimPlugin implements EditorPlugin {
  execute(text: string): string {
    return text.trim();
  }
  name(): string {
    return "trim";
  }
}
class ExclaimPlugin implements EditorPlugin {
  execute(text: string): string {
    return text.concat("!");
  }

  name(): string {
    return "exclaim";
  }
}

class PluginEditor {
  private plugins: EditorPlugin[] = [];

  constructor() {}

  private create(name: string): EditorPlugin | null {
    const available: EditorPlugin[] = [
      new UpperPlugin(),
      new TrimPlugin(),
      new ExclaimPlugin(),
    ];
    for (const plugin of available) {
      if (plugin.name() === name) {
        return plugin;
      }
    }
    return null;
  }

  install(name: string): boolean {
    const plugin = this.create(name);
    if (plugin === null) {
      return false;
    }
    if (this.plugins.some((p) => p.name() === name)) {
      return false;
    }
    this.plugins.push(plugin);
    return true;
  }

  installed(): string[] {
    return this.plugins.map((p) => p.name());
  }

  pluginCount(): number {
    return this.plugins.length;
  }

  run(text: string): string {
    let out = text;
    for (const p of this.plugins) {
      out = p.execute(out);
    }
    return out;
  }
}

