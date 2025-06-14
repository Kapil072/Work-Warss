from typing import Dict, Type
from .base_plugin import BasePlugin

class PluginRegistry:
    """Registry for managing plugins"""
    
    _instance = None
    _plugins: Dict[str, BasePlugin] = {}
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(PluginRegistry, cls).__new__(cls)
        return cls._instance
    
    def register_plugin(self, plugin: BasePlugin) -> None:
        """Register a new plugin"""
        if plugin.name in self._plugins:
            raise ValueError(f"Plugin {plugin.name} is already registered")
        self._plugins[plugin.name] = plugin
    
    def unregister_plugin(self, plugin_name: str) -> None:
        """Unregister a plugin"""
        if plugin_name in self._plugins:
            self._plugins[plugin_name].cleanup()
            del self._plugins[plugin_name]
    
    def get_plugin(self, plugin_name: str) -> BasePlugin:
        """Get a plugin by name"""
        if plugin_name not in self._plugins:
            raise KeyError(f"Plugin {plugin_name} not found")
        return self._plugins[plugin_name]
    
    def get_all_plugins(self) -> Dict[str, BasePlugin]:
        """Get all registered plugins"""
        return self._plugins.copy()
    
    def initialize_all(self) -> None:
        """Initialize all registered plugins"""
        for plugin in self._plugins.values():
            plugin.initialize()
    
    def cleanup_all(self) -> None:
        """Cleanup all registered plugins"""
        for plugin in self._plugins.values():
            plugin.cleanup()
        self._plugins.clear() 