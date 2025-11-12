import React, { useState, useEffect } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import Spinner from 'ink-spinner';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import fs from 'fs/promises';
import chalk from 'chalk';

export async function tuiCommand(file?: string) {
  render(<App initialFile={file} />);
}

interface AppProps {
  initialFile?: string;
}

const App: React.FC<AppProps> = ({ initialFile }) => {
  const { exit } = useApp();
  const [screen, setScreen] = useState<'menu' | 'edit' | 'validate' | 'help'>('menu');
  const [manifest, setManifest] = useState<any>(null);
  const [filePath, setFilePath] = useState<string | undefined>(initialFile);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (initialFile) {
      loadManifest(initialFile);
    }
  }, [initialFile]);

  useInput((input, key) => {
    if (input === 'q' && key.ctrl) {
      exit();
    }
    if (key.escape && screen !== 'menu') {
      setScreen('menu');
    }
  });

  const loadManifest = async (path: string) => {
    try {
      const content = await fs.readFile(path, 'utf-8');
      const data = JSON.parse(content);
      setManifest(data);
      setFilePath(path);
      setStatus(`Loaded ${path}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  const saveManifest = async () => {
    if (!filePath || !manifest) return;
    try {
      await fs.writeFile(filePath, JSON.stringify(manifest, null, 2), 'utf-8');
      setStatus('Saved successfully');
    } catch (error: any) {
      setStatus(`Error saving: ${error.message}`);
    }
  };

  if (screen === 'menu') {
    return <MainMenu 
      manifest={manifest}
      filePath={filePath}
      onScreen={setScreen}
      onLoad={loadManifest}
      onExit={exit}
      status={status}
    />;
  }

  if (screen === 'edit') {
    return <Editor
      manifest={manifest}
      onManifestChange={setManifest}
      onSave={saveManifest}
      onBack={() => setScreen('menu')}
      status={status}
    />;
  }

  if (screen === 'validate') {
    return <Validator
      manifest={manifest}
      onBack={() => setScreen('menu')}
    />;
  }

  if (screen === 'help') {
    return <Help onBack={() => setScreen('menu')} />;
  }

  return null;
};

interface MainMenuProps {
  manifest: any;
  filePath?: string;
  onScreen: (screen: 'menu' | 'edit' | 'validate' | 'help') => void;
  onLoad: (path: string) => void;
  onExit: () => void;
  status: string;
}

const MainMenu: React.FC<MainMenuProps> = ({ manifest, filePath, onScreen, onExit, status }) => {
  const items = [
    { label: '📝 Edit Manifest', value: 'edit' },
    { label: '✅ Validate', value: 'validate' },
    { label: '📋 View Info', value: 'info' },
    { label: '🆕 New Manifest', value: 'new' },
    { label: '💾 Load File', value: 'load' },
    { label: '❓ Help', value: 'help' },
    { label: '🚪 Exit', value: 'exit' },
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="blue">
          🎨 JSON Agents Interactive TUI
        </Text>
      </Box>
      
      {filePath && (
        <Box marginBottom={1}>
          <Text color="gray">
            File: {filePath}
          </Text>
        </Box>
      )}

      {!manifest && (
        <Box marginBottom={1}>
          <Text color="yellow">
            No manifest loaded. Select 'New Manifest' or 'Load File' to begin.
          </Text>
        </Box>
      )}

      <SelectInput
        items={items}
        onSelect={(item) => {
          if (item.value === 'exit') {
            onExit();
          } else if (item.value === 'edit' || item.value === 'validate' || item.value === 'help') {
            onScreen(item.value as any);
          }
        }}
      />

      {status && (
        <Box marginTop={1}>
          <Text color="green">{status}</Text>
        </Box>
      )}

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Use ↑↓ arrows to navigate, Enter to select, Ctrl+Q to quit
        </Text>
      </Box>
    </Box>
  );
};

interface EditorProps {
  manifest: any;
  onManifestChange: (manifest: any) => void;
  onSave: () => void;
  onBack: () => void;
  status: string;
}

const Editor: React.FC<EditorProps> = ({ manifest, onManifestChange, onSave, onBack, status }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  useInput((input, key) => {
    if (key.return && !editingField) {
      // Start editing agent name
      setEditingField('name');
      setInputValue(manifest?.agent?.name || '');
    }
    if (input === 's' && key.ctrl && !editingField) {
      onSave();
    }
  });

  if (!manifest) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red">No manifest loaded</Text>
        <Text color="gray">Press Esc to go back</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="blue">
          📝 Edit Manifest
        </Text>
      </Box>

      <Box flexDirection="column" marginBottom={1}>
        <Text>
          <Text bold>Agent Name: </Text>
          {editingField === 'name' ? (
            <TextInput
              value={inputValue}
              onChange={setInputValue}
              onSubmit={(value) => {
                onManifestChange({
                  ...manifest,
                  agent: { ...manifest.agent, name: value },
                });
                setEditingField(null);
              }}
            />
          ) : (
            <Text color="cyan">{manifest.agent?.name || 'N/A'}</Text>
          )}
        </Text>

        <Text>
          <Text bold>Version: </Text>
          <Text color="cyan">{manifest.agent?.version || 'N/A'}</Text>
        </Text>

        <Text>
          <Text bold>Profiles: </Text>
          <Text color="cyan">{manifest.profiles?.join(', ') || 'N/A'}</Text>
        </Text>

        <Text>
          <Text bold>Capabilities: </Text>
          <Text color="cyan">{manifest.capabilities?.length || 0}</Text>
        </Text>

        <Text>
          <Text bold>Tools: </Text>
          <Text color="cyan">{manifest.tools?.length || 0}</Text>
        </Text>
      </Box>

      {status && (
        <Box marginBottom={1}>
          <Text color="green">{status}</Text>
        </Box>
      )}

      <Box>
        <Text color="gray" dimColor>
          Enter to edit | Ctrl+S to save | Esc to go back
        </Text>
      </Box>
    </Box>
  );
};

interface ValidatorProps {
  manifest: any;
  onBack: () => void;
}

const Validator: React.FC<ValidatorProps> = ({ manifest, onBack }) => {
  const [validating, setValidating] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setTimeout(() => {
      // Simulate validation
      const validationErrors: string[] = [];
      
      if (!manifest?.agent?.name) {
        validationErrors.push('Agent name is required');
      }
      if (!manifest?.agent?.id) {
        validationErrors.push('Agent ID is required');
      }
      if (!manifest?.profiles || manifest.profiles.length === 0) {
        validationErrors.push('At least one profile is required');
      }

      setErrors(validationErrors);
      setValidating(false);
    }, 1000);
  }, [manifest]);

  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="blue">
          ✅ Validation Results
        </Text>
      </Box>

      {validating ? (
        <Box>
          <Text color="cyan">
            <Spinner type="dots" />
            {' Validating manifest...'}
          </Text>
        </Box>
      ) : (
        <Box flexDirection="column">
          {errors.length === 0 ? (
            <Text color="green">✓ Manifest is valid!</Text>
          ) : (
            <>
              <Text color="red">✗ Found {errors.length} error(s):</Text>
              <Box flexDirection="column" marginTop={1}>
                {errors.map((error, i) => (
                  <Text key={i} color="yellow">  • {error}</Text>
                ))}
              </Box>
            </>
          )}
        </Box>
      )}

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Press Esc to go back
        </Text>
      </Box>
    </Box>
  );
};

interface HelpProps {
  onBack: () => void;
}

const Help: React.FC<HelpProps> = ({ onBack }) => {
  return (
    <Box flexDirection="column" padding={1}>
      <Box marginBottom={1}>
        <Text bold color="blue">
          ❓ Help - Keyboard Shortcuts
        </Text>
      </Box>

      <Box flexDirection="column">
        <Text><Text bold>↑/↓</Text> - Navigate menu items</Text>
        <Text><Text bold>Enter</Text> - Select menu item</Text>
        <Text><Text bold>Esc</Text> - Go back to main menu</Text>
        <Text><Text bold>Ctrl+S</Text> - Save manifest</Text>
        <Text><Text bold>Ctrl+Q</Text> - Quit application</Text>
      </Box>

      <Box marginTop={1}>
        <Text color="gray" dimColor>
          Press Esc to go back
        </Text>
      </Box>
    </Box>
  );
};

export default App;
