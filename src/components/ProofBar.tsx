const badges = [
  "+500 hôtels connectés",
  "Compatible Apple & Google Wallet",
  "Activation en 48h"
];

export function ProofBar() {
  return (
    <div className="bg-gray-50 py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center gap-3 justify-center text-sm font-medium text-gray-700">
        {badges.map((badge) => (
          <span key={badge} className="rounded-full bg-white px-4 py-2 shadow-sm border border-gray-100">
            {badge}
          </span>
        ))}
      </div>
    </div>
  );
}
