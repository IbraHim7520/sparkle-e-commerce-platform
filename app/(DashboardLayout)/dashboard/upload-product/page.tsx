import ProductUploadForm from "@/components/Forms/ProductUploadForm";

export default function ProductUploadPage() {
    return (
        <div className="w-full p-3 md:p-5 lg:p-8">
                   <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:px-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Upload New Product
          </h1>
          <p className="mt-2 text-indigo-100 text-sm sm:text-base">
            Fill in the information below to add a new item to your store inventory.
          </p>
        </div>
        
        <div className="mt-5 w-full ">

            <ProductUploadForm />

        </div>
        
        </div>
    )
}