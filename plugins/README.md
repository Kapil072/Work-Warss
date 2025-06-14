# Plugin System

This directory contains plugins for the application. Each plugin should have its own directory with the following structure:

```
plugin-name/
├── __init__.py
├── plugin.py
├── ui/
│   ├── components/
│   └── styles/
└── ai/
    └── handlers/
```

## Plugin Structure

- `__init__.py`: Plugin initialization and metadata
- `plugin.py`: Main plugin logic
- `ui/`: Frontend components and styles
- `ai/`: AI-related functionality

## Creating a New Plugin

1. Create a new directory in the plugins folder
2. Implement the required interfaces
3. Register your plugin in the plugin registry 