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
        <p className="leading-normal text-muted-foreground">
          This application is built with{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and connects to a specialized tax API
          to provide you with accurate information.
        </p>
        <div className="mt-4">
          <h2 className="text-md font-medium mb-2">Example questions you can ask:</h2>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>What are the tax implications of starting a small business?</li>
            <li>Can you explain Section 80C deductions?</li>
            <li>What documents do I need for tax filing?</li>
            <li>How are capital gains from property sales taxed?</li>
          </ul>
        </div>
      </div>
    </div>
  )
}