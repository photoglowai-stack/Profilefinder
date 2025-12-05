export function Pricing() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold text-rose-600">Tarif simple</p>
        <h2 className="mt-2 text-3xl font-bold text-gray-900">2€ / carte active</h2>
        <p className="mt-2 text-gray-600">
          Paiement à l'usage. Intégration incluse, support prioritaire et suivi dédié pour vos équipes.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm text-gray-700">
          <span className="rounded-full bg-gray-100 px-3 py-1">Sans engagement</span>
          <span className="rounded-full bg-gray-100 px-3 py-1">API & PMS compatibles</span>
          <span className="rounded-full bg-gray-100 px-3 py-1">Facturation mensuelle</span>
        </div>
      </div>
    </div>
  );
}
