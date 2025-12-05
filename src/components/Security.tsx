const items = [
  { title: "Clés chiffrées", description: "Les accès sont générés et révoqués de façon sécurisée." },
  { title: "Traçabilité", description: "Chaque ouverture est journalisée pour votre équipe." },
  { title: "Support 24/7", description: "Une équipe disponible en continu pour vos voyageurs." }
];

export function Security() {
  return (
    <div className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <h2 className="text-2xl font-bold">Sécurité de niveau hôtelier</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
