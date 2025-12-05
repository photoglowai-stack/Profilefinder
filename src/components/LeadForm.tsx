export function LeadForm() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm space-y-6">
        <div>
          <p className="text-sm font-semibold text-rose-600">Contact</p>
          <h2 className="text-2xl font-bold text-gray-900">Parlons de votre déploiement</h2>
          <p className="text-sm text-gray-600">Laissez vos coordonnées, nous revenons vers vous sous 24h.</p>
        </div>
        <form className="grid gap-4 md:grid-cols-2">
          <input className="rounded-xl border border-gray-200 px-3 py-2" placeholder="Nom" />
          <input className="rounded-xl border border-gray-200 px-3 py-2" placeholder="Email professionnel" />
          <input className="rounded-xl border border-gray-200 px-3 py-2" placeholder="Téléphone" />
          <input className="rounded-xl border border-gray-200 px-3 py-2" placeholder="Nom de l'hôtel" />
          <textarea className="md:col-span-2 rounded-xl border border-gray-200 px-3 py-2" rows={4} placeholder="Votre besoin"></textarea>
          <button type="submit" className="md:col-span-2 rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white hover:bg-rose-700">
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
