import { Spinner } from "flowbite-react"

export default function Loader() {
  return (
    <Spinner
        size="xl"
        style={{
            width:'200px',
            height:'200px',
            margin:'auto',
            display:'block'
        }}
    >       
    </Spinner>
  )
}
