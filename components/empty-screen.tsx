import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
        <h1 className="text-lg font-semibold">
          Welcome to the Tax AI Assistant!
        </h1>
        <p className="leading-normal text-muted-foreground">
          This is an intelligent tax assistant built to help you with tax and legal questions.
          Simply type your tax question and press Enter to get assistance.
        </p>

        
      </div>
    </div>
  )
}