"use client"

import { useState, useRef } from 'react'
import { FaTerminal } from 'react-icons/fa'
import type { TerminalLine } from '@/types/terminal'
import { createTerminalCommands } from '@/lib/terminal-commands'
import { createSystemDestruction } from '@/lib/system-destruction'

interface TerminalProps {
  terminalLines: TerminalLine[]
  setTerminalLines: (updater: (prev: TerminalLine[]) => TerminalLine[]) => void
  isDeleting: boolean
  setIsDeleting: (value: boolean) => void
  isSystemDestroyed: boolean
  setIsSystemDestroyed: (value: boolean) => void
  setDeletionStage: (stage: number) => void
}

export function Terminal({
  terminalLines,
  setTerminalLines,
  isDeleting,
  setIsDeleting,
  isSystemDestroyed,
  setIsSystemDestroyed,
  setDeletionStage
}: TerminalProps) {
  const [currentInput, setCurrentInput] = useState('')
  const [isTerminalActive, setIsTerminalActive] = useState(false)
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const simulateSystemDestruction = createSystemDestruction(
    setTerminalLines,
    setDeletionStage,
    setIsSystemDestroyed,
    terminalRef
  )

  const commands = createTerminalCommands(
    setTerminalLines,
    setIsDeleting,
    simulateSystemDestruction,
    commandHistory
  )

  const handleCommand = (input: string) => {
    const command = input.toLowerCase().trim()
    const newLines: TerminalLine[] = [
      { type: 'input', content: `mohamed@portfolio:~$ ${input}` }
    ]

    if (command === '') {
      return newLines
    }

    // Add command to history if it's not empty and not the same as the last command
    if (command && (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== command)) {
      setCommandHistory(prev => [...prev, command])
    }

    if (command === 'sudo rm -rf' || command === 'rm -rf /' || command === 'sudo rm -rf /') {
      const output = commands['sudo rm -rf'].action()
      output.forEach(line => {
        newLines.push({ type: 'error', content: line })
      })
    } else if (commands[command as keyof typeof commands]) {
      const output = commands[command as keyof typeof commands].action()
      output.forEach(line => {
        newLines.push({ type: 'output', content: line })
      })
    } else {
      newLines.push({ 
        type: 'error', 
        content: `bash: ${command}: command not found` 
      })
    }

    return newLines
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : -1
        setHistoryIndex(newIndex)
        setCurrentInput(newIndex === -1 ? '' : commandHistory[newIndex])
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isDeleting) return
    
    const newLines = handleCommand(currentInput)
    setTerminalLines(prev => [...prev, ...newLines])
    setCurrentInput('')
    setHistoryIndex(-1) // Reset history index after submitting
    
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight
      }
    }, 50)
  }

  const handleTerminalClick = () => {
    if (!isDeleting && !isSystemDestroyed) {
      setIsTerminalActive(true)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden mb-8">
      {/* Terminal Header */}
      <div className="flex items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-gray-300 text-sm flex items-center justify-center">
            <FaTerminal className="mr-2" />
            Mohamed's Portfolio Terminal
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        onClick={handleTerminalClick}
        className={`h-80 overflow-y-auto p-4 font-mono text-sm cursor-text ${
          isTerminalActive && !isDeleting && !isSystemDestroyed ? 'ring-2 ring-blue-500' : ''
        }`}
      >
        {terminalLines.map((line, index) => (
          <div key={index} className="mb-1">
            {line.type === 'input' && (
              <div className="text-green-400">{line.content}</div>
            )}
            {line.type === 'output' && (
              <div className="text-gray-300">{line.content}</div>
            )}
            {line.type === 'error' && (
              <div className="text-red-400">{line.content}</div>
            )}
            {line.type === 'warning' && (
              <div className="text-yellow-400">{line.content}</div>
            )}
          </div>
        ))}
        
        {/* Input Line */}
        {!isSystemDestroyed && !isDeleting && (
          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">mohamed@portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder={isTerminalActive ? "Type 'help' for commands..." : "Click to activate terminal"}
              autoComplete="off"
              spellCheck="false"
            />
            <span className="text-white animate-pulse">_</span>
          </form>
        )}
        
        {/* System halted */}
        {isSystemDestroyed && (
          <div className="text-gray-500">
            <span className="mr-2">System halted.</span>
            <span className="animate-pulse">_</span>
          </div>
        )}
      </div>
    </div>
  )
}