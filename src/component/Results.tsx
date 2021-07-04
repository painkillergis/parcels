import './Results.css'

interface ResultsProps {
  results: Array<any>
}

function Results({ results }: ResultsProps) {
  return results.length > 0 ? (
    <div className="results">
      {results.map((result: any, index: number) => (
        <div className="result" key={index}>
          {result.getClassificationsList().join(', ')}
        </div>
      ))}
    </div>
  ) : null
}

export default Results
