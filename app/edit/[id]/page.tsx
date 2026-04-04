import ProductForm from "@/components/ProductFrom";


export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const productId = parseInt(id);

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {!isNaN(productId) ? (
                <ProductForm productId={productId} />
            ) : (
                <div className="text-center text-rose-500 font-semibold p-12">
                    Invalid Product ID
                </div>
            )}
        </div>
    );
}
