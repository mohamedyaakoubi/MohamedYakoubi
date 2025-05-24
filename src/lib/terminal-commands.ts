import type { Command, TerminalLine } from '@/types/terminal'

export const createTerminalCommands = (
  setTerminalLines: (updater: (prev: TerminalLine[]) => TerminalLine[]) => void,
  setIsDeleting: (value: boolean) => void,
  simulateSystemDestruction: () => void,
  commandHistory: string[]
): Record<string, Command> => ({
  help: {
    description: 'Show available commands',
    action: () => [
      'Available commands:',
      '  help      - Show this help message',
      '  home      - Navigate to homepage',
      '  projects  - View my projects',
      '  contact   - Get in touch',
      '  about     - Learn about me',
      '  clear     - Clear terminal',
      '  whoami    - Show current user',
      '  ls        - List available pages',
      '  pwd       - Show current location',
      '  cat bio   - Display bio information',
      '  skills    - Show technical skills',
      '  joke      - Tell a programming joke',
      '  cd ..     - Go back to previous page',
      '  history   - Show command history',
      '',
      'WARNING: Do NOT run dangerous commands like "sudo rm -rf"!'
    ]
  },
  home: {
    description: 'Navigate to homepage',
    action: () => {
      window.location.href = '/'
      return ['Redirecting to homepage...']
    }
  },
  projects: {
    description: 'View projects',
    action: () => {
      window.location.href = '/projects'
      return ['Loading projects...']
    }
  },
  contact: {
    description: 'Get in touch',
    action: () => {
      window.location.href = '/contact'
      return ['Opening contact page...']
    }
  },
  about: {
    description: 'Learn about me',
    action: () => {
      window.location.href = '/#about'
      return ['Navigating to about section...']
    }
  },
  'cd ..': {
    description: 'Go back to previous page',
    action: () => {
      if (window.history.length > 1) {
        window.history.back()
        return ['Going back to previous page...']
      } else {
        window.location.href = '/'
        return ['No previous page found. Redirecting to homepage...']
      }
    }
  },
  clear: {
    description: 'Clear terminal',
    action: () => {
      setTerminalLines(() => [
        { type: 'output', content: 'Terminal cleared. Type "help" for commands.' }
      ])
      return []
    }
  },
  whoami: {
    description: 'Show current user',
    action: () => ['mohamed@portfolio:~$ You are browsing Mohamed Yaakoubi\'s portfolio']
  },
  ls: {
    description: 'List available pages',
    action: () => [
      'Available pages:',
      '  home/         - Main portfolio page',
      '  projects/     - Showcase of my work',
      '  experience/   - Professional background',
      '  services/     - What I can offer',
      '  contact/      - Get in touch',
      '  ../           - Go back to previous page',
    ]
  },
  pwd: {
    description: 'Show current location',
    action: () => ['/404/not-found - This page does not exist']
  },
  'cat bio': {
    description: 'Display bio',
    action: () => [
      'Mohamed Yaakoubi - Emerging AI and Technology Specialist',
      '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
      'Driven, adaptable AI specialist with expertise in:',
      '• Machine Translation (DeepL, RWS)',
      '• AI Evaluation (Meta AI, Uber)',
      '• Web Development (React, Next.js)',
      '• Localization & Language Services',
    ]
  },
  skills: {
    description: 'Show technical skills',
    action: () => [
      'Technical Skills:',
      '  Languages: JavaScript, TypeScript, Python, C',
      '  Frontend:  React, Next.js, HTML/CSS',
      '  Backend:   Node.js, Firebase',
      '  Tools:     Git, VS Code, Azure',
      '  AI/ML:     Natural Language Processing, Data Annotation',
      '  Other:     Translation, Localization, Arabic-English',
    ]
  },
  joke: {
    description: 'Tell a programming joke',
    action: () => {
      const jokes = [
        'Why do programmers prefer dark mode? Because light attracts bugs!',
        'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
        'Why do Java developers wear glasses? Because they can\'t C#!',
        '404 jokes not found... wait, that\'s not a joke, that\'s your current situation!',
        'A SQL query goes into a bar, walks up to two tables and asks: "Can I join you?"',
        'Why don\'t programmers like nature? It has too many bugs!',
      ]
      return [jokes[Math.floor(Math.random() * jokes.length)]]
    }
  },
  history: {
    description: 'Show command history',
    action: () => {
      if (commandHistory.length === 0) {
        return ['No commands in history yet.']
      }
      return [
        'Command history:',
        ...commandHistory.map((cmd, index) => `  ${index + 1}  ${cmd}`)
      ]
    }
  },
  'sudo rm -rf': {
    description: 'DANGER: Delete everything recursively',
    action: () => {
      setIsDeleting(true)
      simulateSystemDestruction()
      return [
        'rm: removing /',
      ]
    }
  }
})