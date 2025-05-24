export interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'warning' | 'danger'
  content: string
  timestamp?: string
}

export interface Command {
  description: string
  action: () => string[]
}

export interface DeletionSequence {
  files: string[]
  stage: number
  interval: number
}