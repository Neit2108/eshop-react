interface DescriptionTabProps {
  description: string
}

export default function DescriptionTab({ description }: DescriptionTabProps) {
  return (
    <div className="py-6">
      <p className="text-muted-foreground leading-relaxed text-base">{description}</p>
    </div>
  )
}
