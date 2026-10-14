
'use client';

import { useState } from 'react';
import { FileText, Shield, Phone, ArrowRight, ExternalLink, Calendar, Building2, Heart, Newspaper } from 'lucide-react';

import ContactModal from './ContactModal';

export default function VfigHomepage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const safetySheets = [
    { name: 'Zuurstof (O₂) - Veiligheidsrichtlijnen', type: 'Medisch/Industrieel', urgent: true },
    { name: 'Stikstof (N₂) - Transportvoorschriften', type: 'Industrieel', urgent: false },
    { name: 'CO₂ - Opslag en Handling', type: 'Medisch/Industrieel', urgent: false },
    { name: 'Waterstof (H₂) - Nieuwe EU-richtlijnen', type: 'Industrieel', urgent: true },
    { name: 'Menggassen - Kwaliteitsnormen Zorg', type: 'Medisch', urgent: false }
  ];

  const news = [
    {
      title: 'Nieuwe Europese wetgeving voor waterstoftransport',
      date: '15 januari 2025',
      summary: 'Aangescherpte veiligheidsvoorschriften voor H₂-transport per 1 maart 2025. Impact op Nederlandse leveranciers.',
      category: 'Regelgeving'
    },
    {
      title: 'VFIG position paper: CO₂-neutraliteit 2030',
      date: '8 januari 2025',
      summary: 'Hoe de industriële gassensector bijdraagt aan Nederlandse klimaatdoelen via innovatieve productieprocessen.',
      category: 'Duurzaamheid'
    },
    {
      title: 'Medische zuurstoflevering tijdens griepgolf',
      date: '3 januari 2025',
      summary: 'Sector werkt samen met ziekenhuizen voor gegarandeerde O₂-voorraad tijdens verhoogde vraag.',
      category: 'Medisch'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">VFIG</h1>
                <p className="text-xs text-gray-600">Vereniging van Fabrikanten van Industriële Gassen</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="/over" className="text-gray-700 hover:text-blue-600 transition-colors">Over</a>
              <a href="/medisch" className="text-gray-700 hover:text-blue-600 transition-colors">Medisch</a>
              <a href="/industrieel" className="text-gray-700 hover:text-blue-600 transition-colors">Industrieel</a>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Nederlandse Branchevereniging voor Industriële Gassen
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Wij vertegenwoordigen producenten van industriële gassen en zorgen voor veilige, gereguleerde toepassing 
              in medische zorg, industrie en energietransitie.
            </p>
            
            {/* Primary Navigation Cards */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <a 
                href="/over" 
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Overheid</h3>
                <p className="text-gray-600 mb-4">Regelgeving, compliance en sectorinformatie voor overheidsdiensten</p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="mr-2">Meer informatie</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>

              <a 
                href="/medisch" 
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors">
                  <Heart className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Medische Sector</h3>
                <p className="text-gray-600 mb-4">Medische gassen, zuurstoftherapie en zorgverlening</p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="mr-2">Voor zorgverleners</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>

              <a 
                href="/industrieel" 
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-300"
              >
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <Factory className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Industriële Sector</h3>
                <p className="text-gray-600 mb-4">Procesgassen, lassen, voedselindustrie en energietoepassingen</p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="mr-2">Voor industrie</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Newspaper className="w-6 h-6 mr-3 text-blue-600" />
              Actualiteiten
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <article key={index} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {item.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {item.date}
                  </div>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Sheets Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Meest Geraadpleegde Veiligheidsbladen
            </h3>
            <a href="#alle-veiligheidsbladen" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              Alle veiligheidsbladen
              <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {safetySheets.map((sheet, index) => (
              <div key={index} className="bg-white rounded-lg p-6 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  {sheet.urgent && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Nieuw
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {sheet.name}
                </h4>
                <p className="text-xs text-gray-500">{sheet.type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-3">Voor pers en media</h3>
            <p className="text-blue-100 mb-6">
              Heeft u vragen over industriële gassen, veiligheid of sector-ontwikkelingen?
            </p>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              Perscontact opnemen
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">VFIG</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Vereniging van Fabrikanten van Industriële Gassen. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
