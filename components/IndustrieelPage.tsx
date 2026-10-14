
'use client';

import { useState } from 'react';
import { ArrowLeft, Factory, ExternalLink, Phone, ChevronDown, ChevronRight, Flame, Shield, Truck } from 'lucide-react';
import ContactModal from './ContactModal';
import Link from 'next/link';

export default function IndustrieelPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const relevantInfo = [
    {
      title: 'Lassen en Snijden',
      content: 'Zuurstof, acetyleen, argon en helium voor laswerkzaamheden. Veiligheidsnormen en gasmengsels voor verschillende materialen.',
      icon: Flame,
      link: '#'
    },
    {
      title: 'Procesgassen Industrie',
      content: 'Stikstof voor inertisatie, CO₂ voor pH-regeling, waterstof voor hydrogenatie en speciale gasmengsels voor chemische processen.',
      icon: Factory,
      link: '#'
    },
    {
      title: 'Voedselindustrie',
      content: 'CO₂ voor carbonisatie, stikstof voor verpakking onder beschermende atmosfeer en kwaliteitsborging.',
      icon: Shield,
      link: '#'
    },
    {
      title: 'Transport & Logistiek',
      content: 'ADR-voorschriften, tankwagentransport, gasflessen-distributie en veiligheidsprotocollen.',
      icon: Truck,
      link: '#'
    }
  ];

  const regulations = [
    { name: 'ADR - Transport Gevaarlijke Stoffen', url: '#', description: 'Europese regelgeving transport industriële gassen' },
    { name: 'PED - Pressure Equipment Directive', url: '#', description: 'EU-richtlijn drukapparatuur en drukhoudende systemen' },
    { name: 'ATEX-richtlijn', url: '#', description: 'Explosieveiligheid in industriële omgevingen' },
    { name: 'Arbeidsomstandighedenwet', url: '#', description: 'Nederlandse wetgeving werkplekken met gassen' },
    { name: 'CLP-verordening', url: '#', description: 'Classificatie, etikettering en verpakking chemicaliën' }
  ];

  const contacts = [
    {
      role: 'Technische Zaken',
      name: 'Ing. P. Jansen',
      specialization: 'Procesgassen, lasgassen, installaties',
      description: 'Voor technische vragen over industriële gastoepassingen'
    },
    {
      role: 'Transport & Logistiek',
      name: 'Drs. M. de Groot',
      specialization: 'ADR, distributie, veiligheid',
      description: 'Voor vragen over transport en leveringsprotocollen'
    },
    {
      role: 'Regelgeving & Compliance',
      name: 'Mr. H. Visser',
      specialization: 'PED, ATEX, vergunningen',
      description: 'Voor vragen over wet- en regelgeving industrie'
    }
  ];

  const faqs = [
    {
      question: 'Welke gasmengels zijn geschikt voor RVS lassen?',
      answer: 'Voor RVS lassen wordt vaak Argon + 2-5% CO₂ gebruikt voor MAG-lassen, of puur Argon voor TIG-lassen. Voor dikkere werkstukken kan Argon + Helium (tot 30%) worden toegepast voor betere warmte-inbreng.'
    },
    {
      question: 'Wat zijn de opslagvereisten voor industriële waterstof?',
      answer: 'Waterstof moet worden opgeslagen in geventileerde ruimtes, minimaal 3 meter van ontstekingsbronnen. Detectiesystemen zijn verplicht vanaf 500 kg opslag. Tanks moeten voldoen aan PED-richtlijnen en halfjaarlijks worden geïnspecteerd.'
    },
    {
      question: 'Hoe wordt CO₂-zuiverheid gemeten voor voedseltoepassing?',
      answer: 'Voor voedselkwaliteit CO₂ zijn maximaal 500 ppm H₂O, 10 ppm olie en 1 ppm H₂S toegestaan. Analyse gebeurt via gaschromatografie conform ISBT-standaarden. Batch-certificaten zijn verplicht.'
    },
    {
      question: 'Welke ADR-klasse geldt voor gecomprimeerde stikstof?',
      answer: 'Gecomprimeerde stikstof valt onder ADR-klasse 2.2 (niet-brandbare, niet-giftige gassen). UN-nummer is 1066. Vervoer vereist ADR-certificaat, oranje borden en juiste etikettering op tanks en flessen.'
    },
    {
      question: 'Wat zijn ATEX-zone-eisen bij gebruik van brandbare gassen?',
      answer: 'ATEX Zone 0 binnen 1m van gaslekpunten, Zone 1 tot 5m bij normale ventilatie. Alle apparatuur moet ATEX-gecertificeerd zijn. Gasdetectie verplicht met automatische afsluiting bij 20% van de onderste explosiegrens.'
    },
    {
      question: 'Hoe vaak moeten drukvaten worden gekeurd?',
      answer: 'Externe keuring om de 4 jaar door aangewezen keuringsinstantie. Inwendige keuring om de 8 jaar of conform fabrikantspecificaties. Periodieke beproeving volgens PED-richtlijn afhankelijk van risico-categorie.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
              <Image
                src="/vfig_logo.jpeg"
                alt="VFIG logo"
                height={48}
                width={120}
                className="h-12 w-auto object-contain"
              />
              <span className="text-lg font-semibold text-gray-900">Industriële Sector</span>
            </Link>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Factory className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Industriële Sector</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Technische informatie en ondersteuning voor industriële toepassingen van gassen in Nederland.
          </p>
        </div>

        {/* Relevant Information */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Toepassingsgebieden</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relevantInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="bg-green-50 border border-green-100 rounded-lg p-6 hover:bg-green-100 transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-green-700" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{item.content}</p>
                  <a href={item.link} className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Meer informatie
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Regulations */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Relevante Wetgeving</h2>
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="space-y-4">
              {regulations.map((reg, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
                  <div>
                    <h3 className="font-medium text-gray-900">{reg.name}</h3>
                    <p className="text-sm text-gray-600">{reg.description}</p>
                  </div>
                  <a 
                    href={reg.url} 
                    className="text-green-600 hover:text-green-700 flex items-center ml-4 shrink-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contacts */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contacten</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {contacts.map((contact, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-1">{contact.role}</h3>
                <p className="text-green-600 font-medium mb-2">{contact.name}</p>
                <p className="text-sm text-gray-600 mb-3">{contact.specialization}</p>
                <p className="text-sm text-gray-700 mb-4">{contact.description}</p>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center"
                >
                  Contact opnemen
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Veelgestelde Vragen</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
