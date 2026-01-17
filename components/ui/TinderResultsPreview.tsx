"use client";
import { CheckCircle2, MapPin, Heart, Sparkles, Info } from "lucide-react";

/**
 * DisclaimerOverlay - Legal requirement on all previews
 */
const DisclaimerOverlay = () => (
  <div className="bg-gray-900/80 p-2 rounded-lg mt-3">
    <div className="flex items-start gap-2">
      <Info className="w-3 h-3 text-blue-400 shrink-0 mt-0.5" />
      <p className="text-[9px] leading-tight text-gray-300">
        <strong className="text-white">SAMPLE:</strong> Data is blurred for demo. Unlocked report shows real results.
      </p>
    </div>
  </div>
);

/**
 * TinderResultsPreview - Dating Search Results
 * Uses abstract silhouettes - NO real faces/names
 */
export function TinderResultsPreview() {
  const profiles = [
    {
      label: "Profile A",
      age: 26,
      distance: "3 km",
      match: 87,
      verified: true
    },
    {
      label: "Profile B",
      age: 24,
      distance: "5 km",
      match: 92,
      verified: true
    }
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-4 p-4 bg-white rounded-xl shadow-xl border border-gray-100">
      {/* Success Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] rounded-full p-2">
            <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="font-bold text-gray-900">2 Profiles Found</p>
            <p className="text-xs text-gray-500">Search complete in 28s</p>
          </div>
        </div>
        <Sparkles className="w-5 h-5 text-[#ff4e71]" />
      </div>

      {/* Profile Cards - Abstract silhouettes */}
      <div className="space-y-3">
        {profiles.map((profile, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4 p-4">
              {/* Abstract Silhouette - NO real face */}
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  {/* Abstract head shape */}
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-400/60 rounded-full" />
                    <div className="w-12 h-14 bg-gray-400/40 rounded-t-full absolute -bottom-8 left-1/2 -translate-x-1/2" />
                  </div>
                </div>
                {/* Match Badge */}
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-[#ff4e71] to-[#ff7f66] text-white rounded-full px-2 py-1 shadow-lg">
                  <div className="flex items-center gap-1">
                    <Heart className="w-3 h-3 fill-white" />
                    <span className="text-xs font-bold">{profile.match}%</span>
                  </div>
                </div>
              </div>

              {/* Profile Info - Generic labels */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 text-lg">{profile.label}</h3>
                  <span className="text-gray-600">{profile.age}</span>
                  {profile.verified && (
                    <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-sm">{profile.distance} away</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  <span className="bg-gradient-to-r from-pink-50 to-red-50 text-[#ff4e71] px-2.5 py-1 rounded-full text-xs font-medium border border-pink-100">
                    Active now
                  </span>
                  <span className="bg-gradient-to-r from-pink-50 to-red-50 text-[#ff4e71] px-2.5 py-1 rounded-full text-xs font-medium border border-pink-100">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer + Info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/60 rounded-xl px-4 py-2.5">
          <Sparkles className="w-4 h-4 text-[#ff4e71]" />
          <span className="text-xs text-[#ff4e71] font-medium">
            AI-verified information
          </span>
        </div>
        <DisclaimerOverlay />
      </div>
    </div>
  );
}

