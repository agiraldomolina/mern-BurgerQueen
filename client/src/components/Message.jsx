import { Alert } from "flowbite-react"

export default function Message({variant, children}) {
  return (
    <Alert
        variant={variant}
    >
    {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info'
}