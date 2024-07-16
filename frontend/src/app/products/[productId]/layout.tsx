export default function ProductDetailsLayout({children}: {children: React.ReactNode}) {
  return (
    <section>
      {children}
      <h2>Features Products</h2>
    </section>
  );
}