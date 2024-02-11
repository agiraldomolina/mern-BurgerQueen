import { Spinner } from "flowbite-react"

export default function Loader() {
  return (
    <Spinner
        aria-label="Extra large spinner example"
        size="xl"
        style={{
            width:'100px',
            height:'100px',
            margin:'auto',
            display:'block'
        }}
    >       
    </Spinner>
  )
}
