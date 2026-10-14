
'use client';

import { useState } from 'react';
import { ArrowLeft, Heart, ExternalLink, Phone, ChevronDown, ChevronRight } from 'lucide-react';
import ContactModal from './ContactModal';
import Link from 'next/link';

export default function MedischePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const relevantInfo = [
    {
      title: 'Medische Zuurstoftherapie',
      content: 'Richtlijnen voor O₂-toediening, flowmeters, concentrators en veilig gebruik in zorginstellingen.',
      link: '#'
    },
    {
      title: 'Lachgas in de Tandheelkunde',
      content: 'Sedatieprotocollen, dosering en ventilatie-eisen voor tandartspraktijken en ziekenhuizen.',
      link: '#'
    },
    {
      title: 'CO₂ voor Laparoscopie',
      content: 'Zuiverheidsgraden, steriliteitseisen en veilig gebruik van CO₂ bij minimaal invasieve chirurgie.',
      link: '#'
    },
    {
      title: 'Menggassen voor Beademing',
      content: 'Specifieke gasmengsels voor IC-beademing, kalibratie en kwaliteitscontrole.',
      link: '#'
    }
  ];

  const regulations = [
    { name: 'EU MDR - Medical Device Regulation', url: '#', description: 'Europese regelgeving medische hulpmiddelen' },
    { name: 'NEN-EN-ISO 7396-1', url: '#', description: 'Medische gassystemen in ziekenhuizen' },
    { name: 'Wet op de Geneesmiddelenvoorziening', url: '#', description: 'Nederlandse wetgeving medische gassen' },
    { name: 'KNMG Richtlijnen Zuurstoftherapie', url: '#', description: 'Professionele standaarden zuurstofgebruik' }
  ];

  const contacts = [
    {
      role: 'Medische Zaken',
      name: 'Dr. M. van der Berg',
      specialization: 'Zuurstoftherapie, ademhalingsgassen',
      description: 'Voor vragen over medische toepassingen en klinische richtlijnen'
    },
    {
      role: 'Kwaliteit & Regelgeving',
      name: 'Drs. S. Willems',
      specialization: 'MDR compliance, certificering',
      description: 'Voor vragen over medische certificering en kwaliteitsnormen'
    },
    {
      role: 'Technische Ondersteuning',
      name: 'Ing. R. Mulder',
      specialization: 'Medische gasinstallaties',
      description: 'Voor technische vragen over gastoevoersystemen'
    }
  ];

  const faqs = [
    {
      question: 'Welke zuiverheidsgraad is vereist voor medische zuurstof?',
      answer: 'Medische zuurstof moet voldoen aan Ph.Eur. standaarden met een minimale zuiverheid van 99,5% en maximaal 5 ppm waterdamp. Voor beademingsapparatuur geldt vaak een hogere zuiverheid van 99,95%.'
    },
    {
      question: 'Hoe vaak moeten medische gasinstallaties worden gecontroleerd?',
      answer: 'Volgens NEN-EN-ISO 7396-1 moeten medische gasinstallaties jaarlijks worden geïnspecteerd door een gecertificeerde installateur. Kritieke verbindingen (OK, IC) vereisen halfjaarlijkse controles.'
    },
    {
      question: 'Wat zijn de opslageisen voor medische CO₂?',
      answer: 'Medische CO₂ moet worden opgeslagen bij temperaturen onder 31°C en drukken onder 73,8 bar. Tanks moeten voorzien zijn van overdrukbeveiliging en worden geplaatst in geventileerde ruimtes.'
    },
    {
      question: 'Welke documentatie is verplicht bij levering aan ziekenhuizen?',
      answer: 'Verplicht zijn: kwaliteitscertificaat volgens Ph.Eur., analyseresultaten per batch, Certificate of Analysis (CoA), en traceerbaarheid naar productielocatie. Voor kritieke toepassingen ook steriliteitsbevestiging.'
    },
    {
      question: 'Hoe moet lachgas veilig worden gebruikt in de praktijk?',
      answer: 'Lachgas vereist adequaat afzuigsysteem (min. 45 l/min), monitoring van N₂O-concentratie (< 25 ppm TWA), en getraind personeel. Zwangere medewerkers mogen niet worden blootgesteld.'
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
              <span className="text-lg font-semibold text-gray-900">Medische Sector</span>
            </Link>
            <button 
              onClick={() => setIsContactOpen(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
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
          <div className="w-20 h-20 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Medische Sector</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informatie, richtlijnen en ondersteuning voor zorgverleners die werken met medische gassen in Nederland.
          </p>
        </div>

        {/* Relevant Information */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Relevante Informatie</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {relevantInfo.map((item, index) => (
              <div key={index} className="bg-red-50 border border-red-100 rounded-lg p-6 hover:bg-red-100 transition-colors">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-700 mb-4">{item.content}</p>
                <a href={item.link} className="text-red-600 hover:text-red-700 font-medium flex items-center">
                  Meer informatie
                  <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
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
                    className="text-red-600 hover:text-red-700 flex items-center ml-4 shrink-0"
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
                <p className="text-red-600 font-medium mb-2">{contact.name}</p>
                <p className="text-sm text-gray-600 mb-3">{contact.specialization}</p>
                <p className="text-sm text-gray-700 mb-4">{contact.description}</p>
                <button 
                  onClick={() => setIsContactOpen(true)}
                  className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center"
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
