interface Props {
  title: string
  subtitle?: string
  className?: string
}

export const Titles = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1 className={`mb-1 mt-5 text-4xl`}>{title}</h1>

      {subtitle && <span className="text-xs">{subtitle}</span>}
    </div>
  )
}
