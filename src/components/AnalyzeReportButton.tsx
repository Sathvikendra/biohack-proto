'use client'

import { useState } from 'react'

interface AnalyzeReportButtonProps {
  reportPath: string
}

export default function AnalyzeReportButton({ reportPath }: AnalyzeReportButtonProps) {
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)

  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/analyzeReport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportPath }),
      })
      const data = await res.json()
      setSummary(data.summary)
    } catch (error) {
      console.error('Error analyzing report:', error)
      setSummary('Failed to analyze report.')
    }
    setLoading(false)
  }

  return (
    <div>
      <button
        className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? 'Analyzing…' : 'Analyze Lab Report'}
      </button>

      {summary && (
        <div className="mt-4 p-4 border rounded bg-gray-50 whitespace-pre-line shadow">
          <h3 className="font-semibold mb-2 text-teal-700">Report Summary</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  )
}
