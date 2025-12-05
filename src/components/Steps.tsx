const steps = [
  { title: "Choisissez votre hôtel", description: "Renseignez vos informations et vos dates." },
  { title: "Recevez la carte digitale", description: "Ajoutez-la en un clic à Apple Wallet ou Google Wallet." },
  { title: "Accédez à votre chambre", description: "Présentez votre smartphone au lecteur comme une carte classique." }
];

export function Steps() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Comment ça marche ?</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <div key={step.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="text-xs font-semibold text-rose-600">Étape {index + 1}</div>
            <h3 className="mt-2 text-lg font-semibold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
