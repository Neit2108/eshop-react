import { CheckCircle2, XCircle } from "lucide-react"

interface IconStatusProps {
  success: boolean
}

export default function IconStatus({ success }: IconStatusProps) {
  return success ? (
    <CheckCircle2 className="w-16 h-16 text-green-500" />
  ) : (
    <XCircle className="w-16 h-16 text-red-500" />
  )
}
