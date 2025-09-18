import { ProductDescriptionGeneratorForm } from './_components/ProductDescriptionGeneratorForm';
import { ShoppingBasket } from 'lucide-react';

export default function ProductDescriptionGeneratorPage() {
  return (
    <div className="container max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <ShoppingBasket className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold font-headline">Description Generator</h1>
          <p className="text-muted-foreground">
            Craft compelling and persuasive descriptions for your products.
          </p>
        </div>
      </div>
      <ProductDescriptionGeneratorForm />
    </div>
  );
}
