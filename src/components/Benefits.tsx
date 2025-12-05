const benefits = [
  { title: "Expérience fluide", description: "Plus de badge à récupérer : tout est dans le smartphone." },
  { title: "Réception allégée", description: "Moins d'attente au check-in, plus de satisfaction." },
  { title: "Image innovante", description: "Montrez une expérience digitale moderne dès l'arrivée." }
];

export function Benefits() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Pourquoi vos voyageurs adorent</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
