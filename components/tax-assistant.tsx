'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { IconSpinner } from '@/components/ui/icons'
import { BotMessage } from './stocks/message'

interface TaxQueryResponse {
  reasoning_content: string
  section_numbers: string[]
  section_contents: {
    [key: string]: {
      section_number: string
      text: string
    }
  }
  legal_analysis: string
}

interface TaxAssistantProps {
  query: string
  onResult: (result: React.ReactNode) => void
}

export function TaxAssistant({ query, onResult }: TaxAssistantProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<TaxQueryResponse | null>(null)

  useEffect(() => {
    const fetchTaxInfo = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const res = await fetch('/api/tax', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        })

        if (!res.ok) {
          const errorData = await res.json()
          throw new Error(errorData.error || 'Failed to process tax query')
        }

        const data = await res.json()
        setResponse(data)
        
        // Format the result and send it back to the chat component
        const formattedResult = (
          <BotMessage content={`${data.legal_analysis}\n\n${
            data.section_numbers.length > 0 
              ? `Relevant Sections: ${data.section_numbers.join(', ')}`
              : ''
          }`} />
        )
        
        onResult(formattedResult)
      } catch (err) {
        console.error('Error fetching tax information:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        onResult(
          <BotMessage content={`I encountered an error processing your tax query: ${err instanceof Error ? err.message : 'Unknown error'}`} />
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchTaxInfo()
  }, [query, onResult])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6">
        <IconSpinner className="size-6 animate-spin" />
        <span className="ml-2">Processing tax query...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-3 rounded-md bg-destructive/10 text-destructive">
        {error}
      </div>
    )
  }

  return null
}