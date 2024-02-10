export default function FormContainer({ children }) {
    return (
      <div className="container mx-auto
       min-h-screen mt-10">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2">
            {children}
          </div>
        </div>
      </div>
    );
  }
  