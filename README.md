# DevContainer Template Manager

DevContainer Template Manager is a Visual Studio Code extension that simplifies the process of managing, deploying, and saving DevContainer configurations. It allows you to quickly set up development environments across different projects and save custom configurations for future use.

Once you've done all that work to get a setup that works for you, you should be able to save it locally and reuse it in other projects. This extension allows you to do just that.

**Inspiration:** I created this extension because I spent days getting a Research Data Science devcontainer with Quarto, R (with renv environment management), Python (with Rye), and Latex working. Then I found myself copying and pasting DevContainer configurations between projects. I wanted a way to easily save and deploy custom DevContainer configurations without having to manually copy files around.

## Features

- **Import DevContainer Templates**: Easily import pre-configured DevContainer templates to your current workspace.
- **Save Custom Templates**: Save your current DevContainer configuration as a custom template for future use.
- **Manage Multiple Templates**: Keep a library of DevContainer templates for different project types or environments.

## Installation

1. Open Visual Studio Code
2. Go to the Extensions view (Ctrl+Shift+X or Cmd+Shift+X)
3. Search for "DevContainer Template Manager"
4. Click Install

## Usage

### Deploying a DevContainer Template

1. Open a workspace where you want to deploy a DevContainer configuration
2. Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P)
3. Search for "Import DevContainer Template" and select it
4. Choose a template from the list of available templates
5. The selected template will be copied to your workspace's `.devcontainer` folder

### Saving a Custom DevContainer Template

1. Set up your DevContainer configuration in your current workspace
2. Once you're satisfied with the setup, open the Command Palette
3. Search for "Save Current DevContainer as Template" and select it
4. Enter a name for your new template when prompted
5. Your current DevContainer configuration will be saved as a new template

## Requirements

- Visual Studio Code 1.60.0 or higher
- A workspace must be open to deploy or save templates

## Extension Settings

This extension doesn't add any VS Code settings.

## Known Issues

[List any known issues or limitations here]

## Release Notes

### 0.2.0

- Added functionality to save current DevContainer configuration as a custom template

### 0.1.0

- Initial release
- Ability to deploy pre-configured DevContainer templates

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)