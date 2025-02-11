interface JobCardProps {
  title: string
  company: string
  date: string
  description: string[]
}

export default function JobCard({ title, company, date, description }: JobCardProps) {
  return (
    <div className="bg-gray-700 rounded-lg p-6 mb-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-300 mb-2">{company}</p>
      <p className="text-gray-400 mb-4">{date}</p>
      <ul className="list-disc list-inside text-gray-300">
        {description.map((item, index) => (
          <li key={index} className="mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

