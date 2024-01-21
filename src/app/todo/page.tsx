import { revalidatePath, revalidateTag } from "next/cache";

interface Product {
  id: string;
  product: string;
  price: string;
}

const Home = async () => {
  const res = await fetch(
    "https://64cc82a52eafdcdc8519e770.mockapi.io/new_products",
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["todo"],
      },
    },
  );

  const products = (await res.json()) as Product[];

  // Server action function to add products to the database
  const addProduct = async (e: any) => {
    "use server";

    const product = e.get("product").toString();
    const price = e.get("price").toString();

    console.log(product);
    if (!product || !price) {
      return;
    }

    const newProduct = {
      product,
      price,
    };

    await fetch("https://64cc82a52eafdcdc8519e770.mockapi.io/new_products", {
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidateTag("todo");
    revalidatePath("/todo");
  };

  return (
    <main className="">
      <h1 className="text-center text-3xl font-bold">Products</h1>

      <form
        action={addProduct}
        className="mx-auto flex max-w-xl flex-col gap-5 p-5"
      >
        <input
          name="product"
          type="text"
          placeholder="Product Name"
          className="rounded-md border border-gray-300 p-2"
        />

        <input
          name="price"
          type="text"
          placeholder="Price..."
          className="rounded-md border border-gray-300 p-2"
        />
        <button className="rounded-md border bg-blue-500 p-2 text-white">
          Add Product
        </button>
      </form>

      <h2 className="text-center text-2xl font-bold">List of Products</h2>

      <div className="flex flex-wrap gap-5 p-10">
        {products.map((product) => (
          <div key={product.id} className="p-5 shadow">
            <p>{product.product}</p>
            <p>$ {product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
