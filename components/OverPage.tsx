
'use client';

import { useState } from 'react';
import { ArrowLeft, Users, Target, Shield, Globe, Phone, Factory } from 'lucide-react';
import Image from 'next/image';
import ContactModal from './ContactModal';
import Link from 'next/link';

export default function OverPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const missions = [
    {
      icon: Shield,
      title: 'Veiligheid & Regelgeving',
      description: 'We stellen richtlijnen op en zorgen voor uniforme veiligheidsstandaarden. Samenwerking met inspecties en normeringsorganisaties staat centraal.',
      points: ['Veiligheidsrichtlijnen', 'Best practices', 'Uniforme standaarden', 'Samenwerking toezichthouders']
    },
    {
      icon: Users,
      title: 'Belangenbehartiging',
      description: 'Vertegenwoordiging van de sector richting overheid, toezichthouders en Europese instanties voor optimale wet- en regelgeving.',
      points: ['Overheidscontact', 'EU-lobby', 'Wetgeving beïnvloeden', 'Sector vertegenwoordigen']
    },
    {
      icon: Globe,
      title: 'Kennisdeling',
      description: 'Delen van kennis binnen en buiten de sector door publicaties, richtlijnen en voorlichting over veilig gebruik van industriële gassen.',
      points: ['Technische documentatie', 'Voorlichting', 'Best practices delen', 'Sector educatie']
    },
    {
      icon: Target,
      title: 'Positionering Sector',
      description: 'Tonen van het belang van industriële gassen voor energietransitie, duurzaamheid en innovatie in industrie en zorg.',
      points: ['Energietransitie', 'Duurzaamheid', 'Innovatie', 'Maatschappelijke waarde']
    }
  ];

  const stats = [
    { number: '25+', label: 'Lid-organisaties', description: 'Nationale en internationale gasproducenten' },
    { number: '100%', label: 'Marktdekking', description: 'Alle grote industriële gasproducenten' },
    { number: '50+', label: 'Jaar ervaring', description: 'Sectorkennnis sinds 1970' },
    { number: '4', label: 'Kerntaken', description: 'Belangenbehartiging, veiligheid, kennis, positionering' }
  ];

  const gasTypes = [
    { name: 'Zuurstof (O₂)', applications: 'Medisch, lassen, industrie' },
    { name: 'Stikstof (N₂)', applications: 'Voedsel, elektronica, chemie' },
    { name: 'Waterstof (H₂)', applications: 'Energietransitie, industrie' },
    { name: 'CO₂', applications: 'Voedsel, medisch, industrie' },
    { name: 'Speciale menggassen', applications: 'Lassen, analyse, kalibratie' },
    { name: 'Edelgassen', applications: 'Elektronica, verlichting, research' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Factory className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg font-semibold text-gray-900">Over VFIG</span>
            </Link>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <Factory className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Over de VFIG</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            De Vereniging van Fabrikanten van Industriële Gassen is dé Nederlandse branchevereniging voor bedrijven 
            die industriële gassen produceren en leveren. Wij vertegenwoordigen de belangen van onze sector sinds 1970.
          </p>
        </div>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="font-semibold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Onze Kerntaken</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {missions.map((mission, index) => {
              const IconComponent = mission.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{mission.title}</h3>
                  <p className="text-gray-700 mb-6">{mission.description}</p>
                  <ul className="space-y-2">
                    {mission.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3"></div>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Gas Types Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Industriële Gassen</h2>
          <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Onze leden produceren en leveren een breed scala aan industriële gassen voor diverse sectoren.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gasTypes.map((gas, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all">
                <h3 className="font-semibold text-gray-900 mb-2">{gas.name}</h3>
                <p className="text-sm text-gray-600">{gas.applications}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why VFIG Exists */}
        <section className="mb-16">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-3xl font-bold mb-6">Waarom bestaat de VFIG?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Sterk Gereguleerde Sector</h3>
                <p className="text-gray-300">
                  Industriële gassen vallen onder strikte nationale en Europese regelgeving. Gecoördineerde 
                  interpretatie en implementatie is essentieel.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Veiligheidskritisch</h3>
                <p className="text-gray-300">
                  Gassen brengen risico&apos;s met zich mee: druk, explosie, verstikking. Uniforme veiligheidsstandaarden 
                  beschermen werknemers en omgeving.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Maatschappelijke Impact</h3>
                <p className="text-gray-300">
                  Van zuurstof in ziekenhuizen tot waterstof voor energietransitie - onze sector speelt een 
                  cruciale rol in de Nederlandse samenleving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-blue-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Vragen over de VFIG?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Neem contact op voor meer informatie over onze organisatie, leden of activiteiten.
            </p>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact opnemen
            </button>
          </div>
        </section>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
