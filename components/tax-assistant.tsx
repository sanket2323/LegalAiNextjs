'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { IconSpinner } from '@/components/ui/icons'

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

  React.useEffect(() => {
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
          <div className="tax-assistant-response">
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Tax Analysis</h3>
              <div className="mt-2 text-sm">{data.legal_analysis}</div>
            </div>
            
            {data.section_numbers.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium">Relevant Sections:</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {data.section_numbers.map((section: string) => (
                    <span 
                      key={section} 
                      className="px-2 py-1 text-xs bg-secondary rounded-md"
                    >
                      Section {section}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {Object.keys(data.section_contents).length > 0 && (
              <div className="mt-4">
                <Separator className="my-2" />
                <h4 className="font-medium mb-2">Section Details:</h4>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {Object.values(data.section_contents).map((section: any) => (
                    <div key={section.section_number} className="p-3 rounded-md bg-muted/50">
                      <h5 className="font-medium">Section {section.section_number}</h5>
                      <p className="text-sm mt-1">{section.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
        
        onResult(formattedResult)
      } catch (err) {
        console.error('Error fetching tax information:', err)
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        onResult(
          <div className="tax-assistant-error p-3 rounded-md bg-destructive/10 text-destructive">
            Failed to process tax query: {err instanceof Error ? err.message : 'Unknown error'}
          </div>
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