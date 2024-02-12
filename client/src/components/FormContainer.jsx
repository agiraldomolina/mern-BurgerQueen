export default function FormContainer({ children }) {
    return (
      <div className="p-3 mb-4 container mx-auto
       min-h-screen mt-3">
        <div className="flex justify-center">
          <div className="w-10/12  md:w-10/12">
            {children}
          </div>
        </div>
      </div>
    );
  }
  